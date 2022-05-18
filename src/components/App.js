import React, { Component } from "react";
import "./App.css";
import Web3 from "web3";

class App extends Component {
  constructor() {
    super();
    this.state = {
      blockNumber: 0,
      difficulty: 0,
      gasPrice: 0,
      latestBlocks: [],
    };
  }
  async componentWillMount() {
    const url = "https://mainnet.infura.io/v3/dea555b34aa54edcacb263a506a82880";
    const web3 = new Web3(url);

    const latestBlock = await web3.eth.getBlock("latest");

    const gasPrice = await web3.eth.getGasPrice();

    this.setState({
      blockNumber: latestBlock.number,
      difficulty: latestBlock.difficulty,
      gasPrice: gasPrice,
    });
    console.log(latestBlock);
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <div className="navbar-brand col-sm-3 col-md-2 mr-0">
            Live Etherium Blockchain Data
          </div>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h5>Etherium Blockchain Explorer</h5>
                <div className="row">
                  <div className = "col-4 ">
                    <div className= "bg-light"></div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
