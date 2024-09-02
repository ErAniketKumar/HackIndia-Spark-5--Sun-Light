const ethers = require('ethers');
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const { JWT_SECRETKEY } = require('../config/serverConfig');

async function authController(req, res, next) {
    try {
        const { signature } = req.body;
        const { address } = req.query;

        console.log("Received Signature:", signature);
        console.log("Received Address:", address);

        if (!signature) {
            throw new Error("Signature is invalid");
        }

        // Ensure ethers.utils.verifyMessage is correctly used
        const recoveredAddress = ethers.utils.verifyMessage("Welcome to Crypto Vault Website", signature);
        console.log("Recovered Address:", recoveredAddress);

        if (address.toLowerCase() === recoveredAddress.toLowerCase()) {
            const userAddress = recoveredAddress.toLowerCase();
            const user = await UserModel.findOne({ userAddress });
            if (!user) {
                const userData = await UserModel.create({ userAddress });
                console.log(userData);
            }
            const token = jwt.sign({
                address: userAddress
            }, JWT_SECRETKEY);

            res.status(200).json({ message: "Authentication Successful", token });
        } else {
            res.status(400).json({ message: "Authentication Failed" });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { authController };