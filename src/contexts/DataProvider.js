import { createContext, useState, useEffect, useContext } from "react"
import { getFirestore, getDoc, getDocs, collection, doc, addDoc, Timestamp, orderBy, query, collectionGroup } from '@firebase/firestore'
import { AuthContext } from './AuthProvider'

export const DataContext = createContext()

export const DataProvider = (props) => {
    const [cars, setCars] = useState([])
    const { user } = useContext(AuthContext)

    const db = getFirestore()

    useEffect(() => {
        const getCars = async() => {
            const collectionRef = collection(db, "cars")
            const collectionSnap = await getDocs(collectionRef)
            // const q = query(collectionRef, orderBy('dateCreated', 'desc'))
            // const collectionSnap = await getDocs(q)

            let carsArr = []

            collectionSnap.forEach((docSnap) => {
                carsArr.push({
                    ...docSnap.data(),
                    id: docSnap.id
                })
            })

            console.log(carsArr)

            setCars(carsArr)
        }
        getCars()
    }, [])

    const getSingleCar = async (id) => {
        const collectionRef = collection(db, "cars")
        const collectionSnap = await getDocs(collectionRef)
        // const q = query(collectionRef, orderBy('dateCreated', 'desc'))
        // const collectionSnap = await getDocs(q)

        let carsArr = []

        let resultDoc = {}

        collectionSnap.forEach((docSnap) => {
            if (docSnap.id === id) {
                resultDoc = {
                    id: id,
                    ...docSnap.data()
                }
            }
        })

        return resultDoc
        /* const collectionRef = collectionGroup(db, "cars")
        const docRef = doc(collectionRef, id)
        console.log(docRef)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            return {
                ...docSnap.data(),
                id: docSnap.id
            }
        } else {
            console.log("The document did not exist")
        } */

    }

    const addCar = async(name, year, sellingPrice) => {
        if (!user.loggedIn) {
            throw new Error("You can't add a car if you're not logged in.")
        }

        const newCar = {
            name: name,
            year: year,
            sellingPrice: sellingPrice,

            // dateCreated: Timestamp.now()
        }

        const docRef = await addDoc(collection(db, "users", user.id, "cars"), newCar)

        newCar.id = docRef.id

        setCars([newCar, ...cars])

        console.log(docRef)
        console.log("New car added", docRef.id)
    }

    const values = {
        cars,
        getSingleCar,
        addCar
    }

    return (
        <DataContext.Provider value={values}>
            { props.children }
        </DataContext.Provider>
    )
}