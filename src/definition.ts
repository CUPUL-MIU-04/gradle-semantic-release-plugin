// Tipos para el plugin
export interface PluginConfig {
  gradleCommand?: string;
  gradleOptions?: string[];
  gradleProperties?: Record<string, string>;
  buildGradle?: string;
  gradleWrapper?: string;
  gradlePropertiesFile?: string;
}

// Contexto para semantic-release v25
export interface Context {
  cwd: string;
  env: Record<string, string>;
  stdout: NodeJS.WriteStream;
  stderr: NodeJS.WriteStream;
  logger: any;
  options: any;
  branch: any;
  branches: any[];
  commits: any[];
  releases: any[];
  lastRelease?: any;
  nextRelease?: any;
}

// Tipos para compatibilidad
export type NextRelease = any;
export type LastRelease = any;
