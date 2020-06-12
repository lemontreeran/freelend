class Request {
  constructor(requester, requesterAddress, amount, filled) {
    this.requester = requester
    this.requesterAddress = requesterAddress
    this.amountRequested = amount
    this.amountFullfilled = filled
  }

  toString() {
    return "Requestor: " + this.requester + ", Amount requested: " + this.amountRequested.toString() +
      ", Amount Received: " + this.amountFullfilled.toString()
  }
}
export default Request;
