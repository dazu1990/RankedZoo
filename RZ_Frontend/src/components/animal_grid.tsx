import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { useUpdateAnimalRank } from '../hooks/useUpdateRank';
import { useJwtAuth } from '../hooks/useJwtAuth';
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
    const token = useJwtAuth();
    const [sendUpdate] = useUpdateAnimalRank();


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
    const [isDragging, setIsDragging] = useState<boolean>(false)   

    
    const handleRankAnimal = (animal: any, newRank: string, oldRank: string) => {
        console.log('animal', animal);
        console.log('newRank', newRank);
        console.log('oldRank', oldRank);

        const newRankNumber = RANK_VALUES.find(rankValue => rankValue.grade === newRank)?.number;

        if (!newRankNumber) return

        sendUpdate(animal.ID, animal.post_title, newRankNumber, token);
        const newAnimalIndex = rankedAnimals[newRank].indexOf(animal);
        animal.locked = true;   
        rankedAnimals[newRank].splice(newAnimalIndex, 1, animal);

        console.log(rankedAnimals[newRank]);


    };

    const handleOnDragEnd = (result: any) => {
        console.log('onDragEnd', result);
        const { destination, source, draggableId } = result;
        if(!destination) return;
        // if(destination.droppableId === source.droppableId && destination.index === source.index) return;


        
        const sourceRowRank = source.droppableId;
        const destinationRowRank = destination.droppableId;
        const sameRow = sourceRowRank === destinationRowRank;

      


        if (!sameRow) {

            const saveSourceRow = rankedAnimals[sourceRowRank];
            const saveDestinationRow = rankedAnimals[destinationRowRank];

            const sourceRowWithout = saveSourceRow.filter((animal: any ) => `draggableId_${animal.ID}` != draggableId);

            saveDestinationRow.splice(destination.index, 0, saveSourceRow[source.index]);

            setRankedAnimals({...rankedAnimals, [sourceRowRank]: sourceRowWithout, [destinationRowRank]: saveDestinationRow});

            handleRankAnimal(rankedAnimals[destinationRowRank][destination.index], destinationRowRank, sourceRowRank);

            
        } else {

            
            const saveRow = rankedAnimals[sourceRowRank];


            const rowWithout = saveRow.filter((animal: any ) => `draggableId_${animal.ID}` != draggableId);

            // insert into destination index
            rowWithout.splice(destination.index, 0, saveRow[source.index]);
            const newSourceRow = rowWithout;


            setRankedAnimals({...rankedAnimals, [sourceRowRank]: newSourceRow});
            handleRankAnimal(rankedAnimals[destinationRowRank][destination.index], destinationRowRank, sourceRowRank);

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
            // onDragEnd={(r)=>handleOnDragEnd(r)}
            onDragEnd={handleOnDragEnd}
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