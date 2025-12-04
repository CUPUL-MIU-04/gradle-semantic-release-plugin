import { PluginConfig, Context } from "./definition";
import { runGradle } from "./gradle";

export default async function publish(
  pluginConfig: PluginConfig,
  context: Context,
): Promise<void> {
  const { cwd, logger } = context;
  const { gradleCommand, gradleOptions, gradleProperties } = pluginConfig;

  logger.log("Publishing Gradle project...");

  await runGradle("publish", {
    cwd,
    gradleCommand,
    gradleOptions,
    gradleProperties,
    logger,
  });
}
