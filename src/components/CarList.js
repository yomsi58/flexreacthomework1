import { useEffect, useState, useContext } from 'react'
import Car from './Car'
import { DataContext } from '../contexts/DataProvider'

export default function CarList() {
    const { cars } = useContext(DataContext)

    return (
        <>
            {/* { 
                cars.map(car => {
                    return (
                        <div className="card">
                            <h2>{ car.title }</h2>
                            <p>{ car.text }</p>
                        </div>
                    )
                }) 
            } */}
            { 
                cars.map(car => <Car car={car} key={ car.id } />)
            }
        </>
    )
}