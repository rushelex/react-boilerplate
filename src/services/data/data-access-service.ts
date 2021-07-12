import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { FAKE_ANY } from '~/types';

import { AjaxService } from './ajax-service';

interface HttpError extends AxiosError, AxiosResponse {
  message: string;
}

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

function throwError(error: HttpError) {
  if (!error) {
    return new Error('An unknown error occurred!');
  }
  if (!error.message) {
    return `${error.status} ${error.statusText}`;
  }
  return error;
}

/**
 * HTTP service capable of performing GET and POST requests
 * This service will be injected into domain services (e.g. PatientService, MedicationService)
 * Agnostic of prototype/production
 */
const request = <T>(method: HttpMethod, url: string, data?: T, options?: AxiosRequestConfig) => {
  const defaultOptions: AxiosRequestConfig = {
    url,
    method,
    responseType: 'json',
  };

  if (data) {
    defaultOptions.data = JSON.stringify(data);
    defaultOptions.headers = {
      'Content-Type': 'application/json',
    };
  }

  let requestOptions = defaultOptions;
  if (options) {
    requestOptions = { ...defaultOptions, ...options };
  }

  // Resolve the original request, and wrap the response in another promise.
  // This allows allows us to peer into the response before giving it back
  // to the caller, which is helpful when handling situations where a response
  // is technically successful from an AJAX perspective (200 OK), but failed
  // server-side due an arbitrary error (i.e. validation error).
  return new Promise((resolve, reject) => {
    AjaxService.request<T>(requestOptions)
      .then(resolve)
      .catch((error: HttpError) => reject(throwError(error)));
  });
};

export const get = (url: string, options?: AxiosRequestConfig): Promise<unknown> =>
  request(HttpMethod.GET, url, undefined, options);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const post = (url: string, data?: FAKE_ANY, options?: AxiosRequestConfig): Promise<unknown> =>
  request(HttpMethod.POST, url, data, options);
