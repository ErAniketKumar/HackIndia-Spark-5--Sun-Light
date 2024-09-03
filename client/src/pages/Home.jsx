import { useWeb3Context } from "../contexts/useWeb3Context";
import UploadImage from "../components/UploadImage";
import GetImage from "../components/GetImage";
import { useState } from "react";
const Home = () => {
	const [reload, setReload] = useState(false);
	// const {web3State}=useWeb3Context()
	// const {selectedAccount}=web3State;
	const reloadEffect = () => {
		setReload(!reload);
	};
	return (
    <div
    className="h-[85.3vh] w-screen flex flex-col justify-center items-center gap-6 text-white bg-image"
    style={{
      backgroundImage: "url('bg2.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "rgba(0, 0, 0, 0.8)", // Black with 50% transparency
      backgroundBlendMode: "overlay", // Blend the color with the image
    }}
  >
			<UploadImage reloadEffect={reloadEffect} />
			<GetImage reload={reload} />
		</div>
	);
};

export default Home;
