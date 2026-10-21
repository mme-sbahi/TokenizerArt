
import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.create();

describe("TokenizeArtNFT", function () {
  async function deployNFT() {
    const nft = await ethers.deployContract("TokenizeArtNFT");
    const [owner, recipient, other] = await ethers.getSigners();

    return { nft, owner, recipient, other };
  }

  it("Should have the correct collection name and symbol", async function () {
    const { nft } = await deployNFT();

    expect(await nft.name()).to.equal("42 TokenizeArt - Digital Dream");
    expect(await nft.symbol()).to.equal("T42ART");
  });

  it("Should mint an NFT to the requested address", async function () {
    const { nft, recipient } = await deployNFT();
    const uri = "ipfs://example-metadata.json";

    await nft.mint(recipient.address, uri);

    expect(await nft.ownerOf(0n)).to.equal(recipient.address);
    expect(await nft.tokenURI(0n)).to.equal(uri);
  });

  it("Should assign a different ID to each NFT", async function () {
    const { nft, recipient, other } = await deployNFT();

    await nft.mint(recipient.address, "ipfs://first.json");
    await nft.mint(other.address, "ipfs://second.json");

    expect(await nft.ownerOf(0n)).to.equal(recipient.address);
    expect(await nft.ownerOf(1n)).to.equal(other.address);
  });

  it("Should prevent non-owners from minting NFTs", async function () {
    const { nft, recipient, other } = await deployNFT();

    await expect(
      nft.connect(other).mint(recipient.address, "ipfs://example.json")
    )
      .to.be.revertedWithCustomError(nft, "OwnableUnauthorizedAccount")
      .withArgs(other.address);
  });
});
