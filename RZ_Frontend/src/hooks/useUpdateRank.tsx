import React, { useState, useEffect } from 'react';
import axios from 'axios';
// 78
export const useUpdateAnimalRank = (postId: number, oldRank: number | null, rankUpdate : number, token: string | null) => {

  const [post, setPost] = useState(null);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const updateAnimalRank = async () => {
      if(!token || !oldRank) {
        console.log('useUpdateAnimalRank - no token or oldRank');
        return null;
      } else {
        try {
          const response = await axios.post(`http://localhost:8888/wp-json/wp/v2/animal/${postId}`, 
            { current_rank: oldRank + rankUpdate  },
            { headers: { 'Authorization': `Bearer ${token}` } }
          );
          setPost(response.data);
          console.log('useUpdateAnimalRank - expected , response', oldRank + rankUpdate , response.data);
        } catch (error) {
          console.log(error);
          setError(error);
        }
      }
      
    };

    if (token) {
      updateAnimalRank();
    }
  }, [postId, rankUpdate, token, oldRank]);

  return { post, error };
};