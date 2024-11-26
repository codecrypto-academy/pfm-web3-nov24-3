export const ABI_USER = [
  {
    "type": "constructor",
    "inputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "ADMIN_ROLE",
    "inputs": [],
    "outputs": [
      { "name": "", "type": "bytes32", "internalType": "bytes32" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "DEFAULT_ADMIN_ROLE",
    "inputs": [],
    "outputs": [
      { "name": "", "type": "bytes32", "internalType": "bytes32" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "DISTRIBUTOR_ROLE",
    "inputs": [],
    "outputs": [
      { "name": "", "type": "bytes32", "internalType": "bytes32" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "JEWEL_FACTORY_ROLE",
    "inputs": [],
    "outputs": [
      { "name": "", "type": "bytes32", "internalType": "bytes32" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "RAW_MINERAL_ROLE",
    "inputs": [],
    "outputs": [
      { "name": "", "type": "bytes32", "internalType": "bytes32" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "STORE_ROLE",
    "inputs": [],
    "outputs": [
      { "name": "", "type": "bytes32", "internalType": "bytes32" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "checkUserRole",
    "inputs": [
      {
        "name": "_userAddress",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_role",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "createUser",
    "inputs": [
      {
        "name": "_userAddress",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "_role",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      { "name": "_name", "type": "string", "internalType": "string" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "deleteUser",
    "inputs": [
      {
        "name": "_userAddress",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getListUsers",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct IUserJewelChain.User[]",
        "components": [
          {
            "name": "user",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "role",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "isActive",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getRoleAdmin",
    "inputs": [
      { "name": "role", "type": "bytes32", "internalType": "bytes32" }
    ],
    "outputs": [
      { "name": "", "type": "bytes32", "internalType": "bytes32" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getRoleUser",
    "inputs": [
      {
        "name": "_userAddress",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      { "name": "", "type": "bytes32", "internalType": "bytes32" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getUser",
    "inputs": [
      {
        "name": "_userAddress",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct IUserJewelChain.User",
        "components": [
          {
            "name": "user",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "role",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "isActive",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getUsersByRole",
    "inputs": [
      { "name": "role", "type": "bytes32", "internalType": "bytes32" }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple[]",
        "internalType": "struct IUserJewelChain.User[]",
        "components": [
          {
            "name": "user",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "role",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "isActive",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "grantRole",
    "inputs": [
      {
        "name": "role",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "account",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "hasRole",
    "inputs": [
      {
        "name": "role",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "account",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "loginUser",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct IUserJewelChain.User",
        "components": [
          {
            "name": "user",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "role",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "isActive",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "name",
            "type": "string",
            "internalType": "string"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [
      { "name": "", "type": "address", "internalType": "address" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "renounceOwnership",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "renounceRole",
    "inputs": [
      {
        "name": "role",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "callerConfirmation",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "revokeRole",
    "inputs": [
      {
        "name": "role",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "account",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "supportsInterface",
    "inputs": [
      {
        "name": "interfaceId",
        "type": "bytes4",
        "internalType": "bytes4"
      }
    ],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "transferOwnership",
    "inputs": [
      {
        "name": "newOwner",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateStatusUser",
    "inputs": [
      {
        "name": "_userAddress",
        "type": "address",
        "internalType": "address"
      },
      { "name": "_isActive", "type": "bool", "internalType": "bool" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "OwnershipTransferred",
    "inputs": [
      {
        "name": "previousOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "newOwner",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "RoleAdminChanged",
    "inputs": [
      {
        "name": "role",
        "type": "bytes32",
        "indexed": true,
        "internalType": "bytes32"
      },
      {
        "name": "previousAdminRole",
        "type": "bytes32",
        "indexed": true,
        "internalType": "bytes32"
      },
      {
        "name": "newAdminRole",
        "type": "bytes32",
        "indexed": true,
        "internalType": "bytes32"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "RoleGranted",
    "inputs": [
      {
        "name": "role",
        "type": "bytes32",
        "indexed": true,
        "internalType": "bytes32"
      },
      {
        "name": "account",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "sender",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "RoleRevoked",
    "inputs": [
      {
        "name": "role",
        "type": "bytes32",
        "indexed": true,
        "internalType": "bytes32"
      },
      {
        "name": "account",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "sender",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "UsersJewelsChain__UserCreated",
    "inputs": [
      {
        "name": "_user",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "role",
        "type": "bytes32",
        "indexed": false,
        "internalType": "bytes32"
      },
      {
        "name": "isActive",
        "type": "bool",
        "indexed": false,
        "internalType": "bool"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "UsersJewelsChain__UserDeleted",
    "inputs": [
      {
        "name": "_user",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "UsersJewelsChain__UserUpdatedStatus",
    "inputs": [
      {
        "name": "_user",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "isActive",
        "type": "bool",
        "indexed": false,
        "internalType": "bool"
      }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "AccessControlBadConfirmation",
    "inputs": []
  },
  {
    "type": "error",
    "name": "AccessControlUnauthorizedAccount",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "neededRole",
        "type": "bytes32",
        "internalType": "bytes32"
      }
    ]
  },
  {
    "type": "error",
    "name": "OwnableInvalidOwner",
    "inputs": [
      {
        "name": "owner",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "OwnableUnauthorizedAccount",
    "inputs": [
      {
        "name": "account",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "UsersJewelsChain__UserExisted",
    "inputs": [
      {
        "name": "userAddress",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "UsersJewelsChain__UserHasSameStatus",
    "inputs": [
      {
        "name": "userAddress",
        "type": "address",
        "internalType": "address"
      },
      { "name": "isActive", "type": "bool", "internalType": "bool" }
    ]
  },
  {
    "type": "error",
    "name": "UsersJewelsChain__UserInvalidAddress",
    "inputs": [
      {
        "name": "userAddress",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "UsersJewelsChain__UserInvalidRole",
    "inputs": [
      {
        "name": "userAddress",
        "type": "address",
        "internalType": "address"
      },
      { "name": "role", "type": "bytes32", "internalType": "bytes32" }
    ]
  },
  {
    "type": "error",
    "name": "UsersJewelsChain__UserIsNotActive",
    "inputs": [
      {
        "name": "userAddress",
        "type": "address",
        "internalType": "address"
      }
    ]
  },
  {
    "type": "error",
    "name": "UsersJewelsChain__UserNotFound",
    "inputs": [
      {
        "name": "userAddress",
        "type": "address",
        "internalType": "address"
      }
    ]
  }
];