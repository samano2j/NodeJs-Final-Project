import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
    setLoading: (loading: boolean) => void;
}
  
const SearchBar = ({ setLoading }: SearchBarProps) => {
    const { searchItem } = useParams();
    const [user, setUser] = useState(null);
    const [searchText, setSearchText] = useState(searchItem || "");
    const navigate = useNavigate();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value)
    }
  
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const currentUrl = `/search/${searchText}`

        setLoading(true)

        if (window.location.pathname === currentUrl) {
            window.location.reload() 
        } else {
            navigate(currentUrl)
        }
    }

    const fetchData = async () => {
        try {
            
            const response = await axios.get('/api/user');
            const userData = response.data.user;
            
            setUser(userData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        
        fetchData();
    }, [user]);

    const handleLogout = async () => {
        try {
            await axios.post('/api/logout')
            setUser(null)
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="block-box flex justify-between items-center flex-none">
            <div className="flex flex-col justify-center">
                <form className="flex gap-5 text-2xl" method="POST" onSubmit={handleSubmit}>
                    <input 
                        className="text-black px-5 rounded-full"
                        placeholder="Search an Anime"
                        value={searchText}
                        onChange={handleInputChange}
                    />
                    <button type="submit" className="text-4xl"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </form>
            </div>
            <div className="flex gap-5 text-3xl p-4 pr-5">
                {user ? (
                    <button onClick={handleLogout} >Log Out</button>
                ) : (
                    <div className="flex gap-16">
                        <Link to='/signup'>Sign Up</Link>
                        <Link to='/login'>Log In</Link>
                    </div>
                )}
            </div>
        </div>
    )
}
export default SearchBar