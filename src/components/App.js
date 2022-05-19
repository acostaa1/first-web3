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
  async componentDidMount() {
    const url = "https://mainnet.infura.io/v3/dea555b34aa54edcacb263a506a82880";
    const web3 = new Web3(url);

    //latest block on the chain
    const latestBlock = await web3.eth.getBlock("latest");

    //current gas price
    const gasPrice = await web3.eth.getGasPrice();

    //latest 10 blocks
    const latestBlocks = [];
    for (let i = 0; i < 10; i++) {
      let block = await web3.eth.getBlock(latestBlock.number - i);
      latestBlocks.push(block);
    }
    this.setState({
      blockNumber: latestBlock.number,
      difficulty: latestBlock.difficulty,
      gasPrice: gasPrice,
      latestBlocks: latestBlocks,
    });

    console.log(latestBlock);
    console.log(latestBlocks);
  }

  render() {
    const { blockNumber, difficulty, gasPrice, latestBlocks } = this.state;
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
              <div
                className="content mr-auto ml-auto"
                style={{ width: "700px" }}
              >
                <h5>Etherium Blockchain Explorer</h5>
                <div className="row">
                  <div className="col-4 ">
                    <div className="bg-light pt-4 pb-3 m-1">
                      <h5>Latest Block</h5>
                      <p>{blockNumber}</p>
                    </div>
                  </div>

                  <div className="col-4 auto ">
                    <div className="bg-light pt-4 pb-3 m-1">
                      <h5>Current Difficulty</h5>
                      <p>{difficulty}</p>
                    </div>
                  </div>

                  <div className="col-4 ">
                    <div className="bg-light pt-4 pb-3 m-1">
                      <h5>Gas Price</h5>
                      <p>{gasPrice} </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 mt-3">
                    <div className="card">
                      <div className="card-header">
                        <h5>Latest Blocks</h5>
                      </div>
                      <div className="card-body">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">Block #</th>
                              <th scope="col">Hash</th>
                              <th scope="col">Miner Address</th>
                              <th scope="col">Timestamp</th>
                            </tr>
                          </thead>
                          <tbody>
                            {latestBlocks.map((block, idx) => {
                              return (
                                <tr key={idx}>
                                  <td>{block.number}</td>
                                  <td>{block.hash.substring(0, 10)}...</td>
                                  <td>{block.miner.substring(0, 10)}...</td>
                                  <td>
                                    {new Date(
                                      block.timestamp * 1000
                                    ).toString()}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
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
