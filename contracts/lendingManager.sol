pragma solidity >=0.5.0 <0.6.1;

import './LendingDAO.sol';


contract LendingManager {
	uint DAONumber;
	mapping(uint => LendingDAO) DAOs;

  function createDAO(string memory DAOName, string memory ownerName) public {
    LendingDAO newDAO = new LendingDAO(DAOName, ownerName, msg.sender);
    DAONumber += 1;
    DAOs[DAONumber] = newDAO;
  }

  function getDAONum() public view
    returns (uint)
  {
    return DAONumber;
  }

  function getDAO(uint id) public view
    returns (LendingDAO)
  {
    return DAOs[id];
  }

  function getDAOName(uint id) public view
    returns (string memory) 
  {
    return DAOs[id].getDAOName();
  }
}
