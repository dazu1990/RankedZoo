import React , {useCallback, useEffect, useState} from 'react';
import { useFetchAnimal } from '../hooks/useFetchAnimal';
import { useJwtAuth } from '../hooks/useJwtAuth';
import { useUpdateAnimalRank } from '../hooks/useUpdateRank';
import { roundToTwo } from '../util';



interface AnimalGridCardProps {
    id: number,
    name: string,
    description: string,
    image?: string,
    current_rank: number,
    jwtToken?: string | null,
    rankingsCount: number,
    rankingSum: number,
    // updateRank: () => void,

}



export const AnimalGridCard = ( {...props} : AnimalGridCardProps) => {

    const [sendUpdate] = useUpdateAnimalRank();

    const token = useJwtAuth()

    const [rank, setRank] = useState<number>(props.current_rank);
    const [overallRank,setOverallRank] = useState<number>(props.current_rank);
    const [updateRankIncrement, setUpdateRankIncrement] = useState<number>(1);


    const handleUpdateRank = (increment: number) => {

        sendUpdate(props.id, props.name, increment, token);

        const newRank = roundToTwo((props.rankingSum + increment) / (props.rankingsCount + 1));
        setOverallRank(newRank)

        setRank(newRank);
    };


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
                    props rank: {roundToTwo(overallRank)}
                    <br></br>
                    state rank: {roundToTwo(rank)}
                </p>
            </div>
            <div className='flex w-full justify-between'>
                
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={()=>handleUpdateRank(0)}
                >
                    0
                </button>
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={()=>handleUpdateRank(1)}
                >
                    1
                </button>
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={()=>handleUpdateRank(2)}
                >
                    2
                </button>
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={()=>handleUpdateRank(3)}
                >
                    3
                </button>
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={()=>handleUpdateRank(4)}
                >
                    4
                </button>
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={()=>handleUpdateRank(5)}
                >
                    5
                </button>
            </div>
           

            {/* <div>
                <button onClick={()=>setRank(rank+1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Rank: {rank}
                </button>
            </div> */}
        </div>
    )
};