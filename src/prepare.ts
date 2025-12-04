import { PluginConfig, Context } from "./definition";
import { runGradle } from "./gradle";

export default async function prepare(
  pluginConfig: PluginConfig,
  context: Context,
): Promise<void> {
  const { cwd, logger } = context;
  const { gradleCommand, gradleOptions, gradleProperties } = pluginConfig;

  logger.log("Preparing Gradle project...");

  await runGradle("build", {
    cwd,
    gradleCommand,
    gradleOptions,
    gradleProperties,
    logger,
  });
}
