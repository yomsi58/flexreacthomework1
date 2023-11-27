import { useEffect, useState, useContext } from 'react'
import { DataContext } from '../contexts/DataProvider'
import Car from '../components/Car'

export default function Home() {
    const { cars } = useContext(DataContext)
    return (
        <>
            <h1>Home</h1>
            {
                (cars.length > 0) ?
                    <>
                        <Car car={cars[0]} />
                        <Car car={cars[1]} />
                        <Car car={cars[2]} />
                    </>
                :
                    <p>Loading Cars...</p>
            }
        </>
    )
}