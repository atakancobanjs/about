import React, { useEffect, useState } from 'react'
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { TypeAnimation } from 'react-type-animation';

const Home = () => {
    
    const { t, i18n } = useTranslation();
    
    const Route = useNavigate();

    const [station, setStation] = useState({ text_1: false, text_2: false });
    
    useEffect(() => {
        if (station.text_1 && station.text_2) {
            Route("/home")
        } else {
            return;
        }
    },[station])
    
    return (
        <div className='w-screen h-screen grid place-items-center place-content-center relative overflow-hidden'>
            <div className='w-48 h-48 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500 absolute z-10 -bottom-10 -left-10 drop-shadow-xl blur-xl'></div>
            <div className='w-48 h-48 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500 absolute z-10 bottom-3/4 left-3/4 drop-shadow-xl blur-xl'></div>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
                className="absolute top-0 left-0 w-full h-full"
            >
                <filter id='n' x='0' y='0'>
                    <feTurbulence
                        type='fractalNoise'
                        baseFrequency='0.5'
                        stitchTiles='stitch'
                    />
                </filter>
                <rect width='100%' height='100%' fill='#000' />
                <rect width='100%' height='100%' filter="url(#n)" opacity='0.15' />
            </svg>
            <div className='h-full relative flex justify-center items-center'>
                <div className='absolute z-20'>
                    <TypeAnimation
                        aria-hidden="true"
                        sequence={[
                            t("hi"),
                            100,
                            () => setStation(v => ({ ...v, text_1: true }))
                        ]}
                        wrapper="span"
                        cursor={true}
                        repeat={Infinity}
                        className='w-full text-nowrap font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 text-4xl sm:text-6xl md:text-8xl'
                    />
                </div>
                <div className="absolute z-10 mt-8">
                    <TypeAnimation
                        aria-hidden="true"
                        sequence={[
                            t("hi"),
                            1000,
                            () => setStation(v => ({ ...v, text_2: true }))
                        ]}
                        wrapper="span"
                        cursor={true}
                        repeat={Infinity}
                        className='w-full font-bold text-black sm:text-6xl md:text-8xl text-nowrap'
                    />
                </div>
            </div>
        </div>
    );
};

export default Home