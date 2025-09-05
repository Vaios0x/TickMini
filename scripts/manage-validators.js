const { ethers } = require("ethers");
const readline = require('readline');

// Configuración
const VALIDATOR_CONTRACT = "0xB1627A905EB21938009f5fA97C9dd35ffB9F1e82";

// ABI para gestión de validadores
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
    "name": "revokeValidator",
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
        "name": "_validator",
        "type": "address"
      }
    ],
    "name": "getValidatorStats",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

class ValidatorManager {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async initialize() {
    console.log("🔐 GESTOR DE VALIDADORES - TickBase");
    console.log("=" .repeat(45));
    console.log("📋 Contrato:", VALIDATOR_CONTRACT);
    console.log("");

    // Configurar conexión
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
      console.error("❌ Error: PRIVATE_KEY no encontrada en .env");
      process.exit(1);
    }

    const provider = new ethers.JsonRpcProvider("https://sepolia.base.org");
    this.wallet = new ethers.Wallet(privateKey, provider);
    this.contract = new ethers.Contract(VALIDATOR_CONTRACT, VALIDATOR_ABI, this.wallet);

    console.log("👤 Conectado como:", this.wallet.address);
    
    // Verificar que somos el owner
    const owner = await this.contract.owner();
    if (owner.toLowerCase() !== this.wallet.address.toLowerCase()) {
      console.error("❌ Error: No eres el owner del contrato");
      console.log("   Owner:", owner);
      console.log("   Tu wallet:", this.wallet.address);
      process.exit(1);
    }

    console.log("✅ Confirmado como owner del contrato");
    
    // Verificar balance
    const balance = await provider.getBalance(this.wallet.address);
    console.log("💰 Balance:", ethers.formatEther(balance), "ETH");
    
    if (balance < ethers.parseEther("0.001")) {
      console.log("⚠️  Balance bajo. Recomendado: al menos 0.001 ETH");
    }
    console.log("");
  }

  async showMenu() {
    console.log("📋 OPCIONES DISPONIBLES:");
    console.log("1. ➕ Autorizar nuevo validador");
    console.log("2. ❌ Revocar validador existente");
    console.log("3. 📋 Ver estado de validador");
    console.log("4. 📊 Ver estadísticas de validador");
    console.log("5. 📝 Listar validadores comunes");
    console.log("6. 🚪 Salir");
    console.log("");
  }

  async promptUser(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  async authorizeValidator() {
    console.log("\n➕ AUTORIZAR NUEVO VALIDADOR");
    console.log("-" .repeat(30));
    
    const address = await this.promptUser("📝 Ingresa la dirección del validador (0x...): ");
    
    if (!ethers.isAddress(address)) {
      console.error("❌ Dirección inválida");
      return;
    }

    // Verificar si ya está autorizado
    const isAuthorized = await this.contract.isAuthorizedValidator(address);
    if (isAuthorized) {
      console.log("⚠️  Este validador ya está autorizado");
      return;
    }

    console.log("⏳ Autorizando validador...");
    
    try {
      const tx = await this.contract.authorizeValidator(address);
      console.log("⏳ Transacción enviada:", tx.hash);
      
      const receipt = await tx.wait();
      if (receipt.status === 1) {
        console.log("✅ Validador autorizado exitosamente!");
        console.log("📋 Gas usado:", receipt.gasUsed.toString());
        console.log("🔗 Ver en explorer: https://sepolia.basescan.org/tx/" + tx.hash);
      }
    } catch (error) {
      console.error("❌ Error al autorizar:", error.message);
    }
  }

  async revokeValidator() {
    console.log("\n❌ REVOCAR VALIDADOR");
    console.log("-" .repeat(20));
    
    const address = await this.promptUser("📝 Ingresa la dirección del validador a revocar: ");
    
    if (!ethers.isAddress(address)) {
      console.error("❌ Dirección inválida");
      return;
    }

    // Verificar si está autorizado
    const isAuthorized = await this.contract.isAuthorizedValidator(address);
    if (!isAuthorized) {
      console.log("⚠️  Este validador no está autorizado");
      return;
    }

    // Confirmar acción
    const confirm = await this.promptUser("⚠️  ¿Estás seguro? (si/no): ");
    if (confirm.toLowerCase() !== 'si' && confirm.toLowerCase() !== 'yes') {
      console.log("❌ Operación cancelada");
      return;
    }

    console.log("⏳ Revocando validador...");
    
    try {
      const tx = await this.contract.revokeValidator(address);
      console.log("⏳ Transacción enviada:", tx.hash);
      
      const receipt = await tx.wait();
      if (receipt.status === 1) {
        console.log("✅ Validador revocado exitosamente!");
        console.log("📋 Gas usado:", receipt.gasUsed.toString());
      }
    } catch (error) {
      console.error("❌ Error al revocar:", error.message);
    }
  }

  async checkValidatorStatus() {
    console.log("\n📋 VERIFICAR ESTADO DE VALIDADOR");
    console.log("-" .repeat(35));
    
    const address = await this.promptUser("📝 Ingresa la dirección del validador: ");
    
    if (!ethers.isAddress(address)) {
      console.error("❌ Dirección inválida");
      return;
    }

    console.log("🔍 Consultando estado...");
    
    try {
      const isAuthorized = await this.contract.isAuthorizedValidator(address);
      const stats = await this.contract.getValidatorStats(address);
      
      console.log("📊 RESULTADO:");
      console.log("  Dirección:", address);
      console.log("  Autorizado:", isAuthorized ? "✅ Sí" : "❌ No");
      console.log("  Validaciones realizadas:", stats.toString());
      
      if (isAuthorized) {
        console.log("  Estado: 🟢 Activo - Puede validar tickets");
      } else {
        console.log("  Estado: 🔴 Inactivo - Necesita autorización");
      }
      
    } catch (error) {
      console.error("❌ Error al consultar:", error.message);
    }
  }

  async showValidatorStats() {
    console.log("\n📊 ESTADÍSTICAS DE VALIDADOR");
    console.log("-" .repeat(30));
    
    const address = await this.promptUser("📝 Ingresa la dirección del validador: ");
    
    if (!ethers.isAddress(address)) {
      console.error("❌ Dirección inválida");
      return;
    }

    console.log("📊 Obteniendo estadísticas...");
    
    try {
      const isAuthorized = await this.contract.isAuthorizedValidator(address);
      const validationCount = await this.contract.getValidatorStats(address);
      
      console.log("\n📋 ESTADÍSTICAS COMPLETAS:");
      console.log("=" .repeat(40));
      console.log("👤 Validador:", address);
      console.log("🔐 Autorizado:", isAuthorized ? "✅ Sí" : "❌ No");
      console.log("📊 Total validaciones:", validationCount.toString());
      
      if (validationCount > 0) {
        console.log("🏆 Rendimiento: Validador activo");
        console.log("📈 Estado: Operativo");
      } else {
        console.log("📉 Rendimiento: Sin validaciones aún");
        console.log("🔄 Estado: Nuevo/Inactivo");
      }
      
    } catch (error) {
      console.error("❌ Error al obtener estadísticas:", error.message);
    }
  }

  showCommonValidators() {
    console.log("\n📝 VALIDADORES COMUNES SUGERIDOS:");
    console.log("-" .repeat(40));
    console.log("🏢 Personal del evento:");
    console.log("  • Staff de seguridad");
    console.log("  • Coordinadores de evento");
    console.log("  • Personal de recepción");
    console.log("");
    console.log("🎭 Roles típicos:");
    console.log("  • Organizador principal (tu wallet)");
    console.log("  • Co-organizadores");
    console.log("  • Supervisores de entrada");
    console.log("  • Personal de soporte técnico");
    console.log("");
    console.log("💡 Recomendación:");
    console.log("  • Máximo 5-10 validadores por evento");
    console.log("  • Revocar acceso después del evento");
    console.log("  • Mantener registro de quién tiene acceso");
  }

  async run() {
    try {
      await this.initialize();
      
      while (true) {
        await this.showMenu();
        const choice = await this.promptUser("Selecciona una opción (1-6): ");
        
        switch (choice) {
          case '1':
            await this.authorizeValidator();
            break;
          case '2':
            await this.revokeValidator();
            break;
          case '3':
            await this.checkValidatorStatus();
            break;
          case '4':
            await this.showValidatorStats();
            break;
          case '5':
            this.showCommonValidators();
            break;
          case '6':
            console.log("👋 ¡Hasta luego!");
            process.exit(0);
            break;
          default:
            console.log("❌ Opción inválida. Selecciona 1-6.");
        }
        
        console.log("\n" + "=" .repeat(50) + "\n");
      }
      
    } catch (error) {
      console.error("❌ Error fatal:", error);
      process.exit(1);
    } finally {
      this.rl.close();
    }
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  const manager = new ValidatorManager();
  manager.run();
}

module.exports = ValidatorManager;