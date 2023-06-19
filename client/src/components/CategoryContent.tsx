import { useState, useEffect } from "react"
import Card from "./Card";
import { useParams } from 'react-router-dom'

interface ApiResponse {
    data1: { name: string; year: string; image: string; slug: string;}[];
    data2: { name: string; year: string; image: string; slug: string;}[];
    data3: { name: string; year: string; image: string; slug: string;}[];
  }
  

const CategoryContent = () => {
    const [data, setData] = useState<ApiResponse | null>(null);
    const { category } = useParams()
    const [loading, setLoading] = useState(true);

    let title = "";

    if (category === "spring2023") {
        title = "Spring 2023";
    } else if (category === "winter2023") {
        title = "Winter 2023";
    } else if (category === "fall2022") {
        title = "Fall 2022";
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/category/' + category)
                const data = await response.json()
                setData(data)   
            } finally {
                setLoading(false)
            } 
        }
        fetchData()
    }, [])

    if (loading) {
        return <div className="flex justify-center items-center h-60 font-bold"><p className="text-white text-3xl">Loading...</p></div>
    }

    return (
        <div className="content-block flex-1 flex flex-col gap-5 pb-20 overflow-hidden overflow-y-auto">
            <div className="px-5">
                <div className="flex justify-between my-5">
                    <h1 className="text-4xl">{ title }</h1>    
                </div>
                {data && data.data1 && (
                    <ul className="flex gap-5 flex-wrap">
                        {data.data1.map((item) => (
                            <Card key={item.name} name={item.name} image={item.image} slug={item.slug} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
export default CategoryContent