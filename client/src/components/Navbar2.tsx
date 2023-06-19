import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'


const Navbar2 = () => {
    const [user, setUser] = useState(null);

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
        <div className="block-box flex justify-between flex-none">
            <div className="flex flex-col p-4">
                <h1 className="text-4xl">Anime Spotify</h1>
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
    );
};

export default Navbar2;
