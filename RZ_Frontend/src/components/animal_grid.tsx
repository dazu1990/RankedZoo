import React, { useState } from 'react';
import { AnimalGridCard } from './animal_grid_card';
import { useFetchAnimal } from '../hooks/useFetchAnimal';
import  { RANK_VALUES } from '../constants';
import {percentile} from '../util';


interface AnimalGridProps  {
    animals: [],
    rankings: [],
}

type rankedAnimalsType = {
    [key: string]: any[],
}

export const AnimalGrid = ({animals, rankings}: AnimalGridProps) => {

    const [filteredAnimals, setFilteredAnimals ] = useState<any[]>(animals);
      

    const generateRankingPercentileForAnimals =  (animals : any[]) => {
        const justOverallRanks = animals.map(animal => animal.overall_average_rank);
        // add rankingPercentile to animals
        const animalsWithPercentile = animals.map(animal => {
        
            const rankingPercentile = percentile(justOverallRanks, animal.overall_average_rank);
            console.log('rankingPercentile', rankingPercentile, animal.post_title);

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
    
    RANK_VALUES.forEach(rankValue => {
        animalsWithPercentile.forEach(animal => {
            // console.log('rankValue', rankValue.grade, rankValue.score, animal.rankingPercentile, animal.post_title);

            if(rankValue.grade === 'S' && animal.rankingPercentile >= rankValue.score) {
                rankedAnimals[rankValue.grade].push(animal);
            }
            if (rankValue.grade !== 'S' && rankValue.grade !== 'F' && animal.rankingPercentile >= rankValue.score && animal.rankingPercentile <= RANK_VALUES[RANK_VALUES.indexOf(rankValue) - 1].score ){
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
                    <div className="w-full flex" key={`${index + Math.random()}_ranked_animal_wrapper`}>
                        <div className={`flex w-1/12 justify-center items-center ${RANK_VALUES[index].bgColor}`}>{rank}</div>
                        <div className={`flex w-11/12 flex-wrap ${RANK_VALUES[index].bgColorLight}`}>
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