// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Test, console} from "forge-std/Test.sol";
import {JewelFactory} from "../src/jewel-chain/JewelFactory.sol";
import {UserJewelChain} from "../src/user/UserJewelChain.sol";
import {RawMineral} from "../src/jewel-chain/RawMineral.sol";
import {Distributor} from "../src/distributor/Distributor.sol";
import {UserConstant} from "../src/user/UserConstant.sol";
import {IJewelChain} from "../src/jewel-chain/IJewelChain.sol";
import {Vm} from "forge-std/Vm.sol";

contract JewelFactoryTest is Test, UserConstant {
    JewelFactory public jewelFactory;
    UserJewelChain public userJewelChain;
    RawMineral public rawMineral;
    Distributor public distributor;

    address public owner;
    address public jewelFactoryAddress;
    address public rawMineralAddress;
    address public distributorAddress;

    bytes32 constant JEWEL_FACTORY_ROLE_TEST = keccak256("JEWEL_FACTORY_ROLE");
    bytes32 constant RAW_MINERAL_ROLE_TEST = keccak256("RAW_MINERAL_ROLE");
    bytes32 constant DISTRIBUTOR_ROLE_TEST = keccak256("DISTRIBUTOR_ROLE");

    // Datos de prueba para materiales
    bytes32 constant GOLD_NAME = "Gold";
    uint256 constant MATERIAL_DATE = 1677649421;
    uint256 constant MATERIAL_QUANTITY = 100;
    bytes constant MATERIAL_DATA = abi.encode(uint256(24), "Spain");

    // Datos de prueba para joyas
    bytes32 constant JEWEL_NAME = "Gold Ring";
    uint256 constant JEWEL_QUANTITY = 5;
    bytes constant JEWEL_DATA = abi.encode(uint256(18), "Classic", "IGI-123456");

    function setUp() public {
        owner = makeAddr("owner");
        jewelFactoryAddress = makeAddr("jewelFactory");
        rawMineralAddress = makeAddr("rawMineral");
        distributorAddress = makeAddr("distributor");

        vm.startPrank(owner);

        // Deploy contratos
        userJewelChain = new UserJewelChain();
        rawMineral = new RawMineral(address(userJewelChain));
        distributor = new Distributor(address(rawMineral), address(userJewelChain));
        jewelFactory = new JewelFactory(
            address(userJewelChain), address(rawMineral), address(distributor), "https://api.jewelchain.com/metadata/"
        );

        // Configurar contratos
        rawMineral.setDistributorSC(address(distributor));
        distributor.setJewelFactoryAddress(address(jewelFactory));

        // Crear usuarios
        if (!userJewelChain.hasRole(RAW_MINERAL_ROLE_TEST, rawMineralAddress)) {
            userJewelChain.createUser(rawMineralAddress, RAW_MINERAL_ROLE_TEST, "Raw Mineral Provider");
        }

        if (!userJewelChain.hasRole(JEWEL_FACTORY_ROLE_TEST, jewelFactoryAddress)) {
            userJewelChain.createUser(jewelFactoryAddress, JEWEL_FACTORY_ROLE_TEST, "Jewel Factory");
        }

        if (!userJewelChain.hasRole(DISTRIBUTOR_ROLE_TEST, distributorAddress)) {
            userJewelChain.createUser(distributorAddress, DISTRIBUTOR_ROLE_TEST, "Distributor");
        }

        if (!userJewelChain.hasRole(ADMIN_ROLE, owner)) {
            userJewelChain.createUser(owner, ADMIN_ROLE, "Admin");
        }
        vm.stopPrank();

        // Crear material de prueba
        vm.startPrank(rawMineralAddress);
        rawMineral.createJewelRecord(GOLD_NAME, MATERIAL_DATE, MATERIAL_QUANTITY, MATERIAL_DATA);
        vm.stopPrank();
    }

    function test_ReceiveMaterial() public {
        // Obtener el material creado
        vm.startPrank(jewelFactoryAddress);
        IJewelChain.JewelRecord[] memory materials = rawMineral.getJewelRecordBySupplier(rawMineralAddress);
        bytes32 materialId = materials[0].uniqueId;
        uint256 orderQuantity = 50;

        // Ordenar material
        rawMineral.orderMaterial(rawMineralAddress, materialId, orderQuantity);
        vm.stopPrank();

        // RawMineral envía el material
        vm.startPrank(rawMineralAddress);
        vm.recordLogs();
        uint256 indexOrder = 1; // Primer pedido
        rawMineral.sendMaterial(materialId, indexOrder);

        // Obtener los logs y encontrar el evento Distributor__Shipment
        Vm.Log[] memory entries = vm.getRecordedLogs();
        bytes32 trackingId;
        for (uint256 i = 0; i < entries.length; i++) {
            if (
                entries[i].topics[0]
                    == keccak256(
                        "Distributor__Shipment(bytes32,address,address,uint256,(address,address,bytes32,uint256,uint256,bytes))"
                    )
            ) {
                trackingId = bytes32(entries[i].topics[1]);
                break;
            }
        }
        vm.stopPrank();

        // Distributor confirma la entrega
        vm.startPrank(distributorAddress);

        // Verificar evento MaterialReceived
        vm.expectEmit(true, true, true, true);
        emit JewelFactory.MaterialReceived(materialId, orderQuantity, rawMineralAddress, block.timestamp, trackingId);

        distributor.confirmDelivery(trackingId);
        vm.stopPrank();

        // Verificar el inventario actualizado
        JewelFactory.MaterialInventory memory inventory = jewelFactory.getMaterialInventory(materialId);
        assertEq(inventory.quantity, orderQuantity, "Inventory quantity should match order quantity");
        assertEq(inventory.supplier, rawMineralAddress, "Supplier should match");

        // Verificar el recibo
        JewelFactory.MaterialReceipt memory receipt = jewelFactory.getMaterialReceipt(materialId);
        assertEq(receipt.quantity, orderQuantity, "Receipt quantity should match");
        assertEq(receipt.supplier, rawMineralAddress, "Receipt supplier should match");
        assertEq(receipt.trackingId, trackingId, "Receipt tracking ID should match");
        assertEq(receipt.originalMaterial.uniqueId, materialId, "Original material ID should match");
    }

    function test_CreateJewelWithReceivedMaterial() public {
        // Primero recibir material
        test_ReceiveMaterial();

        vm.startPrank(jewelFactoryAddress);

        // Crear estructura MaterialRequirement
        JewelFactory.MaterialRequirement[] memory requirements = new JewelFactory.MaterialRequirement[](1);
        requirements[0] = JewelFactory.MaterialRequirement({
            materialId: rawMineral.getJewelRecordBySupplier(rawMineralAddress)[0].uniqueId,
            quantity: 10
        });

        // Verificar evento JewelCreated
        vm.expectEmit(true, true, true, true);
        emit JewelFactory.JewelCreated(1, jewelFactoryAddress, JEWEL_NAME, requirements);

        // Crear joya
        uint256 tokenId = jewelFactory.createJewel(JEWEL_NAME, JEWEL_QUANTITY, requirements, JEWEL_DATA);

        // Verificaciones
        assertEq(tokenId, 1, "Token ID should be 1");
        assertEq(
            jewelFactory.balanceOf(jewelFactoryAddress, tokenId), JEWEL_QUANTITY, "Balance should match minted quantity"
        );

        // Verificar metadata
        JewelFactory.JewelMetadata memory metadata = jewelFactory.getJewelMetadata(tokenId);
        assertEq(metadata.name, JEWEL_NAME, "Jewel name should match");
        assertEq(metadata.creator, jewelFactoryAddress, "Creator should be jewelFactory");
        assertEq(metadata.materials[0].materialId, requirements[0].materialId, "Material ID should match");
        assertEq(metadata.materials[0].quantity, 10, "Material quantity should match");

        // Verificar inventario actualizado (50 - 10 = 40)
        JewelFactory.MaterialInventory memory inventory = jewelFactory.getMaterialInventory(requirements[0].materialId);
        assertEq(inventory.quantity, 40, "Inventory should be reduced by used quantity");

        vm.stopPrank();
    }

    function test_RevertWhen_NonJewelFactoryCreatesJewel() public {
        vm.startPrank(rawMineralAddress);

        JewelFactory.MaterialRequirement[] memory requirements = new JewelFactory.MaterialRequirement[](1);
        requirements[0] = JewelFactory.MaterialRequirement({materialId: bytes32(0), quantity: 10});

        vm.expectRevert("JewelFactory: caller is not a jewel factory");
        jewelFactory.createJewel(JEWEL_NAME, JEWEL_QUANTITY, requirements, JEWEL_DATA);

        vm.stopPrank();
    }

    function test_RevertWhen_InsufficientInventoryBalance() public {
        // Primero recibir material
        test_ReceiveMaterial();

        vm.startPrank(jewelFactoryAddress);
        bytes32 materialId = rawMineral.getJewelRecordBySupplier(rawMineralAddress)[0].uniqueId;

        // Intentar usar más material del disponible en inventario
        JewelFactory.MaterialRequirement[] memory requirements = new JewelFactory.MaterialRequirement[](1);
        requirements[0] = JewelFactory.MaterialRequirement({
            materialId: materialId,
            quantity: 51 // Más que la cantidad en inventario (50)
        });

        vm.expectRevert(
            abi.encodeWithSelector(JewelFactory.JewelFactory__InsufficientMaterialBalance.selector, materialId, 51, 50)
        );

        jewelFactory.createJewel(JEWEL_NAME, JEWEL_QUANTITY, requirements, JEWEL_DATA);

        vm.stopPrank();
    }
}
