import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Car from '../components/Car'
import { DataContext } from '../contexts/DataProvider'

export default function InventorySingle() {
    const { id } = useParams()
    const [car, setCar] = useState({})
    const [carState, setCarState] = useState("LOADING")
    const { getSingleCar } = useContext(DataContext)

    useEffect(() => {
        const queryCar = async() => {
            setCar(await getSingleCar(id))
            setCarState("LOADED")
        }
        queryCar()
    }, [getSingleCar, id])

    return (
        <>
            {
                (carState === "LOADED") ?
                <Car car={car} hideLink={true} /> :
                <p>Loading...</p>
            }
        </>
    )
}