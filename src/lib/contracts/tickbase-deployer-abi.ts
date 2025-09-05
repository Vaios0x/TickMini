// ABI del contrato TickBaseDeployer
export const TICKBASE_DEPLOYER_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "deploymentId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "version",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "ticketNFT",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "marketplace",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "validator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "factory",
        "type": "address"
      }
    ],
    "name": "DeploymentCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "deployer",
        "type": "address"
      }
    ],
    "name": "DeployerAuthorized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "deployer",
        "type": "address"
      }
    ],
    "name": "DeployerRevoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bool",
        "name": "enabled",
        "type": "bool"
      }
    ],
    "name": "DeploymentToggled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "oldVersion",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "newVersion",
        "type": "string"
      }
    ],
    "name": "VersionUpdated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "authorizedDeployers",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_deployer",
        "type": "address"
      }
    ],
    "name": "authorizeDeployer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "currentVersion",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_deploymentId",
        "type": "uint256"
      }
    ],
    "name": "deactivateDeployment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "deployMarketplace",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_version",
        "type": "string"
      }
    ],
    "name": "deployTickBase",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "deploymentId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "ticketNFT",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "marketplace",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "validator",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "factory",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "simpleFactory",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_ticketNFT",
        "type": "address"
      }
    ],
    "name": "deployFactory",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "deployTicketNFT",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_ticketNFT",
        "type": "address"
      }
    ],
    "name": "deployValidator",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "deploymentCounter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "deploymentEnabled",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "deployments",
    "outputs": [
      {
        "internalType": "address",
        "name": "ticketNFT",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "marketplace",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "validator",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "factory",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "simpleFactory",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deployedAt",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "version",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllDeployments",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "ticketNFT",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "marketplace",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "validator",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "factory",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "simpleFactory",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "deployedAt",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "version",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isActive",
            "type": "bool"
          }
        ],
        "internalType": "struct TickBaseDeployer.DeploymentInfo[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_deploymentId",
        "type": "uint256"
      }
    ],
    "name": "getContractAddresses",
    "outputs": [
      {
        "internalType": "address",
        "name": "ticketNFT",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "marketplace",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "validator",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "factory",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "simpleFactory",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_deploymentId",
        "type": "uint256"
      }
    ],
    "name": "getDeployment",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "ticketNFT",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "marketplace",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "validator",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "factory",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "simpleFactory",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "deployedAt",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "version",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isActive",
            "type": "bool"
          }
        ],
        "internalType": "struct TickBaseDeployer.DeploymentInfo",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getDeploymentStats",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_totalDeployments",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_activeDeployments",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_currentVersion",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_version",
        "type": "string"
      }
    ],
    "name": "getDeploymentByVersion",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "ticketNFT",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "marketplace",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "validator",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "factory",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "simpleFactory",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "deployedAt",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "version",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isActive",
            "type": "bool"
          }
        ],
        "internalType": "struct TickBaseDeployer.DeploymentInfo",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getLatestDeployment",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "ticketNFT",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "marketplace",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "validator",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "factory",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "simpleFactory",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "deployedAt",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "version",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isActive",
            "type": "bool"
          }
        ],
        "internalType": "struct TickBaseDeployer.DeploymentInfo",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_deployer",
        "type": "address"
      }
    ],
    "name": "isAuthorizedDeployer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_deployer",
        "type": "address"
      }
    ],
    "name": "revokeDeployer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_enabled",
        "type": "bool"
      }
    ],
    "name": "toggleDeployment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_newVersion",
        "type": "string"
      }
    ],
    "name": "updateVersion",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "versionToDeployment",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const
