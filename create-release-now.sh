#!/bin/bash

echo "=== Creando Release Manual ==="

# 1. Determinar nueva versión basada en commits
echo "Analizando commits para determinar nueva versión..."

# Ver últimos commits
echo "Últimos commits:"
git log --oneline -10

# Preguntar tipo de release
echo ""
echo "¿Qué tipo de release quieres crear basado en los commits?"
echo "1) patch (1.10.3 → 1.10.4) - para bug fixes"
echo "2) minor (1.10.3 → 1.11.0) - para nuevas features"
echo "3) major (1.10.3 → 2.0.0) - para cambios breaking"
read -p "Selecciona (1-3): " release_type

# 2. Ejecutar pruebas
echo "Ejecutando pruebas..."
npm test

# 3. Compilar
echo "Compilando TypeScript..."
npm run build

# 4. Incrementar versión
case $release_type in
    1) 
        npm version patch
        VERSION_TYPE="patch"
        ;;
    2) 
        npm version minor
        VERSION_TYPE="minor"
        ;;
    3) 
        npm version major
        VERSION_TYPE="major"
        ;;
    *)
        echo "Opción inválida, usando patch por defecto"
        npm version patch
        VERSION_TYPE="patch"
        ;;
esac

# 5. Obtener nueva versión
NEW_VERSION=$(node -p "require('./package.json').version")
echo "Nueva versión: $NEW_VERSION"

# 6. Actualizar CHANGELOG.md automáticamente
echo "Actualizando CHANGELOG.md..."
CURRENT_DATE=$(date +%Y-%m-%d)
cat > CHANGELOG.tmp << CHANGELOG
# Changelog

## [$NEW_VERSION] - $CURRENT_DATE

### Added
- Compatibilidad completa con semantic-release v25.0.2+
- Scripts de prueba mejorados para Termux/ARM
- Configuración de CI optimizada

### Fixed
- Errores de tipos TypeScript en los mocks de Jest
- Problemas de importación de módulos ES (execa v7 → v5)
- Configuración de CI para evitar fallos en GitHub Actions

### Changed
- Actualizadas definiciones de tipos para Context de semantic-release v25
- Mejorada la documentación de compatibilidad
- Actualizado peerDependencies para ser más preciso
- README.md actualizado con información de compatibilidad

$(tail -n +2 CHANGELOG.md)
CHANGELOG

mv CHANGELOG.tmp CHANGELOG.md

# 7. Crear paquete npm
echo "Creando paquete npm..."
npm pack
PACKAGE_FILE="gradle-semantic-release-plugin-${NEW_VERSION}.tgz"

# 8. Hacer commit
echo "Haciendo commit de los cambios..."
git add .
git commit -m "chore(release): $NEW_VERSION

- Compatibilidad con semantic-release v25+
- Errores de TypeScript corregidos
- CI optimizado
- Documentación actualizada"

# 9. Crear tag
echo "Creando tag v$NEW_VERSION..."
git tag -a "v$NEW_VERSION" -m "Release v$NEW_VERSION

- Compatibilidad completa con semantic-release v25.0.2+
- Errores de tipos TypeScript resueltos
- Mejor soporte para Termux/ARM
- CI configurado correctamente"

# 10. Mostrar resumen
echo ""
echo "=== RESUMEN ==="
echo "✅ Nueva versión: $NEW_VERSION"
echo "✅ CHANGELOG.md actualizado"
echo "✅ Paquete creado: $PACKAGE_FILE"
echo "✅ Commit listo"
echo "✅ Tag creado: v$NEW_VERSION"
echo ""
echo "=== INSTRUCCIONES PARA COMPLETAR ==="
echo ""
echo "1. HACER PUSH DE LOS CAMBIOS:"
echo "   git push origin master"
echo "   git push origin v$NEW_VERSION"
echo ""
echo "2. CREAR RELEASE EN GITHUB:"
echo "   a) Ve a: https://github.com/CUPUL-MIU-04/gradle-semantic-release-plugin/releases"
echo "   b) Haz clic en 'Draft a new release'"
echo "   c) Selecciona el tag 'v$NEW_VERSION'"
echo "   d) Título: 'v$NEW_VERSION'"
echo "   e) Descripción: Copia desde CHANGELOG.md la sección $NEW_VERSION"
echo "   f) Adjunta el archivo: $PACKAGE_FILE"
echo "   g) Publica el release"
echo ""
echo "3. OPCIONAL - PUBLICAR EN NPM:"
echo "   npm login"
echo "   npm publish $PACKAGE_FILE"
echo ""
echo "=== RELEASE LISTO PARA PUBLICAR ==="
