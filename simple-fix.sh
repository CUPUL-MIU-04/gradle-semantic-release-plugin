#!/bin/bash

echo "Corrigiendo archivos TypeScript..."

# Corregir gradle.ts línea 36
sed -i '36s/\\\`-P/`-P/g' src/gradle.ts
sed -i '36s/=\\\${value}\\\`/=${value}`/g' src/gradle.ts

# Corregir verify-conditions.ts línea 22
sed -i '22s/\\\`build\.gradle/`build.gradle/g' src/verify-conditions.ts
sed -i '22s/\\\${buildGradlePath}\\\`/${buildGradlePath}`/g' src/verify-conditions.ts

# Eliminar líneas vacías problemáticas
sed -i '58d' src/gradle.ts 2>/dev/null || true
sed -i '43d' src/verify-conditions.ts 2>/dev/null || true

echo "Corrección aplicada. Verificando archivos..."
echo "=== Línea 36 de gradle.ts ==="
sed -n '36p' src/gradle.ts
echo "=== Línea 22 de verify-conditions.ts ==="
sed -n '22p' src/verify-conditions.ts
