import './Request';
class Member {
  
  constructor(_name, _balance, _request) {
    this.name = _name;
    this.balance = _balance;
    this.request = _request;
  }

  toString() {
    return (this.name + '\'s balance: ' + this.balance.toString());
  }
}

export default Member;
