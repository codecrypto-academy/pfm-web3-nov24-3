// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import {AccessControl} from '@openzeppelin/contracts/access/AccessControl.sol';
import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';
import {UserConstant} from './UserConstant.sol';
import {IUserJewelChain} from './IUserJewelChain.sol';

contract UserJewelChain is
  IUserJewelChain,
  Ownable,
  AccessControl,
  UserConstant
{
  mapping(address => uint256) private _usersMapping;
  User[] private _usersArray;
  mapping(bytes32 => bool) private _allowedRoles;

  /**
   * Modifiers
   */
  modifier checkIfUserExist(address _userAddress) {
    if (_usersMapping[_userAddress] == 0) {
      revert UsersJewelsChain__UserNotFound(_userAddress);
    }
    _;
  }

  constructor() Ownable(msg.sender) {
    _grantRole(ADMIN_ROLE, msg.sender);
    _allowedRoles[ADMIN_ROLE] = true;
    _allowedRoles[RAW_MINERAL_ROLE] = true;
    _allowedRoles[JEWEL_FACTORY_ROLE] = true;
    _allowedRoles[DISTRIBUTOR_ROLE] = true;
    _allowedRoles[STORE_ROLE] = true;
  }

  /**
   * @notice create a new user by Owner
   * @param _userAddress the address of new user
   * @param _role the role of new user
   */
  function createUser(
    address _userAddress,
    bytes32 _role
  ) external override onlyOwner {
    if (_usersMapping[_userAddress] != 0) {
      revert UsersJewelsChain__UserExisted(_userAddress);
    }

    if (!_allowedRoles[_role]) {
      revert UsersJewelsChain__UserInvalidRole(_userAddress, _role);
    }

    User memory _user = User({user: _userAddress, role: _role, isActive: true});

    _usersArray.push(_user);
    _usersMapping[_userAddress] = _usersArray.length;
    _grantRole(_role, _userAddress);

    emit UsersJewelsChain__UserCreated(_userAddress, _role, true);
  }

  /**
   * @notice update the status of a user
   * @param _userAddress the address of user
   * @param _isActive the new status of the user
   */
  function updateStatusUser(
    address _userAddress,
    bool _isActive
  ) external override onlyOwner checkIfUserExist(_userAddress) {
    uint256 _index = _usersMapping[_userAddress];
    User memory _user = _usersArray[_index - 1];

    if (_user.isActive == _isActive) {
      revert UsersJewelsChain__UserHasSameStatus(_userAddress, _isActive);
    }

    _user.isActive = _isActive;
    _usersArray[_index - 1] = _user;

    emit UsersJewelsChain__UserUpdatedStatus(_userAddress, _isActive);
  }

  /**
   * @notice delete a user by Owner
   * @param _userAddress the address of user
   */
  function deleteUser(
    address _userAddress
  ) external override onlyOwner checkIfUserExist(_userAddress) {
    uint256 _index = _usersMapping[_userAddress];

    // swap the last user to the deleted and remove it from array
    _usersArray[_index - 1] = _usersArray[_usersArray.length - 1];
    _usersArray.pop();

    delete _usersMapping[_userAddress];
    emit UsersJewelsChain__UserDeleted(_userAddress);
  }

  /**
   * @dev NOTE: this function is not efficient.
   * @notice get list of users
   */
  function getListUsers() external view onlyOwner returns (User[] memory) {
    return _usersArray;
  }

  /**
   * @notice get a user by address
   */
  function getUser(
    address _userAddress
  ) external view onlyOwner returns (User memory) {
    return _getUser(_userAddress);
  }

  /**
   * Private functions
   */

  function _getUser(
    address _userAddress
  ) private view checkIfUserExist(_userAddress) returns (User memory) {
    uint256 _index = _usersMapping[_userAddress];
    return _usersArray[_index - 1];
  }
}
