import { useState, useEffect } from "react"
import Card from "./Card";
import { useParams } from 'react-router-dom'

interface ApiResponse {
    data: { name: string; year: string; image: string; slug: string; }[];
  }
  
  interface SearchContentProps {
    loading: boolean
    setLoading: (loading: boolean) => void
  }

const SearchContent = ({ loading, setLoading }: SearchContentProps) => {
    const { searchItem } = useParams();
    const [searchData, setSearchData] = useState<ApiResponse | null>(null);
    
    useEffect(() => {

        
        const fetchData = async () => {
            try {
                if(searchItem) {
                    const response = await fetch("/api/search", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ searchText: searchItem }),
                    });
                    const dataResponse = await response.json();
                    setSearchData(dataResponse);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [searchItem])

    if (loading) {
        return <div className="flex justify-center items-center h-60 font-bold"><p className="text-white text-3xl">Loading...</p></div>
    }

    return (
        <div className="content-block flex-1 flex flex-col gap-5 pb-20 overflow-hidden overflow-y-auto">
            <div className="px-5">
                <div className="flex justify-between my-5">
                    <h1 className="text-4xl">Search</h1>
                </div>
                {searchData && searchData.data && (
                <ul className="flex gap-5 flex-wrap">
                    {searchData.data.map((item) => (
                        <div key={item.slug}>
                        <Card key={item.slug} name={item.name} image={item.image} slug={item.slug} />
                        </div>
                    ))}
                </ul>
                )}
            </div>
        </div>
    )
}
export default SearchContent