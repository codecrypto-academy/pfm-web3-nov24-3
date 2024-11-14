import { ethers } from 'ethers';
import 'dotenv/config';

const USER_ABI = [
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

const PROVIDER = new ethers.JsonRpcProvider(process.env.PROVIDER);

const ADDRESS_CONTRACT = '0x5F8ECBA1B80d012d217d2C23D24dE7adEBC21B0B';

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, PROVIDER);

const userJewelsContract = new ethers.Contract(
  ADDRESS_CONTRACT,
  USER_ABI,
  wallet,
);

const ROLE = 'RAW_MINERAL';
const rawMineralRole = ethers.solidityPackedKeccak256(['string'], [ROLE]);
console.log(rawMineralRole);

const interface_SC_User = new ethers.Interface(USER_ABI);

const mapRole = {
  [rawMineralRole]: ROLE,
};

const createUser = async () => {
  const addressNewUser = '0x88B8C9D2e08697B329a0a8a733885001056B9DC9';

  try {
    const tx = await userJewelsContract.createUser(
      addressNewUser,
      rawMineralRole,
    );
    console.log('tx', tx);
  } catch (err) {
    console.log('err', err);

    console.log('data_error', err.info.error.data);
    const revertData = err.info.error.data;
    const decodedError = interface_SC_User.parseError(revertData);
    console.log('Decode__Error:', decodedError);

    console.log('data', err.transaction.data);
    const data = err.transaction.data;
    const decodedData = interface_SC_User.getFunctionName('0x141fb940');
    console.log('Decode__Data:', decodedData);
    console.log('----------------------------');
  }
};

const getListUsers = async () => {
  try {
    const userList = await userJewelsContract.getListUsers();
    console.log('userList', userList);
    const mappedUserList = userList.map((user) => {
      return {
        address: user[0],
        role: mapRole[user[1]],
        isActive: user[2],
      };
    });
    console.log('mappedUserList', mappedUserList);
  } catch (err) {
    console.error('no funciona', err);
  }
};

await createUser();
await getListUsers();
