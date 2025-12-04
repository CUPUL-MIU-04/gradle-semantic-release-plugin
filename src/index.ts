import { Config } from 'semantic-release';
import verifyConditions from './verify-conditions';
import prepare from './prepare';
import publish from './publish';

const pluginConfig: Config = {
  verifyConditions,
  prepare,
  publish,
};

export = pluginConfig;