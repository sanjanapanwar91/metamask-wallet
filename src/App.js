import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [walletAddress, setWalletAddress] = useState(""); 

  useEffect(()=>{
    getCurrentWalletConnected();
    addWalletListener();
  })

  const connectWallet=async() => { 
    if(typeof window !='undefined' && typeof window.ethereum !="undefined"){
      try{
        //metamask is installed
          const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
      }catch(err){
        console.error(err.message);
      }
    }else{
      //metamask is not installed
      console.log("please install metamask")
    }
  }


  const getCurrentWalletConnected=async() => { 
    if(typeof window !='undefined' && typeof window.ethereum !="undefined"){
      try{
        
          const accounts = await window.ethereum.request({
            method: "eth_accounts"});
            if(accounts.length >0){
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
            }else{
              console.log("connect to metamask using the connect button")
            }
      }catch(err){
        console.error(err.message);
      }
    }else{
      //metamask is not installed
      console.log("please install metamask")
    }
  }

  const addWalletListener=async() => { 
    if(typeof window !='undefined' && typeof window.ethereum !="undefined"){
      window.ethereum.on('accountsChanged',(accounts)=>{
        setWalletAddress(accounts[0]);
        console.log(accounts[0])
      })
    }else{
      //metamask is not installed
      setWalletAddress("")
      console.log("please install metamask")
    }
  }

  const switchnetwork=async()=>{
    if (typeof window.ethereum !== 'undefined') {
      const ethereum = window.ethereum;
    
      // Request access to the user's Metamask account
      ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(() => {
          // Check if the current network is Ethereum
          if (ethereum.networkVersion === '1') {
            // Switch to Polygon network
            ethereum
              .request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x89' }], // Polygon network chain ID
              })
              .then(() => {
                console.log('Switched to Polygon network');
              })
              .catch((error) => {
                // Handle error
                console.error('Error switching to Polygon network:', error);
              });
          } else if (ethereum.networkVersion === '137') {
            // Switch to Ethereum network
            ethereum
              .request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x1' }], // Ethereum network chain ID
              })
              .then(() => {
                console.log('Switched to Ethereum network');
              })
              .catch((error) => {
                // Handle error
                console.error('Error switching to Ethereum network:', error);
              });
          } else {
            // Unsupported network
            console.error('Unsupported network');
          }
        })
        .catch((error) => {
          console.error('Error requesting accounts:', error);
        });
    } else {
      console.error('Metamask not detected');
    }
  }
  

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <h1 className="navbar-item is-size-4">Ocean Token (OCT)</h1>
          </div>
          <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-end is-align-items-center">
              <button
                className="button is-white connect-wallet"
                onClick={connectWallet}>
                <span className="is-link has-text-weight-bold">
                  {walletAddress && walletAddress.length > 0 ? `Connected: ${walletAddress.substring(0,6)}....${walletAddress.substring(38)}`:"connect wallet"}
                </span>
              </button>
            </div>
            <div>
            <button
            className="button is-white swicth-wallet" 
            style={{"margin-left": "15px",
            "margin-top": "6px"}}
         onClick={switchnetwork}>switch</button>
            </div>
          </div>
          
          
        </div>
        </nav>
        
      
      <section className="hero is-fullheight">
        <div className="faucet-hero-body">
          <div className="container has-text-centered main-content">
            <h1 className="title is-1">Faucet</h1>
            <p>Fast and reliable. 50 OCT/day.</p>
            <div className="box address-box">
              <div className="columns">
                <div className="column is-four-fifths">
                  <input
                    className="input is-medium"
                    type="text"
                    placeholder="Enter your wallet address (0x...)"
                  />
                </div>
                <div className="column">
                  <button className="button is-link is-medium">
                    GET TOKENS
                  </button>
                </div>
              </div>
              <article className="panel is-grey-darker">
                <p className="panel-heading">Transaction Data</p>
                <div className="panel-block">
                  <p>transaction data</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
