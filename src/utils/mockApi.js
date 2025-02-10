export const mockAuth = {
  login: async (credentials) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: "mock-jwt-token",
          user: { id: 1, name: "Test User" },
        });
      }, 800);
    });
  },

  checkToken: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ isValid: true });
      }, 300);
    });
  },
};
