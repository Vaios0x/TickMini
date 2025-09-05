// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./TicketNFT.sol";

/**
 * @title TicketFactory
 * @dev Factory completo para la gestión de eventos y tickets NFT
 */
contract TicketFactory is Ownable, ReentrancyGuard, Pausable {
    
    // Referencia al contrato de tickets
    TicketNFT public ticketNFT;
    
    // Estructura para tipos de tickets
    struct TicketType {
        string name;
        string description;
        uint256 price;
        uint256 maxSupply;
        uint256 sold;
        bool active;
        string metadataURI;
        string[] benefits;
    }
    
    // Estructura para eventos
    struct Event {
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
        uint256 createdAt;
        uint256 ticketTypeCount;
    }
    
    // Mapeos
    mapping(uint256 => Event) public events;
    mapping(uint256 => mapping(uint256 => TicketType)) public eventTicketTypes;
    mapping(address => uint256[]) public organizerEvents;
    mapping(uint256 => address) public eventOrganizer;
    
    // Contadores
    uint256 public eventCounter;
    uint256 public totalEventsCreated;
    uint256 public totalTicketsSold;
    
    // Configuración
    uint256 public platformFeePercent = 250; // 2.5%
    uint256 public constant MAX_FEE_PERCENT = 1000; // 10%
    
    // Eventos
    event EventCreated(
        uint256 indexed eventId,
        address indexed organizer,
        string name,
        uint256 eventDate
    );
    
    event TicketTypeAdded(
        uint256 indexed eventId,
        uint256 indexed ticketTypeId,
        string name,
        uint256 price,
        uint256 maxSupply
    );
    
    event TicketsMinted(
        uint256 indexed eventId,
        uint256 indexed ticketTypeId,
        address indexed buyer,
        uint256 quantity,
        uint256 totalCost
    );
    
    event EventUpdated(
        uint256 indexed eventId,
        string name,
        bool isActive
    );
    
    event PlatformFeeUpdated(uint256 newFeePercent);
    
    constructor(address _ticketNFT) {
        ticketNFT = TicketNFT(_ticketNFT);
    }
    
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
    ) external whenNotPaused returns (uint256) {
        require(_eventDate > block.timestamp, "Event date must be in the future");
        require(_totalTickets > 0, "Total tickets must be greater than 0");
        require(bytes(_name).length > 0, "Event name cannot be empty");
        
        eventCounter++;
        uint256 eventId = eventCounter;
        
        events[eventId] = Event({
            eventId: eventId,
            name: _name,
            description: _description,
            eventDate: _eventDate,
            location: _location,
            organizer: msg.sender,
            totalTickets: _totalTickets,
            soldTickets: 0,
            isActive: true,
            metadataURI: _metadataURI,
            createdAt: block.timestamp,
            ticketTypeCount: 0
        });
        
        organizerEvents[msg.sender].push(eventId);
        eventOrganizer[eventId] = msg.sender;
        totalEventsCreated++;
        
        emit EventCreated(eventId, msg.sender, _name, _eventDate);
        return eventId;
    }
    
    /**
     * @dev Agregar tipo de ticket a un evento
     */
    function addTicketType(
        uint256 _eventId,
        string memory _name,
        string memory _description,
        uint256 _price,
        uint256 _maxSupply,
        string memory _metadataURI,
        string[] memory _benefits
    ) external whenNotPaused {
        require(events[_eventId].organizer == msg.sender || msg.sender == owner(), "Not authorized");
        require(events[_eventId].isActive, "Event is not active");
        require(_maxSupply > 0, "Max supply must be greater than 0");
        require(_price > 0, "Price must be greater than 0");
        require(bytes(_name).length > 0, "Ticket type name cannot be empty");
        
        uint256 ticketTypeId = events[_eventId].ticketTypeCount;
        events[_eventId].ticketTypeCount++;
        
        eventTicketTypes[_eventId][ticketTypeId] = TicketType({
            name: _name,
            description: _description,
            price: _price,
            maxSupply: _maxSupply,
            sold: 0,
            active: true,
            metadataURI: _metadataURI,
            benefits: _benefits
        });
        
        emit TicketTypeAdded(_eventId, ticketTypeId, _name, _price, _maxSupply);
    }
    
    /**
     * @dev Mintear tickets para un evento y tipo específico
     */
    function mintTickets(
        uint256 _eventId,
        uint256 _ticketTypeId,
        uint256 _quantity,
        address _to
    ) external payable nonReentrant whenNotPaused {
        require(_quantity > 0, "Quantity must be greater than 0");
        require(_to != address(0), "Invalid recipient address");
        require(events[_eventId].isActive, "Event is not active");
        require(_ticketTypeId < events[_eventId].ticketTypeCount, "Invalid ticket type");
        
        TicketType storage ticketType = eventTicketTypes[_eventId][_ticketTypeId];
        require(ticketType.active, "Ticket type not active");
        require(ticketType.sold + _quantity <= ticketType.maxSupply, "Exceeds max supply");
        require(events[_eventId].soldTickets + _quantity <= events[_eventId].totalTickets, "Event sold out");
        
        uint256 totalCost = ticketType.price * _quantity;
        require(msg.value >= totalCost, "Insufficient payment");
        
        // Actualizar contadores
        ticketType.sold += _quantity;
        events[_eventId].soldTickets += _quantity;
        totalTicketsSold += _quantity;
        
        // Mintear tickets individualmente
        for (uint256 i = 0; i < _quantity; i++) {
            ticketNFT.mintTicket{value: ticketType.price}(
                _to,
                _eventId,
                _ticketTypeId,
                ticketType.price,
                ticketType.benefits,
                ticketType.metadataURI
            );
        }
        
        // Calcular y transferir fees
        uint256 platformFee = (totalCost * platformFeePercent) / 10000;
        uint256 organizerAmount = totalCost - platformFee;
        
        if (platformFee > 0) {
            payable(owner()).transfer(platformFee);
        }
        payable(events[_eventId].organizer).transfer(organizerAmount);
        
        // Reembolsar exceso
        if (msg.value > totalCost) {
            payable(msg.sender).transfer(msg.value - totalCost);
        }
        
        emit TicketsMinted(_eventId, _ticketTypeId, _to, _quantity, totalCost);
    }
    
    /**
     * @dev Actualizar información de un evento
     */
    function updateEvent(
        uint256 _eventId,
        string memory _name,
        string memory _description,
        string memory _location,
        bool _isActive
    ) external {
        require(events[_eventId].organizer == msg.sender || msg.sender == owner(), "Not authorized");
        require(bytes(_name).length > 0, "Event name cannot be empty");
        
        events[_eventId].name = _name;
        events[_eventId].description = _description;
        events[_eventId].location = _location;
        events[_eventId].isActive = _isActive;
        
        emit EventUpdated(_eventId, _name, _isActive);
    }
    
    /**
     * @dev Actualizar tipo de ticket
     */
    function updateTicketType(
        uint256 _eventId,
        uint256 _ticketTypeId,
        string memory _name,
        string memory _description,
        uint256 _price,
        bool _active
    ) external {
        require(events[_eventId].organizer == msg.sender || msg.sender == owner(), "Not authorized");
        require(_ticketTypeId < events[_eventId].ticketTypeCount, "Invalid ticket type");
        require(_price > 0, "Price must be greater than 0");
        require(bytes(_name).length > 0, "Ticket type name cannot be empty");
        
        eventTicketTypes[_eventId][_ticketTypeId].name = _name;
        eventTicketTypes[_eventId][_ticketTypeId].description = _description;
        eventTicketTypes[_eventId][_ticketTypeId].price = _price;
        eventTicketTypes[_eventId][_ticketTypeId].active = _active;
    }
    
    /**
     * @dev Obtener información de un evento
     */
    function getEvent(uint256 _eventId) external view returns (Event memory) {
        return events[_eventId];
    }
    
    /**
     * @dev Obtener información de un tipo de ticket
     */
    function getTicketType(uint256 _eventId, uint256 _ticketTypeId) 
        external 
        view 
        returns (TicketType memory) 
    {
        require(_ticketTypeId < events[_eventId].ticketTypeCount, "Invalid ticket type");
        return eventTicketTypes[_eventId][_ticketTypeId];
    }
    
    /**
     * @dev Obtener eventos de un organizador
     */
    function getOrganizerEvents(address _organizer) external view returns (uint256[] memory) {
        return organizerEvents[_organizer];
    }
    
    /**
     * @dev Obtener cantidad de tipos de tickets para un evento
     */
    function getTicketTypeCount(uint256 _eventId) external view returns (uint256) {
        return events[_eventId].ticketTypeCount;
    }
    
    /**
     * @dev Obtener estadísticas globales
     */
    function getGlobalStats() external view returns (
        uint256 _totalEvents,
        uint256 _totalTicketsSold,
        uint256 _activeEvents
    ) {
        _totalEvents = totalEventsCreated;
        _totalTicketsSold = totalTicketsSold;
        
        // Contar eventos activos
        for (uint256 i = 1; i <= eventCounter; i++) {
            if (events[i].isActive && events[i].eventDate > block.timestamp) {
                _activeEvents++;
            }
        }
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
     * @dev Pausar/despausar el contrato (solo owner)
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    /**
     * @dev Retirar fondos del contrato (solo owner)
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner()).transfer(balance);
    }
    
    /**
     * @dev Transferir ownership de un evento (solo organizador)
     */
    function transferEventOwnership(uint256 _eventId, address _newOrganizer) external {
        require(events[_eventId].organizer == msg.sender, "Not the event organizer");
        require(_newOrganizer != address(0), "Invalid new organizer");
        
        // Remover del organizador actual
        uint256[] storage currentEvents = organizerEvents[msg.sender];
        for (uint256 i = 0; i < currentEvents.length; i++) {
            if (currentEvents[i] == _eventId) {
                currentEvents[i] = currentEvents[currentEvents.length - 1];
                currentEvents.pop();
                break;
            }
        }
        
        // Agregar al nuevo organizador
        organizerEvents[_newOrganizer].push(_eventId);
        events[_eventId].organizer = _newOrganizer;
        eventOrganizer[_eventId] = _newOrganizer;
    }
}
