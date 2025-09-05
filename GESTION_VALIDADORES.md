# 🔐 Sistema de Gestión de Validadores - TickBase

## 🎯 Propósito
Permitir que múltiples personas puedan validar tickets durante eventos, no solo el owner del contrato.

## 👥 Casos de Uso Reales

### 🎪 Evento Grande (Concierto, Festival)
- **Organizador principal** (tu wallet) → Owner + Validador
- **Staff de seguridad** (3-5 personas) → Solo validadores
- **Coordinadores de entrada** (2-3 personas) → Solo validadores
- **Personal técnico** (1-2 personas) → Solo validadores

### 🏢 Evento Corporativo
- **Event Manager** → Owner + Validador
- **Recepcionistas** → Solo validadores
- **Personal de catering** → Solo validadores (verificar comidas)
- **Seguridad del edificio** → Solo validadores

### 🎓 Graduación/Académico
- **Coordinador académico** → Owner + Validador
- **Personal administrativo** → Solo validadores
- **Seguridad universitaria** → Solo validadores
- **Voluntarios estudiantes** → Solo validadores

---

## 🛠️ Comandos Disponibles

### 🚀 Comandos Rápidos

| Comando | Descripción | Uso |
|---------|-------------|-----|
| `npm run fix:validator` | **Autorizar TU wallet** (owner) | Para ti mismo |
| `npm run authorize:specific -- 0xADDRESS` | **Autorizar wallet específica** | Para empleados |
| `npm run manage:validators` | **Menú interactivo completo** | Gestión avanzada |
| `npm run check:validator` | **Ver estado de cualquier wallet** | Verificación |

### 📋 Comandos Detallados

#### 1️⃣ **Autorizarte a Ti Mismo** (Más común)
```bash
npm run fix:validator
```
- ✅ Autoriza tu wallet como validador
- ✅ Solo necesitas tu clave privada en .env
- ✅ Perfecto para eventos pequeños donde solo tú validas

#### 2️⃣ **Autorizar Personal/Empleados** (Recomendado)
```bash
npm run authorize:specific -- 0x1234567890123456789012345678901234567890
```
- ✅ Autoriza cualquier otra wallet
- ✅ Ideal para staff de eventos
- ✅ Mantén el control como owner

#### 3️⃣ **Gestión Avanzada** (Para múltiples validadores)
```bash
npm run manage:validators
```
Menú interactivo con:
- ➕ Autorizar nuevos validadores
- ❌ Revocar validadores existentes
- 📊 Ver estadísticas de cada validador
- 📋 Verificar estado de cualquier wallet

#### 4️⃣ **Verificar Estado**
```bash
npm run check:validator
```
- 🔍 Ve el estado de tu wallet
- 📊 Información del contrato
- ✅ Confirma autorizaciones

---

## 🏗️ Flujo Típico de Evento

### 📅 **Antes del Evento** (1-2 días antes)

1. **Autorízate como validador:**
   ```bash
   npm run fix:validator
   ```

2. **Obtén las wallets de tu equipo:**
   - Pide a cada persona que te dé su dirección de wallet
   - Ejemplo: `0x1234...abcd`

3. **Autoriza a tu equipo:**
   ```bash
   npm run authorize:specific -- 0xWALLET_DEL_EMPLEADO_1
   npm run authorize:specific -- 0xWALLET_DEL_EMPLEADO_2
   npm run authorize:specific -- 0xWALLET_DEL_EMPLEADO_3
   ```

### 🎪 **Durante el Evento**

- **Todo el equipo** puede acceder a `/validation`
- **Cada persona** puede validar tickets independientemente
- **Estadísticas en tiempo real** de quién validó qué

### 📊 **Después del Evento**

1. **Ver estadísticas:**
   ```bash
   npm run manage:validators
   # Opción 4: Ver estadísticas de validador
   ```

2. **Revocar accesos (opcional):**
   ```bash
   npm run manage:validators
   # Opción 2: Revocar validador existente
   ```

---

## 💡 Mejores Prácticas

### ✅ **Recomendaciones**

#### 👥 **Número de Validadores**
- **Eventos pequeños** (≤100 personas): 1-2 validadores
- **Eventos medianos** (100-500): 3-5 validadores  
- **Eventos grandes** (500+): 5-10 validadores

#### 🔐 **Seguridad**
- ✅ Solo autoriza personas de confianza
- ✅ Usa wallets específicas para cada empleado
- ✅ Revoca acceso después del evento
- ✅ Mantén registro de quién autorizaste

#### 📱 **Operación**
- ✅ Entrena a tu equipo antes del evento
- ✅ Asegúrate de que tengan `/validation` en favoritos
- ✅ Prueba con tickets de test antes del evento real

### ❌ **Evitar**

- ❌ No compartas tu clave privada de owner
- ❌ No autorices wallets desconocidas
- ❌ No dejes validadores autorizados permanentemente
- ❌ No uses la misma wallet para múltiples eventos

---

## 🎭 Roles y Permisos

| Rol | Permisos | Puede hacer |
|-----|----------|-------------|
| **Owner** (Tu wallet) | **Todos** | • Autorizar/Revocar validadores<br>• Validar tickets<br>• Ver todas las estadísticas<br>• Gestionar contrato |
| **Validador Autorizado** | **Solo validación** | • Validar tickets<br>• Ver sus propias estadísticas<br>• Acceder a /validation<br>• Exportar sus reportes |
| **Usuario Normal** | **Solo verificación** | • Verificar tickets en /verify-ticket<br>• Ver información pública |

---

## 📊 Monitoreo y Estadísticas

### 🔍 **Lo que puedes rastrear:**
- ✅ **Quién** validó cada ticket
- ✅ **Cuándo** se validó
- ✅ **Cuántos** tickets validó cada persona
- ✅ **Rendimiento** de tu equipo
- ✅ **Reportes** exportables por validador

### 📈 **Dashboard por validador:**
- 📊 Total de validaciones
- ⏰ Horarios de actividad
- 📋 Historial completo
- 💾 Exportar datos

---

## 🆘 Resolución de Problemas

### ❌ **"Error: No eres el owner"**
- Solo tú (owner) puedes autorizar otros validadores
- Usa tu wallet original, no delegues esta función

### ❌ **"Validador ya autorizado"**
- La wallet ya tiene permisos
- Usa `npm run check:validator` para confirmar

### ❌ **"Balance insuficiente"**
- Necesitas ~0.001 ETH por autorización
- Obtén ETH del faucet: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet

### ❌ **"Dirección inválida"**
- Verifica que la dirección tenga 42 caracteres
- Debe empezar con `0x`
- Ejemplo: `0x1234567890123456789012345678901234567890`

---

## 🏁 Resumen Ejecutivo

**Problema resuelto:** ✅ Múltiples personas pueden validar tickets  
**Beneficio:** 🚀 Escalabilidad para eventos grandes  
**Control:** 🔐 Tú mantienes control total como owner  
**Flexibilidad:** ⚡ Autoriza/revoca validadores dinámicamente  
**Trazabilidad:** 📊 Estadísticas detalladas por validador

### 🎯 **Para empezar YA:**
1. `npm run fix:validator` (autorízate)
2. `npm run authorize:specific -- 0xWALLET_DEL_EMPLEADO` (autoriza staff)
3. ¡Tu equipo ya puede usar `/validation`!

**Costo total:** ~0.001-0.005 ETH por evento (~$0.003-0.015 USD)