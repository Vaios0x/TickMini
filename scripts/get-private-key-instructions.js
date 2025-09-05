console.log("🔑 INSTRUCCIONES para obtener tu CLAVE PRIVADA");
console.log("=" .repeat(55));
console.log("");

console.log("📱 MÉTODO 1: Desde MetaMask");
console.log("1. Abre MetaMask");
console.log("2. Haz clic en los 3 puntos (⋮) junto a tu cuenta");
console.log("3. Selecciona 'Account details'");
console.log("4. Haz clic en 'Export private key'");
console.log("5. Ingresa tu contraseña de MetaMask");
console.log("6. Copia la clave privada (SIN el prefijo 0x)");
console.log("");

console.log("🌐 MÉTODO 2: Desde WalletConnect/Coinbase Wallet");
console.log("1. Abre tu wallet");
console.log("2. Ve a Settings > Security");
console.log("3. Busca 'Private Key' o 'Export'");
console.log("4. Confirma con tu PIN/biometría");
console.log("5. Copia la clave (SIN el prefijo 0x)");
console.log("");

console.log("⚡ PASOS RÁPIDOS:");
console.log("1. Obtén tu clave privada (sin 0x)");
console.log("2. Edita .env y reemplaza 'tu_clave_privada_sin_0x'");
console.log("3. Ejecuta: npm run fix:validator");
console.log("4. ¡Listo! Podrás acceder a /validation");
console.log("");

console.log("⚠️  IMPORTANTE:");
console.log("❌ NUNCA compartas tu clave privada");
console.log("❌ NUNCA la subas a GitHub");
console.log("✅ Solo úsala localmente en tu .env");
console.log("");

console.log("💰 También necesitas:");
console.log("- Al menos 0.001 ETH en Base Sepolia");
console.log("- Puedes obtener ETH gratis en:");
console.log("  https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet");
console.log("");

console.log("🆘 ¿PROBLEMAS?");
console.log("- Ejecuta: npm run check:validator (para ver el estado)");
console.log("- Tu wallet: 0x8ca5CB396bF3AB2186942B5d6F9CedbDAFEeA343");
console.log("- Contrato: 0xB1627A905EB21938009f5fA97C9dd35ffB9F1e82");