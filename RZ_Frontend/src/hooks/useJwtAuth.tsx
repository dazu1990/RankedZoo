import { useState, useEffect } from 'react';
import axios from 'axios';

export const useJwtAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const username = 'admin';
  const password = 'password';
  // const password = 'Fn4g(wbDroE@Na@S7@Cvvqi4';

  const localToken = window.localStorage.getItem("jwtToken")

  localStorage.clear();

  useEffect(() => {
    const authenticate = async () => {
      try {
        const response = await axios.post('http://localhost:8888/wp-json/jwt-auth/v1/token', {
          username,
          password,
        });
        setToken(response.data.token);
      } catch (error) {
        console.error(error);
      }
    };

    
    const checklocal = async () => {
      if (localToken){
        setToken( localToken );
      } else {
        await authenticate();
        if(token) {
          localStorage.setItem("jwtToken", token)
          window.localStorage.getItem("jwtToken");
        }
      }
    }
    checklocal()

  }, [localToken, token]);

  return token;
};
