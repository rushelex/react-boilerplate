import get from 'lodash-es/get';

export class ConfigService {
  static getConfig(): string | undefined {
    return process.env.APP_CONFIG;
  }

  static getProperty(key: string): unknown {
    if (!key) throw new Error('Key cannot be null/undefined');
    return get(this.getConfig(), key);
  }

  static getRequiredProperty(key: string): unknown | undefined {
    const value = this.getProperty(key);
    if (value) return value;
    return undefined;
  }

  static getPort(): number {
    return this.getRequiredProperty('config.port') as number;
  }

  static getBasePath(): string {
    return this.getRequiredProperty('config.basePath') as string;
  }

  static getBaseUrl(): string {
    return this.getRequiredProperty('config.baseUrl') as string;
  }

  static getPublicBasename(): string {
    return '/';
  }
}
