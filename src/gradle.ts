import execa from "execa";
import * as fs from "fs-extra";
import * as path from "path";

export interface GradleOptions {
  cwd: string;
  gradleCommand?: string;
  gradleOptions?: string[];
  gradleProperties?: Record<string, string>;
  logger?: any;
}

export async function runGradle(
  task: string,
  options: GradleOptions,
): Promise<void> {
  const {
    cwd,
    gradleCommand = "./gradlew",
    gradleOptions = [],
    gradleProperties = {},
    logger,
  } = options;

  // Ensure gradlew is executable
  if (gradleCommand === "./gradlew") {
    const gradlewPath = path.join(cwd, "gradlew");
    if (await fs.pathExists(gradlewPath)) {
      await fs.chmod(gradlewPath, 0o755);
    }
  }

  const args = [
    ...(gradleProperties
      ? Object.entries(gradleProperties).map(
          ([key, value]) => `-P${key}=${value}`,
        )
      : []),
    ...(gradleOptions || []),
    task,
    "--stacktrace",
  ].filter(Boolean);

  logger?.log(`Running: ${gradleCommand} ${args.join(" ")}`);

  const { stdout, stderr } = await execa(gradleCommand, args, {
    cwd,
    stdio: "pipe",
  });

  if (stdout) {
    logger?.log(stdout);
  }
  if (stderr) {
    logger?.error(stderr);
  }
}
