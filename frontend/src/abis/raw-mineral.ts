export const RAW_MINERAL_ABI = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_sc_userJewelChain",
        type: "address",
        internalType: "address",
      },
    ],
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
    name: "createJewelRecord",
    inputs: [
      {
        name: "name",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "date",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "quantity",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "decodeJewel",
    inputs: [
      {
        name: "encodedData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IJewelChain.JewelRecord",
        components: [
          {
            name: "supplier",
            type: "address",
            internalType: "address",
          },
          {
            name: "uniqueId",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "name",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "date",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "quantity",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "recordType",
            type: "uint8",
            internalType: "enum IJewelChain.RecordType",
          },
          {
            name: "data",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "encodeJewel",
    inputs: [
      {
        name: "uniqueId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getJewelByUniqueId",
    inputs: [
      {
        name: "uniqueId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IJewelChain.JewelRecord",
        components: [
          {
            name: "supplier",
            type: "address",
            internalType: "address",
          },
          {
            name: "uniqueId",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "name",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "date",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "quantity",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "recordType",
            type: "uint8",
            internalType: "enum IJewelChain.RecordType",
          },
          {
            name: "data",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getJewelRecordBySupplier",
    inputs: [
      {
        name: "supplier",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct IJewelChain.JewelRecord[]",
        components: [
          {
            name: "supplier",
            type: "address",
            internalType: "address",
          },
          {
            name: "uniqueId",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "name",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "date",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "quantity",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "recordType",
            type: "uint8",
            internalType: "enum IJewelChain.RecordType",
          },
          {
            name: "data",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getOrderMaterialList",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct IJewelChain.JewelToSend[]",
        components: [
          {
            name: "to",
            type: "address",
            internalType: "address",
          },
          {
            name: "uniqueId",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "index",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "orderMaterial",
    inputs: [
      {
        name: "supplier",
        type: "address",
        internalType: "address",
      },
      {
        name: "uniqueId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "recieveMaterial",
    inputs: [
      {
        name: "distributor",
        type: "address",
        internalType: "address",
      },
      {
        name: "supplier",
        type: "address",
        internalType: "address",
      },
      {
        name: "trackingId",
        type: "bytes32",
        internalType: "bytes32",
      },
      { name: "jewels", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "sendMaterial",
    inputs: [
      {
        name: "uniqueId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "indexOrder",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setDistributorSC",
    inputs: [
      {
        name: "_sc_Distributor",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "JewelChain_NewOrder",
    inputs: [
      {
        name: "supplier",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "receiver",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "uniqueId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "JewelChain_Recieve",
    inputs: [
      {
        name: "supplier",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "distributor",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "trackingId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "jewelRecord",
        type: "tuple",
        indexed: false,
        internalType: "struct IJewelChain.JewelRecord",
        components: [
          {
            name: "supplier",
            type: "address",
            internalType: "address",
          },
          {
            name: "uniqueId",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "name",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "date",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "quantity",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "recordType",
            type: "uint8",
            internalType: "enum IJewelChain.RecordType",
          },
          {
            name: "data",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "JewelChain__Created",
    inputs: [
      {
        name: "supplier",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "uniqueId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "name",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
      {
        name: "date",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "quantity",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "data",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
      {
        name: "recordType",
        type: "uint8",
        indexed: false,
        internalType: "enum IJewelChain.RecordType",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "JewelChain__SendNewOrder",
    inputs: [
      {
        name: "supplier",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "receiver",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "uniqueId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "RawMineral__SupplierIsNotRawMineral",
    inputs: [
      {
        name: "supplierAddress",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "RawMineral__UniqueIdNotFound",
    inputs: [
      {
        name: "uniqueId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "error",
    name: "RawMineral__UserInvalidAddress",
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
    name: "RawMineral__UserNotAuthorized",
    inputs: [
      {
        name: "userAddress",
        type: "address",
        internalType: "address",
      },
    ],
  },
];