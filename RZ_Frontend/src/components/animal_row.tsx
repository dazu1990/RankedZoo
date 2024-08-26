import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { AnimalGridCard } from './animal_grid_card';
import { RANK_VALUES } from '../constants';
import { AnimalRowList } from './animal_row_list';

interface AnimalRowProps  {
    animals: any[],
    rank: string,
    rankIndex: number,
}

export const AnimalRow = ({animals, rank, rankIndex} : AnimalRowProps)=>{
    return(
        <div className="w-full flex h-gridRow" key={`row_wrapper_${rank}`}>
            <div className={`
                flex w-1/12 
                justify-center 
                items-center 
                font-display 
                text-7xl
                ${RANK_VALUES[rankIndex].bgColor}`}
            >
                <h1>{rank}</h1>
            </div>
            <AnimalRowList animals={animals} rank={rank} rankIndex={rankIndex}/>
            
        </div>
    )
}