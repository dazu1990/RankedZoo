import React from "react";
import { AnimalGrid } from "../components/animal_grid";

interface HomePageProps {
    animals: [] | null;
}

export const HomePage = ({animals} : HomePageProps) => {

    return(
        <div className="w-full flex items-center flex-col p-6">
            <h1 className="text-3xl font-bold underline">
                HOME
            </h1>
        
            {!animals && (
                <div>Loading...</div>
            )}

            {animals && (
                <AnimalGrid animals={animals}/>
            )}
        </div>
    )
};