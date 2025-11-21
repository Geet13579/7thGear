// constants/apiEndpoints.ts
// Centralized API endpoints for better maintainability

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    SEND_OTP: '/auth/send-otp',
    VERIFY_OTP: '/auth/verify-otp',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // User endpoints
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    CHANGE_PASSWORD: '/user/change-password',
    DELETE_ACCOUNT: '/user/account',
    UPLOAD_AVATAR: '/user/avatar',
  },

  // Products endpoints
  PRODUCTS: {
    LIST: '/products',
    DETAILS: (id: string) => `/products/${id}`,
    SEARCH: '/products/search',
    CATEGORIES: '/products/categories',
    FEATURED: '/products/featured',
  },

  // Orders endpoints
  ORDERS: {
    CREATE: '/orders',
    LIST: '/orders',
    DETAILS: (id: string) => `/orders/${id}`,
    CANCEL: (id: string) => `/orders/${id}/cancel`,
    TRACK: (id: string) => `/orders/${id}/track`,
  },

  // Cart endpoints
  CART: {
    GET: '/cart',
    ADD_ITEM: '/cart/items',
    UPDATE_ITEM: (id: string) => `/cart/items/${id}`,
    REMOVE_ITEM: (id: string) => `/cart/items/${id}`,
    CLEAR: '/cart/clear',
  },

  // Payment endpoints
  PAYMENT: {
    INITIATE: '/payment/initiate',
    VERIFY: '/payment/verify',
    METHODS: '/payment/methods',
  },
};

// Usage example in a component:
/*
import { post } from '../utils/api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const sendOTP = async (mobile: string) => {
  const response = await post(API_ENDPOINTS.AUTH.SEND_OTP, { mobile });
  return response;
};

const getProductDetails = async (productId: string) => {
  const response = await get(API_ENDPOINTS.PRODUCTS.DETAILS(productId));
  return response;
};
*/