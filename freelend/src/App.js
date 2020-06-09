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

class App extends Component {
  // componentDidMount() {
  //   this.loadBlockchainData()
  // }

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
      this.setState({ account: resp })
      this.setState({ accountID: resp["currentAccount"] })
      const lendingManager = null
      this.setState({ lendingManager })
      let numLendingDAOs = []
      this.setState({ numLendingDAOs })

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

  constructor(props) {
    super(props)
    this.state = { account: '' }
  }

  render() {
    return (
        <HashRouter>
        <div>
        <h1>Freelend</h1>
        <ul className="header">
        <li><NavLink to="/home">Home</NavLink></li>
        <li><NavLink to="/create-circle">Create Circle</NavLink></li>
        </ul>
        <div className="content">
        <Route exact path="/home" render={props =>
                                          <Home numLendingDAOs={this.state.numLendingDAOs} {...props} />
                                         }
        />
        <Route exact path="/create-circle" render={props =>
                                                   <CreateCircle lendingManager={this.state.lendingManager} account={this.state.account} {...props} />
                                                  }
        />
        </div>
        </div>
        </HashRouter>
    );
  }

}

export default App;
