import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


import { AnimalGridCard } from './animal_grid_card';
import { AnimalRow } from './animal_row';
import { useFetchAnimal } from '../hooks/useFetchAnimal';

import  { RANK_VALUES } from '../constants';
import {percentile} from '../util';


interface AnimalGridProps  {
    animals: [],
}

type rankedAnimalsType = {
    [key: string]: any[],
}


export const AnimalGrid = ({animals}: AnimalGridProps) => {

    const [filteredAnimals, setFilteredAnimals ] = useState<any[]>(animals);
    const [filteredAnimalsWithPercentile, setFilteredAnimalsWithPercentile] = useState<any[]>([]);
    const [rankedAnimals, setRankedAnimals] = useState<rankedAnimalsType>({
        S: [],
        A: [],
        B: [],
        C: [],
        D: [],
        F: []
    });

    const [isOver, setIsOver] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    // onDragEnd = result => {
    //     const { destination, source, draggableId } = result;
    
    //     if (!destination) {
    //       return;
    //     }
    
    //     if (
    //       destination.droppableId === source.droppableId &&
    //       destination.index === source.index
    //     ) {
    //       return;
    //     }
    
    //     const column = this.state.columns[source.droppableId];
    //     const newTaskIds = Array.from(column.taskIds);
    //     newTaskIds.splice(source.index, 1);
    //     newTaskIds.splice(destination.index, 0, draggableId);
    
    //     const newColumn = {
    //       ...column,
    //       taskIds: newTaskIds,
    //     };
    
    //     const newState = {
    //       ...this.state,
    //       columns: {
    //         ...this.state.columns,
    //         [newColumn.id]: newColumn,
    //       },
    //     };
    
    //     this.setState(newState);
    //   };            

    const handleOnDragEnd = (result: any) => {
        console.log('onDragEnd', result);
        const { destination, source, draggableId } = result;
        if(!destination) return;
        // if(destination.droppableId === source.droppableId && destination.index === source.index) return;


        
        const sourceRowRank = source.droppableId;
        const destinationRowRank = destination.droppableId;
        const sameRow = sourceRowRank === destinationRowRank;


        // const newRow = rankedAnimals[destinationRowRank].splice(destination.index, 0, rankedAnimals[sourceRowRank][source.index])

        // console.log('destination row after update', newRow);

        if (!sameRow) {

            // remove from source row
            const saveSourceRow = rankedAnimals[sourceRowRank];
            const saveDestinationRow = rankedAnimals[destinationRowRank];

            const sourceRowWithout = saveSourceRow.filter((animal: any ) => `draggableId_${animal.ID}` != draggableId);

            saveDestinationRow.splice(destination.index, 0, saveSourceRow[source.index]);

            setRankedAnimals({...rankedAnimals, [sourceRowRank]: sourceRowWithout, [destinationRowRank]: saveDestinationRow});
            
        } else {

            
            const saveRow = rankedAnimals[sourceRowRank];


            const rowWithout = saveRow.filter((animal: any ) => `draggableId_${animal.ID}` != draggableId);

            // insert into destination index
            rowWithout.splice(destination.index, 0, saveRow[source.index]);
            const newSourceRow = rowWithout;



            setRankedAnimals({...rankedAnimals, [sourceRowRank]: newSourceRow});
        }
    };

    const handleOnDragUpdate = (update: any) => {
        console.log('update', update);
    }

    const handleOnDragStart = (start: any) => {
        console.log('start', start);
    }

    const generateRankingPercentileForAnimals =  (animals : any[]) => {
        const justOverallRanks = animals.map(animal => animal.overall_average_rank);
        
        const animalsWithPercentile = animals.map(animal => {
            const rankingPercentile = percentile(justOverallRanks, animal.overall_average_rank);
            return {
                ...animal,
                rankingPercentile
            }
        });

        //sort animalsWithPercentile by rankingPercentile   
        animalsWithPercentile.sort((a, b) => a.rankingPercentile - b.rankingPercentile);   

        return animalsWithPercentile;
    };

    // const getNewRank = (id: number) => {
    //     console.log('getNewRank', id);
    // }

    const putInRanks = (animals: any[]) => {
        const tempRankedAnimals : rankedAnimalsType = {
            S: [],
            A: [],
            B: [],
            C: [],
            D: [],
            F: []
        };
        //  place animals in appropriate rank for tempRankedAnimals
        animals.forEach(animal => {
            RANK_VALUES.forEach(rankValue => {
                if(rankValue.grade === 'S' && animal.rankingPercentile >= rankValue.score) {
                    tempRankedAnimals[rankValue.grade].push(animal);
                }
                if (
                    rankValue.grade !== 'S' && 
                    rankValue.grade !== 'F' && 
                    animal.rankingPercentile >= rankValue.score && 
                    animal.rankingPercentile < RANK_VALUES[RANK_VALUES.indexOf(rankValue) - 1].score 
                ){
                    tempRankedAnimals[rankValue.grade].push(animal);
                }
                if(rankValue.grade === 'F' && animal.rankingPercentile <= rankValue.score) {
                    tempRankedAnimals[rankValue.grade].push(animal);
                }
            });
        });
        setRankedAnimals(tempRankedAnimals);
    }

    useEffect(() => {
        // rank animals by vote performance percentile and assign those percentiles to the animals
        setFilteredAnimalsWithPercentile(generateRankingPercentileForAnimals(filteredAnimals));
    }, [filteredAnimals]);

    useEffect(() => {
        // place animals in ranks
        putInRanks(filteredAnimalsWithPercentile)
    }, [filteredAnimalsWithPercentile]);



    
    return (
        <DragDropContext 
            // onDragStart={handleOnDragStart}
            // onDragUpdate={handleOnDragUpdate}
            onDragEnd={(r)=>handleOnDragEnd(r)}
            // onDragEnd={handleOnDragEnd}
        >
            <div className="w-full h-screenNoNav flex justify-items-center flex-wrap">
                {Object.keys(rankedAnimals).map((rank, index) => {
                    return (
                        <AnimalRow rank={rank} animals={rankedAnimals[rank]} rankIndex={index} key={ `animal_row_${index}_rank_${rank}`}/>
                    )
                })}
            </div>
        </DragDropContext>

    )
}