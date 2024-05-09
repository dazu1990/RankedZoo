import React from 'react';
import { AnimalGridCard } from './animal_grid_card';
import { useFetchAnimal } from '../hooks/useFetchAnimal';


interface AnimalGridProps  {
    animals: [],
}

export const AnimalGrid = ({...props}: AnimalGridProps) => {

    const animals = props.animals.map((animal: any, index: number) => {
        return (
            <div className="w-1/4 p-4" key={`${index + Math.random()}_animal_grid_card_wrapper`}>
                <AnimalGridCard 
                    id={animal.id}
                    key={animal.id} 
                    name={animal.title.rendered} 
                    description={animal.description} 
                    current_rank={animal.acf.current_rank}
                    // updateRank={()=>updateRank(id, current_rank, 1, token)}
                />
            </div>
        )
    })

    return (
        <div className="w-full flex justify-items-center flex-wrap">
            {animals}
            {animals}
            {animals}
            {animals}
            {animals}
            {animals}

        </div>
    )
}