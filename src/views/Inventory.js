import {useContext} from 'react'
import CarForm from '../components/CarForm'
import CarList from '../components/CarList'
import { DataContext } from '../contexts/DataProvider'

export default function Inventory() {
    return (
        <>
            <h1>Inventory</h1>
            <CarForm />
            <CarList />
        </>
    )
}