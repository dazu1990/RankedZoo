import React, { useState } from 'react';
import { AnimalGridCard } from './animal_grid_card';
import { useFetchAnimal } from '../hooks/useFetchAnimal';


interface AnimalGridProps  {
    animals: [],
    rankings: [],
}

export const AnimalGrid = ({animals, rankings}: AnimalGridProps) => {
    console.log('aniamals', animals, rankings
     )
     const [filteredAnimals, setFilteredAnimals ] = useState(animals)

     const filteredAnimalsWithRankings = filteredAnimals.map((animal: any) => {
        if (rankings) {
            const ranking = rankings.find((ranking: any) => ranking.acf.animal === animal.id)
            console.log('ranking', ranking)
            return {
                ...animal,
                ranking: ranking
            }
        }
        return {
            ...animal,
            ranking: []
        }  
     });

     console.log('filteredAnimalsWithRankings', filteredAnimalsWithRankings)
    const renderAnimalCards = filteredAnimals.map((animal: any, index: number) => {
        return (
            <div className="w-1/4 p-4" key={`${index + Math.random()}_animal_grid_card_wrapper`}>
                <AnimalGridCard 
                    id={animal.id}
                    key={animal.id} 
                    name={animal.title.rendered} 
                    description={animal.description} 
                    current_rank={animal.acf.overall_rank || 0}
                    image={animal.acf.hero_image || null}
                    // updateRank={()=>updateRank(id, current_rank, 1, token)}
                />
            </div>
        )
    })

    return (
        <div className="w-full flex justify-items-center flex-wrap">
            {renderAnimalCards}

        </div>
    )
}