import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const useUpdateAnimalRank = () => {

  const sendUpdate = async (
    postId: number, 
    animalName: string,
    rankUpdate : number, 
    token: string | null,
    vsAnimalId?: number | null,
  ) => {
    const [post, setPost] = await useState(null);
    const [error, setError] = await useState<unknown>(null);
  
    useEffect(() => {
      const updateAnimalRank = async ()  => {
        if(!token || !rankUpdate) {
          setError(`useUpdateAnimalRank - no token or Rank Increment is 0 ${token} ${rankUpdate}`);

        } else {
          try {
            const response = await axios.post(`http://localhost:8888/wp-json/wp/v2/rank-change-record`, 
              { 
                title: `${animalName} [${postId}] :: ${rankUpdate} :: ${Date()} ${vsAnimalId ? `vs ${vsAnimalId}` : ''}`,
                status: 'publish',
                acf: {
                  animal: postId,
                  value: rankUpdate,
                  vsAnimalId: vsAnimalId
                }
  
              },
              { headers: { 'Authorization': `Bearer ${token}` } }
            );
            setPost(response.data);
            console.log('useUpdateAnimalRank', rankUpdate , response.data);
            // console.log('useUpdateAnimalRank - expected , response', rankUpdate , response.data);
  
          } catch (error) {
            console.log(error);
            setError(error);
          }
        }
        
      };
  
      if (token) {
        updateAnimalRank();
      }
    }, [postId, rankUpdate, animalName, token]);
  
    return { post, error };
  };

  return [sendUpdate];
};