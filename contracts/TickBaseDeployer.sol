// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./TicketNFT.sol";
import "./TicketMarketplace.sol";
import "./TicketValidator.sol";
import "./TicketFactory.sol";
import "./SimpleTicketFactory.sol";

/**
 * @title TickBaseDeployer
 * @dev Contrato para deployment automatizado y gestión de versiones de TickBase
 */
contract TickBaseDeployer is Ownable, ReentrancyGuard {
    
    // Estructura para información de deployment
    struct DeploymentInfo {
        address ticketNFT;
        address marketplace;
        address validator;
        address factory;
        address simpleFactory;
        uint256 deployedAt;
        string version;
        bool isActive;
    }
    
    // Mapeos
    mapping(uint256 => DeploymentInfo) public deployments;
    mapping(string => uint256) public versionToDeployment;
    mapping(address => bool) public authorizedDeployers;
    
    // Contadores y configuración
    uint256 public deploymentCounter;
    string public currentVersion = "1.0.0";
    bool public deploymentEnabled = true;
    
    // Eventos
    event DeploymentCreated(
        uint256 indexed deploymentId,
        string version,
        address ticketNFT,
        address marketplace,
        address validator,
        address factory
    );
    
    event VersionUpdated(string oldVersion, string newVersion);
    event DeploymentToggled(bool enabled);
    event DeployerAuthorized(address indexed deployer);
    event DeployerRevoked(address indexed deployer);
    
    constructor() {
        authorizedDeployers[msg.sender] = true;
    }
    
    /**
     * @dev Crear un nuevo deployment completo
     */
    function deployTickBase(
        string memory _version
    ) external nonReentrant returns (
        uint256 deploymentId,
        address ticketNFT,
        address marketplace,
        address validator,
        address factory,
        address simpleFactory
    ) {
        require(deploymentEnabled, "Deployment is disabled");
        require(authorizedDeployers[msg.sender] || msg.sender == owner(), "Not authorized to deploy");
        require(bytes(_version).length > 0, "Version cannot be empty");
        
        deploymentCounter++;
        deploymentId = deploymentCounter;
        
        // 1. Desplegar TicketNFT
        TicketNFT ticketNFTContract = new TicketNFT();
        ticketNFT = address(ticketNFTContract);
        
        // 2. Desplegar TicketMarketplace
        TicketMarketplace marketplaceContract = new TicketMarketplace();
        marketplace = address(marketplaceContract);
        
        // 3. Desplegar TicketValidator
        TicketValidator validatorContract = new TicketValidator(ticketNFT);
        validator = address(validatorContract);
        
        // 4. Desplegar TicketFactory
        TicketFactory factoryContract = new TicketFactory(ticketNFT);
        factory = address(factoryContract);
        
        // 5. Desplegar SimpleTicketFactory
        SimpleTicketFactory simpleFactoryContract = new SimpleTicketFactory(ticketNFT);
        simpleFactory = address(simpleFactoryContract);
        
        // Guardar información del deployment
        deployments[deploymentId] = DeploymentInfo({
            ticketNFT: ticketNFT,
            marketplace: marketplace,
            validator: validator,
            factory: factory,
            simpleFactory: simpleFactory,
            deployedAt: block.timestamp,
            version: _version,
            isActive: true
        });
        
        versionToDeployment[_version] = deploymentId;
        
        emit DeploymentCreated(
            deploymentId,
            _version,
            ticketNFT,
            marketplace,
            validator,
            factory
        );
    }
    
    /**
     * @dev Desplegar solo TicketNFT
     */
    function deployTicketNFT() external returns (address) {
        require(deploymentEnabled, "Deployment is disabled");
        require(authorizedDeployers[msg.sender] || msg.sender == owner(), "Not authorized to deploy");
        
        TicketNFT ticketNFTContract = new TicketNFT();
        return address(ticketNFTContract);
    }
    
    /**
     * @dev Desplegar solo TicketMarketplace
     */
    function deployMarketplace() external returns (address) {
        require(deploymentEnabled, "Deployment is disabled");
        require(authorizedDeployers[msg.sender] || msg.sender == owner(), "Not authorized to deploy");
        
        TicketMarketplace marketplaceContract = new TicketMarketplace();
        return address(marketplaceContract);
    }
    
    /**
     * @dev Desplegar TicketValidator con TicketNFT existente
     */
    function deployValidator(address _ticketNFT) external returns (address) {
        require(deploymentEnabled, "Deployment is disabled");
        require(authorizedDeployers[msg.sender] || msg.sender == owner(), "Not authorized to deploy");
        require(_ticketNFT != address(0), "Invalid TicketNFT address");
        
        TicketValidator validatorContract = new TicketValidator(_ticketNFT);
        return address(validatorContract);
    }
    
    /**
     * @dev Desplegar TicketFactory con TicketNFT existente
     */
    function deployFactory(address _ticketNFT) external returns (address) {
        require(deploymentEnabled, "Deployment is disabled");
        require(authorizedDeployers[msg.sender] || msg.sender == owner(), "Not authorized to deploy");
        require(_ticketNFT != address(0), "Invalid TicketNFT address");
        
        TicketFactory factoryContract = new TicketFactory(_ticketNFT);
        return address(factoryContract);
    }
    
    /**
     * @dev Obtener información de un deployment
     */
    function getDeployment(uint256 _deploymentId) external view returns (DeploymentInfo memory) {
        return deployments[_deploymentId];
    }
    
    /**
     * @dev Obtener deployment por versión
     */
    function getDeploymentByVersion(string memory _version) external view returns (DeploymentInfo memory) {
        uint256 deploymentId = versionToDeployment[_version];
        require(deploymentId > 0, "Version not found");
        return deployments[deploymentId];
    }
    
    /**
     * @dev Obtener el último deployment
     */
    function getLatestDeployment() external view returns (DeploymentInfo memory) {
        require(deploymentCounter > 0, "No deployments found");
        return deployments[deploymentCounter];
    }
    
    /**
     * @dev Obtener todos los deployments
     */
    function getAllDeployments() external view returns (DeploymentInfo[] memory) {
        DeploymentInfo[] memory allDeployments = new DeploymentInfo[](deploymentCounter);
        
        for (uint256 i = 1; i <= deploymentCounter; i++) {
            allDeployments[i - 1] = deployments[i];
        }
        
        return allDeployments;
    }
    
    /**
     * @dev Obtener estadísticas de deployments
     */
    function getDeploymentStats() external view returns (
        uint256 _totalDeployments,
        uint256 _activeDeployments,
        string memory _currentVersion
    ) {
        _totalDeployments = deploymentCounter;
        _currentVersion = currentVersion;
        
        // Contar deployments activos
        for (uint256 i = 1; i <= deploymentCounter; i++) {
            if (deployments[i].isActive) {
                _activeDeployments++;
            }
        }
    }
    
    /**
     * @dev Actualizar versión actual
     */
    function updateVersion(string memory _newVersion) external onlyOwner {
        require(bytes(_newVersion).length > 0, "Version cannot be empty");
        string memory oldVersion = currentVersion;
        currentVersion = _newVersion;
        emit VersionUpdated(oldVersion, _newVersion);
    }
    
    /**
     * @dev Activar/desactivar deployment
     */
    function toggleDeployment(bool _enabled) external onlyOwner {
        deploymentEnabled = _enabled;
        emit DeploymentToggled(_enabled);
    }
    
    /**
     * @dev Autorizar deployer
     */
    function authorizeDeployer(address _deployer) external onlyOwner {
        require(_deployer != address(0), "Invalid deployer address");
        authorizedDeployers[_deployer] = true;
        emit DeployerAuthorized(_deployer);
    }
    
    /**
     * @dev Revocar autorización de deployer
     */
    function revokeDeployer(address _deployer) external onlyOwner {
        require(_deployer != address(0), "Invalid deployer address");
        authorizedDeployers[_deployer] = false;
        emit DeployerRevoked(_deployer);
    }
    
    /**
     * @dev Marcar deployment como inactivo
     */
    function deactivateDeployment(uint256 _deploymentId) external onlyOwner {
        require(_deploymentId > 0 && _deploymentId <= deploymentCounter, "Invalid deployment ID");
        deployments[_deploymentId].isActive = false;
    }
    
    /**
     * @dev Verificar si una dirección está autorizada para deployar
     */
    function isAuthorizedDeployer(address _deployer) external view returns (bool) {
        return authorizedDeployers[_deployer];
    }
    
    /**
     * @dev Obtener información de contratos por deployment
     */
    function getContractAddresses(uint256 _deploymentId) external view returns (
        address ticketNFT,
        address marketplace,
        address validator,
        address factory,
        address simpleFactory
    ) {
        require(_deploymentId > 0 && _deploymentId <= deploymentCounter, "Invalid deployment ID");
        DeploymentInfo memory deployment = deployments[_deploymentId];
        
        ticketNFT = deployment.ticketNFT;
        marketplace = deployment.marketplace;
        validator = deployment.validator;
        factory = deployment.factory;
        simpleFactory = deployment.simpleFactory;
    }
    
    /**
     * @dev Retirar fondos del contrato (solo owner)
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner()).transfer(balance);
    }
}
