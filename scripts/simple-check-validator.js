const { ethers } = require("ethers");

const VALIDATOR_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_validator",
        "type": "address"
      }
    ],
    "name": "isAuthorizedValidator",
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
    "inputs": [],
    "name": "validationEnabled",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

async function main() {
  const VALIDATOR_ADDRESS = "0x8ca5CB396bF3AB2186942B5d6F9CedbDAFEeA343";
  const CONTRACT_ADDRESS = "0xB1627A905EB21938009f5fA97C9dd35ffB9F1e82";
  
  console.log("🔍 Verificando estado del validador...");
  console.log("=" .repeat(50));
  console.log("📋 Contrato:", CONTRACT_ADDRESS);
  console.log("👤 Validador:", VALIDATOR_ADDRESS);
  console.log("");

  try {
    // Conectar a Base Sepolia
    const provider = new ethers.JsonRpcProvider("https://sepolia.base.org");
    const contract = new ethers.Contract(CONTRACT_ADDRESS, VALIDATOR_ABI, provider);

    // Verificar autorización
    console.log("🔍 Consultando estado de autorización...");
    const isAuthorized = await contract.isAuthorizedValidator(VALIDATOR_ADDRESS);
    
    console.log("📋 RESULTADO:");
    console.log("=" .repeat(30));
    if (isAuthorized) {
      console.log("✅ El validador ESTÁ autorizado");
      console.log("🎉 Puedes usar la aplicación de validación");
    } else {
      console.log("❌ El validador NO está autorizado");
      console.log("🚀 Necesitas ejecutar: npm run authorize:validator");
    }

    // Información adicional
    console.log("");
    console.log("📋 INFORMACIÓN ADICIONAL:");
    console.log("=" .repeat(35));
    
    try {
      const owner = await contract.owner();
      console.log("👤 Owner del contrato:", owner);
      
      const validationEnabled = await contract.validationEnabled();
      console.log("🔧 Validación habilitada:", validationEnabled ? "Sí" : "No");
      
    } catch (error) {
      console.log("⚠️  Información limitada disponible");
    }

    console.log("");
    console.log("🔗 Ver en explorer:");
    console.log(`https://sepolia.basescan.org/address/${CONTRACT_ADDRESS}#readContract`);

    return isAuthorized;

  } catch (error) {
    console.error("❌ Error:", error.message);
    return false;
  }
}

main()
  .then((result) => {
    process.exit(result ? 0 : 1);
  })
  .catch((error) => {
    console.error("❌ Error fatal:", error);
    process.exit(1);
  });