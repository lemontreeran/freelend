import React, { Component } from "react";
import './App.css';

class ViewDAO extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: "",
      lendingGroup: null,
      requests: [],
      members: [],
      memAddresses: [],
      name: "",
      setGroupCalled: false,
      addRequestAmount: 0,
      requestAmounts: [],
      addMemberName: "",
      addMemberAddress: "",
      requestOptions: [],
      requestOption: null,
      loanAmount: 0
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
    this.handleAddMember = this.handleAddMember.bind(this);
    this.handleDonate = this.handleDonate.bind(this);
  }

  render() {
    return (
        <div>
        <nav className='navbar'></nav>
        </div>
    );
  }
}

export default ViewDAO;
