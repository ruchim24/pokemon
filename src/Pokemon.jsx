import React, { useState, useEffect } from 'react';

function Pokemon() {
    const [next, setNext] = useState('');
    const [prev, setPrev] = useState('');
    const [data, setData] = useState([]);
    const [imgs,setImgs] = useState([]);


    const fetchData = async () => {
        try {
            const response = await fetch(' https://pokeapi.co/api/v2/pokemon?limit=3&offset=0');
            const res = await response.json();
            setNext(res.next);
            setPrev(res.previous);
            //setData([...res.results]);
            let arr = [];
            arr = await res?.results?.map( async (d) => {
                const url = await fetch(d.url);
                const img = await url.json();
                // setData([...data,{name:d.name,url:img?.sprites?.front_default}])
                // arr.push(img?.sprites?.front_default)
                return ({name:d.name,url:img?.sprites?.front_default})
            })
            const ans = await Promise.all(arr);
            setData(ans);
        } catch (err) {
            console.log(err);
        }
    }
    console.log(data);

    useEffect(() => {
        fetchData();
    }, []);

    // useEffect(() => {
    //     const arr = [];
    //     if(data.length>0){
    //         data?.map(async (d) => {
    //             // fetch(d.url)
    //             // .then((res) => res.json())
    //             // .then((info) => {
    //             //     arr.concat(info?.sprites?.front_default);
    //             //     console.log(info?.sprites?.front_default);
    //             //     setImgs([...imgs,info?.sprites?.front_default]);
    //             // });
    //             const res = await fetch(d.url);
    //             const Data = await res.json();
    //             console.log(Data?.sprites?.front_default);
    //         })
    //         console.log(arr,"arr")
    //     }
    // },[data]);


    const handleNext = async () => {
        try {
            const response = await fetch(next);
            // const res = await response.json();
            // setNext(res.next);
            // setPrev(res.previous);
            // setData([...res.results]);
            const res = await response.json();
            setNext(res.next);
            setPrev(res.previous);
            //setData([...res.results]);
            let arr = [];
            arr = await res?.results?.map( async (d) => {
                const url = await fetch(d.url);
                const img = await url.json();
                // setData([...data,{name:d.name,url:img?.sprites?.front_default}])
                // arr.push(img?.sprites?.front_default)
                return ({name:d.name,url:img?.sprites?.front_default})
            })
            const ans = await Promise.all(arr);
            setData(ans);

        } catch (err) {

        }
    };
console.log(imgs,"imgssss")
    const handlePrev = async() => {
        try {
            if(prev){
            const response = await fetch(prev);
            // const res = await response.json();
            // setNext(res.next);
            // setPrev(res.previous);
            // setData([...res.results]);
            const res = await response.json();
            setNext(res.next);
            setPrev(res.previous);
            //setData([...res.results]);
            let arr = [];
            arr = await res?.results?.map( async (d) => {
                const url = await fetch(d.url);
                const img = await url.json();
                // setData([...data,{name:d.name,url:img?.sprites?.front_default}])
                // arr.push(img?.sprites?.front_default)
                return ({name:d.name,url:img?.sprites?.front_default})
            })
            const ans = await Promise.all(arr);
            setData(ans);
            }

        } catch (err) {

        }
    }

    return (
        <>
            <div>Pokemon</div>
            <div className='row'>
                {data?.map((d, index) => {
                    return (
                        <div key={d?.name} className='col-md-4'>
                            <p>{d?.name}</p>
                            <img src={d?.url} />
                        </div>
                    )
                })}
                <button onClick={() => handlePrev()} disabled={prev ? false : true}>Prev</button>
                <button onClick={() => handleNext()}>Next</button>
            </div>
        </>
    );
}

export default Pokemon;