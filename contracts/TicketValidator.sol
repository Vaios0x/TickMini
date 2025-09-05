// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./TicketNFT.sol";

/**
 * @title TicketValidator
 * @dev Contrato para validación y verificación de tickets NFT
 */
contract TicketValidator is Ownable, ReentrancyGuard {
    
    // Referencia al contrato de tickets
    TicketNFT public ticketNFT;
    
    // Estructura para información de validación
    struct ValidationRecord {
        uint256 tokenId;
        address validator;
        uint256 validatedAt;
        bool isValid;
        string notes;
    }
    
    // Mapeos para validaciones
    mapping(uint256 => ValidationRecord[]) public validationHistory;
    mapping(uint256 => bool) public isTicketValidated;
    mapping(address => bool) public authorizedValidators;
    mapping(address => uint256) public validatorStats;
    
    // Configuración
    uint256 public validationWindow = 86400; // 24 horas después del evento
    bool public validationEnabled = true;
    
    // Eventos
    event TicketValidated(
        uint256 indexed tokenId,
        address indexed validator,
        bool isValid,
        string notes
    );
    
    event ValidatorAuthorized(address indexed validator);
    event ValidatorRevoked(address indexed validator);
    event ValidationWindowUpdated(uint256 newWindow);
    event ValidationToggled(bool enabled);
    
    constructor(address _ticketNFT) {
        ticketNFT = TicketNFT(_ticketNFT);
    }
    
    /**
     * @dev Validar un ticket
     */
    function validateTicket(
        uint256 _tokenId,
        bool _isValid,
        string memory _notes
    ) external nonReentrant {
        require(validationEnabled, "Validation is disabled");
        require(authorizedValidators[msg.sender] || msg.sender == owner(), "Not authorized validator");
        require(ticketNFT.ownerOf(_tokenId) != address(0), "Ticket does not exist");
        
        // Obtener información del ticket
        TicketNFT.TicketInfo memory ticketInfo = ticketNFT.getTicket(_tokenId);
        TicketNFT.EventInfo memory eventInfo = ticketNFT.getEvent(ticketInfo.eventId);
        
        // Verificar que el evento no haya terminado hace más de 24 horas
        require(
            block.timestamp <= eventInfo.eventDate + validationWindow,
            "Validation window has expired"
        );
        
        // Crear registro de validación
        ValidationRecord memory validation = ValidationRecord({
            tokenId: _tokenId,
            validator: msg.sender,
            validatedAt: block.timestamp,
            isValid: _isValid,
            notes: _notes
        });
        
        // Guardar en historial
        validationHistory[_tokenId].push(validation);
        
        // Marcar como validado
        isTicketValidated[_tokenId] = true;
        
        // Actualizar estadísticas del validador
        validatorStats[msg.sender]++;
        
        emit TicketValidated(_tokenId, msg.sender, _isValid, _notes);
    }
    
    /**
     * @dev Validar múltiples tickets en lote
     */
    function batchValidateTickets(
        uint256[] memory _tokenIds,
        bool[] memory _isValid,
        string[] memory _notes
    ) external nonReentrant {
        require(validationEnabled, "Validation is disabled");
        require(authorizedValidators[msg.sender] || msg.sender == owner(), "Not authorized validator");
        require(_tokenIds.length == _isValid.length && _tokenIds.length == _notes.length, "Array length mismatch");
        
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            _validateSingleTicket(_tokenIds[i], _isValid[i], _notes[i]);
        }
    }
    
    /**
     * @dev Función interna para validar un ticket individual
     */
    function _validateSingleTicket(
        uint256 _tokenId,
        bool _isValid,
        string memory _notes
    ) internal {
        require(ticketNFT.ownerOf(_tokenId) != address(0), "Ticket does not exist");
        
        // Obtener información del ticket
        TicketNFT.TicketInfo memory ticketInfo = ticketNFT.getTicket(_tokenId);
        TicketNFT.EventInfo memory eventInfo = ticketNFT.getEvent(ticketInfo.eventId);
        
        // Verificar ventana de validación
        require(
            block.timestamp <= eventInfo.eventDate + validationWindow,
            "Validation window has expired"
        );
        
        // Crear registro de validación
        ValidationRecord memory validation = ValidationRecord({
            tokenId: _tokenId,
            validator: msg.sender,
            validatedAt: block.timestamp,
            isValid: _isValid,
            notes: _notes
        });
        
        // Guardar en historial
        validationHistory[_tokenId].push(validation);
        
        // Marcar como validado
        isTicketValidated[_tokenId] = true;
        
        // Actualizar estadísticas del validador
        validatorStats[msg.sender]++;
        
        emit TicketValidated(_tokenId, msg.sender, _isValid, _notes);
    }
    
    /**
     * @dev Autorizar un validador
     */
    function authorizeValidator(address _validator) external onlyOwner {
        authorizedValidators[_validator] = true;
        emit ValidatorAuthorized(_validator);
    }
    
    /**
     * @dev Revocar autorización de un validador
     */
    function revokeValidator(address _validator) external onlyOwner {
        authorizedValidators[_validator] = false;
        emit ValidatorRevoked(_validator);
    }
    
    /**
     * @dev Actualizar ventana de validación
     */
    function updateValidationWindow(uint256 _newWindow) external onlyOwner {
        validationWindow = _newWindow;
        emit ValidationWindowUpdated(_newWindow);
    }
    
    /**
     * @dev Activar/desactivar validación
     */
    function toggleValidation(bool _enabled) external onlyOwner {
        validationEnabled = _enabled;
        emit ValidationToggled(_enabled);
    }
    
    /**
     * @dev Obtener historial de validaciones de un ticket
     */
    function getValidationHistory(uint256 _tokenId) external view returns (ValidationRecord[] memory) {
        return validationHistory[_tokenId];
    }
    
    /**
     * @dev Obtener última validación de un ticket
     */
    function getLastValidation(uint256 _tokenId) external view returns (ValidationRecord memory) {
        require(validationHistory[_tokenId].length > 0, "No validation history");
        return validationHistory[_tokenId][validationHistory[_tokenId].length - 1];
    }
    
    /**
     * @dev Verificar si un ticket ha sido validado
     */
    function isTicketValidatedByValidator(uint256 _tokenId) external view returns (bool) {
        return isTicketValidated[_tokenId];
    }
    
    /**
     * @dev Obtener estadísticas de un validador
     */
    function getValidatorStats(address _validator) external view returns (uint256) {
        return validatorStats[_validator];
    }
    
    /**
     * @dev Verificar si una dirección es validador autorizado
     */
    function isAuthorizedValidator(address _validator) external view returns (bool) {
        return authorizedValidators[_validator];
    }
    
    /**
     * @dev Obtener información completa de validación de un ticket
     */
    function getTicketValidationInfo(uint256 _tokenId) external view returns (
        bool isValidated,
        ValidationRecord memory lastValidation,
        uint256 totalValidations
    ) {
        isValidated = isTicketValidated[_tokenId];
        totalValidations = validationHistory[_tokenId].length;
        
        if (totalValidations > 0) {
            lastValidation = validationHistory[_tokenId][totalValidations - 1];
        }
    }
    
    /**
     * @dev Verificar validez completa de un ticket
     */
    function verifyTicketComplete(uint256 _tokenId) external view returns (
        bool isTicketValid,
        bool isValidationValid,
        bool isWithinWindow,
        string memory status
    ) {
        // Verificar validez básica del ticket
        isTicketValid = ticketNFT.isTicketValid(_tokenId);
        
        // Verificar si ha sido validado
        isValidationValid = isTicketValidated[_tokenId];
        
        // Verificar ventana de tiempo
        if (isTicketValid) {
            TicketNFT.TicketInfo memory ticketInfo = ticketNFT.getTicket(_tokenId);
            TicketNFT.EventInfo memory eventInfo = ticketNFT.getEvent(ticketInfo.eventId);
            isWithinWindow = block.timestamp <= eventInfo.eventDate + validationWindow;
        } else {
            isWithinWindow = false;
        }
        
        // Determinar estado
        if (!isTicketValid) {
            status = "Ticket invalid";
        } else if (!isWithinWindow) {
            status = "Validation window expired";
        } else if (!isValidationValid) {
            status = "Not validated yet";
        } else {
            status = "Valid and verified";
        }
    }
}
