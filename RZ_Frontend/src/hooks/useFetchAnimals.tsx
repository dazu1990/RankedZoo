import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchAnimals = () => {
  const [animals, setAnimals] = useState(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        // const response = await axios.get('http://localhost:8889?rest_route=/animals/animals');
        const response = await axios.get('http://localhost:8888/?rest_route=/wp/v2/animal/?acf_format=standard');
        setAnimals(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchRoutes = async () => {
      try {
        // const response = await axios.get('http://localhost:8889?rest_route=/animals/animals');
        const response = await axios.get('http://localhost:8888/?rest_route=/wp/v2/');
        console.log('routes', response.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoutes();
    fetchAnimals();
  }, []);

  return animals;
};
