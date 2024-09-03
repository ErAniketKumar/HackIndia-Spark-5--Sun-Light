import { ethers } from "ethers";
import contractAbi from "../constants/contractAbi.json";
import toast from "react-hot-toast";
import axios from "axios";

export const connectWallet = async () => {
    try {
        if (!window.ethereum) {
            throw new Error("Metamask is not installed");
        }

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        });
        const selectedAccount = accounts[0];

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        // Sign a message
        const message = "Welcome to Crypto Vault Website";
        const signature = await signer.signMessage(message);
        const dataSignature = { signature };
        const url = `http://localhost:3000/api/authentication?address=${selectedAccount}`;
        const res = await axios.post(url, dataSignature);
        const token = res.data.token;
        localStorage.setItem("token", token);

        // Create contract instance
        const contractAddress = "0xca855AC28B33297d194da26Acfb6d5d226d5D1Ea";
        const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);

        return { contractInstance, selectedAccount };
    } catch (error) {
        console.error("Error during wallet connection:", error);
        if (error.code === 4001) {
            console.error("User denied transaction signature.");
            toast.error("Transaction signature denied by user.");
        } else {
            console.error("Unexpected error:", error);
            toast.error("An unexpected error occurred.");
        }
    }
};