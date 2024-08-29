import React , {useCallback, useEffect, useState} from 'react';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import { Draggable } from 'react-beautiful-dnd';
import { RANK_VALUES } from '../constants';



import { useFetchAnimal } from '../hooks/useFetchAnimal';

import { useJwtAuth } from '../hooks/useJwtAuth';
import { useUpdateAnimalRank } from '../hooks/useUpdateRank';
import { roundToTwo } from '../util';




interface AnimalGridCardProps {
    id: number,
    name: string,
    description: string,
    image?: string,
    currentRawRank: number,
    jwtToken?: string | null,
    rankingsCount: number,
    rankingSum: number,
    locked: boolean,
    cardIndex: number,
    // getNewRank: (id: number) => void,
    isDragging: boolean,
    letterRankIndex: number,
    letterRank: string,
}

const class_CardTopLayer = (image : string | undefined) =>`
    z-0 
    absolute 
    top-0 
    w-full 
    transition-all 
    ${image ? `opacity-0` : `opacity-100`} 
    hover:opacity-100
    flex
    justify-center
    items-center
    align-middle
    h-full
`

const class_CardTopLayerTextWrapper = (letterRankIndex : number) => `
    font-bold 
    text-l 
    text-center 
    p-1 
    w-full
    bg-opacity-80	
    h-full
    flex
    justify-center
    align-middle
    items-center
    flex-col
    ${RANK_VALUES[letterRankIndex].bgColorLight}
`

// function mapStateToProps(state) {
//     return { props: state.props };
//   } 


export const AnimalGridCard = ( {...props} : AnimalGridCardProps) => {

    const [sendUpdate] = useUpdateAnimalRank();

    const token = useJwtAuth();
    const [rank, setRank] = useState<number>(props.currentRawRank);
    const [overallRank,setOverallRank] = useState<number>(props.currentRawRank);
    const [updateRankIncrement, setUpdateRankIncrement] = useState<number>(1);
    const [locked, setLocked] = useState<boolean>(props.locked);
    const [newRankCount, setNewRankCount] = useState<number>(0);

    console.log('locked', locked, props.name);

   


    const handleUpdateRank = (increment: number) => {

        sendUpdate(props.id, props.name, increment, token);

        // props.getNewRank(props.id);

        //remove
        setNewRankCount(newRankCount + 1);
        //remove
        const newRank = roundToTwo((props.rankingSum + increment) / (props.rankingsCount + newRankCount));
        //remove
        setOverallRank(newRank)

        setRank(newRank);
        setLocked(true);
        setTimeout(() => {
            setLocked(false);
        }, 1000);
    };


    return (
        <Draggable
            draggableId={`draggableId_${props.id}`}
            index={props.cardIndex}
            key={`draggable_animal_wrapper_${props.name}`}
        >
            {(provided: any) => (
                <div 
                    className="w-40 ph-1" 
                    key={`_draggable_animal_wrapper_${props.name}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps} 
                >
                    <div className="w-full overflow-hidden  relative">
                       
                        {locked && (
                            <div className="top-1 right-1 z-0 h-5 w-5 absolute">
                                <LockClosedIcon className="size-6 text-black" />
                            </div>
                        )}
                        {props.image && (
                            <div className="w-full  z-1 relative  mix-blend-multiply">
                                <img className="h-gridRow object-cover" src={props.image} alt={props.name} />

                            </div>
                        )}
                        
                        {!props.image && (
                        <div className="w-full h-gridRow z-1 relative"></div>
                        )}
                        

                        <div className={class_CardTopLayer(props.image)}>
                            <div className={class_CardTopLayerTextWrapper(props.letterRankIndex)}>
                                {props.name}
                                <br></br>
                                {locked ? (<LockClosedIcon className="h-10 w-10 text-black" />) : roundToTwo(rank)}
                            </div>
                    
                            {/* <div className='flex w-full justify-between'>
                                
                                <button 
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                    onClick={()=>handleUpdateRank(0)}
                                >
                                    0
                                </button>
                                <button 
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                    onClick={()=>handleUpdateRank(1)}
                                >
                                    1
                                </button>
                                <button 
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                    onClick={()=>handleUpdateRank(2)}
                                >
                                    2
                                </button>
                                <button 
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                    onClick={()=>handleUpdateRank(3)}
                                >
                                    3
                                </button>
                                <button 
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                    onClick={()=>handleUpdateRank(4)}
                                >
                                    4
                                </button>
                                <button 
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                    onClick={()=>handleUpdateRank(5)}
                                >
                                    5
                                </button>
                            </div> */}
                    
                        </div>
                    </div>
                </div>
            )}
        </Draggable>

        
    )
};