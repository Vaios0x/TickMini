// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title TicketMarketplace
 * @dev Marketplace para la venta secundaria de tickets NFT
 */
contract TicketMarketplace is ReentrancyGuard, Ownable, IERC721Receiver {
    using Counters for Counters.Counter;
    
    Counters.Counter private _listingIdCounter;
    
    // Estructura para listados de tickets
    struct Listing {
        uint256 listingId;
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool isActive;
        uint256 createdAt;
        uint256 expiresAt;
    }
    
    // Mapeos
    mapping(uint256 => Listing) public listings;
    mapping(address => mapping(uint256 => uint256)) public tokenToListingId;
    mapping(address => uint256[]) public sellerListings;
    
    // Configuración de fees
    uint256 public platformFeePercent = 250; // 2.5% (250 basis points)
    uint256 public constant MAX_FEE_PERCENT = 1000; // 10% máximo
    
    // Eventos
    event TicketListed(
        uint256 indexed listingId,
        address indexed seller,
        address indexed nftContract,
        uint256 tokenId,
        uint256 price,
        uint256 expiresAt
    );
    
    event TicketSold(
        uint256 indexed listingId,
        address indexed seller,
        address indexed buyer,
        address nftContract,
        uint256 tokenId,
        uint256 price
    );
    
    event ListingCancelled(uint256 indexed listingId);
    event ListingUpdated(uint256 indexed listingId, uint256 newPrice);
    event PlatformFeeUpdated(uint256 newFeePercent);
    
    constructor() {}
    
    /**
     * @dev Listar un ticket para venta
     */
    function listTicket(
        address _nftContract,
        uint256 _tokenId,
        uint256 _price,
        uint256 _expiresAt
    ) external nonReentrant returns (uint256) {
        require(_price > 0, "Price must be greater than 0");
        require(_expiresAt > block.timestamp, "Expiration must be in the future");
        require(
            IERC721(_nftContract).ownerOf(_tokenId) == msg.sender,
            "Not the owner of this token"
        );
        require(
            IERC721(_nftContract).isApprovedForAll(msg.sender, address(this)) ||
            IERC721(_nftContract).getApproved(_tokenId) == address(this),
            "Contract not approved to transfer this token"
        );
        
        // Verificar que no esté ya listado
        require(
            tokenToListingId[_nftContract][_tokenId] == 0,
            "Token already listed"
        );
        
        _listingIdCounter.increment();
        uint256 listingId = _listingIdCounter.current();
        
        listings[listingId] = Listing({
            listingId: listingId,
            seller: msg.sender,
            nftContract: _nftContract,
            tokenId: _tokenId,
            price: _price,
            isActive: true,
            createdAt: block.timestamp,
            expiresAt: _expiresAt
        });
        
        tokenToListingId[_nftContract][_tokenId] = listingId;
        sellerListings[msg.sender].push(listingId);
        
        emit TicketListed(listingId, msg.sender, _nftContract, _tokenId, _price, _expiresAt);
        
        return listingId;
    }
    
    /**
     * @dev Comprar un ticket listado
     */
    function buyTicket(uint256 _listingId) external payable nonReentrant {
        Listing storage listing = listings[_listingId];
        
        require(listing.isActive, "Listing is not active");
        require(listing.seller != msg.sender, "Cannot buy your own listing");
        require(msg.value >= listing.price, "Insufficient payment");
        require(block.timestamp <= listing.expiresAt, "Listing has expired");
        require(
            IERC721(listing.nftContract).ownerOf(listing.tokenId) == listing.seller,
            "Seller no longer owns this token"
        );
        
        // Marcar listing como inactivo
        listing.isActive = false;
        
        // Limpiar mapeo
        delete tokenToListingId[listing.nftContract][listing.tokenId];
        
        // Calcular fees
        uint256 platformFee = (listing.price * platformFeePercent) / 10000;
        uint256 sellerAmount = listing.price - platformFee;
        
        // Transferir NFT
        IERC721(listing.nftContract).safeTransferFrom(
            listing.seller,
            msg.sender,
            listing.tokenId
        );
        
        // Transferir pagos
        if (platformFee > 0) {
            payable(owner()).transfer(platformFee);
        }
        payable(listing.seller).transfer(sellerAmount);
        
        // Reembolsar exceso
        if (msg.value > listing.price) {
            payable(msg.sender).transfer(msg.value - listing.price);
        }
        
        emit TicketSold(
            _listingId,
            listing.seller,
            msg.sender,
            listing.nftContract,
            listing.tokenId,
            listing.price
        );
    }
    
    /**
     * @dev Cancelar un listing
     */
    function cancelListing(uint256 _listingId) external {
        Listing storage listing = listings[_listingId];
        
        require(listing.isActive, "Listing is not active");
        require(
            listing.seller == msg.sender || msg.sender == owner(),
            "Not authorized to cancel this listing"
        );
        
        listing.isActive = false;
        delete tokenToListingId[listing.nftContract][listing.tokenId];
        
        emit ListingCancelled(_listingId);
    }
    
    /**
     * @dev Actualizar precio de un listing
     */
    function updateListingPrice(uint256 _listingId, uint256 _newPrice) external {
        Listing storage listing = listings[_listingId];
        
        require(listing.isActive, "Listing is not active");
        require(listing.seller == msg.sender, "Not the seller");
        require(_newPrice > 0, "Price must be greater than 0");
        
        listing.price = _newPrice;
        
        emit ListingUpdated(_listingId, _newPrice);
    }
    
    /**
     * @dev Obtener listings activos de un vendedor
     */
    function getSellerListings(address _seller) external view returns (uint256[] memory) {
        return sellerListings[_seller];
    }
    
    /**
     * @dev Obtener información de un listing
     */
    function getListing(uint256 _listingId) external view returns (Listing memory) {
        return listings[_listingId];
    }
    
    /**
     * @dev Obtener listing ID por token
     */
    function getListingByToken(address _nftContract, uint256 _tokenId) external view returns (uint256) {
        return tokenToListingId[_nftContract][_tokenId];
    }
    
    /**
     * @dev Actualizar fee de la plataforma (solo owner)
     */
    function updatePlatformFee(uint256 _newFeePercent) external onlyOwner {
        require(_newFeePercent <= MAX_FEE_PERCENT, "Fee too high");
        platformFeePercent = _newFeePercent;
        emit PlatformFeeUpdated(_newFeePercent);
    }
    
    /**
     * @dev Retirar fondos de la plataforma (solo owner)
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner()).transfer(balance);
    }
    
    /**
     * @dev Implementación requerida de IERC721Receiver
     */
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return this.onERC721Received.selector;
    }
    
    /**
     * @dev Obtener el siguiente listing ID
     */
    function getNextListingId() external view returns (uint256) {
        return _listingIdCounter.current() + 1;
    }
    
    /**
     * @dev Obtener total de listings
     */
    function getTotalListings() external view returns (uint256) {
        return _listingIdCounter.current();
    }
}
