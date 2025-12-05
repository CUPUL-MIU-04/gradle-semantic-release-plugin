// Tipos para el plugin - Compatible con semantic-release v25+
export interface PluginConfig {
  gradleCommand?: string;
  gradleOptions?: string[];
  gradleProperties?: Record<string, string>;
  buildGradle?: string;
  gradleWrapper?: string;
  gradlePropertiesFile?: string;
}

// Contexto compatible con semantic-release v25+
// Basado en: https://github.com/semantic-release/semantic-release/blob/master/index.js
export interface Context {
  cwd: string;
  env: NodeJS.ProcessEnv;
  stdout: NodeJS.WriteStream;
  stderr: NodeJS.WriteStream;
  logger: {
    log: (message: string, ...args: any[]) => void;
    error: (message: string, ...args: any[]) => void;
    warn?: (message: string, ...args: any[]) => void;
    info?: (message: string, ...args: any[]) => void;
    success?: (message: string, ...args: any[]) => void;
  };
  options: {
    [key: string]: any;
  };
  branch: {
    name: string;
    channel?: string;
    range?: string;
    prerelease?: boolean;
    tags?: string[];
  };
  branches: Array<{
    name: string;
    channel?: string;
    range?: string;
    prerelease?: boolean;
    tags?: string[];
  }>;
  commits: Array<{
    commit: {
      long: string;
      short: string;
    };
    tree: {
      long: string;
      short: string;
    };
    author: {
      name: string;
      email: string;
      date: Date;
    };
    committer: {
      name: string;
      email: string;
      date: Date;
    };
    subject: string;
    body: string;
    hash: string;
    message: string;
    timestamp: number;
    files: string[];
    merge?: string;
  }>;
  releases: Array<{
    name?: string;
    url?: string;
    type: string;
    version: string;
    channel: string;
    gitHead: string;
    gitTag: string;
    notes: string;
    pluginName: string;
  }>;
  lastRelease?: {
    version: string;
    gitTag: string;
    channels: string[];
    gitHead: string;
    name: string;
  };
  nextRelease?: {
    type: string;
    version: string;
    gitTag: string;
    channels: string[];
    gitHead: string;
    name: string;
    notes: string;
  };
}

// Tipos para compatibilidad con versiones anteriores
export type NextRelease = Context["nextRelease"];
export type LastRelease = Context["lastRelease"];
