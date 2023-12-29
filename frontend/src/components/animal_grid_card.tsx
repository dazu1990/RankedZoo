
interface AnimalGridCardProps {
    name: string,
    description: string,
    image?: string,

}

export const AnimalGridCard = ( {...props} : AnimalGridCardProps) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            {/* //create a placeholder compoent for the image with tailwind */}
            {props.image && (
                <img className="w-full h-64 bg-gray-300" src={props.image} alt={props.name} />
            )}
            {!props.image && (
            <div className="w-full h-64 bg-gray-300"></div>
            )}
            
            
            {/* <img className="w-full" src={props.animal.image} alt={props.animal.name} /> */}
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{props.name}</div>
                <p className="text-gray-700 text-base">
                    {props.description}
                </p>
            </div>
        </div>
    )
};