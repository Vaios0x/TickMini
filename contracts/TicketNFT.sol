// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// Counters removed - using manual counter
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

/**
 * @title TicketNFT
 * @dev Smart contract para tickets NFT de TickBase
 */
contract TicketNFT is ERC721, ERC721URIStorage, ERC721Burnable, Ownable, IERC2981 {
    
    // Contador de tokens (manual)
    uint256 private _tokenIdCounter;
    
    // Mapeo de eventos
    mapping(uint256 => EventInfo) public events;
    mapping(uint256 => TicketInfo) public tickets;
    mapping(uint256 => bool) public usedTickets;
    mapping(address => bool) public authorizedValidators;
    
    // Contador de eventos
    uint256 public eventCounter;
    
    // Royalties (2.5% = 250 basis points)
    uint96 public constant ROYALTY_FEE = 250;
    
    struct EventInfo {
        uint256 eventId;
        string name;
        string description;
        uint256 eventDate;
        string location;
        address organizer;
        uint256 totalTickets;
        uint256 soldTickets;
        bool isActive;
        string metadataURI;
    }
    
    struct TicketInfo {
        uint256 eventId;
        uint256 ticketType;
        uint256 price;
        uint256 purchaseDate;
        string[] benefits;
        bool isTransferable;
    }
    
    // Eventos
    event EventCreated(uint256 indexed eventId, string name, address indexed organizer);
    event TicketMinted(uint256 indexed tokenId, uint256 indexed eventId, address indexed owner);
    event TicketUsed(uint256 indexed tokenId, uint256 indexed eventId);
    event ValidatorAuthorized(address indexed validator);
    event ValidatorRevoked(address indexed validator);
    
    constructor() ERC721("TickBase Tickets", "TICK") {}
    
    /**
     * @dev Crear un nuevo evento
     */
    function createEvent(
        string memory _name,
        string memory _description,
        uint256 _eventDate,
        string memory _location,
        uint256 _totalTickets,
        string memory _metadataURI
    ) public returns (uint256) {
        eventCounter++;
        uint256 eventId = eventCounter;
        
        events[eventId] = EventInfo({
            eventId: eventId,
            name: _name,
            description: _description,
            eventDate: _eventDate,
            location: _location,
            organizer: msg.sender,
            totalTickets: _totalTickets,
            soldTickets: 0,
            isActive: true,
            metadataURI: _metadataURI
        });
        
        emit EventCreated(eventId, _name, msg.sender);
        return eventId;
    }
    
    /**
     * @dev Mintear ticket para un evento específico
     */
    function mintTicket(
        address _to,
        uint256 _eventId,
        uint256 _ticketType,
        uint256 _price,
        string[] memory _benefits,
        string memory _tokenURI
    ) public payable returns (uint256) {
        require(events[_eventId].isActive, "Event is not active");
        require(events[_eventId].soldTickets < events[_eventId].totalTickets, "Event sold out");
        require(msg.value >= _price, "Insufficient payment");
        
        _tokenIdCounter++;
        uint256 tokenId = _tokenIdCounter;
        
        // Mint NFT
        _safeMint(_to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        
        // Guardar información del ticket
        tickets[tokenId] = TicketInfo({
            eventId: _eventId,
            ticketType: _ticketType,
            price: _price,
            purchaseDate: block.timestamp,
            benefits: _benefits,
            isTransferable: true
        });
        
        // Actualizar contador de tickets vendidos
        events[_eventId].soldTickets++;
        
        // Enviar pago al organizador (menos royalty para el contrato)
        uint256 organizerAmount = (msg.value * 975) / 1000; // 97.5%
        // uint256 royaltyAmount = msg.value - organizerAmount;  // 2.5% - se acumula en el contrato
        
        payable(events[_eventId].organizer).transfer(organizerAmount);
        
        emit TicketMinted(tokenId, _eventId, _to);
        return tokenId;
    }
    
    /**
     * @dev Marcar ticket como usado
     */
    function useTicket(uint256 _tokenId) public {
        require(authorizedValidators[msg.sender] || msg.sender == owner(), "Not authorized validator");
        require(_exists(_tokenId), "Ticket does not exist");
        require(!usedTickets[_tokenId], "Ticket already used");
        require(block.timestamp <= events[tickets[_tokenId].eventId].eventDate + 86400, "Event has ended"); // 24 hours grace period
        
        usedTickets[_tokenId] = true;
        emit TicketUsed(_tokenId, tickets[_tokenId].eventId);
    }
    
    /**
     * @dev Verificar si un ticket es válido
     */
    function isTicketValid(uint256 _tokenId) public view returns (bool) {
        if (!_exists(_tokenId)) return false;
        if (usedTickets[_tokenId]) return false;
        
        EventInfo memory eventInfo = events[tickets[_tokenId].eventId];
        if (!eventInfo.isActive) return false;
        if (block.timestamp > eventInfo.eventDate + 86400) return false; // 24 hours grace period
        
        return true;
    }
    
    /**
     * @dev Autorizar validador
     */
    function authorizeValidator(address _validator) public onlyOwner {
        authorizedValidators[_validator] = true;
        emit ValidatorAuthorized(_validator);
    }
    
    /**
     * @dev Revocar validador
     */
    function revokeValidator(address _validator) public onlyOwner {
        authorizedValidators[_validator] = false;
        emit ValidatorRevoked(_validator);
    }
    
    /**
     * @dev Obtener información del evento
     */
    function getEvent(uint256 _eventId) public view returns (EventInfo memory) {
        return events[_eventId];
    }
    
    /**
     * @dev Obtener información del ticket
     */
    function getTicket(uint256 _tokenId) public view returns (TicketInfo memory) {
        require(_exists(_tokenId), "Ticket does not exist");
        return tickets[_tokenId];
    }
    
    /**
     * @dev Batch mint para múltiples tickets
     */
    function batchMintTickets(
        address[] memory _to,
        uint256 _eventId,
        uint256[] memory _ticketTypes,
        uint256[] memory _prices,
        string[][] memory _benefits,
        string[] memory _tokenURIs
    ) public payable returns (uint256[] memory) {
        require(_to.length == _ticketTypes.length && _to.length == _prices.length, "Array length mismatch");
        require(events[_eventId].isActive, "Event is not active");
        
        uint256[] memory tokenIds = new uint256[](_to.length);
        uint256 totalPrice = 0;
        
        for (uint i = 0; i < _prices.length; i++) {
            totalPrice += _prices[i];
        }
        
        require(msg.value >= totalPrice, "Insufficient payment");
        
        for (uint i = 0; i < _to.length; i++) {
            require(events[_eventId].soldTickets < events[_eventId].totalTickets, "Event sold out");
            
            _tokenIdCounter++;
            uint256 tokenId = _tokenIdCounter;
            
            _safeMint(_to[i], tokenId);
            _setTokenURI(tokenId, _tokenURIs[i]);
            
            tickets[tokenId] = TicketInfo({
                eventId: _eventId,
                ticketType: _ticketTypes[i],
                price: _prices[i],
                purchaseDate: block.timestamp,
                benefits: _benefits[i],
                isTransferable: true
            });
            
            events[_eventId].soldTickets++;
            tokenIds[i] = tokenId;
            
            emit TicketMinted(tokenId, _eventId, _to[i]);
        }
        
        // Enviar pago al organizador
        uint256 organizerAmount = (msg.value * 975) / 1000; // 97.5%
        payable(events[_eventId].organizer).transfer(organizerAmount);
        
        return tokenIds;
    }
    
    /**
     * @dev Retirar fondos del contrato (solo owner)
     */
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner()).transfer(balance);
    }
    
    /**
     * @dev Implementar royalties EIP-2981
     */
    function royaltyInfo(uint256 _tokenId, uint256 _salePrice)
        external
        view
        override
        returns (address, uint256)
    {
        require(_exists(_tokenId), "Token does not exist");
        uint256 royaltyAmount = (_salePrice * ROYALTY_FEE) / 10000;
        return (owner(), royaltyAmount);
    }
    
    // Overrides requeridos por Solidity
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage, IERC165)
        returns (bool)
    {
        return interfaceId == type(IERC2981).interfaceId || super.supportsInterface(interfaceId);
    }
}