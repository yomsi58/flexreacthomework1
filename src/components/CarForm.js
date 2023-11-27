import { useContext } from 'react'
import { DataContext } from '../contexts/DataProvider'

export default function CarForm() {
    const { addCar } = useContext(DataContext)

    function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)
        addCar(data.name, data.year, data.sellingPrice)
        event.target.reset()
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="" />
            </div>
            <div className="form-group">
                <label htmlFor="year">Year</label>
                <input type="text" name="year" id="" />
            </div>
            <div className="form-group">
                <label htmlFor="sellingPrice">Price</label>
                <input type="text" name="sellingPrice" id="" />
            </div>
            <button type="submit">Add Car</button>
        </form>
    )
}