import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [usernameError, setUsernameError] = useState('')

    const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        const matchResponse = await axios.post('/api/matchUser', {username})
        setUsernameError(matchResponse.data.message)

        if (password.length < 5) {
            setPasswordError('Password must have at least 5 characters')
        }

        if (!/[A-Z]/.test(password)) {
            setPasswordError('Password must have at least 1 uppercase letter')    
        }

        if (!/\d/.test(password)) {
            setPasswordError('Password must have at least 1 digit')
        }

        if (!/[@$!%*?&]/.test(password)) {
            setPasswordError('Password must have at least 1 special character')
        }

        setPasswordError('')

        const newUser = {
            username,
            password,
        }

        const response = await axios.post('/api/signup', newUser)
        
        if (response.data.message == 'success') {
            toast.success('Sign Up Successful')
            navigate('/login', { state: { from: '/signup' } })
        } else {
            toast.error('Sign Up Failed')
        }
        
    }

    const handleLoginLink = () => {
        navigate('/login', { state: { from: '/signup' } });
    }


    return(
    <div className='text-white flex flex-col  gap-10 items-center justify-center h-screen'>
        <Link to='/' className='text-4xl font-bold text-white absolute top-0 left-0 p-5'>Anime Spotify</Link>
        <h1 className="text-5xl font-bold">Sign Up</h1>
        <form onSubmit={handleSignup} method="POST" className="flex flex-col gap-5 w-1/4 text-xl text-black font-bold">
            <input 
                placeholder="Username"
                type="text"
                name="username"
                className='p-3 rounded-full'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
            />
            {usernameError && <p className='text-lg text-red-600 text-center'>{usernameError}</p>}
            <input 
                placeholder="Password"
                type="password"
                name="password"
                className='p-3 rounded-full'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
            />
            {passwordError && <p className='text-lg text-red-600 text-center'>{passwordError}</p>}
            <button type='submit' className="bg-white rounded-full text-black w-2/5 p-3 text-xl self-center">Sign Up</button>
        </form>
        <p className='text-white text-lg'>Have an account? <button onClick={handleLoginLink}>Log In</button></p>
    </div>
)}
  
  export default Signup