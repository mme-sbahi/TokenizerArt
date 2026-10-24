
 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @title TokenizeArtNFT
/// @notice An ERC-721 NFT collection for the 42 Digital Dream artwork.
contract TokenizeArtNFT is ERC721URIStorage, Ownable {
    // ID to assign to the next minted NFT. The first ID is 0.
    uint256 private _nextTokenId;

    /// @notice Sets the collection name, symbol, and initial owner.
    /// @dev The wallet deploying this contract becomes its owner.
    constructor()
        ERC721("42 TokenizeArt - Digital Dream", "T42ART")
        Ownable(msg.sender)
    {}

    /// @notice Creates an NFT and associates it with a metadata URI.
    /// @dev Only the contract owner can mint new NFTs.
    /// @param to The wallet address that will receive the NFT.
    /// @param uri The URI pointing to the NFT's metadata.
    /// @return tokenId The ID assigned to the newly minted NFT.
    function mint(address to, string memory uri)
        public
        onlyOwner
        returns (uint256)
    {
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;

        // Create the NFT and assign it to the recipient.
        _safeMint(to, tokenId);

        // Store the metadata URI for this NFT.
        _setTokenURI(tokenId, uri);

        return tokenId;
    }
}
