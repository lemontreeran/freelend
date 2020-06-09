pragma solidity >=0.5.0 <0.6.1;

import './LendingDAO.sol';


contract LendingManager {
	uint group_number;
	mapping(uint => LendingDAO) groups;

	function createGroup(string memory name) public {
		LendingDAO new_group = new LendingDAO(name, msg.sender);
		group_number += 1;
		groups[group_number] = new_group;
	}

  function getGroupNum() public
    returns (uint)
  {
    return group_number;
  }

  function getGroup(uint id) public
    returns (LendingDAO)
  {
    return groups[id];
  }

}
