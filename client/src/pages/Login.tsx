import { FormEvent, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const user = {
            username,
            password,
        }
        const response = await axios.post('/api/login', user)
        const previousPage = location.state?.from;
        
        if (response.data.message == 'Invalid Credentials') {
            setError('Invalid Credentials')
        } 
        else if (previousPage === '/signup') {
            toast.success('Log In Successful')
            navigate('/')
        }
        else {
            toast.success('Log In Successful')
            navigate(-1)
        }
    }

    return(
    <div className='text-white flex flex-col gap-10 items-center justify-center h-screen'>
        <Link to='/' className='text-4xl font-bold text-white absolute top-0 left-0 p-5'>Anime Spotify</Link>
        <h1 className="text-5xl font-bold">Log In</h1>
        <form onSubmit={handleLogin} method="POST" className="flex flex-col gap-5 w-1/4 text-xl text-black font-bold">
            <input 
                placeholder="Username"
                type="text"
                name="username"
                className='p-3 rounded-full'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
            />
            <input 
                placeholder="Password"
                type="password"
                name="password"
                className='p-3 rounded-full'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
            />
            {error && <p className='text-lg text-red-600 text-center'>{error}</p>}
            <button type='submit' className="bg-white rounded-full text-black w-2/5 p-3 text-xl self-center">Log In</button>
        </form>
        <p className='text-white text-lg'>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
    </div>
)}
  
  export default Login