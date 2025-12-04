import type { Context } from 'semantic-release'; // Importar Context
import { getCommand, getTaskToPublish } from "./gradle";

export default async function verifyConditions(
  pluginConfig: object,
  context: Context,
) {
  const { cwd, env, logger } = context;
  const command = await getCommand(cwd);
  if (command !== "./gradlew") {
    throw new Error(`Gradle wrapper not found at ${cwd}`);
  }
  const task = await getTaskToPublish(cwd, env as NodeJS.ProcessEnv, logger);
  if (task.length === 0) {
    throw new Error("No task found that can publish artifacts");
  }
  logger.debug("Verified conditions, and found no problem");
}