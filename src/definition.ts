// Eliminar ILastRelease, INextRelease, IContext y usar las interfaces de semantic-release
import { Context, NextRelease, LastRelease } from 'semantic-release';

// Exportar interfaces específicas del plugin si es necesario
export interface PluginConfig {
  gradleCommand?: string;
  gradleOptions?: string[];
  gradleProperties?: Record<string, string>;
  gradleWrapper?: string;
  gradleWrapperPermissions?: string;
}

// Exportar tipos de contexto específicos si es necesario
export interface GradleContext extends Context {
  // Campos adicionales específicos de Gradle si los necesitas
}

// Mantener solo interfaces específicas del plugin si las necesitas
export interface GradleTaskInfo {
  task: string[];
  logger: any;
}