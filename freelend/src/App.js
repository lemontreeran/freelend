import React, { Component } from 'react';
import {
  Route,
  HashRouter,
  NavLink,
} from "react-router-dom";
import './App.css';
import Home from './Home';
import CreateCircle from './CreateCircle';
import * as hash from 'hash-sdk';
import { TokenData } from "./token-data";
import { LENDING_DAO_MANAGER_ABI, LENDING_DAO_MANAGER_ADDRESS } from './config'
import ViewProfile from './ViewProfile';
import ViewDAO from './ViewDAO';
import logo from './full_logo.png';

const LENDING_DAO_MANAGER_ABI_GETNUMDAOS = LENDING_DAO_MANAGER_ABI.filter(function (el) {
  return (el.name === 'getDAONum')
});
const LENDING_DAO_MANAGER_ABI_CREATEDAO = LENDING_DAO_MANAGER_ABI.filter(function (el) {
  return (el.name === 'createDAO')
});

console.log(LENDING_DAO_MANAGER_ABI_GETNUMDAOS);

class App extends Component {
  // componentDidMount() {
  //   this.loadBlockchainData()
  // }

  constructor(props) {
    super(props)
    this.state = { account: '' }
  }

  componentDidMount = () => {
    let _this = this;

    //CHECKING if hash is loaded
    var checkHashExist = setInterval(function () {
      if (window.hash) {
        _this.init();
        clearInterval(checkHashExist);
      }
    }, 300);
  }

  init = async () => {
    try {
      // await hash.setProvider("software");
      await hash.setProviderUI((err,res)=>{
        console.log('setProvider Response:::',res);
      });

      // const accountData = {
      //   accountId: process.env.ACCOUNT_ID /*<accountId(0.0.1234)>*/,
      //   network: "testnet" /*<mainnet | testnet>*/,
      //   keys: {
      //     privateKey: process.env.PRIV_KEY /*<aplphanumeric user privatekey>*/
      //   }
      // };
      // await hash.setAccount(accountData);

      await hash.setAccountUI((err,res)=>{
        console.log('setAccount Response:::',res);
      });

      let resp = await hash.triggerCheckBalance((err, res) => {
        console.log('SUCCESS ACCOUNT_INFO cb:::', res);
        console.log('ERROR ACCOUNT_INFO cb:::', err);
      });
      console.log('SUCCESS ACCOUNT_INFO:::', resp["currentAccount"]);
      // this.setState({ account: resp })
      this.setState({ account: resp["currentAccount"] })
      const lendingManager = null
      this.setState({ lendingManager })


      const LENDING_DAO_MANAGER_ABI_GETNUMDAOS_DATA = {
        contractid: LENDING_DAO_MANAGER_ADDRESS,
        memo: "Get number of DAOs",
        params: "[]",
        paymentserver: "https://mps.hash.ngsystems.com",
        abi: LENDING_DAO_MANAGER_ABI_GETNUMDAOS,
        // amount: 0
      }

      const LENDING_DAO_MANAGER_ABI_CREATEDAO_DATA = {
        contractid: LENDING_DAO_MANAGER_ADDRESS,
        memo: "Create DAO",
        params: "[]",
        paymentserver: "https://mps.hash.ngsystems.com",
        abi: LENDING_DAO_MANAGER_ABI_CREATEDAO,
        // amount: 0
      }

      await this.lendingManagerGetDAONum(LENDING_DAO_MANAGER_ABI_GETNUMDAOS_DATA)

      this.setState({ lendingManagerGetDAONumData: LENDING_DAO_MANAGER_ABI_GETNUMDAOS_DATA })
      this.setState({ lendingManagerCreateDAOData: LENDING_DAO_MANAGER_ABI_CREATEDAO_DATA })
      this.setState({ lendingDAOManagerAddress: LENDING_DAO_MANAGER_ADDRESS })
      

    } catch (e) {
        console.log("Error in intializing account:::", e);
        throw e;
    }
  }

  // setProvider = async() => {
  //   hash.setProviderUI((err,res)=>{
  //     console.log('Response:::',res);
  //   });
  // }

  // setAccount = async() => {
  //   hash.setAccountUI((err,res)=>{
  //     console.log('setAccount Response:::',res);
  //   });
  // }


  lendingManagerGetDAONum(data) {
    // const data = {
    //   contractid: LENDING_DAO_MANAGER_ADDRESS,
    //   memo: "Mange lending DAO",
    //   params: "[]",
    //   paymentserver: "https://mps.hash.ngsystems.com",
    //   abi: LENDING_DAO_MANAGER_ABI_GETNUMDAOS,
    //   // amount: 0
    // }

    let resp = hash.triggerSmartContract(data, (err, res) => {
      if (Array.isArray(res.result) && res.result.length === 0) {
        this.setState({ numLendingDAOs :  0})
      } else {
        const numLendingDAOs = res.result.toString()
        this.setState({ numLendingDAOs :  numLendingDAOs})
      }
      console.log('SUCCESS CONTRACT_CALL cb:::', res.result.toString());
      console.log('numLendingDAOs state value is:::', this.state.numLendingDAOs);
      console.log('ERROR CONTRACT_CALL cb:::', err);
    });
    console.log('SUCCESS CONTRACT_CALL:::', resp);
  }

  render() {
    return (
        <HashRouter>
        <head>
        <link href="https://fonts.googleapis.com/css?family=Arvo|Roboto&display=swap" rel="stylesheet"/>
        </head>
        <div>
          <div className="header" id="Header">
            <img src={logo} alt="Freelend" className="logo"/>
            <h1>Freelend</h1>
            <div className="navBar">
            <NavLink className="nav" to="/">Home</NavLink>
            <NavLink className="nav" to="/create-dao">Create DAO</NavLink>
            <NavLink className="nav" to="/profile">Profile</NavLink>
          </div>
        </div>
        <div className="content">
        <Route exact path="/" render={props =>
                                      <Home numLendingDAOs={this.state.numLendingDAOs} {...props} />
                                     }
        />
        <Route exact path="/create-dao" render={props =>
                                                <CreateCircle lendingDAOManagerAddress={this.state.lendingDAOManagerAddress} account={this.state.account} {...props} />
                                                  }
        />
        <Route exact path="/profile" render={props =>
                                             <ViewProfile lendingDAOManagerAddress={this.state.lendingDAOManagerAddress} account={this.state.account} {...props} />
                                            }
        />
        </div>
        </div>
        </HashRouter>
    );
  }

}

export default App;
