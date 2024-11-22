import { ethers } from "ethers";
import "dotenv/config";

const USER_ABI = [
    {
        type: "constructor",
        inputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "ADMIN_ROLE",
        inputs: [],
        outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "DEFAULT_ADMIN_ROLE",
        inputs: [],
        outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "DISTRIBUTOR_ROLE",
        inputs: [],
        outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "JEWEL_FACTORY_ROLE",
        inputs: [],
        outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "RAW_MINERAL_ROLE",
        inputs: [],
        outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "STORE_ROLE",
        inputs: [],
        outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "checkUserRole",
        inputs: [
            {
                name: "_userAddress",
                type: "address",
                internalType: "address",
            },
            {
                name: "_role",
                type: "bytes32",
                internalType: "bytes32",
            },
        ],
        outputs: [{ name: "", type: "bool", internalType: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "createUser",
        inputs: [
            {
                name: "_userAddress",
                type: "address",
                internalType: "address",
            },
            {
                name: "_role",
                type: "bytes32",
                internalType: "bytes32",
            },
            { name: "_name", type: "string", internalType: "string" },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "deleteUser",
        inputs: [
            {
                name: "_userAddress",
                type: "address",
                internalType: "address",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "getListUsers",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "tuple[]",
                internalType: "struct IUserJewelChain.User[]",
                components: [
                    {
                        name: "user",
                        type: "address",
                        internalType: "address",
                    },
                    {
                        name: "role",
                        type: "bytes32",
                        internalType: "bytes32",
                    },
                    {
                        name: "isActive",
                        type: "bool",
                        internalType: "bool",
                    },
                    {
                        name: "name",
                        type: "string",
                        internalType: "string",
                    },
                ],
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "getRoleAdmin",
        inputs: [{ name: "role", type: "bytes32", internalType: "bytes32" }],
        outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "getUser",
        inputs: [
            {
                name: "_userAddress",
                type: "address",
                internalType: "address",
            },
        ],
        outputs: [
            {
                name: "",
                type: "tuple",
                internalType: "struct IUserJewelChain.User",
                components: [
                    {
                        name: "user",
                        type: "address",
                        internalType: "address",
                    },
                    {
                        name: "role",
                        type: "bytes32",
                        internalType: "bytes32",
                    },
                    {
                        name: "isActive",
                        type: "bool",
                        internalType: "bool",
                    },
                    {
                        name: "name",
                        type: "string",
                        internalType: "string",
                    },
                ],
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "grantRole",
        inputs: [
            {
                name: "role",
                type: "bytes32",
                internalType: "bytes32",
            },
            {
                name: "account",
                type: "address",
                internalType: "address",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "hasRole",
        inputs: [
            {
                name: "role",
                type: "bytes32",
                internalType: "bytes32",
            },
            {
                name: "account",
                type: "address",
                internalType: "address",
            },
        ],
        outputs: [{ name: "", type: "bool", internalType: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "owner",
        inputs: [],
        outputs: [{ name: "", type: "address", internalType: "address" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "renounceOwnership",
        inputs: [],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "renounceRole",
        inputs: [
            {
                name: "role",
                type: "bytes32",
                internalType: "bytes32",
            },
            {
                name: "callerConfirmation",
                type: "address",
                internalType: "address",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "revokeRole",
        inputs: [
            {
                name: "role",
                type: "bytes32",
                internalType: "bytes32",
            },
            {
                name: "account",
                type: "address",
                internalType: "address",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "supportsInterface",
        inputs: [
            {
                name: "interfaceId",
                type: "bytes4",
                internalType: "bytes4",
            },
        ],
        outputs: [{ name: "", type: "bool", internalType: "bool" }],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "transferOwnership",
        inputs: [
            {
                name: "newOwner",
                type: "address",
                internalType: "address",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "updateStatusUser",
        inputs: [
            {
                name: "_userAddress",
                type: "address",
                internalType: "address",
            },
            { name: "_isActive", type: "bool", internalType: "bool" },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "event",
        name: "OwnershipTransferred",
        inputs: [
            {
                name: "previousOwner",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "newOwner",
                type: "address",
                indexed: true,
                internalType: "address",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "RoleAdminChanged",
        inputs: [
            {
                name: "role",
                type: "bytes32",
                indexed: true,
                internalType: "bytes32",
            },
            {
                name: "previousAdminRole",
                type: "bytes32",
                indexed: true,
                internalType: "bytes32",
            },
            {
                name: "newAdminRole",
                type: "bytes32",
                indexed: true,
                internalType: "bytes32",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "RoleGranted",
        inputs: [
            {
                name: "role",
                type: "bytes32",
                indexed: true,
                internalType: "bytes32",
            },
            {
                name: "account",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "sender",
                type: "address",
                indexed: true,
                internalType: "address",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "RoleRevoked",
        inputs: [
            {
                name: "role",
                type: "bytes32",
                indexed: true,
                internalType: "bytes32",
            },
            {
                name: "account",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "sender",
                type: "address",
                indexed: true,
                internalType: "address",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "UsersJewelsChain__UserCreated",
        inputs: [
            {
                name: "_user",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "role",
                type: "bytes32",
                indexed: false,
                internalType: "bytes32",
            },
            {
                name: "isActive",
                type: "bool",
                indexed: false,
                internalType: "bool",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "UsersJewelsChain__UserDeleted",
        inputs: [
            {
                name: "_user",
                type: "address",
                indexed: true,
                internalType: "address",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "UsersJewelsChain__UserUpdatedStatus",
        inputs: [
            {
                name: "_user",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "isActive",
                type: "bool",
                indexed: false,
                internalType: "bool",
            },
        ],
        anonymous: false,
    },
    {
        type: "error",
        name: "AccessControlBadConfirmation",
        inputs: [],
    },
    {
        type: "error",
        name: "AccessControlUnauthorizedAccount",
        inputs: [
            {
                name: "account",
                type: "address",
                internalType: "address",
            },
            {
                name: "neededRole",
                type: "bytes32",
                internalType: "bytes32",
            },
        ],
    },
    {
        type: "error",
        name: "OwnableInvalidOwner",
        inputs: [
            {
                name: "owner",
                type: "address",
                internalType: "address",
            },
        ],
    },
    {
        type: "error",
        name: "OwnableUnauthorizedAccount",
        inputs: [
            {
                name: "account",
                type: "address",
                internalType: "address",
            },
        ],
    },
    {
        type: "error",
        name: "UsersJewelsChain__UserExisted",
        inputs: [
            {
                name: "userAddress",
                type: "address",
                internalType: "address",
            },
        ],
    },
    {
        type: "error",
        name: "UsersJewelsChain__UserHasSameStatus",
        inputs: [
            {
                name: "userAddress",
                type: "address",
                internalType: "address",
            },
            { name: "isActive", type: "bool", internalType: "bool" },
        ],
    },
    {
        type: "error",
        name: "UsersJewelsChain__UserInvalidAddress",
        inputs: [
            {
                name: "userAddress",
                type: "address",
                internalType: "address",
            },
        ],
    },
    {
        type: "error",
        name: "UsersJewelsChain__UserInvalidRole",
        inputs: [
            {
                name: "userAddress",
                type: "address",
                internalType: "address",
            },
            { name: "role", type: "bytes32", internalType: "bytes32" },
        ],
    },
    {
        type: "error",
        name: "UsersJewelsChain__UserNotFound",
        inputs: [
            {
                name: "userAddress",
                type: "address",
                internalType: "address",
            },
        ],
    },
];

const PROVIDER = new ethers.JsonRpcProvider(process.env.PROVIDER);

const ADDRESS_CONTRACT = "0x5f474bC674b6Ad4d7b6A5c6429d586D53053DA33";

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, PROVIDER);

const userJewelsContract = new ethers.Contract(
    ADDRESS_CONTRACT,
    USER_ABI,
    wallet,
);

const RAW_MINERAL_ROLE = "RAW_MINERAL";
const rawMineralRole = ethers.solidityPackedKeccak256(
    ["string"],
    [RAW_MINERAL_ROLE],
);

const JEWEL_FACTORY_ROLE = "JEWEL_FACTORY";
const jewelFactoryRole = ethers.solidityPackedKeccak256(
    ["string"],
    [JEWEL_FACTORY_ROLE],
);

const ADMIN_ROLE = "ADMIN";
const adminRole = ethers.solidityPackedKeccak256(
    ["string"],
    [JEWEL_FACTORY_ROLE],
);

const interface_SC_User = new ethers.Interface(USER_ABI);

const mapRole = {
    [rawMineralRole]: RAW_MINERAL_ROLE,
    [jewelFactoryRole]: JEWEL_FACTORY_ROLE,
    [adminRole]: ADMIN_ROLE,
};

const createUser = async () => {
    const addressNewUser = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const addressNewUserRawMineral =
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

    try {
        const tx = await userJewelsContract.createUser(
            addressNewUser,
            rawMineralRole,
            "raw_mineral",
        );
        tx.wait();
        console.log("tx", tx);
        const tx2 = await userJewelsContract.createUser(
            addressNewUserRawMineral,
            jewelFactoryRole,
            "jewel_factory",
        );
        tx2.wait();
        console.log("tx2", tx2);
    } catch (err) {
        console.log("err", err);

        console.log("data_error", err.info.error.data);
        const revertData = err.info.error.data;
        const decodedError = interface_SC_User.parseError(revertData);
        console.log("Decode__Error:", decodedError);

        console.log("data", err.transaction.data);
        const data = err.transaction.data;
        const decodedData = interface_SC_User.getFunctionName("0x141fb940");
        console.log("Decode__Data:", decodedData);
        console.log("----------------------------");
    }
};

const getListUsers = async () => {
    try {
        const userList = await userJewelsContract.getListUsers();
        console.log("userList", userList);
        const mappedUserList = userList.map((user) => {
            return {
                address: user[0],
                role: mapRole[user[1]],
                isActive: user[2],
            };
        });
        console.log("mappedUserList", mappedUserList);
    } catch (err) {
        console.error("no funciona", err);
    }
};

//await createUser();
await getListUsers();
