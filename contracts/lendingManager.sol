pragma solidity >=0.4.21 <0.6.1;

import './LendingContract.sol';


contract LendingManager {
	uint256 group_number;
	mapping(uint256 => address) groups;

	function createGroup(string memory name) {
		LendingDAO new_group = new LendingDAO(name, msg.sender);
		group_number += 1;
		groups[group_number] = new_group;
	}

  function getGroupNum() public
    returns (int)
  {
    return group_number;
  }

  function getGroup(int id) public
    returns (address)
  {
    return groups[id];
  }

}
