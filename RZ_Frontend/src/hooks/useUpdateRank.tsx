import axios from 'axios';

export const useUpdateAnimalRank = () => {

  const sendUpdate = async (
    postId: number, 
    animalName: string,
    rankUpdate : number, 
    token: string | null,
    vsAnimalId?: number | null,
  ) => {
    const updateAnimalRank = async ()  => {
  
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


        return response.data;

      } catch (error) {
        console.log('updateAnimalRank:', error, postId, animalName, rankUpdate, token, vsAnimalId);

        console.error(error);
      }
    
    };

    if (token) {
      await updateAnimalRank();
    } else {
      console.error('no jwt token');
    }
  };

  return [sendUpdate];
};