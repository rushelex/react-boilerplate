export class NodeUtils {
  static getNodeEnv(): Record<string, string | undefined> {
    return process.env;
  }

  static getNodeEnvByKey(key: string): string | undefined {
    if (!key) throw new Error('Key cannot be null/undefined');
    return process.env[key];
  }

  static getNodeEnvMode(): string | undefined {
    return this.getNodeEnvByKey('NODE_ENV');
  }

  static isProduction(): boolean {
    return this.getNodeEnvMode() === 'production';
  }

  static isDevelopment(): boolean {
    return this.getNodeEnvMode() === 'development';
  }

  static isServe(): boolean {
    return !!this.getNodeEnvByKey('SERVE');
  }
}
