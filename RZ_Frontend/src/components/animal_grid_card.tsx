import React , {useCallback, useEffect, useState} from 'react';
import { useFetchAnimal } from '../hooks/useFetchAnimal';
import { useJwtAuth } from '../hooks/useJwtAuth';
import { useUpdateAnimalRank } from '../hooks/useUpdateRank';



interface AnimalGridCardProps {
    id: number,
    name: string,
    description: string,
    image?: string,
    current_rank: number,
    jwtToken?: string | null,
    // updateRank: () => void,

}



export const AnimalGridCard = ( {...props} : AnimalGridCardProps) => {

    const token = useJwtAuth()

    const [rank, setRank] = useState<number>(props.current_rank);



    const updateRankIncrement = 1;
    useUpdateAnimalRank(props.id, rank, updateRankIncrement, token);

  

    return (
        <div className="max-w-md  overflow-hidden shadow-lg">
            {/* //create a placeholder compoent for the image with tailwind */}
            {props.image && (
                <div className="w-full  bg-gray-300">
                    <img className="min-h-52 object-cover" src={props.image} alt={props.name} />

                </div>
            )}
            {!props.image && (
            <div className="w-full h-52 bg-gray-300"></div>
            )}
            
            
            {/* <img className="w-full" src={props.animal.image} alt={props.animal.name} /> */}
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{props.name}</div>
                <p className="text-gray-700 text-base">
                    {props.description}
                </p>
            </div>

            {/* <div>
                <button onClick={()=>setRank(rank+1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Rank: {rank}
                </button>
            </div> */}
        </div>
    )
};