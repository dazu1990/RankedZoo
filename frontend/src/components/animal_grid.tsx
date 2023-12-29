import React from 'react';
import { AnimalGridCard } from './animal_grid_card';

interface AnimalGridProps  {
    animals: [],
}

export const AnimalGrid = ({...props}: AnimalGridProps) => {
    const animals = props.animals.map((animal: any) => {
        return (
            <AnimalGridCard key={animal.id} name={animal.title.rendered} description={animal.description} />
        )
    })

    return (
        <div className="grid grid-cols-3 gap-4">
            {animals}
        </div>
    )
}