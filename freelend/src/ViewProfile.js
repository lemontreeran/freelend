import React, { Component } from "react";
import {
  Route,
  NavLink,
} from "react-router-dom";
import { LENDING_DAO_ABI, LENDING_DAO_MANAGER_ABI, LENDING_DAO_ADDRESS } from "./config";
import ViewDAO from "./ViewDAO"
import logo from './part_logo.png';
import * as hash from 'hash-sdk';

const LENDING_DAO_MANAGER_ABI_GETNUMDAOS = LENDING_DAO_MANAGER_ABI.filter(function (el) {
  return (el.name === 'getDAONum')
});

const LENDING_DAO_MANAGER_ABI_GETDAO = LENDING_DAO_MANAGER_ABI.filter(function (el) {
  return (el.name === 'getDAO')
});

const LENDING_DAO_MANAGER_ABI_GETDAONAME = LENDING_DAO_MANAGER_ABI.filter(function (el) {
  return (el.name === 'getDAOName')
});

const LENDING_DAO_ABI_MEMBERINDAO = LENDING_DAO_ABI.filter(function (el) {
  return (el.name === 'memberInDAO')
});

const LENDING_DAO_ABI_GETBALANCE = LENDING_DAO_ABI.filter(function (el) {
  return (el.name === 'getBalance')
});

console.log(LENDING_DAO_MANAGER_ABI_GETNUMDAOS);

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daos: [],
      totalBalance : 0
    };
  }

  componentWillMount() {
    let _this = this;
    _this.setDAOs()
  }

  setDAOs = async () => {
    const LENDING_DAO_MANAGER_ABI_GETNUMDAOS_DATA = {
      contractid: this.props.lendingDAOManagerAddress,
      memo: "Get number of DAOs",
      params: "[]",
      paymentserver: "https://mps.hash.ngsystems.com",
      abi: LENDING_DAO_MANAGER_ABI_GETNUMDAOS,
      // amount: 0
    }

    await hash.triggerSmartContract(LENDING_DAO_MANAGER_ABI_GETNUMDAOS_DATA)
      .then(res => {
        if (Array.isArray(res.result) && res.result.length === 0) {
          this.setState({ numLendingDAOs : 0 })
        } else {
          const numLendingDAOs = res.result.toString()
          this.setState({ numLendingDAOs : res.result.toString() })
          // console.log("++++++++++", res.result.toString())
        }
      })

    for (let id = 1; id <= this.state.numLendingDAOs; id++) {

      const LENDING_DAO_MANAGER_ABI_GETDAONAME_DATA = {
        contractid: this.props.lendingDAOManagerAddress,
        memo: "Get DAOName",
        params: `[${id}]`,
        paymentserver: "https://mps.hash.ngsystems.com",
        abi: LENDING_DAO_MANAGER_ABI_GETDAONAME,
        // amount: 0
      }

      await hash.triggerSmartContract(LENDING_DAO_MANAGER_ABI_GETDAONAME_DATA)
        .then(res => {
          // console.log("++++++++++", res.result.toString())

          const daoName = res.result.toString()
          this.setState({ daoName : daoName })
        })

      const LENDING_DAO_MANAGER_ABI_GETDAO_DATA = {
        contractid: this.props.lendingDAOManagerAddress,
        memo: "Get DAO",
        params: `[${id}]`,
        paymentserver: "https://mps.hash.ngsystems.com",
        abi: LENDING_DAO_MANAGER_ABI_GETDAO,
        // amount: 0
      }

      await hash.triggerSmartContract(LENDING_DAO_MANAGER_ABI_GETDAO_DATA)
        .then(res => {
          // console.log("++++++++++", res.result.toString())

          const dao = res.result.toString()
          this.setState({ dao : dao })
        })

      console.log("++++dao++++++", this.state.dao)

      await this.inDAO(this.state.dao)
      await this.checkBalance(this.state.daoName)
    }

  }

  inDAO = async (dao) => {
    const LENDING_DAO_ABI_MEMBERINDAO_DATA = {
      contractid: LENDING_DAO_ADDRESS,
      memo: "Get Member in DAO",
      params: `["${this.props.account}"]`,
      paymentserver: "https://mps.hash.ngsystems.com",
      abi: LENDING_DAO_ABI_MEMBERINDAO,
      // amount: 0
    }

    // console.log("++++++++++", this.props.account)
    let resp = await hash.triggerSmartContract(LENDING_DAO_ABI_MEMBERINDAO_DATA, (err, res) => {
      if (Array.isArray(res.result) && res.result.length === 0) {
        this.setState({ memberInDAO :  true })
      } else {
        const memberInDAO = res.result.toString()
        this.setState({ memberInDAO :  res.result.toString() })
      }
      console.log('SUCCESS CONTRACT_CALL cb:::', res.result.toString());
      console.log('numLendingDAOs state value is:::', this.state.memberInDAO);
      console.log('ERROR CONTRACT_CALL cb:::', err);
    })

    console.log("++++++++++", resp)

    return this.state.memberInDAO
  }

  checkBalance = async (daoName) => {
    const dao = this.state.dao
    console.log("+++++inDAO+++++", this.state.memberInDAO)
    if (this.state.memberInDAO) {
      console.log('SUCCESS GET DAO:::', this.state.dao);
      const LENDING_DAO_ABI_GETBALANCE_DATA = {
        contractid: LENDING_DAO_ADDRESS,
        memo: "Get Balance",
        params: `["${this.state.dao}"]`,
        paymentserver: "https://mps.hash.ngsystems.com",
        abi: LENDING_DAO_ABI_GETBALANCE,
        // amount: 0
      }

      await hash.triggerSmartContract(LENDING_DAO_ABI_GETBALANCE_DATA)
        .then(res => {
          const _balance = res.result.toString()
          this.setState({ balance : _balance })
        })

      const dao = {};
      dao["name"] = daoName
      dao["balance"]= this.state.balance
      const prevDaos = this.state.daos
      this.setState({daos : [...prevDaos, dao]})
      console.log("++++++++++", this.props.daos)

    }
  }

  render() {
    return (
      <div>
        <div id="profile">
          <div id="background"></div>
          <div id="mainBoxes">
            <div id="daoBox">
              <div className="sub-header" style={{width:"8em",marginBottom:"10px",fontSize:"6vmin"}}><b>Lending Groups</b></div>
              <div>
                {this.state.daos.map(function(dao, idx){
                return (
                  <div key={idx}>
                    <NavLink className="dao" to={`/dao/${dao._address}`}>{ dao.name }</NavLink>
                  </div>
                )})}
              </div>
            </div>
            <div id="balanceBoxes"> 
              <div id="balanceBox">
                <div className="sub-header" style={{width:"8em",marginBottom:"10px",fontSize:"6vmin"}}><b>Balances</b></div>
                <div>
                  {this.state.daos.map(function(dao, idx){
                  return (
                    <div key={idx}>
                      <div className="balance">{ dao.name } - {dao.balance.toString()}</div>
                    </div>
                  )})}
                </div>
              </div>
              <div id="totalBalance">
                <div className="sub-header" style={{fontSize:"4vmin"}}><b>Total Balance: </b> {this.state.totalBalance} </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
