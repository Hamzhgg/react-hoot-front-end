// src/services/authService.js

export const signup = async (formData) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
  
      if (json.err) throw new Error(json.err);
  
      localStorage.setItem('token', json.token);
      return json;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  
  export const signin = async (user) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const json = await res.json();
  
      if (json.error) throw new Error(json.error);
  
      if (json.token) {
        localStorage.setItem('token', json.token);
        const user = JSON.parse(atob(json.token.split('.')[1]));
        return user;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  
  export const getUser = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
  
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = payload.exp * 1000 < Date.now(); // Check if token is expired
  
    if (isExpired) {
      localStorage.removeItem('token');
      return null;
    }
  
    return payload; // Return decoded user data if token is valid
  };
  
  export const signout = () => {
    localStorage.removeItem('token');
    window.location.href = '/'; // Redirect to homepage or desired path after signout
  };
  
  export { signup, signin, getUser, signout };
  