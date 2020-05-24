pragma solidity >=0.4.21 <0.6.1;

contract LendingDAO{
  struct Request {
    uint256 requested;
    uint256 total_fulfilled;
  }

  struct Member {
    string name;
    int balance;
  }

  string name;
  address owner;
  address[] member_address;
  mapping (address => Member) members;
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
  function addMember (address _member_address, string memory name) public {
    member_address.push(_member_address);
    members[__member_address] = Member(name,0);
    balances[__member_address] = 0;
    requests[__member_address] = Request(0, 0);
  }

  function requestMoney (uint amount) public {
    require (requests[msg.sender].requested == 0,
             "You have already requested money");
    requests[msg.sender] = Request(amount * 1000, 0);
  }

  function giveMoney (address member) public payable {
    if ((requests[member].total_fulfilled + msg.value) >= requests[member].requested) {
      payOut(...);
    }

    requests[member].total_fulfilled += msg.value;
    members[msg.sender].balance += msg.value;
  }
}
