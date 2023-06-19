import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const LibrarySideContent = () => {
    const [data, setData] = useState([]);

    useEffect(()=> {
        const fetchData = async () => {
            const response = await fetch('/api/library')
            const data = await response.json()
            setData(data)
            
        }
        fetchData()
    }, [])

    return (
        <div className="text-white text-3xl">
            {Array.isArray(data) && data.map((item, index) => (
                <div key={index}>
                    <Link to={`/library/${item}`}>{item}</Link>
                </div>
            ))}
        </div>
    )
}
export default LibrarySideContent