# TokenizeArt — Technical Documentation

## 1. Architecture

TokenizeArt consists of three main parts:

1. **Smart contract:** `code/TokenizeArtNFT.sol` defines the ERC-721 collection and controls minting.
2. **Artwork and metadata:** The PNG artwork and JSON metadata are stored in the project and referenced using IPFS content identifiers.
3. **Deployment and mint scripts:** The TypeScript scripts interact with the contract through Hardhat and Ethers.

## 2. Smart Contract

The `TokenizeArtNFT` contract inherits from OpenZeppelin's `ERC721URIStorage` and `Ownable`.

### Collection configuration

- Name: `42 TokenizeArt - Digital Dream`
- Symbol: `T42ART`
- Solidity version: compatible with `^0.8.24`

### Minting

The `mint(address to, string memory uri)` function:

1. Reads the next available token ID.
2. Increments the token counter.
3. Creates the NFT for the recipient using `_safeMint`.
4. Stores its metadata URI using `_setTokenURI`.
5. Returns the token ID.

The `onlyOwner` modifier restricts minting to the contract owner.

## 3. Metadata and IPFS

The metadata describes the NFT and points to its artwork.

- Metadata URI: `ipfs://bafkreicgrcfryq54a5r2tdc2sj474av5nljuyj75hp6pqrq2zpfkb6mcz4`
- Image URI: `ipfs://bafybeicxgiim5f5mk4m6chnp3uaty3damyq7qdmshobpe43l22dwol4flq`

The `image` field in the metadata references the artwork by its IPFS CID. The NFT contract stores the metadata URI, rather than the image file itself.

IPFS content identifiers identify content. Continued availability depends on the content remaining accessible through the IPFS network, for example through pinning.

## 4. Deployment

The contract was deployed to Ethereum Sepolia.

- Chain ID: `11155111`
- Contract address: `0x9a316393C040cC964639459cce3Dab4c626954fE`
- Deployment script: `deployment/deploy.ts`

The deployment script checks the network, deploys the contract, waits for confirmation, and prints the resulting address and collection information.

## 5. Minting

The script `mint/mint.ts` calls the contract's `mint` function.

The first minted NFT has token ID `0` and belongs to the configured recipient wallet.

Mint transaction:

https://sepolia.etherscan.io/tx/0x6bc30448f27208a1ce829f6fce393bae240f746cb52f120144eb57df7f6491cc

## 6. Testing

Run the test suite:

```bash
npx hardhat test
```

The tests verify:

- Collection name and symbol.
- NFT minting and recipient ownership.
- Sequential token IDs.
- Rejection of minting attempts from non-owners.

## 7. Verification

Use the contract on Sepolia Etherscan to inspect its transactions and public state:

https://sepolia.etherscan.io/address/0x9a316393C040cC964639459cce3Dab4c626954fE

The ERC-721 `ownerOf(0)` function verifies the owner of the first token. The `tokenURI(0)` function returns the metadata URI assigned to it.

## 8. Security Notes

- Never commit `.env` or expose wallet private keys.
- Use a dedicated test wallet for development.
- Deployment and minting require test ETH for transaction fees.
- Sepolia is a test network, not Ethereum Mainnet.
