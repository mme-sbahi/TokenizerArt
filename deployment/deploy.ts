
import { network } from "hardhat";

const { ethers } = await network.create();

const networkInfo = await ethers.provider.getNetwork();

if (networkInfo.chainId !== 11155111n) {
  throw new Error("Wrong network! Expected Ethereum Sepolia.");
}

const [deployer] = await ethers.getSigners();

console.log("Deploying TokenizeArtNFT...");
console.log("Network: Sepolia");
console.log("Deployer:", await deployer.getAddress());

const nft = await ethers.deployContract("TokenizeArtNFT");

console.log("Waiting for deployment confirmation...");

await nft.waitForDeployment();

const contractAddress = await nft.getAddress();

console.log("\nDeployment successful!");
console.log("Contract address:", contractAddress);
console.log("Collection name:", await nft.name());
console.log("Collection symbol:", await nft.symbol());
console.log("Contract owner:", await nft.owner());
console.log(
  "View on Sepolia Etherscan:",
  `https://sepolia.etherscan.io/address/${contractAddress}`
);
