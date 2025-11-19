import { APIRequestContext, request } from '@playwright/test';

/**
 * API Helper utilities for making API calls and backend integration
 */
export class APIHelper {
  private apiContext: APIRequestContext | null = null;
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  /**
   * Initialize API context
   */
  async init(): Promise<void> {
    this.apiContext = await request.newContext({
      baseURL: this.baseURL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Dispose API context
   */
  async dispose(): Promise<void> {
    if (this.apiContext) {
      await this.apiContext.dispose();
    }
  }

  /**
   * Make a GET request
   * @param endpoint - API endpoint
   * @param headers - Optional headers
   */
  async get(endpoint: string, headers?: Record<string, string>) {
    if (!this.apiContext) throw new Error('API context not initialized');
    return await this.apiContext.get(endpoint, { headers });
  }

  /**
   * Make a POST request
   * @param endpoint - API endpoint
   * @param data - Request body data
   * @param headers - Optional headers
   */
  async post(endpoint: string, data: unknown, headers?: Record<string, string>) {
    if (!this.apiContext) throw new Error('API context not initialized');
    return await this.apiContext.post(endpoint, {
      data,
      headers,
    });
  }

  /**
   * Make a PUT request
   * @param endpoint - API endpoint
   * @param data - Request body data
   * @param headers - Optional headers
   */
  async put(endpoint: string, data: unknown, headers?: Record<string, string>) {
    if (!this.apiContext) throw new Error('API context not initialized');
    return await this.apiContext.put(endpoint, {
      data,
      headers,
    });
  }

  /**
   * Make a DELETE request
   * @param endpoint - API endpoint
   * @param headers - Optional headers
   */
  async delete(endpoint: string, headers?: Record<string, string>) {
    if (!this.apiContext) throw new Error('API context not initialized');
    return await this.apiContext.delete(endpoint, { headers });
  }

  /**
   * Check if response is successful (2xx status)
   * @param response - API response
   */
  isSuccessful(response: { status: () => number }): boolean {
    const status = response.status();
    return status >= 200 && status < 300;
  }

  /**
   * Parse JSON response
   * @param response - API response
   */
  async parseJSON<T>(response: { json: () => Promise<T> }): Promise<T> {
    return await response.json();
  }
}

/**
 * Create a new API helper instance
 * @param baseURL - Base URL for API calls
 */
export async function createAPIHelper(baseURL: string): Promise<APIHelper> {
  const helper = new APIHelper(baseURL);
  await helper.init();
  return helper;
}
