const BASE_API_URL = 'http://localhost:5252/api';

export const ApiEndpoints = {
  PRODUCTS: `${BASE_API_URL}/Products`,
  PRODUCT_BY_ID: (id: number) => `${BASE_API_URL}/Products/${id}`,
  CATEGORIES: `${BASE_API_URL}/Categories`,
  CATEGORY_BY_ID: (id: number) => `${BASE_API_URL}/Categories/${id}`,
  ORDERS: `${BASE_API_URL}/Orders`,
  ORDER_DETAILS: `${BASE_API_URL}/OrderDetails`,
  LOGIN: `${BASE_API_URL}/Auth/Login`,
  CLIENT_BY_ID: (id: number) => `${BASE_API_URL}/Clients/${id}`,
  REGISTER: `${BASE_API_URL}/Clients/register`,
  UPDATE_CLIENT: (id: number) => `${BASE_API_URL}/Clients/${id}`,
};
