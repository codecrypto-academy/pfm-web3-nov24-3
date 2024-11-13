export const USER_ABI = [
  {
    type: 'function',
    name: 'createUser',
    inputs: [
      {
        name: '_userAddress',
        type: 'address',
        internalType: 'address',
      },
      { name: '_role', type: 'bytes32', internalType: 'bytes32' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'deleteUser',
    inputs: [
      { name: '_userAddress', type: 'address', internalType: 'address' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getListUsers',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'tuple[]',
        internalType: 'struct IUserJewelChain.User[]',
        components: [
          { name: 'user', type: 'address', internalType: 'address' },
          { name: 'role', type: 'bytes32', internalType: 'bytes32' },
          { name: 'isActive', type: 'bool', internalType: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getUser',
    inputs: [
      { name: '_userAddress', type: 'address', internalType: 'address' },
    ],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct IUserJewelChain.User',
        components: [
          { name: 'user', type: 'address', internalType: 'address' },
          { name: 'role', type: 'bytes32', internalType: 'bytes32' },
          { name: 'isActive', type: 'bool', internalType: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'updateStatusUser',
    inputs: [
      {
        name: '_userAddress',
        type: 'address',
        internalType: 'address',
      },
      { name: '_isActive', type: 'bool', internalType: 'bool' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'UsersJewelsChain__UserCreated',
    inputs: [
      {
        name: '_user',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'role',
        type: 'bytes32',
        indexed: false,
        internalType: 'bytes32',
      },
      {
        name: 'isActive',
        type: 'bool',
        indexed: false,
        internalType: 'bool',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'UsersJewelsChain__UserDeleted',
    inputs: [
      {
        name: '_user',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'UsersJewelsChain__UserUpdatedStatus',
    inputs: [
      {
        name: '_user',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'isActive',
        type: 'bool',
        indexed: false,
        internalType: 'bool',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'UsersJewelsChain__UserExisted',
    inputs: [{ name: 'user', type: 'address', internalType: 'address' }],
  },
  {
    type: 'error',
    name: 'UsersJewelsChain__UserHasSameStatus',
    inputs: [
      { name: 'user', type: 'address', internalType: 'address' },
      { name: 'isActive', type: 'bool', internalType: 'bool' },
    ],
  },
  {
    type: 'error',
    name: 'UsersJewelsChain__UserInvalidRole',
    inputs: [
      { name: 'userAddress', type: 'address', internalType: 'address' },
      { name: 'role', type: 'bytes32', internalType: 'bytes32' },
    ],
  },
  {
    type: 'error',
    name: 'UsersJewelsChain__UserNotFound',
    inputs: [{ name: 'user', type: 'address', internalType: 'address' }],
  },
];
