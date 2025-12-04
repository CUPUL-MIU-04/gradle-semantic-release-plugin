import fs from "fs-extra";
import path from "path";
import { PluginConfig, Context } from "./definition";

export default async function verifyConditions(
  pluginConfig: PluginConfig,
  context: Context,
): Promise<void> {
  const { cwd, logger } = context;
  const {
    gradleCommand = "./gradlew",
    buildGradle = "build.gradle",
    gradleWrapper = "gradlew",
    gradlePropertiesFile = "gradle.properties",
  } = pluginConfig;

  logger.log("Verifying conditions for Gradle project...");

  // Check if build.gradle exists
  const buildGradlePath = path.join(cwd, buildGradle);
  if (!(await fs.pathExists(buildGradlePath))) {
    throw new Error(`build.gradle not found at ${buildGradlePath}`);
  }

  // Check if gradlew exists if using gradle wrapper
  if (gradleCommand === "./gradlew") {
    const gradlewPath = path.join(cwd, gradleWrapper);
    if (!(await fs.pathExists(gradlewPath))) {
      throw new Error(`Gradle wrapper not found at ${gradlewPath}`);
    }
  }

  // Check if gradle.properties exists if specified
  if (pluginConfig.gradlePropertiesFile) {
    const gradlePropsPath = path.join(cwd, gradlePropertiesFile);
    if (!(await fs.pathExists(gradlePropsPath))) {
      logger.warn(`gradle.properties not found at ${gradlePropsPath}`);
    }
  }

  logger.log("All conditions verified successfully.");
}
