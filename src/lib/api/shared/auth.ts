import apiClient from '@/lib/utils/fetcher';

export interface LoginCredentials {
  username: string;  // Changed from email to username
  password: string;
}

export interface LoginResponse {
  data: {
    id: string;
    name: string;
    username: string;
    email: string;
    role: 'kepdes' | 'sekdes' | 'warga';
    created_at: string;
    updated_at: string;
  };
  token: string;
}

// Login
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await apiClient.post('/login', credentials);

  // Save token and user info to localStorage
  if (response.data.token) {
    localStorage.setItem('authToken', response.data.token);
    localStorage.setItem('userRole', response.data.data.role);
    localStorage.setItem('username', response.data.data.name);
  }

  return response.data;
};

// Logout
export const logout = async (): Promise<void> => {
  try {
    await apiClient.post('/logout');
  } finally {
    // Clear local storage regardless of API response
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
  }
};
