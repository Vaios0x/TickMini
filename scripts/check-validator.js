const { ethers } = require("hardhat");
require("@nomicfoundation/hardhat-ethers");

async function main() {
  // Dirección del validador a verificar
  const VALIDATOR_ADDRESS = "0x8ca5CB396bF3AB2186942B5d6F9CedbDAFEeA343";
  
  console.log("🔍 Verificando estado del validador...");
  console.log("=" .repeat(50));

  try {
    // Leer configuración de despliegue
    const fs = require('fs');
    let config;
    
    try {
      const configData = fs.readFileSync('./deployment-config.json', 'utf8');
      config = JSON.parse(configData);
    } catch (error) {
      console.error("❌ Error: No se encontró deployment-config.json");
      process.exit(1);
    }

    const validatorAddress = config.contracts.VALIDATOR;
    console.log("📋 Contrato TicketValidator:", validatorAddress);
    console.log("👤 Validador a verificar:", VALIDATOR_ADDRESS);
    console.log("");

    // Conectar al contrato TicketValidator usando hardhat network
    const TicketValidator = await ethers.getContractFactory("TicketValidator");
    const validator = TicketValidator.attach(validatorAddress);

    // Verificar si el validador está autorizado
    console.log("🔍 Consultando estado de autorización...");
    const isAuthorized = await validator.isAuthorizedValidator(VALIDATOR_ADDRESS);
    
    console.log("📋 RESULTADO:");
    console.log("=" .repeat(30));
    if (isAuthorized) {
      console.log("✅ El validador ESTÁ autorizado");
      console.log("🎉 Puedes usar la aplicación de validación");
    } else {
      console.log("❌ El validador NO está autorizado");
      console.log("🚀 Ejecuta: npm run authorize:validator");
    }

    // Información adicional del contrato
    console.log("");
    console.log("📋 INFORMACIÓN DEL CONTRATO:");
    console.log("=" .repeat(35));
    
    try {
      const owner = await validator.owner();
      console.log("👤 Owner del contrato:", owner);
      
      const validationEnabled = await validator.validationEnabled();
      console.log("🔧 Validación habilitada:", validationEnabled ? "Sí" : "No");
      
      const validationWindow = await validator.validationWindow();
      console.log("⏰ Ventana de validación:", validationWindow.toString(), "segundos");
      
      const ticketNFTAddress = await validator.ticketNFT();
      console.log("🎫 Contrato TicketNFT:", ticketNFTAddress);
      
    } catch (error) {
      console.log("⚠️  No se pudo obtener información adicional:", error.message);
    }

    console.log("");
    console.log("🔗 Ver contrato en explorer:");
    console.log(`https://sepolia.basescan.org/address/${validatorAddress}#readContract`);

  } catch (error) {
    console.error("❌ Error durante la verificación:", error.message);
    
    if (error.code === 'NETWORK_ERROR') {
      console.log("🌐 Verifica tu conexión a internet");
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