import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchRankings = () => {
  const [rankings, setRankings] = useState(null);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await axios.get('http://localhost:8888/?rest_route=/wp/v2/rank-change-record/');
        setRankings(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRankings();
  }, []);

  return rankings;
};
