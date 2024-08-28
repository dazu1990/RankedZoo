import { Droppable, Draggable } from 'react-beautiful-dnd';
import { AnimalGridCard } from './animal_grid_card';
import { RANK_VALUES } from '../constants';

interface AnimalRowListProps  {
    animals: any[],
    rank: string,
    rankIndex: number,
}

export const AnimalRowList = ({animals, rank, rankIndex} : AnimalRowListProps) => {
    return(
        <Droppable 
                droppableId={`${rank}`}  
            >
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex w-11/12 flex-wrap ${RANK_VALUES[rankIndex].bgColorLight} `}
                >
                    {animals.map((animal, _index) => {
                        return (
                            <AnimalGridCard 
                                id={animal.ID}
                                key={animal.ID + Math.random()} 
                                name={animal.post_title} 
                                description={animal.acf.description} 
                                currentRawRank={animal.overall_average_rank || 0}
                                rankingsCount={animal.all_rankings.length}
                                rankingSum={animal.total_sum_of_rankings}
                                image={animal.acf.thumb_image || null}
                                locked={false}
                                cardIndex={_index}
                                // getNewRank={getNewRank}
                                isDragging={false}
                                letterRankIndex={rankIndex}
                                letterRank={rank}
                            />
                        )
                    })}
                    {provided.placeholder}
                </div>
            )}
            
        </Droppable>
    )
};