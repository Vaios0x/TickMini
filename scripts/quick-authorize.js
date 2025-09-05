const { ethers } = require("ethers");

// Configuración
const VALIDATOR_CONTRACT = "0xB1627A905EB21938009f5fA97C9dd35ffB9F1e82";

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

async function authorizeValidator(validatorAddress) {
  console.log("➕ AUTORIZANDO VALIDADOR");
  console.log("=" .repeat(30));
  console.log("📋 Contrato:", VALIDATOR_CONTRACT);
  console.log("👤 Validador:", validatorAddress);
  console.log("");

  try {
    // Validar dirección
    if (!ethers.isAddress(validatorAddress)) {
      console.error("❌ Error: Dirección inválida");
      console.log("📝 Formato correcto: 0x1234...abcd (42 caracteres)");
      process.exit(1);
    }

    // Configurar conexión
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
      console.error("❌ Error: PRIVATE_KEY no encontrada en .env");
      console.log("🔧 Ejecuta: npm run help:private-key");
      process.exit(1);
    }

    const provider = new ethers.JsonRpcProvider("https://sepolia.base.org");
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(VALIDATOR_CONTRACT, VALIDATOR_ABI, wallet);

    console.log("👤 Conectado como owner:", wallet.address);

    // Verificar balance
    const balance = await provider.getBalance(wallet.address);
    console.log("💰 Balance:", ethers.formatEther(balance), "ETH");
    
    if (balance < ethers.parseEther("0.001")) {
      console.error("❌ Balance insuficiente. Necesitas al menos 0.001 ETH");
      console.log("🚰 Faucet: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet");
      process.exit(1);
    }

    // Verificar si ya está autorizado
    console.log("🔍 Verificando estado actual...");
    const isCurrentlyAuthorized = await contract.isAuthorizedValidator(validatorAddress);
    
    if (isCurrentlyAuthorized) {
      console.log("✅ Este validador ya está autorizado!");
      console.log("🎉 Puede acceder a /validation sin problemas");
      return;
    }

    // Autorizar validador
    console.log("⏳ Enviando transacción de autorización...");
    const tx = await contract.authorizeValidator(validatorAddress);
    console.log("📋 Transacción:", tx.hash);
    
    console.log("⏳ Esperando confirmación...");
    const receipt = await tx.wait();
    
    if (receipt.status === 1) {
      console.log("✅ ¡Validador autorizado exitosamente!");
      console.log("📋 Bloque:", receipt.blockNumber);
      console.log("⛽ Gas usado:", receipt.gasUsed.toString());
      
      // Verificar autorización
      const isNowAuthorized = await contract.isAuthorizedValidator(validatorAddress);
      if (isNowAuthorized) {
        console.log("");
        console.log("🎉 AUTORIZACIÓN COMPLETADA");
        console.log("=" .repeat(35));
        console.log("✅ El validador ahora puede:");
        console.log("   • Acceder a /validation");
        console.log("   • Validar tickets NFT");
        console.log("   • Ver dashboard y estadísticas");
        console.log("   • Exportar reportes");
        console.log("");
        console.log("🔗 Ver transacción:");
        console.log(`https://sepolia.basescan.org/tx/${tx.hash}`);
      } else {
        console.error("❌ Error: La autorización no se aplicó correctamente");
      }
    } else {
      console.error("❌ La transacción falló");
      process.exit(1);
    }

  } catch (error) {
    console.error("❌ Error durante la autorización:", error.message);
    process.exit(1);
  }
}

// Ejecutar desde línea de comandos
async function main() {
  const validatorAddress = process.argv[2];
  
  if (!validatorAddress) {
    console.log("🔐 AUTORIZAR VALIDADOR ESPECÍFICO");
    console.log("=" .repeat(40));
    console.log("");
    console.log("📝 USO:");
    console.log("  npm run authorize:specific -- 0xDIRECCION_DEL_VALIDADOR");
    console.log("");
    console.log("💡 EJEMPLOS:");
    console.log("  npm run authorize:specific -- 0x1234567890123456789012345678901234567890");
    console.log("  npm run authorize:specific -- 0xAbCdEf1234567890AbCdEf1234567890AbCdEf12");
    console.log("");
    console.log("🆘 OTROS COMANDOS:");
    console.log("  npm run fix:validator          # Autorizar tu propia wallet");
    console.log("  npm run manage:validators       # Menú interactivo completo");
    console.log("  npm run check:validator         # Ver estado actual");
    console.log("");
    process.exit(1);
  }

  await authorizeValidator(validatorAddress);
}

if (require.main === module) {
  main().catch((error) => {
    console.error("❌ Error fatal:", error);
    process.exit(1);
  });
}

module.exports = { authorizeValidator };