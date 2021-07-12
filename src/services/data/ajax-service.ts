import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { ConfigService } from '~services/common/config-service';

/**
 * Service for making AJAX requests.
 * Uses Axios (https://github.com/mzabriskie/axios)
 */
export class AjaxService {
  private static instance: AxiosInstance = axios.create({
    baseURL: ConfigService.getBaseUrl(),
    timeout: 4000,
  });

  public static request<T>(options: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.request<T>(options);
  }
}
