pragma solidity >=0.4.21 <0.6.1;

contract LendingDAO{
  struct Request {
    uint256 requested;
    uint256 total_fulfilled;
  }

  address[] members;
  string name;
  address owner;
  mapping (address => int) balances;
  mapping (address => Request) requests;

  event newRequest (
    uint256 amount
  );

  constructor(string memory _name, address _owner) public {
    name = _name;
    owner = _owner;
  }

  function addMember (address member) public {
    members.add(member);
    balances[member] = 0;
    requests[member] = Request(0, 0);
  }

  function requestMoney ()
}
