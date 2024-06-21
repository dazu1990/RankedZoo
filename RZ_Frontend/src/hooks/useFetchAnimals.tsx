import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchAnimals = () => {
  const [animals, setAnimals] = useState(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.get('http://localhost:8888/wp-json/rz/v1/animals');
        // format the all_rankings object into an array
        response.data.forEach((animal: any) => {
          animal.all_rankings = Object.keys(animal.all_rankings).map((key: string) => {
            return animal.all_rankings[key]
          });
        });
        setAnimals(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchRoutes = async () => {
      try {
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
