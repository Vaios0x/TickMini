const { ethers } = require("ethers");
require('dotenv').config();

// Configuración
const VALIDATOR_CONTRACT = "0xB1627A905EB21938009f5fA97C9dd35ffB9F1e82";
const OWNER_ADDRESS = "0x8ca5CB396bF3AB2186942B5d6F9CedbDAFEeA343";

// ABI mínima necesaria
const VALIDATOR_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_validator",
        "type": "address"
      }
    ],
    "name": "authorizeValidator",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
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
  }
];

async function main() {
  console.log("🔐 Auto-autorizando wallet owner como validador...");
  console.log("=" .repeat(55));
  console.log("📋 Contrato TicketValidator:", VALIDATOR_CONTRACT);
  console.log("👤 Owner/Validador:", OWNER_ADDRESS);
  console.log("");

  try {
    // Conectar a Base Sepolia
    const provider = new ethers.JsonRpcProvider("https://sepolia.base.org");
    
    // Necesitamos la clave privada desde variables de entorno
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
      console.error("❌ Error: PRIVATE_KEY no encontrada en .env");
      console.log("📝 Añade tu clave privada al archivo .env:");
      console.log("   PRIVATE_KEY=tu_clave_privada_aqui");
      process.exit(1);
    }

    // Crear wallet con la clave privada
    const wallet = new ethers.Wallet(privateKey, provider);
    console.log("👤 Conectado con wallet:", wallet.address);
    
    // Verificar que la wallet es la correcta
    if (wallet.address.toLowerCase() !== OWNER_ADDRESS.toLowerCase()) {
      console.error("❌ Error: La clave privada no corresponde al owner esperado");
      console.log("   Esperado:", OWNER_ADDRESS);
      console.log("   Actual:", wallet.address);
      process.exit(1);
    }

    // Verificar balance
    const balance = await provider.getBalance(wallet.address);
    console.log("💰 Balance:", ethers.formatEther(balance), "ETH");
    
    if (balance < ethers.parseEther("0.001")) {
      console.error("❌ Balance insuficiente. Necesitas al menos 0.001 ETH");
      console.log("🚰 Obtén ETH de prueba: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet");
      process.exit(1);
    }

    // Conectar al contrato
    const contract = new ethers.Contract(VALIDATOR_CONTRACT, VALIDATOR_ABI, wallet);

    // Verificar estado actual
    console.log("🔍 Verificando estado actual...");
    const isCurrentlyAuthorized = await contract.isAuthorizedValidator(OWNER_ADDRESS);
    
    if (isCurrentlyAuthorized) {
      console.log("✅ Ya estás autorizado como validador!");
      console.log("🎉 Puedes acceder a /validation sin problemas");
      return;
    }

    console.log("⚠️  No estás autorizado aún. Procediendo con la autorización...");
    console.log("");

    // Estimar gas para la transacción
    console.log("⛽ Estimando gas...");
    const gasEstimate = await contract.authorizeValidator.estimateGas(OWNER_ADDRESS);
    console.log("⛽ Gas estimado:", gasEstimate.toString());

    // Ejecutar la autorización
    console.log("🔐 Ejecutando autorización...");
    const tx = await contract.authorizeValidator(OWNER_ADDRESS, {
      gasLimit: gasEstimate * BigInt(120) / BigInt(100) // 20% extra
    });
    
    console.log("⏳ Transacción enviada:", tx.hash);
    console.log("⏳ Esperando confirmación...");
    
    const receipt = await tx.wait();
    
    if (receipt.status === 1) {
      console.log("✅ ¡Autorización completada exitosamente!");
      console.log("📋 Bloque:", receipt.blockNumber);
      console.log("⛽ Gas usado:", receipt.gasUsed.toString());
    } else {
      console.error("❌ La transacción falló");
      process.exit(1);
    }

    // Verificar que la autorización funcionó
    console.log("");
    console.log("🔍 Verificando autorización final...");
    const isNowAuthorized = await contract.isAuthorizedValidator(OWNER_ADDRESS);
    
    if (isNowAuthorized) {
      console.log("✅ ¡Verificación exitosa!");
      console.log("");
      console.log("🎉 AUTORIZACIÓN COMPLETADA");
      console.log("=" .repeat(35));
      console.log("✅ Ahora puedes acceder a /validation");
      console.log("✅ Puedes validar tickets");
      console.log("✅ Tienes acceso completo al sistema");
      console.log("");
      console.log("🔗 Ver transacción:");
      console.log(`https://sepolia.basescan.org/tx/${tx.hash}`);
    } else {
      console.error("❌ Error: La autorización no se aplicó correctamente");
      process.exit(1);
    }

  } catch (error) {
    console.error("❌ Error durante la autorización:", error.message);
    
    if (error.code === 'INSUFFICIENT_FUNDS') {
      console.log("💰 Necesitas más ETH en tu wallet");
    } else if (error.code === 'NETWORK_ERROR') {
      console.log("🌐 Problema de conexión a la red");
    } else if (error.message.includes('execution reverted')) {
      console.log("🔒 El contrato rechazó la transacción");
    }
    
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("❌ Error fatal:", error);
      process.exit(1);
    });
}

module.exports = { main };