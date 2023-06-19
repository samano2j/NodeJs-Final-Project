import { useState, useEffect } from "react";
import Card from "./Card";
import { Link } from 'react-router-dom'


interface ApiResponse {
    data1: { name: string; year: string; image: string; slug: string}[];
    data2: { name: string; year: string; image: string; slug: string}[];
    data3: { name: string; year: string; image: string; slug: string}[];
  }
  

const Content = () => {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/')
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
                    <h1 className="text-4xl">Spring 2023</h1>    
                    <Link to="/category/spring2023" >Show All</Link>
                </div>
            {data && data.data1 && (
                <ul className="flex gap-5">
                    {data.data1.map((item) => (
                        <Card key={item.name} name={item.name} image={item.image} slug={item.slug} />
                    ))}
                </ul>
            )}
            </div>
            <div className="px-5">
                <div className="flex justify-between my-5">
                    <h1 className="text-4xl">Winter 2023</h1>    
                    <Link to="/category/winter2023">Show All</Link>
                </div>
            {data && data.data2 && (
                <ul className="flex gap-5">
                    {data.data2.map((item) => (
                        <Card key={item.name} name={item.name} image={item.image} slug={item.slug}/>
                    ))}
                </ul>
            )}
            </div>
            <div className="px-5">
                <div className="flex justify-between my-5">
                    <h1 className="text-4xl">Fall 2022</h1>    
                    <Link to="/category/fall2022">Show All</Link>
                </div>
            {data && data.data3 && (
                <ul className="flex gap-5">
                    {data.data3.map((item) => (
                        <Card key={item.name} name={item.name} image={item.image} slug={item.slug}/>
                    ))}
                </ul>
            )}
            </div>
        </div>
    )
}
export default Content