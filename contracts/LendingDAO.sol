pragma solidity >=0.5.0 <0.6.1;

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
  address[] memberAddress;
  mapping (address => Member) members;
  mapping (address => Request) requests;

  event newRequest (
    uint256 amount
  );

  constructor(string memory _name, address _owner) public {
    name = _name;
    owner = _owner;
  }

  function addMember (address _memberAddress, string memory _name,
                      string memory phoneNumber, string memory physAddress) public {
    memberAddress.push(_memberAddress);
    members[_memberAddress] = Member(_name, 0);
    requests[_memberAddress] = Request(0, 0);
  }

  function requestMoney (uint amount) public {
    require (requests[msg.sender].requested == 0,
             "You have already requested money");
    requests[msg.sender] = Request(amount * 1000, 0);
  }

  function giveMoney (address member) public payable {
    address payable memberPayable = address (uint160(member));
    if ((requests[member].total_fulfilled + msg.value) >= requests[member].requested) {
      payOut(memberPayable);
    }

    requests[member].total_fulfilled += msg.value;
    members[msg.sender].balance += int256(msg.value);
  }

  function payOut (address payable member) private {
    member.transfer((requests[member].requested) / 1000);
  }
}
