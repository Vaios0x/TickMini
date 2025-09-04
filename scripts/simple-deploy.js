const { ethers } = require("hardhat");
const fs = require('fs');

async function main() {
  console.log("🚀 Desplegando contratos de TickBase...");

  const [deployer] = await ethers.getSigners();
  console.log("📋 Desplegando con la cuenta:", deployer.address);

  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("💰 Balance:", ethers.formatEther(balance), "ETH");

  console.log("\n🎫 Desplegando TicketNFT...");
  const TicketNFT = await ethers.getContractFactory("TicketNFT");
  const ticketNFT = await TicketNFT.deploy();

  await ticketNFT.waitForDeployment();
  const address = await ticketNFT.getAddress();

  console.log("✅ TicketNFT desplegado en:", address);
  
  const config = {
    TICKET_NFT: address,
    DEPLOYER: deployer.address,
    NETWORK: (await deployer.provider.getNetwork()).name,
    CHAIN_ID: Number((await deployer.provider.getNetwork()).chainId)
  };

  fs.writeFileSync('./deployment-config.json', JSON.stringify(config, null, 2));
  console.log("📝 Configuración guardada en deployment-config.json");
}

main().catch(console.error);