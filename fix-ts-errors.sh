#!/bin/bash

echo "=== Corrigiendo errores de TypeScript ==="

# 1. Corregir src/definition.ts
cat > src/definition.ts << 'DEF'
// Importar tipos correctamente de semantic-release v25
import type { Context as SemanticContext } from 'semantic-release';

export interface PluginConfig {
  gradleCommand?: string;
  gradleOptions?: string[];
  gradleProperties?: Record<string, string>;
  buildGradle?: string;
  gradleWrapper?: string;
  gradlePropertiesFile?: string;
}

export interface GradleContext extends SemanticContext {
  options: {
    [key: string]: any;
  };
  logger: any;
}

// Re-exportar tipos para compatibilidad
export type Context = SemanticContext;
export type NextRelease = any;
export type LastRelease = any;
DEF

# 2. Corregir src/gradle.ts
cat > src/gradle.ts << 'GRADLE'
import { execa } from 'execa';
import fs from 'fs-extra';
import path from 'path';

export interface GradleOptions {
  cwd: string;
  gradleCommand?: string;
  gradleOptions?: string[];
  gradleProperties?: Record<string, string>;
  logger?: any;
}

export async function runGradle(
  task: string,
  options: GradleOptions
): Promise<void> {
  const {
    cwd,
    gradleCommand = './gradlew',
    gradleOptions = [],
    gradleProperties = {},
    logger,
  } = options;

  // Ensure gradlew is executable
  if (gradleCommand === './gradlew') {
    const gradlewPath = path.join(cwd, 'gradlew');
    if (await fs.pathExists(gradlewPath)) {
      await fs.chmod(gradlewPath, 0o755);
    }
  }

  const args = [
    ...(gradleProperties
      ? Object.entries(gradleProperties).map(
          ([key, value]) => \`-P\${key}=\${value}\`
        )
      : []),
    ...(gradleOptions || []),
    task,
    '--stacktrace',
  ].filter(Boolean);

  logger?.log(\`Running: \${gradleCommand} \${args.join(' ')}\`);

  const { stdout, stderr } = await execa(gradleCommand, args, {
    cwd,
    stdio: 'pipe',
  });

  if (stdout) {
    logger?.log(stdout);
  }
  if (stderr) {
    logger?.error(stderr);
  }
}
GRADLE

# 3. Corregir src/index.ts
cat > src/index.ts << 'INDEX'
import verifyConditions from './verify-conditions';
import prepare from './prepare';
import publish from './publish';

export = {
  verifyConditions,
  prepare,
  publish,
};
INDEX

# 4. Corregir src/prepare.ts
cat > src/prepare.ts << 'PREPARE'
import { PluginConfig } from './definition';
import { runGradle } from './gradle';

export default async function prepare(
  pluginConfig: PluginConfig,
  context: any
): Promise<void> {
  const { cwd, logger } = context;
  const { gradleCommand, gradleOptions, gradleProperties } = pluginConfig;

  logger.log('Preparing Gradle project...');

  await runGradle('build', {
    cwd,
    gradleCommand,
    gradleOptions,
    gradleProperties,
    logger,
  });
}
PREPARE

# 5. Corregir src/publish.ts
cat > src/publish.ts << 'PUBLISH'
import { PluginConfig } from './definition';
import { runGradle } from './gradle';

export default async function publish(
  pluginConfig: PluginConfig,
  context: any
): Promise<void> {
  const { cwd, logger } = context;
  const { gradleCommand, gradleOptions, gradleProperties } = pluginConfig;

  logger.log('Publishing Gradle project...');

  await runGradle('publish', {
    cwd,
    gradleCommand,
    gradleOptions,
    gradleProperties,
    logger,
  });
}
PUBLISH

# 6. Corregir src/verify-conditions.ts
cat > src/verify-conditions.ts << 'VERIFY'
import fs from 'fs-extra';
import path from 'path';
import { PluginConfig } from './definition';

export default async function verifyConditions(
  pluginConfig: PluginConfig,
  context: any
): Promise<void> {
  const { cwd, logger } = context;
  const {
    gradleCommand = './gradlew',
    buildGradle = 'build.gradle',
    gradleWrapper = 'gradlew',
    gradlePropertiesFile = 'gradle.properties',
  } = pluginConfig;

  logger.log('Verifying conditions for Gradle project...');

  // Check if build.gradle exists
  const buildGradlePath = path.join(cwd, buildGradle);
  if (!(await fs.pathExists(buildGradlePath))) {
    throw new Error(\`build.gradle not found at \${buildGradlePath}\`);
  }

  // Check if gradlew exists if using gradle wrapper
  if (gradleCommand === './gradlew') {
    const gradlewPath = path.join(cwd, gradleWrapper);
    if (!(await fs.pathExists(gradlewPath))) {
      throw new Error(\`Gradle wrapper not found at \${gradlewPath}\`);
    }
  }

  // Check if gradle.properties exists if specified
  if (pluginConfig.gradlePropertiesFile) {
    const gradlePropsPath = path.join(cwd, gradlePropertiesFile);
    if (!(await fs.pathExists(gradlePropsPath))) {
      logger.warn(\`gradle.properties not found at \${gradlePropsPath}\`);
    }
  }

  logger.log('All conditions verified successfully.');
}
VERIFY

echo "=== Correcciones aplicadas ==="
