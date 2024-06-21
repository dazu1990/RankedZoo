import React, { useState } from 'react';
import { AnimalGridCard } from './animal_grid_card';
import { useFetchAnimal } from '../hooks/useFetchAnimal';
import  { RANK_VALUES } from '../constants';


interface AnimalGridProps  {
    animals: [],
    rankings: [],
}

type rankedAnimalsType = {
    [key: string]: any[],
}

export const AnimalGrid = ({animals, rankings}: AnimalGridProps) => {

    const [filteredAnimals, setFilteredAnimals ] = useState<any[]>(animals);

    console.log('filteredAnimalsWithRankings', filteredAnimals)

    const generateRankingPercentileForAnimals =  (animals : any[]) => {
        // add rankingPercentile to animals
        const animalsWithPercentile = animals.map(animal => {

            const animalsWithLowerRank = animals.filter(a => a.overall_average_rank < animal.overall_average_rank);

            const rankingPercentile = (animalsWithLowerRank.length / animals.length) * 100;

            return {
                ...animal,
                rankingPercentile
            }
        });

        //sort animalsWithPercentile by votePerformancePercentile   
        animalsWithPercentile.sort((a, b) => a.votePerformancePercentile - b.votePerformancePercentile);    
        return animalsWithPercentile;
    };
    
    const rankedAnimals : rankedAnimalsType = {
        S: [],
        A: [],
        B: [],
        C: [],
        D: [],
        F: []
    };

    // rank animals by vote performance percentile
    const animalsWithPercentile = generateRankingPercentileForAnimals(filteredAnimals);
    animalsWithPercentile.forEach(animal => {
        RANK_VALUES.forEach(rankValue => {
            if(rankValue.grade === 'S' && animal.rankingPercentile >= rankValue.score) {
                rankedAnimals[rankValue.grade].push(animal);
            }
            if (animal.rankingPercentile >= rankValue.score && animal.rankingPercentile < RANK_VALUES[RANK_VALUES.indexOf(rankValue) - 1].score ){
                rankedAnimals[rankValue.grade].push(animal);
            }
            if(rankValue.grade === 'F' && animal.rankingPercentile <= rankValue.score) {
                rankedAnimals[rankValue.grade].push(animal);
            }
        });
    });


    console.log('rankedAnimals',rankedAnimals);
    

    return (
        <div className="w-full flex justify-items-center flex-wrap">
            {Object.keys(rankedAnimals).map((rank, index) => {
                return (
                    <div className="w-full" key={`${index + Math.random()}_ranked_animal_wrapper`}>
                        <div className='flex'>{rank}</div>
                        <div className="flex flex-wrap">
                            {rankedAnimals[rank].map((animal, index) => {
                                return (
                                    <div className="w-1/4 p-4" key={`${index + Math.random()}_ranked_animal_card_wrapper`}>
                                        <AnimalGridCard 
                                            id={animal.ID}
                                            key={animal.ID} 
                                            name={animal.post_title} 
                                            description={animal.acf.description} 
                                            current_rank={animal.overall_average_rank || 0}
                                            rankingsCount={animal.all_rankings.length}
                                            rankingSum={animal.total_sum_of_rankings}
                                            image={animal.acf.hero_image || null}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}