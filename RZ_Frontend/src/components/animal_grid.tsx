import React, { useState } from 'react';
import { AnimalGridCard } from './animal_grid_card';
import { useFetchAnimal } from '../hooks/useFetchAnimal';


interface AnimalGridProps  {
    animals: [],
    rankings: [],
}

export const AnimalGrid = ({animals, rankings}: AnimalGridProps) => {

     const [filteredAnimals, setFilteredAnimals ] = useState<any[]>(animals)

     const filteredAnimalsWithRankings = filteredAnimals.map((animal: any) => {
        if (rankings) {
            const allRankings = rankings.filter((ranking: any) => ranking.acf.animal === animal.id).map((ranking: any) => ranking.acf.value)
            console.log('allRankings for ', animal.title.rendered, allRankings)
            
            const overallRank = allRankings.reduce((acc, obj) => { return acc + obj; }, 0)

            return {
                ...animal,
                allRankings: allRankings,
                overallRank: overallRank
            }
        }
        return {
            ...animal,
            allRankings: [],
            overallRank: 0
        }  
     });

     console.log('filteredAnimalsWithRankings', filteredAnimalsWithRankings)
    const renderAnimalCards = filteredAnimalsWithRankings.map((animal: any, index: number) => {
        return (
            <div className="w-1/4 p-4" key={`${index + Math.random()}_animal_grid_card_wrapper`}>
                <AnimalGridCard 
                    id={animal.id}
                    key={animal.id} 
                    name={animal.title.rendered} 
                    description={animal.description} 
                    current_rank={animal.overallRank || 0}
                    image={animal.acf.hero_image || null}
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