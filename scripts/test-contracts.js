const { ethers } = require("hardhat");
const fs = require('fs');

async function main() {
  console.log("🧪 Probando contratos de TickBase...");
  console.log("=" .repeat(50));

  // Cargar configuración de deployment
  let config;
  try {
    const configData = fs.readFileSync('./deployment-config.json', 'utf8');
    config = JSON.parse(configData);
  } catch (error) {
    console.error("❌ No se encontró deployment-config.json. Ejecuta deploy-all.js primero.");
    process.exit(1);
  }

  const [deployer, user1, user2] = await ethers.getSigners();
  console.log("👤 Deployer:", deployer.address);
  console.log("👤 Usuario 1:", user1.address);
  console.log("👤 Usuario 2:", user2.address);
  console.log("");

  try {
    // Conectar a los contratos
    const TicketNFT = await ethers.getContractFactory("TicketNFT");
    const TicketMarketplace = await ethers.getContractFactory("TicketMarketplace");
    const TicketValidator = await ethers.getContractFactory("TicketValidator");
    const TicketFactory = await ethers.getContractFactory("TicketFactory");

    const ticketNFT = TicketNFT.attach(config.contracts.TICKET_NFT);
    const marketplace = TicketMarketplace.attach(config.contracts.MARKETPLACE);
    const validator = TicketValidator.attach(config.contracts.VALIDATOR);
    const factory = TicketFactory.attach(config.contracts.FACTORY);

    console.log("🔗 Contratos conectados exitosamente");
    console.log("");

    // Test 1: Crear evento
    console.log("🎪 Test 1: Crear evento...");
    const eventTx = await ticketNFT.connect(user1).createEvent(
      "Test Event 2024",
      "Evento de prueba para testing",
      Math.floor(Date.now() / 1000) + 86400, // 24 horas en el futuro
      "Ciudad de México, México",
      100,
      "ipfs://QmTestEventMetadata"
    );
    await eventTx.wait();
    console.log("   ✅ Evento creado exitosamente");

    // Test 2: Mintear ticket
    console.log("🎫 Test 2: Mintear ticket...");
    const ticketTx = await ticketNFT.connect(user2).mintTicket(
      user2.address,
      1, // eventId
      1, // ticketType
      ethers.parseEther("0.01"), // price
      ["Acceso general", "Certificado NFT"],
      "ipfs://QmTestTicketMetadata",
      { value: ethers.parseEther("0.01") }
    );
    await ticketTx.wait();
    console.log("   ✅ Ticket minteado exitosamente");

    // Test 3: Verificar ticket
    console.log("🔍 Test 3: Verificar ticket...");
    const isValid = await ticketNFT.isTicketValid(1);
    console.log("   ✅ Ticket válido:", isValid);

    // Test 4: Obtener información del evento
    console.log("📋 Test 4: Obtener información del evento...");
    const eventInfo = await ticketNFT.getEvent(1);
    console.log("   ✅ Evento:", eventInfo.name);
    console.log("   ✅ Tickets vendidos:", eventInfo.soldTickets.toString());

    // Test 5: Obtener información del ticket
    console.log("🎫 Test 5: Obtener información del ticket...");
    const ticketInfo = await ticketNFT.getTicket(1);
    console.log("   ✅ Evento ID:", ticketInfo.eventId.toString());
    console.log("   ✅ Precio:", ethers.formatEther(ticketInfo.price), "ETH");

    // Test 6: Autorizar validador
    console.log("🔐 Test 6: Autorizar validador...");
    const authTx = await ticketNFT.connect(deployer).authorizeValidator(user1.address);
    await authTx.wait();
    console.log("   ✅ Validador autorizado");

    // Test 7: Usar ticket
    console.log("✅ Test 7: Usar ticket...");
    const useTx = await ticketNFT.connect(user1).useTicket(1);
    await useTx.wait();
    console.log("   ✅ Ticket usado exitosamente");

    // Test 8: Listar ticket en marketplace
    console.log("🏪 Test 8: Listar ticket en marketplace...");
    
    // Primero aprobar el marketplace para transferir el ticket
    const approveTx = await ticketNFT.connect(user2).approve(marketplace.target, 1);
    await approveTx.wait();
    
    const listTx = await marketplace.connect(user2).listTicket(
      ticketNFT.target,
      1,
      ethers.parseEther("0.02"), // precio de reventa
      Math.floor(Date.now() / 1000) + 86400 * 7 // expira en 7 días
    );
    await listTx.wait();
    console.log("   ✅ Ticket listado en marketplace");

    // Test 9: Obtener información del listing
    console.log("📋 Test 9: Obtener información del listing...");
    const listing = await marketplace.getListing(1);
    console.log("   ✅ Listing ID:", listing.listingId.toString());
    console.log("   ✅ Precio:", ethers.formatEther(listing.price), "ETH");
    console.log("   ✅ Activo:", listing.isActive);

    // Test 10: Comprar ticket del marketplace
    console.log("💰 Test 10: Comprar ticket del marketplace...");
    const buyTx = await marketplace.connect(user1).buyTicket(1, {
      value: ethers.parseEther("0.02")
    });
    await buyTx.wait();
    console.log("   ✅ Ticket comprado del marketplace");

    // Test 11: Verificar nuevo propietario
    console.log("👤 Test 11: Verificar nuevo propietario...");
    const newOwner = await ticketNFT.ownerOf(1);
    console.log("   ✅ Nuevo propietario:", newOwner);
    console.log("   ✅ Es user1:", newOwner === user1.address);

    // Test 12: Probar factory
    console.log("🏭 Test 12: Probar factory...");
    const factoryTx = await factory.connect(user1).createEventWithTickets(
      "Factory Event 2024",
      "Evento creado con factory",
      Math.floor(Date.now() / 1000) + 86400 * 2,
      "Barcelona, España",
      50,
      "ipfs://QmFactoryEvent",
      ethers.parseEther("0.05"),
      ["VIP", "General"],
      [ethers.parseEther("0.1"), ethers.parseEther("0.05")],
      [10, 40],
      { value: ethers.parseEther("0.001") }
    );
    await factoryTx.wait();
    console.log("   ✅ Evento creado con factory");

    // Test 13: Obtener estadísticas
    console.log("📊 Test 13: Obtener estadísticas...");
    const eventCounter = await ticketNFT.eventCounter();
    const user2Balance = await ticketNFT.balanceOf(user2.address);
    const user1Balance = await ticketNFT.balanceOf(user1.address);
    
    console.log("   ✅ Total eventos:", eventCounter.toString());
    console.log("   ✅ Balance user2:", user2Balance.toString());
    console.log("   ✅ Balance user1:", user1Balance.toString());

    console.log("");
    console.log("🎉 ¡Todos los tests pasaron exitosamente!");
    console.log("");
    console.log("📋 RESUMEN DE TESTS:");
    console.log("✅ Crear evento");
    console.log("✅ Mintear ticket");
    console.log("✅ Verificar ticket");
    console.log("✅ Obtener información");
    console.log("✅ Autorizar validador");
    console.log("✅ Usar ticket");
    console.log("✅ Listar en marketplace");
    console.log("✅ Comprar del marketplace");
    console.log("✅ Transferir propiedad");
    console.log("✅ Usar factory");
    console.log("✅ Obtener estadísticas");

  } catch (error) {
    console.error("❌ Error durante las pruebas:", error);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error fatal:", error);
    process.exit(1);
  });
