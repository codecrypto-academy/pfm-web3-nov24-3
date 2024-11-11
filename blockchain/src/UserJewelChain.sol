// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.27;

import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';

contract UserJewelChain is Ownable {
  enum UserRole {
    RawMineral,
    JewelFactory,
    Distributor,
    Store
  }

  struct User {
    address user;
    UserRole role;
    bool isActive;
  }

  mapping(address => uint256) private _usersMapping;
  User[] private _usersArray;

  /**
    Events
    */
  event UsersJewelsChain__UserCreated(
    address indexed _user,
    UserRole role,
    bool isActive
  );

  /**
    Errors
    */
  error UsersJewelsChain__UserExisted(address user);

  constructor() Ownable(msg.sender) {}

  /**
   * @notice create a new user by Owner
   * @param _userAddress the address of new user
   * @param _role the role of new user
   */
  function createUser(address _userAddress, UserRole _role) public onlyOwner {
    if (_usersMapping[_userAddress] != 0) {
      revert UsersJewelsChain__UserExisted(_userAddress);
    }

    User memory _user = User({user: _userAddress, role: _role, isActive: true});

    _usersMapping[_userAddress] += 1;
    _usersArray.push(_user);

    emit UsersJewelsChain__UserCreated(_userAddress, _role, true);
  }
}
