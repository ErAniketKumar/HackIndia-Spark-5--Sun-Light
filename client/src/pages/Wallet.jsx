import {useWeb3Context} from "../contexts/useWeb3Context"
import { connectWallet } from "../utils/connectWallet";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import './Wallet.css'
const Wallet = () => {
    const navigateTo=useNavigate()
    const {updateWeb3State,web3State} = useWeb3Context()
    const {selectedAccount}=web3State;
    useEffect(()=>{
      if(selectedAccount){
        navigateTo("/home")
      }
    },[selectedAccount,navigateTo])
    
    const handleWalletConnection = async()=>{
        const {contractInstance,selectedAccount} = await connectWallet();
        updateWeb3State({contractInstance,selectedAccount})
    }
    
    return ( 
      <div
      className="absolute inset-0 -z-10 h-full w-full bg-white bg-image"
      style={{
        backgroundImage: `
          linear-gradient(to right, #f0f0f0 1px, transparent 1px),
          linear-gradient(to bottom, #f0f0f0 1px, transparent 1px),
          url('bg1.jpg')
        `,
        backgroundSize: "6rem 4rem, 6rem 4rem, cover",
        backgroundPosition: "0 0, 0 0, center",
      }}
    >
    
    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)] flex flex-col justify-center items-center gap-20">
      <h1 className="font-bold text-[42px] text-green-800 md:text-[60px]">
        Secured photo memories 
      </h1>
      <button
        className="relative px-12 py-4 text-white bg-green-800 rounded-md hover:bg-sky-800 font-semibold"
        onClick={handleWalletConnection}
      >
        Connect Wallet
      </button>
    </div>
  </div> );
}

export default Wallet;