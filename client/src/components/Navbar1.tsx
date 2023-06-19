import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faHouse } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Navbar1 = () => {
    return (
        <div className="block-box flex flex-col gap-4 py-3 px-5 flex-none h-1/6 text-2xl">
            <Link to='/' className='flex gap-5 items-center'>
                <FontAwesomeIcon icon={faHouse} />
                <h1>Home</h1>
            </Link>
            <Link to='/search' className='flex gap-5 items-center'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <h1>Search</h1>
            </Link>
        </div>
    )
}
export default Navbar1