const { ethers } = require("ethers");
require('dotenv').config();

async function main() {
  console.log("🏭 Desplegando TicketFactory...");
  console.log("=" .repeat(40));

  // Configurar provider y wallet
  const provider = new ethers.JsonRpcProvider("https://sepolia.base.org");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  
  console.log("👤 Desplegando con:", wallet.address);
  const balance = await provider.getBalance(wallet.address);
  console.log("💰 Balance:", ethers.formatEther(balance), "ETH");

  if (balance < ethers.parseEther("0.01")) {
    console.error("❌ Balance insuficiente");
    process.exit(1);
  }

  try {
    // Leer el ABI y bytecode del contrato compilado
    const fs = require('fs');
    const artifactPath = './artifacts/contracts/TicketFactory.sol/TicketFactory.json';
    const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));

    // Crear factory del contrato
    const TicketFactory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);

    // TicketNFT address (ya desplegado)
    const ticketNFTAddress = "0xB409A4908102A9Ec3e4e65a30e97706df38fbdd7";

    console.log("🚀 Desplegando TicketFactory...");
    
    // Estimar gas
    const estimatedGas = await TicketFactory.getDeployTransaction(ticketNFTAddress).then(tx => 
      provider.estimateGas(tx)
    );
    console.log("⛽ Gas estimado:", estimatedGas.toString());

    // Desplegar
    const contract = await TicketFactory.deploy(ticketNFTAddress, {
      gasLimit: estimatedGas * BigInt(120) / BigInt(100) // 20% extra
    });

    console.log("⏳ Esperando confirmación...");
    await contract.waitForDeployment();
    
    const contractAddress = await contract.getAddress();
    console.log("✅ TicketFactory desplegado en:", contractAddress);

    // Verificar despliegue
    const code = await provider.getCode(contractAddress);
    if (code === "0x") {
      console.error("❌ Error: Contrato no desplegado correctamente");
      process.exit(1);
    }

    console.log("✅ Verificación exitosa");

    // Actualizar configuración
    const configPath = './deployment-config.json';
    let config = {};
    
    try {
      config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (e) {
      config = {
        network: {
          name: "Base Sepolia",
          chainId: 84532,
          rpcUrl: "https://sepolia.base.org"
        },
        contracts: {},
        status: { deployed: false }
      };
    }

    config.contracts.FACTORY = contractAddress;
    config.status.deployed = true;
    config.status.lastDeployment = new Date().toISOString();

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log("📝 Configuración actualizada");

    console.log("");
    console.log("🎉 DESPLIEGUE COMPLETADO");
    console.log("=" .repeat(30));
    console.log("📋 TicketFactory:", contractAddress);
    console.log("🔗 Explorer:", `https://sepolia.basescan.org/address/${contractAddress}`);
    
    return contractAddress;

  } catch (error) {
    console.error("❌ Error durante el despliegue:", error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("❌ Error fatal:", error);
      process.exit(1);
    });
}

module.exports = { main };