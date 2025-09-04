// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./TicketNFT.sol";

/**
 * @title SimpleTicketFactory
 * @dev Versión simplificada del factory para evitar límites de tamaño
 */
contract SimpleTicketFactory is Ownable, ReentrancyGuard {
    TicketNFT public ticketNFT;
    
    // Eventos
    event EventCreated(uint256 indexed eventId, address indexed organizer, string name);
    event TicketTypeAdded(uint256 indexed eventId, uint256 indexed ticketTypeId, string name, uint256 price);
    
    // Estructura para tipos de tickets
    struct TicketType {
        string name;
        uint256 price;
        uint256 maxSupply;
        uint256 sold;
        bool active;
    }
    
    // Mapeo de eventos a tipos de tickets
    mapping(uint256 => TicketType[]) public eventTicketTypes;
    
    // Contador de tipos de tickets por evento
    mapping(uint256 => uint256) public eventTicketTypeCount;
    
    constructor(address _ticketNFT) {
        ticketNFT = TicketNFT(_ticketNFT);
    }
    
    /**
     * @dev Crear un nuevo evento
     */
    function createEvent(
        string memory name,
        string memory description,
        uint256 eventDate,
        string memory location,
        uint256 totalTickets,
        string memory metadataURI
    ) external onlyOwner returns (uint256) {
        return ticketNFT.createEvent(
            name,
            description,
            eventDate,
            location,
            totalTickets,
            metadataURI
        );
    }
    
    /**
     * @dev Agregar tipo de ticket a un evento
     */
    function addTicketType(
        uint256 eventId,
        string memory name,
        uint256 price,
        uint256 maxSupply
    ) external onlyOwner {
        require(maxSupply > 0, "Max supply must be greater than 0");
        require(price > 0, "Price must be greater than 0");
        
        eventTicketTypes[eventId].push(TicketType({
            name: name,
            price: price,
            maxSupply: maxSupply,
            sold: 0,
            active: true
        }));
        
        uint256 ticketTypeId = eventTicketTypeCount[eventId];
        eventTicketTypeCount[eventId]++;
        
        emit TicketTypeAdded(eventId, ticketTypeId, name, price);
    }
    
    /**
     * @dev Mintear tickets para un evento y tipo específico
     */
    function mintTickets(
        uint256 eventId,
        uint256 ticketTypeId,
        uint256 quantity,
        address to
    ) external payable nonReentrant {
        require(ticketTypeId < eventTicketTypeCount[eventId], "Invalid ticket type");
        
        TicketType storage ticketType = eventTicketTypes[eventId][ticketTypeId];
        require(ticketType.active, "Ticket type not active");
        require(ticketType.sold + quantity <= ticketType.maxSupply, "Exceeds max supply");
        
        uint256 totalCost = ticketType.price * quantity;
        require(msg.value >= totalCost, "Insufficient payment");
        
        // Actualizar contador de vendidos
        ticketType.sold += quantity;
        
        // Mintear tickets
        string[] memory emptyBenefits = new string[](0);
        for (uint256 i = 0; i < quantity; i++) {
            ticketNFT.mintTicket{value: ticketType.price}(
                to,
                eventId,
                ticketTypeId,
                ticketType.price,
                emptyBenefits,
                ""
            );
        }
        
        // Reembolsar exceso
        if (msg.value > totalCost) {
            payable(msg.sender).transfer(msg.value - totalCost);
        }
    }
    
    /**
     * @dev Obtener información de un tipo de ticket
     */
    function getTicketType(uint256 eventId, uint256 ticketTypeId) 
        external 
        view 
        returns (
            string memory name,
            uint256 price,
            uint256 maxSupply,
            uint256 sold,
            bool active
        ) 
    {
        require(ticketTypeId < eventTicketTypeCount[eventId], "Invalid ticket type");
        TicketType memory ticketType = eventTicketTypes[eventId][ticketTypeId];
        return (ticketType.name, ticketType.price, ticketType.maxSupply, ticketType.sold, ticketType.active);
    }
    
    /**
     * @dev Obtener cantidad de tipos de tickets para un evento
     */
    function getTicketTypeCount(uint256 eventId) external view returns (uint256) {
        return eventTicketTypeCount[eventId];
    }
    
    /**
     * @dev Activar/desactivar tipo de ticket
     */
    function setTicketTypeActive(uint256 eventId, uint256 ticketTypeId, bool active) external onlyOwner {
        require(ticketTypeId < eventTicketTypeCount[eventId], "Invalid ticket type");
        eventTicketTypes[eventId][ticketTypeId].active = active;
    }
    
    /**
     * @dev Retirar fondos del contrato
     */
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
