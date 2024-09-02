import { ethers } from "ethers";
import contractAbi from "../constants/contractAbi.json";
import toast from "react-hot-toast";
import axios from "axios";

export const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    // Smart contract logic part
    const selectedAccount = accounts[0];
    console.log("Selected Account:", selectedAccount);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log("Signer:", signer);

    const message = "Welcome to Crypto Vault Website";
    const signature = await signer.signMessage(message);
    console.log("Signature:", signature);

    const dataSignature = {
      signature,
    };
    const url = `http://localhost:3000/api/authentication?address=${selectedAccount}`;
    console.log("Request URL:", url);
    console.log("Request Data:", dataSignature);

    const res = await axios.post(url, dataSignature);
    const token = res.data.token;
    console.log("Token:", token);

    localStorage.setItem("token", token);

    const contractAddress = "0xca855AC28B33297d194da26Acfb6d5d226d5D1Ea";
    const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
    console.log("Contract Instance:", contractInstance);

    // Call viewFiles function
    try {
      const files = await contractInstance.viewFiles(selectedAccount);
      console.log("Files:", files);
    } catch (error) {
      console.error("Error calling viewFiles:", error);
    }

    return { contractInstance, selectedAccount };
  } catch (error) {
    if (error.code === 4001) {
      // User rejected the request
      toast.error("User rejected the request");
    } else if (error.message.includes("MetaMask is not installed")) {
      toast.error("MetaMask is not installed");
    } else {
      toast.error("Wallet connection failed");
    }
    console.error("Error connecting wallet:", error);
  }
};