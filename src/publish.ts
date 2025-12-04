import type { Context } from 'semantic-release'; // Importar Context
import { publishArtifact } from "./gradle";

export default async function publish(
  pluginConfig: object,
  context: Context,
) {
  const { cwd, env, logger } = context;
  await publishArtifact(cwd, env as NodeJS.ProcessEnv, logger);
}