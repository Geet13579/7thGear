// utils/api.ts
// Native fetch-based API utility (no dependencies needed!)

// Base API configuration
const BASE_URL = 'https://your-api-url.com/api'; // Replace with your actual API URL
const DEFAULT_TIMEOUT = 30000; // 30 seconds

// Types
export interface ApiCallbacks {
  onStart?: () => void;
  onSuccess?: (data: any) => void;
  onError?: (message: string) => void;
  onFinally?: () => void;
}

export interface ApiOptions {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
  callbacks?: ApiCallbacks;
}

// Helper to get auth token
const getAuthToken = async (): Promise<string | null> => {
  try {
    // Uncomment when you implement AsyncStorage
    // const token = await AsyncStorage.getItem('authToken');
    // return token;
    return null;
  } catch (error) {
    return null;
  }
};

// Helper to build URL with query parameters
const buildURL = (url: string, params?: Record<string, any>): string => {
  if (!params) return url;
  
  const queryString = Object.keys(params)
    .filter(key => params[key] !== undefined && params[key] !== null)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
  
  return queryString ? `${url}?${queryString}` : url;
};

// Helper to handle fetch with timeout
const fetchWithTimeout = (
  url: string,
  options: RequestInit,
  timeout: number = DEFAULT_TIMEOUT
): Promise<Response> => {
  return Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    ),
  ]);
};

// Main API handler
const apiHandler = async <T = any>(
  endpoint: string,
  method: string,
  body?: any,
  options?: ApiOptions
): Promise<T | null> => {
  const { callbacks, headers = {}, params, timeout = DEFAULT_TIMEOUT } = options || {};

  try {
    // Call onStart callback
    callbacks?.onStart?.();

    // Get auth token
    const token = await getAuthToken();

    // Build full URL
    const fullURL = buildURL(`${BASE_URL}${endpoint}`, params);

    // Prepare headers
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }

    // Prepare request options
    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
    };

    // Add body for POST, PUT, PATCH
    if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
      if (body instanceof FormData) {
        // For FormData, remove Content-Type header (browser will set it with boundary)
        delete requestHeaders['Content-Type'];
        requestOptions.body = body;
      } else {
        requestOptions.body = JSON.stringify(body);
      }
    }

    // Make the request with timeout
    const response = await fetchWithTimeout(fullURL, requestOptions, timeout);

    // Parse response
    const contentType = response.headers.get('content-type');
    let data: any;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    console.log("response: ", response);

    // Handle error responses
    if (!response.ok) {
      const errorMessage = 
        data?.message || 
        data?.error || 
        data?.msg ||
        `Error: ${response.status} ${response.statusText}`;
      
      throw new Error(errorMessage);
    }

    // Call onSuccess callback
    callbacks?.onSuccess?.(data);

    return data;
  } catch (error: any) {
    console.log("error: ", error);
    // Extract error message
    let errorMessage = 'Something went wrong. Please try again.';

    if (error.message === 'Request timeout') {
      errorMessage = 'Request timed out. Please check your connection.';
    } else if (error.message === 'Network request failed') {
      errorMessage = 'Network error. Please check your internet connection.';
    } else if (error.message) {
      errorMessage = error.message;
    }

    // Call onError callback
    callbacks?.onError?.(errorMessage);

    return null;
  } finally {
    // Call onFinally callback
    callbacks?.onFinally?.();
  }
};

// GET request
export const get = async <T = any>(
  endpoint: string,
  options?: ApiOptions
): Promise<T | null> => {
  return apiHandler<T>(endpoint, 'GET', null, options);
};

// POST request
export const post = async <T = any>(
  endpoint: string,
  data?: any,
  options?: ApiOptions
): Promise<T | null> => {
  return apiHandler<T>(endpoint, 'POST', data, options);
};

// PUT request
export const put = async <T = any>(
  endpoint: string,
  data?: any,
  options?: ApiOptions
): Promise<T | null> => {
  return apiHandler<T>(endpoint, 'PUT', data, options);
};

// PATCH request
export const patch = async <T = any>(
  endpoint: string,
  data?: any,
  options?: ApiOptions
): Promise<T | null> => {
  return apiHandler<T>(endpoint, 'PATCH', data, options);
};

// DELETE request
export const deleteRequest = async <T = any>(
  endpoint: string,
  options?: ApiOptions
): Promise<T | null> => {
  return apiHandler<T>(endpoint, 'DELETE', null, options);
};

// Export a function to update the base URL if needed
export const setBaseURL = (url: string) => {
  // You can implement this to change BASE_URL dynamically if needed
  console.log('Base URL set to:', url);
};