
import { network } from "hardhat";

const { ethers } = await network.create();

const [wallet] = await ethers.getSigners();

const address = await wallet.getAddress();
const networkInfo = await ethers.provider.getNetwork();
const balance = await ethers.provider.getBalance(address);

console.log("Network:", networkInfo.name);
console.log("Chain ID:", networkInfo.chainId.toString());
console.log("Wallet address:", address);
console.log("Balance:", ethers.formatEther(balance), "ETH");
