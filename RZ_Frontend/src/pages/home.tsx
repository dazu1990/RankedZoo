import React from "react";
import { AnimalGrid } from "../components/animal_grid";

interface HomePageProps {
    animals: [] | null;
    rankings: [] | null;
}

export const HomePage = ({animals, rankings} : HomePageProps) => {

    return(
        <div className="w-full flex items-center flex-col p-6 overflow-scroll">
            HomePage
            {!animals && (
                <div>Loading...</div>
            )}

            {animals && (
                <div className="w-full h-screenNoNav">
                    <AnimalGrid animals={animals} />
                </div>
            )}
        </div>
    )
};