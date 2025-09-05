# Configuración de Validador - TickBase

## Resumen
Para resolver el error "Acceso denegado" en el sistema de validación, necesitas autorizar tu wallet como validador en el contrato inteligente.

## Estado Actual
- ✅ Contratos desplegados en Base Sepolia
- ✅ ABI actualizada con funciones correctas
- ❌ Wallet `0x8ca5CB396bF3AB2186942B5d6F9CedbDAFEeA343` no autorizada como validador

## Contratos Desplegados

| Contrato | Dirección | Estado |
|----------|-----------|---------|
| TicketNFT | `0xB409A4908102A9Ec3e4e65a30e97706df38fbdd7` | ✅ Activo |
| TicketMarketplace | `0xbd31a954BadFe27D4f8fD1E6bcA445A69e60B5Dd` | ✅ Activo |
| TicketValidator | `0xB1627A905EB21938009f5fA97C9dd35ffB9F1e82` | ✅ Activo |
| TicketFactory | `0xcA4b95E7131117f42e3aCc100cD1d58802AF6066` | ✅ Activo |

## Pasos para Autorizar Validador

### 1. Configurar Variables de Entorno

Añade las siguientes líneas a tu archivo `.env`:

```env
# Clave privada de la wallet que deployó los contratos (owner)
PRIVATE_KEY=tu_clave_privada_del_owner

# RPC URL de Base Sepolia (opcional, ya está configurada por defecto)
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
```

### 2. Ejecutar Script de Autorización

```bash
npm run authorize:validator
```

Este comando:
- Se conectará al contrato TicketValidator en Base Sepolia
- Verificará que eres el owner del contrato
- Autorizará la wallet `0x8ca5CB396bF3AB2186942B5d6F9CedbDAFEeA343` como validador
- Confirmará que la autorización fue exitosa

### 3. Verificar Autorización (Opcional)

Para verificar manualmente que la autorización fue exitosa, puedes:

1. Ir a [Base Sepolia Explorer](https://sepolia.basescan.org/address/0xB1627A905EB21938009f5fA97C9dd35ffB9F1e82#readContract)
2. Conectar tu wallet
3. Llamar a la función `isAuthorizedValidator` con la dirección `0x8ca5CB396bF3AB2186942B5d6F9CedbDAFEeA343`
4. Debería retornar `true`

## Solución de Problemas

### Error: "No eres el owner del contrato"
- Asegúrate de usar la clave privada de la wallet que deployó los contratos
- Verifica que estás en la red correcta (Base Sepolia)

### Error: "Balance insuficiente"
- Necesitas al menos 0.001 ETH en Base Sepolia para pagar el gas
- Puedes obtener ETH de prueba en [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet)

### Error: "Contrato no encontrado"
- Verifica que los contratos están desplegados correctamente
- Confirma que estás conectado a Base Sepolia (Chain ID: 84532)

## Scripts Disponibles

| Comando | Descripción |
|---------|------------|
| `npm run compile` | Compila los contratos |
| `npm run deploy:baseSepolia` | Despliega todos los contratos en Base Sepolia |
| `npm run authorize:validator` | Autoriza el validador especificado |
| `npm run test:contracts` | Ejecuta tests locales de los contratos |

## Después de la Autorización

Una vez autorizada tu wallet:

1. ✅ Podrás acceder al sistema de validación
2. ✅ Podrás validar tickets NFT
3. ✅ Tendrás acceso a las funciones de validador en la aplicación
4. ✅ El error "Acceso denegado" desaparecerá

## Información Adicional

- **Red**: Base Sepolia Testnet
- **Chain ID**: 84532
- **RPC URL**: https://sepolia.base.org
- **Explorer**: https://sepolia.basescan.org
- **Validador a autorizar**: `0x8ca5CB396bF3AB2186942B5d6F9CedbDAFEeA343`

---

## Contacto

Si encuentras problemas durante este proceso, revisa:
1. Que tienes ETH en Base Sepolia
2. Que estás usando la clave privada correcta
3. Que estás conectado a la red correcta

¡Una vez completados estos pasos, tu sistema de validación estará completamente funcional!