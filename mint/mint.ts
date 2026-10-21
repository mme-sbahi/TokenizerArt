
import { network } from "hardhat";

const { ethers } = await network.create();

const CONTRACT_ADDRESS =
  "0x9a316393C040cC964639459cce3Dab4c626954fE";

const METADATA_URI =
  "ipfs://bafkreicgrcfryq54a5r2tdc2sj474av5nljuyj75hp6pqrq2zpfkb6mcz4";

const networkInfo = await ethers.provider.getNetwork();

if (networkInfo.chainId !== 11155111n) {
  throw new Error("Wrong network! Expected Ethereum Sepolia.");
}

const [signer] = await ethers.getSigners();
const walletAddress = await signer.getAddress();

const nft = await ethers.getContractAt(
  "TokenizeArtNFT",
  CONTRACT_ADDRESS
);

const owner = await nft.owner();

if (owner.toLowerCase() !== walletAddress.toLowerCase()) {
  throw new Error("Your wallet is not the contract owner.");
}

console.log("Minting 42 - Digital Dream...");
console.log("Recipient:", walletAddress);
console.log("Metadata URI:", METADATA_URI);

const transaction = await nft.mint(walletAddress, METADATA_URI);

console.log("Transaction submitted:", transaction.hash);
console.log("Waiting for confirmation...");

const receipt = await transaction.wait();

if (!receipt) {
  throw new Error("Transaction receipt was not returned.");
}

console.log("\nMint successful!");
console.log("Transaction hash:", receipt.hash);
console.log("NFT owner:", await nft.ownerOf(0n));
console.log("Token ID: 0");
console.log("Token URI:", await nft.tokenURI(0n));
console.log(
  "View contract:",
  `https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}`
);
console.log(
  "View transaction:",
  `https://sepolia.etherscan.io/tx/${receipt.hash}`
);
