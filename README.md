# TokenizeArt — 42 Digital Dream

## Overview

TokenizeArt is an NFT project created as part of the 42 curriculum. It demonstrates how to create an ERC-721 smart contract, store artwork metadata on IPFS, deploy the contract to a public test network, and mint an NFT.

The artwork, **42 - Digital Dream**, celebrates the number 42 through a minimalist digital design with gold accents.

## Artwork

- **Name:** 42 - Digital Dream
- **Artist:** mmesbahi
- **Standard:** ERC-721
- **Image:** `mint/assets/tokenizeart-42.png`
- **Metadata:** `mint/metadata.json`

The image and metadata are stored on IPFS. The metadata references the image using its IPFS content identifier.

### IPFS references

- **Image CID:** `bafybeicxgiim5f5mk4m6chnp3uaty3damyq7qdmshobpe43l22dwol4flq`
- **Metadata CID:** `bafkreicgrcfryq54a5r2tdc2sj474av5nljuyj75hp6pqrq2zpfkb6mcz4`
- **Metadata URI:** `ipfs://bafkreicgrcfryq54a5r2tdc2sj474av5nljuyj75hp6pqrq2zpfkb6mcz4`

## Deployment

The contract was deployed to the Ethereum Sepolia test network.

- **Network:** Ethereum Sepolia
- **Chain ID:** `11155111`
- **Contract:** [`0x9a316393C040cC964639459cce3Dab4c626954fE`](https://sepolia.etherscan.io/address/0x9a316393C040cC964639459cce3Dab4c626954fE)
- **Collection name:** `42 TokenizeArt - Digital Dream`
- **Symbol:** `T42ART`
- **Minted token ID:** `0`
- **Mint transaction:** [View on Sepolia Etherscan](https://sepolia.etherscan.io/tx/0x6bc30448f27208a1ce829f6fce393bae240f746cb52f120144eb57df7f6491cc)

Sepolia is a test network. The NFT is a testnet asset and does not represent ownership of a real-world asset or have an implied monetary value.

## Smart Contract Design

The contract is implemented in `code/TokenizeArtNFT.sol` using Solidity and OpenZeppelin contracts.

It uses:

- **ERC721URIStorage:** Provides ERC-721 NFT functionality and stores an individual metadata URI for each token.
- **Ownable:** Restricts minting to the contract owner.
- **Sequential token IDs:** Each newly minted NFT receives an incrementing token ID, beginning at `0`.

The `mint(address to, string memory uri)` function creates an NFT for the requested recipient and associates it with the supplied metadata URI. Only the owner can call this function.

## Project Structure

```text
TokenizeArt/
├── code/
│   └── TokenizeArtNFT.sol
├── deployment/
│   ├── check-sepolia.ts
│   └── deploy.ts
├── documentation/
├── mint/
│   ├── assets/
│   │   └── tokenizeart-42.png
│   ├── metadata.json
│   └── mint.ts
├── test/
│   └── TokenizeArtNFT.ts
├── hardhat.config.ts
├── package.json
└── README.md
```

## Requirements

- Node.js and npm
- A MetaMask wallet for testnet transactions
- An Ethereum Sepolia RPC endpoint
- Sepolia test ETH for gas fees

## Configuration

Create a local `.env` file in the project root with these variables:

```text
SEPOLIA_RPC_URL=your_sepolia_rpc_url
SEPOLIA_PRIVATE_KEY=your_test_wallet_private_key
```

Never commit `.env` or share your private key or recovery phrase. Use a dedicated test wallet.

## Build and Test

Install dependencies:

```bash
npm install
```

Compile the contract:

```bash
npx hardhat build
```

Run the tests:

```bash
npx hardhat test
```

The tests cover the collection name and symbol, minting and ownership, sequential token IDs, metadata URI assignment, and owner-only minting.

## Deployment and Minting

Deploy the contract to Sepolia:

```bash
npx hardhat run deployment/deploy.ts --network sepolia
```

Mint an NFT using the configured contract address and metadata URI:

```bash
npx hardhat run mint/mint.ts --network sepolia
```

Only run these scripts when you intend to submit a blockchain transaction. Deployment and minting require test ETH for gas.

## Verifying Ownership

The deployed contract provides the ERC-721 `ownerOf(tokenId)` function. For the first NFT, token ID `0`, ownership can be checked through the contract on Sepolia.

The mint transaction and contract links above provide public evidence of the deployment and mint operation.

## Documentation

The `documentation/` directory contains additional project documentation explaining the contract, metadata, deployment, and verification workflow.
