export const getMovieUsers = () => {
  return JSON.parse(localStorage.getItem("movieUsers")) || [];
};

export const saveMovieUsers = (users) => {
  localStorage.setItem("movieUsers", JSON.stringify(users));
};

export const setCurrentUser = (email) => {
  localStorage.setItem("currentUser", email);
};

export const getCurrentUser = () => {
  return localStorage.getItem("currentUser");
};

export const logoutUser = () => {
  localStorage.removeItem("currentUser");
};