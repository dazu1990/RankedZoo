import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchRankings = () => {
  const [rankings, setRankings] = useState(null);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await axios.get('http://localhost:8888/wp-json/rz/v1/rankings');
        setRankings(response.data);
        console.log('Rankings:', response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRankings();
  }, []);

  return rankings;
};
