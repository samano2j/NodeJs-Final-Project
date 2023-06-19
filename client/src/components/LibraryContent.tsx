import { useState, useEffect, FormEvent } from "react"
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface ApiResponse {
    data: { audio_name: string; audio_src: string; audio_image: string}[];
}
  
const LibraryContent = () => {
    const [data, setData] = useState<ApiResponse | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/audio')
            const data = await response.json()
            setData(data)
        }
        fetchData()
    }, [])

    const handleDelete = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement;
        const audioName = form.elements.namedItem('audio_name') as HTMLInputElement;
        const requestBody = {
            data: {
              audio_name: audioName.value
            }
        };

        await axios.delete('/api/deleteAudio', requestBody);
        window.location.reload()

    }

    return (
        <div className="text-white p-5 flex flex-col gap-5 overflow-hidden overflow-y-auto">
            {Array.isArray(data) &&
                data.map((item, index) => (
                <div key={index} className="flex gap-10 items-center">
                    <img className="h-64 w-auto" src={item.audio_image} alt={item.audio_name}/>
                    <div className="flex gap-20 items-center">
                        <div className="flex flex-col gap-2">
                        <p className="text-2xl font-bold">{item.audio_name}</p>
                        <audio controls>
                        <source src={item.audio_src} type="audio/ogg" />
                        </audio>
                        </div>
                        <form onSubmit={handleDelete}>
                            <input hidden name="audio_name" value={item.audio_name}/>
                            <button type="submit" className="text-4xl"><FontAwesomeIcon icon={faTrash} /></button>
                        </form>
                    </div>
                </div>
            ))}
        </div>
      )
      
}
export default LibraryContent