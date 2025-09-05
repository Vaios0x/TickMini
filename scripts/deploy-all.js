const { ethers } = require("hardhat");
const fs = require('fs');
const path = require('path');
require("@nomicfoundation/hardhat-ethers");

async function main() {
  console.log("🚀 Desplegando todos los contratos de TickBase...");
  console.log("=" .repeat(50));

  // Obtener el deployer
  const [deployer] = await ethers.getSigners();
  console.log("📋 Desplegando con la cuenta:", deployer.address);

  // Verificar balance
  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("💰 Balance de la cuenta:", ethers.formatEther(balance), "ETH");

  if (balance < ethers.parseEther("0.01")) {
    console.error("❌ Balance insuficiente. Necesitas al menos 0.01 ETH para el despliegue completo.");
    process.exit(1);
  }

  const network = await deployer.provider.getNetwork();
  console.log("🌐 Red:", network.name, "| Chain ID:", network.chainId);
  console.log("");

  try {
    // 1. Desplegar TicketNFT
    console.log("🎫 1/4 Desplegando TicketNFT...");
    const TicketNFT = await ethers.getContractFactory("TicketNFT");
    const ticketNFT = await TicketNFT.deploy();
    await ticketNFT.waitForDeployment();
    const ticketNFTAddress = await ticketNFT.getAddress();
    console.log("   ✅ TicketNFT desplegado en:", ticketNFTAddress);

    // 2. Desplegar TicketMarketplace
    console.log("🏪 2/4 Desplegando TicketMarketplace...");
    const TicketMarketplace = await ethers.getContractFactory("TicketMarketplace");
    const marketplace = await TicketMarketplace.deploy();
    await marketplace.waitForDeployment();
    const marketplaceAddress = await marketplace.getAddress();
    console.log("   ✅ TicketMarketplace desplegado en:", marketplaceAddress);

    // 3. Desplegar TicketValidator
    console.log("🔍 3/4 Desplegando TicketValidator...");
    const TicketValidator = await ethers.getContractFactory("TicketValidator");
    const validator = await TicketValidator.deploy(ticketNFTAddress);
    await validator.waitForDeployment();
    const validatorAddress = await validator.getAddress();
    console.log("   ✅ TicketValidator desplegado en:", validatorAddress);

    // 4. Desplegar TicketFactory
    console.log("🏭 4/4 Desplegando TicketFactory...");
    const TicketFactory = await ethers.getContractFactory("TicketFactory");
    const factory = await TicketFactory.deploy(ticketNFTAddress);
    await factory.waitForDeployment();
    const factoryAddress = await factory.getAddress();
    console.log("   ✅ TicketFactory desplegado en:", factoryAddress);

    // 5. Desplegar TickBaseDeployer (opcional)
    console.log("🔧 5/5 Desplegando TickBaseDeployer...");
    const TickBaseDeployer = await ethers.getContractFactory("TickBaseDeployer");
    const deployerContract = await TickBaseDeployer.deploy();
    await deployerContract.waitForDeployment();
    const deployerAddress = await deployerContract.getAddress();
    console.log("   ✅ TickBaseDeployer desplegado en:", deployerAddress);

    console.log("");
    console.log("🔍 Verificando despliegues...");

    // Verificar que todos los contratos fueron desplegados correctamente
    const contracts = [
      { name: "TicketNFT", address: ticketNFTAddress },
      { name: "TicketMarketplace", address: marketplaceAddress },
      { name: "TicketValidator", address: validatorAddress },
      { name: "TicketFactory", address: factoryAddress },
      { name: "TickBaseDeployer", address: deployerAddress }
    ];

    for (const contract of contracts) {
      const code = await deployer.provider.getCode(contract.address);
      if (code === "0x") {
        console.error(`❌ Error: ${contract.name} no se desplegó correctamente`);
        process.exit(1);
      }
      console.log(`   ✅ ${contract.name} verificado`);
    }

    // Crear configuración completa
    const config = {
      network: {
        name: network.name,
        chainId: Number(network.chainId),
        rpcUrl: network.name === "hardhat" ? "http://localhost:8545" : "https://sepolia.base.org"
      },
      deployer: deployer.address,
      deployedAt: new Date().toISOString(),
      contracts: {
        TICKET_NFT: ticketNFTAddress,
        MARKETPLACE: marketplaceAddress,
        VALIDATOR: validatorAddress,
        FACTORY: factoryAddress,
        DEPLOYER: deployerAddress
      },
      gasUsed: {
        estimated: "~5,000,000 gas",
        actual: "Verificar en explorer"
      }
    };

    // Guardar configuración
    const configPath = './deployment-config.json';
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(`📝 Configuración guardada en: ${configPath}`);

    // Crear archivo de configuración para el frontend
    const frontendConfig = {
      chainId: Number(network.chainId),
      contracts: {
        TICKET_NFT: ticketNFTAddress,
        MARKETPLACE: marketplaceAddress,
        VALIDATOR: validatorAddress,
        FACTORY: factoryAddress
      }
    };

    const frontendConfigPath = './frontend-config.json';
    fs.writeFileSync(frontendConfigPath, JSON.stringify(frontendConfig, null, 2));
    console.log(`📝 Configuración del frontend guardada en: ${frontendConfigPath}`);

    // Mostrar resumen
    console.log("");
    console.log("📋 RESUMEN DEL DESPLIEGUE:");
    console.log("=" .repeat(50));
    console.log("Red:", network.name);
    console.log("Chain ID:", network.chainId);
    console.log("Deployer:", deployer.address);
    console.log("");
    console.log("Contratos desplegados:");
    console.log("🎫 TicketNFT:", ticketNFTAddress);
    console.log("🏪 Marketplace:", marketplaceAddress);
    console.log("🔍 Validator:", validatorAddress);
    console.log("🏭 Factory:", factoryAddress);
    console.log("🔧 Deployer:", deployerAddress);
    console.log("");

    // Comandos de verificación
    if (network.name !== "hardhat") {
      console.log("🔍 Comandos para verificar contratos:");
      console.log(`npx hardhat verify --network ${network.name} ${ticketNFTAddress}`);
      console.log(`npx hardhat verify --network ${network.name} ${marketplaceAddress}`);
      console.log(`npx hardhat verify --network ${network.name} ${validatorAddress} "${ticketNFTAddress}"`);
      console.log(`npx hardhat verify --network ${network.name} ${factoryAddress} "${ticketNFTAddress}"`);
      console.log(`npx hardhat verify --network ${network.name} ${deployerAddress}`);
    }

    console.log("");
    console.log("🎉 ¡Despliegue completado exitosamente!");
    console.log("");
    console.log("📋 PRÓXIMOS PASOS:");
    console.log("1. Actualizar las direcciones en src/lib/contracts/contract-addresses.ts");
    console.log("2. Actualizar el ABI en src/lib/contracts/");
    console.log("3. Probar las funciones de los contratos");
    console.log("4. Configurar validadores autorizados");
    console.log("5. Probar el marketplace secundario");

  } catch (error) {
    console.error("❌ Error durante el despliegue:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error fatal:", error);
    process.exit(1);
  });
