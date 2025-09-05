const { ethers } = require("hardhat");

async function main() {
  // Dirección del validador a autorizar
  const VALIDATOR_ADDRESS = "0x8ca5CB396bF3AB2186942B5d6F9CedbDAFEeA343";
  
  console.log("🔐 Autorizando validador...");
  console.log("=" .repeat(50));

  // Obtener el deployer/owner
  const [deployer] = await ethers.getSigners();
  console.log("📋 Ejecutando con la cuenta:", deployer.address);

  // Verificar balance
  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("💰 Balance de la cuenta:", ethers.formatEther(balance), "ETH");

  const network = await deployer.provider.getNetwork();
  console.log("🌐 Red:", network.name, "| Chain ID:", network.chainId);
  console.log("");

  try {
    // Leer configuración de despliegue
    const fs = require('fs');
    let config;
    
    try {
      const configData = fs.readFileSync('./deployment-config.json', 'utf8');
      config = JSON.parse(configData);
    } catch (error) {
      console.error("❌ Error: No se encontró deployment-config.json");
      console.log("🚀 Ejecuta primero: npm run deploy:baseSepolia");
      process.exit(1);
    }

    if (!config.contracts || !config.contracts.VALIDATOR || config.contracts.VALIDATOR === "0x0000000000000000000000000000000000000000") {
      console.error("❌ Error: El contrato TicketValidator no ha sido desplegado correctamente");
      console.log("🚀 Ejecuta primero: npm run deploy:baseSepolia");
      process.exit(1);
    }

    const validatorAddress = config.contracts.VALIDATOR;
    console.log("🔍 Contrato TicketValidator encontrado en:", validatorAddress);

    // Conectar al contrato TicketValidator
    const TicketValidator = await ethers.getContractFactory("TicketValidator");
    const validator = TicketValidator.attach(validatorAddress);

    // Verificar si el validador ya está autorizado
    console.log("🔍 Verificando estado actual del validador...");
    const isAlreadyAuthorized = await validator.isAuthorizedValidator(VALIDATOR_ADDRESS);
    
    if (isAlreadyAuthorized) {
      console.log("✅ El validador ya está autorizado");
      console.log("📋 Dirección del validador:", VALIDATOR_ADDRESS);
      return;
    }

    // Verificar que somos el owner del contrato
    const owner = await validator.owner();
    if (owner.toLowerCase() !== deployer.address.toLowerCase()) {
      console.error("❌ Error: No eres el owner del contrato TicketValidator");
      console.log("👤 Owner actual:", owner);
      console.log("👤 Tu dirección:", deployer.address);
      process.exit(1);
    }

    console.log("✅ Confirmado como owner del contrato");
    console.log("");

    // Autorizar el validador
    console.log("🔐 Autorizando validador:", VALIDATOR_ADDRESS);
    const tx = await validator.authorizeValidator(VALIDATOR_ADDRESS);
    console.log("⏳ Transacción enviada:", tx.hash);
    
    console.log("⏳ Esperando confirmación...");
    const receipt = await tx.wait();
    
    if (receipt.status === 1) {
      console.log("✅ Validador autorizado exitosamente!");
      console.log("📋 Transacción confirmada en el bloque:", receipt.blockNumber);
      console.log("⛽ Gas usado:", receipt.gasUsed.toString());
    } else {
      console.error("❌ La transacción falló");
      process.exit(1);
    }

    // Verificar que la autorización fue exitosa
    console.log("🔍 Verificando autorización...");
    const isNowAuthorized = await validator.isAuthorizedValidator(VALIDATOR_ADDRESS);
    
    if (isNowAuthorized) {
      console.log("✅ Verificación exitosa: El validador está autorizado");
    } else {
      console.error("❌ Error: La autorización no se completó correctamente");
      process.exit(1);
    }

    console.log("");
    console.log("📋 RESUMEN:");
    console.log("=" .repeat(50));
    console.log("🔐 Validador autorizado:", VALIDATOR_ADDRESS);
    console.log("🏭 Contrato TicketValidator:", validatorAddress);
    console.log("⛓️ Red:", network.name, "(" + network.chainId + ")");
    console.log("📋 Hash de transacción:", tx.hash);
    
    if (network.name !== "hardhat") {
      console.log("🔍 Ver en explorer:", `https://sepolia.basescan.org/tx/${tx.hash}`);
    }

    console.log("");
    console.log("🎉 ¡Autorización completada exitosamente!");
    console.log("📱 Ahora puedes usar la aplicación de validación con esta wallet.");

  } catch (error) {
    console.error("❌ Error durante la autorización:", error);
    
    // Información adicional para debugging
    if (error.code === 'CALL_EXCEPTION') {
      console.log("💡 Posibles causas:");
      console.log("   - El contrato no está desplegado correctamente");
      console.log("   - No tienes permisos de owner");
      console.log("   - La red no es la correcta");
    }
    
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error fatal:", error);
    process.exit(1);
  });