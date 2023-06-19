import { useState, useEffect, FormEvent } from "react"
import { useParams } from 'react-router-dom'
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify'

interface ApiResponse {
    data: { name: string; image: string; synopsis: string; theme: { audio: string; name: string; }[];}[];
}
  

const ProfileContent = () => {
    const [data, setData] = useState<ApiResponse | null>(null);
    const { anime } = useParams()
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/profile/' + anime)
            const data = await response.json()
            setData(data)  
            
            
            const response1 = await axios.get('/api/user');
            const userData = response1.data.user;
            
            setUser(userData);
        }
        fetchData()
    }, [])

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const form = event.target as HTMLFormElement;
      const audioName = form.elements.namedItem('audio_name') as HTMLInputElement;
      const audioSrc = form.elements.namedItem('audio_src') as HTMLInputElement;
      const audioImage = form.elements.namedItem('audio_image') as HTMLInputElement;
      
      const requestBody = {
        audio_name: audioName.value,
        audio_src: audioSrc.value,
        audio_image: audioImage.value,
      }
      
      await axios.post('/api/addFavorite', requestBody)
      toast.success('Added to Favorites')
    }

    return (
        <div className="content-block text-white p-10 overflow-hidden overflow-y-auto">
          {data && data.data && data.data.map((item) => (
            <div key={item.name}>
              <div className="flex items-center gap-10">
                <img className="h-72 w-60" alt={item.name} src={item.image} />
                <div className="flex flex-col gap-5">
                  <h1 className="text-4xl">{item.name}</h1>
                  <p className="text-lg">{item.synopsis}</p>
                </div>
              </div>
              <div className="flex flex-col mt-5 gap-5">
                <h1 className="text-3xl">Themes:</h1>
                {item.theme.map((song) => (
                  <div className="flex gap-10 items-center text-xl">
                  <div key={song.name} className="flex flex-col gap-2">
                    <p>{song.name}</p>
                    <audio controls>
                      <source src={song.audio} type="audio/ogg" />
                    </audio>
                  </div>
                  {user && ( 
                    <form onSubmit={handleSubmit} method='POST'>
                      <input value={song.name} hidden name="audio_name"/>
                      <input value={song.audio} hidden name="audio_src"/>
                      <input value={data.data[0].image} hidden name="audio_image"/>
                      <button type='submit' className="text-4xl">
                        <FontAwesomeIcon icon={faStar} />
                      </button>
                    </form>
                  )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )
      
}
export default ProfileContent