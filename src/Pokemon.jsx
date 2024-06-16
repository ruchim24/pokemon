import React, { useState, useEffect, useRef } from 'react';

function Pokemon({isLoading,setIsLoading}) {
    const [next, setNext] = useState('');
    const [prev, setPrev] = useState('');
    const [data, setData] = useState([]);
    const [page,setPage] = useState(0);
    const [prevData,setPrevData] = useState([]);
    const [imgLoad,setImgLoad] = useState(true);

    const initialRender = useRef(false);


    const fetchData = async (api) => {
        try {
            setIsLoading(true);
            const response = await fetch(api);
            const res = await response.json();
            setNext(res.next);
            setPrev(res.previous);
        
            let arr = [];
            arr = res?.results?.map( async (d) => {
                const url = await fetch(d.url);
                const pokedata = await url.json();
              
                return ({name:pokedata?.name,url:pokedata?.sprites?.front_default,id:pokedata?.id,pageNo:page})
            })
            console.log(arr,"oo");
            const ans = await Promise.all(arr);
            setData(ans);
            setPrevData([...prevData,ans]);
            setPage(page+1);
        } catch (err) {
            console.log(err);
        }
        finally{
          setImgLoad(true);
           setIsLoading(false);
        }
    }

    useEffect(() => {
        if(initialRender.current){
        const url = 'https://pokeapi.co/api/v2/pokemon?limit=3&offset=0';
        fetchData(url);
        }
        initialRender.current = true;
    }, []);

   

    const handleNext = () => {
        fetchData(next);
    };

    const handlePrev = () => {
        fetchData(prev);
    }

    return (
        <>
            {isLoading && 
            <div className='backdrop'>
            <div className='loader'></div>
            </div>
            }
            <div className='cards-box'>
                <div className='cards-main'>
                {data?.map((d, index) => {
                    return (
                        <div key={d?.name} className='cards'>
                            <div className='cards-content'>
                                <span>{d?.name}</span>
                                <span>ID: {d?.id}</span>
                            </div>
                            <div className='cards-img'>
                                { imgLoad && <p className='imgloading'>Loading...</p>}
                                <img src={d?.url} loading='lazy' aria-placeholder={d.name} alt={d?.name} onLoad={() => setImgLoad(false)}/>
                            </div>
                        </div>
                    )
                })}
                </div>
                <div className='cards-btn'>
                <button onClick={() => handlePrev()} disabled={prev ? false : true}>Prev</button>
                <button onClick={() => handleNext()}>Next</button>
                </div>
            </div>
        </>
    );
}

export default Pokemon;