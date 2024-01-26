import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchAnimal = (animal_id: number) => {
  const [animal, setAnimal] = useState(null);

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        // const response = await axios.get('http://localhost:8889?rest_route=/animals/animals');
        const response = await axios.get(`http://localhost:8888/?rest_route=/wp/v2/animal/${animal_id}`);
        setAnimal(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnimal();
  }, []);
  console.log('animal', animal);
  return animal;
};
