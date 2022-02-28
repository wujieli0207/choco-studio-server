import { existsSync } from 'fs';
import { resolve } from 'path';

const isProd = process.env.NODE_ENV === 'production';

function envConfig() {
  const localEnv = resolve('.env.dev');
  const pordEnv = resolve('.env.production');

  if (!(existsSync(localEnv) && existsSync(pordEnv))) {
    throw new Error('缺少环境配置文件');
  }

  const filePath = isProd && existsSync(pordEnv) ? pordEnv : localEnv;
  return {
    path: filePath,
  };
}

export default envConfig();
