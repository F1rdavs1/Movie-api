import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAxios } from '../hooks/useAxios'
import { API_KEY, IMG_URL, TOKEN } from '../hooks/useEnv'
import YouTube from 'react-youtube'

function SinglePage() {
    const { id } = useParams()
    const [singleData, setSingleData] = useState({})
    const [videos, setVideos] = useState([])
    const [actors, setActors] = useState([])

    useEffect(() => {
        // Fetch movie details
        useAxios().get(`/movie/${id}?api_key=${API_KEY}`).then(res => {
            setSingleData(res.data)
        })

        // Fetch movie videos
        useAxios().get(`/movie/${id}/videos?language=en-US&api_key=${API_KEY}`, {
            headers: {
                "Authorization": `Bearer ${TOKEN}`
            }
        }).then(res => {
            setVideos(res.data.results)
        })

        useAxios().get(`/movie/${id}/credits?language=en-US&api_key=${API_KEY}`, {
            headers: {
                "Authorization": `Bearer ${TOKEN}`
            }
        }).then(res => {
            setActors(res.data.crew)
        })
    }, [id])

    return (
        <>
            <div className='flex justify-between my-7 px-5'>
                {/* Left Sidebar */}
                <div className='w-[30%] space-y-2 p-5 bg-slate-200 rounded-md h-[90vh] overflow-y-auto'>
                    {
                        actors?.map((item, index) => (
                            <div key={index} className='w-[50%] mx-auto p-2 rounded-md bg-white text-center'>
                                <img className='rounded-lg mx-auto ' src={`${IMG_URL}/${item.profile_path}`} alt="Single Image" width={'70'} />
                                <h2>{item.name}</h2>
                                <p>{item.job}</p>
                            </div>
                        ))
                    }
                </div>
                
                {/* Main Content */}
                <div className='w-[39%] p-5 bg-slate-200 rounded-md h-[90vh] overflow-y-auto'>
                    {singleData.backdrop_path && (
                        <img className='rounded-lg' src={`${IMG_URL}/${singleData.backdrop_path}`} alt="Single Image" width={'100%'} />
                    )}
                    <h2 className='font-bold text-[25px] my-5'>{singleData.title}</h2>
                    <p>{singleData.overview}</p>
                </div>

                {/* Right Sidebar (Videos) */}
                <div className='w-[30%] p-5 space-y-3 bg-slate-200 rounded-md overflow-y-auto h-[90vh]'>
                    {videos.map(item => (
                        <YouTube  videoId={item.key} key={item.id} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default SinglePage
