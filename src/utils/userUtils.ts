export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('lokkalokkito_user') || '{}');
  } catch {
    return {};
  }
};
