import { Link } from 'react-router-dom';

interface CardProps {
    name: string;
    image: string;
    slug: string;
}

const Card = ({ name, image, slug }: CardProps) => {
    return (
        <Link to={`/profile/${slug}`} className="text-decoration-none">
            <div className="flex flex-col items-center gap-5 text-center w-52">
                <img className="h-72" src={image} alt={name} />
                <p className="">{name}</p>
            </div>
        </Link>
    );
  };
  
export default Card;
  
  
  
  
  
  
  