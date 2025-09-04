// ABI del contrato TicketNFT
export const TICKET_NFT_ABI = [
  // Eventos
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "eventId", "type": "uint256"},
      {"indexed": false, "internalType": "string", "name": "name", "type": "string"},
      {"indexed": true, "internalType": "address", "name": "organizer", "type": "address"}
    ],
    "name": "EventCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256"},
      {"indexed": true, "internalType": "uint256", "name": "eventId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "owner", "type": "address"}
    ],
    "name": "TicketMinted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256"},
      {"indexed": true, "internalType": "uint256", "name": "eventId", "type": "uint256"}
    ],
    "name": "TicketUsed",
    "type": "event"
  },
  
  // Funciones de lectura
  {
    "inputs": [{"internalType": "uint256", "name": "_eventId", "type": "uint256"}],
    "name": "getEvent",
    "outputs": [{
      "components": [
        {"internalType": "uint256", "name": "eventId", "type": "uint256"},
        {"internalType": "string", "name": "name", "type": "string"},
        {"internalType": "string", "name": "description", "type": "string"},
        {"internalType": "uint256", "name": "eventDate", "type": "uint256"},
        {"internalType": "string", "name": "location", "type": "string"},
        {"internalType": "address", "name": "organizer", "type": "address"},
        {"internalType": "uint256", "name": "totalTickets", "type": "uint256"},
        {"internalType": "uint256", "name": "soldTickets", "type": "uint256"},
        {"internalType": "bool", "name": "isActive", "type": "bool"},
        {"internalType": "string", "name": "metadataURI", "type": "string"}
      ],
      "internalType": "struct TicketNFT.EventInfo",
      "name": "",
      "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_tokenId", "type": "uint256"}],
    "name": "getTicket",
    "outputs": [{
      "components": [
        {"internalType": "uint256", "name": "eventId", "type": "uint256"},
        {"internalType": "uint256", "name": "ticketType", "type": "uint256"},
        {"internalType": "uint256", "name": "price", "type": "uint256"},
        {"internalType": "uint256", "name": "purchaseDate", "type": "uint256"},
        {"internalType": "string[]", "name": "benefits", "type": "string[]"},
        {"internalType": "bool", "name": "isTransferable", "type": "bool"}
      ],
      "internalType": "struct TicketNFT.TicketInfo",
      "name": "",
      "type": "tuple"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_tokenId", "type": "uint256"}],
    "name": "isTicketValid",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "ownerOf",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "tokenURI",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "eventCounter",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  
  // Funciones de escritura
  {
    "inputs": [
      {"internalType": "string", "name": "_name", "type": "string"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "uint256", "name": "_eventDate", "type": "uint256"},
      {"internalType": "string", "name": "_location", "type": "string"},
      {"internalType": "uint256", "name": "_totalTickets", "type": "uint256"},
      {"internalType": "string", "name": "_metadataURI", "type": "string"}
    ],
    "name": "createEvent",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "_to", "type": "address"},
      {"internalType": "uint256", "name": "_eventId", "type": "uint256"},
      {"internalType": "uint256", "name": "_ticketType", "type": "uint256"},
      {"internalType": "uint256", "name": "_price", "type": "uint256"},
      {"internalType": "string[]", "name": "_benefits", "type": "string[]"},
      {"internalType": "string", "name": "_tokenURI", "type": "string"}
    ],
    "name": "mintTicket",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address[]", "name": "_to", "type": "address[]"},
      {"internalType": "uint256", "name": "_eventId", "type": "uint256"},
      {"internalType": "uint256[]", "name": "_ticketTypes", "type": "uint256[]"},
      {"internalType": "uint256[]", "name": "_prices", "type": "uint256[]"},
      {"internalType": "string[][]", "name": "_benefits", "type": "string[][]"},
      {"internalType": "string[]", "name": "_tokenURIs", "type": "string[]"}
    ],
    "name": "batchMintTickets",
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_tokenId", "type": "uint256"}],
    "name": "useTicket",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "from", "type": "address"},
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "uint256", "name": "tokenId", "type": "uint256"}
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "from", "type": "address"},
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "uint256", "name": "tokenId", "type": "uint256"}
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "uint256", "name": "tokenId", "type": "uint256"}
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "uint256", "name": "index", "type": "uint256"}
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "_exists",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const