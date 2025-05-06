import { User } from "../store/authStore";

/**
 * Generate a mock JWT token
 */
export function generateMockJwt(payload: { id: string; email: string }): string {
  // In a real app, you would use a proper JWT library
  return btoa(JSON.stringify(payload));
}

/**
 * Parse a JWT token
 */
export function parseJwt(token: string): any {
  try {
    return JSON.parse(atob(token));
  } catch (e) {
    return null;
  }
}

/**
 * Store auth token in localStorage
 */
export function setAuthToken(token: string): void {
  localStorage.setItem("auth_token", token);
}

/**
 * Get auth token from localStorage
 */
export function getAuthToken(): string | null {
  return localStorage.getItem("auth_token");
}

/**
 * Remove auth token from localStorage
 */
export function removeAuthToken(): void {
  localStorage.removeItem("auth_token");
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  const token = getAuthToken();
  if (!token) return false;
  
  // In a real app, you would verify the token's expiration
  try {
    const decoded = parseJwt(token);
    return !!decoded;
  } catch (e) {
    return false;
  }
}

/**
 * Mock user data for demonstration
 */
export const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
  },
];
