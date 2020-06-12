import React, { Component } from "react";
import * as hash from 'hash-sdk';
import { LENDING_DAO_MANAGER_ABI } from "./config";

const LENDING_DAO_MANAGER_ABI_CREATEDAO = LENDING_DAO_MANAGER_ABI.filter(function (el) {
  return (el.name === 'createDAO')
});

class CreateCircle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      DAOName: "",
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  async handleSubmit(event) {
    console.log("+++++++++++++", this.props.account)

    const LENDING_DAO_MANAGER_ABI_CREATEDAO_DATA = {
      contractid: this.props.lendingDAOManagerAddress,
      memo: "Create DAO",
      params: `["${this.state.DAOName}", "${this.state.username}"]`,
      paymentserver: "https://mps.hash.ngsystems.com",
      abi: LENDING_DAO_MANAGER_ABI_CREATEDAO,
      // amount: 0
    }

    this.setState({ loading: true })
    await hash.triggerSmartContract(LENDING_DAO_MANAGER_ABI_CREATEDAO_DATA)
      .then(res => {
        console.log("++++++++++", res.result.toString())
        this.setState({ loading: false })
      })

    event.preventDefault();
  }

  render() {
    return (
        <div style={{position:"relative"}} id="makeGroup">
        <div id="groupForm">
        <div className="sub-header"><b>Create a new lending DAO</b></div>
        <form onSubmit={this.handleSubmit}>
        <label>
        <input name="DAOName" type="text" placeholder="Group name..." value={this.state.DAOName} onChange={this.handleChange}/>
        </label>
        <br/>
        <label>
        <input name="username" type="text" placeholder="Your name..." value={this.state.username} onChange={this.handleChange}/>
        </label>
        <br/>
        <input id="submit" type="submit" value="Submit"/>
        </form>
        </div>
        </div>
    );  }
}

export default CreateCircle;
