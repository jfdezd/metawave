import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import { ethers } from "ethers";
import abi from "./utils/WavePortal.json";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  const onSubmit = (d) => alert(JSON.stringify(d));
  /*
   * All state property to store all waves
   */
  const [allWaves, setAllWaves] = useState([]);
  const contractAddress = "0x1f3C84F9dd32C24a74C7bb901Bde14E7bF0201f9";
  // 0xF122dec14280b48baD9697B897005b2f3517C7CA";
  const contractABI = abi.abi;
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        getAllWaves();
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  
  /*
   * Create a method that gets all waves from your contract
   */
  const getAllWaves = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        /*
         * Call the getAllWaves method from your Smart Contract
         */
        const waves = await wavePortalContract.getAllWaves();


        /*
         * We only need address, timestamp, and message in our UI so let's
         * pick those out
         */
        let wavesCleaned = [];
        waves.forEach(wave => {
          wavesCleaned.push({
            address: wave.waver,
            dateFrom: new Date(wave.dateFrom * 1000),
            dateTo: new Date(wave.dateTo * 1000),
            title: wave.title,
            company: wave.company,
            country: wave.country,
            description: wave.description,
            timestamp: new Date(wave.timestamp * 1000)
          });
        });

        /*
         * Store our data in React State
         */
        setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());

        /*
        * Execute the actual wave from your smart contract
        */
        // const waveTxn3 = await wavePortalContract.wave(1230940800,1357084000,"Developer, Analyst & Designer","everis(NTTData)","Spain","Different roles for the Ministry of Science and innovation in several projects. Starting as a developer and managing teams of 6-8 people.");
        // console.log("Mining...", waveTxn3.hash);
        // await waveTxn3.wait(); // Wait for the transaction to be mined
        // console.log("Mined -- ", waveTxn3.hash);

     
        // const waveTxn = await wavePortalContract.wave(1357084800,1546300000,"Project MAnager Foreign Trade System","everis(NTTData)","Chile","Responsible for the Integrated Foreign Trade System (SICEX). Design and development of the complete solution, with technological updates, architecture migration, Datacenter migration, definition of new modules including Port Community Systems (PCS).");
        // console.log("Mining...", waveTxn.hash);
        // await waveTxn.wait(); // Wait for the transaction to be mined
        // console.log("Mined -- ", waveTxn.hash);

        // const waveTxn2 = await wavePortalContract.wave(1546300800,1609372000,"Data & Analytics Public Sector Manager","everis(NTTData)","Spain","Digital Government Institute Manager. Responsible of Data & Analytic unit.  Responsible for a specialized team of around twenty people with an annual revenue of more than one million euros.  Multidisciplinary team with data engineers, scientists, big data and cloud architects and specialists in visualization tools DGI consolidates the capacities for the Public Sector in emerging technologies and builds a specific value offer that serves as a differential commercial element and also as a framework for the rest of the industries.");
        // console.log("Mining...", waveTxn2.hash);
        // await waveTxn2.wait(); // Wait for the transaction to be mined
        // console.log("Mined -- ", waveTxn2.hash);
     
        // const waveTxn5 = await wavePortalContract.wave(1546300800,1609372000,"Digital Project Manager","everis(NTTData)","Spain","Datalaia allows the users to observe, capture and organize the data of the Public Administrations and citizens so that they offer value, very truthful information for decision-making and / or its integration into management systems with a detailed and efficient vision. An open data platform collecting from different sources, with Artificial Intelligence capabilities that integrate and process data of interest to the public administration and citizens so they can be visualized and interpreted for common good and for evidence-based decision-making and creating a data-driven culture.");
        // console.log("Mining...", waveTxn5.hash);
        // await waveTxn5.wait(); // Wait for the transaction to be mined
        // console.log("Mined -- ", waveTxn5.hash);
     
        // const waveTxn4 = await wavePortalContract.wave(1609372800,1640908000,"IT&Telco Category MAnager","Aquanima (Grupo Santander)","Spain","Procurement Global IT & Telco Category Manager, ");
        // console.log("Mining...", waveTxn4.hash);
        // await waveTxn4.wait(); // Wait for the transaction to be mined
        // console.log("Mined -- ", waveTxn4.hash);


        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div className="mainContainer">
              <h3>Javier Fernández</h3>
        <div className="header">
        </div>
        <div className="bio">
        Profesional Experience
        </div>
        <div className="bio">
        {allWaves.map((wave, index) => {
          return (
            <div key={index} className="card">
              <div className="card-header">
              <div>{wave.title}</div>
                
              </div>
              <div className="card-body">
                <p className="card-text">{wave.company}</p>
                <p className="card-text">{wave.country}</p>
                <p className="card-text">{wave.description}</p>
              </div>
              <div className="card-footer small">From: {wave.dateFrom.toString()}</div>
              <div className="card-footer small">To: {wave.dateTo.toString()}</div>
            </div>)
        })}
        </div>
        <div className="card">
          <div className="card-header">
            <h3>Add Experience</h3>
          </div>
          <div className="card-body">
          <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
          {/* <Header /> */}
          <p className="card-text">Título<input {...register("newTitle")} placeholder="Título" /></p>
          <p className="card-text">>País <input {...register("newCountry")} placeholder="País" /></p>
          <p className="card-text">Empresa <input {...register("newCompany")} placeholder="Empresa" /></p>
          <p className="card-text">>Descripción <textarea {...register("newDescription")} placeholder="Descripción" /></p>
          <p>{data}</p>
          {/* <input type="submit" /> */}
          </form>
          </div>
          <div className="card-footer small">
            </div><button className="btn btn-theme btn-longer" onClick={wave}>
              Submit
            </button>
            {!currentAccount && (
              <button className="btn btn-theme btn-longer" onClick={connectWallet}>
                Connect Wallet
              </button>
            )}
        </div>
    </div>
  );
}

export default App
