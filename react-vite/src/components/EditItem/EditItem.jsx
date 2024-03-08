import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import CreateItem from "../CreateItem/CreateItem"
import { thunkGetItem } from "../../redux/item"

const EditItem= () => {
    const dispatch = useDispatch()
    const {itemId}= useParams()
    const item = useSelector(state => state.items.items[itemId])

    useEffect(()=> {
        dispatch(thunkGetItem(itemId))
    }, [dispatch, itemId])

    if(!item) return <></>

    return (
        <>
        <CreateItem itemToEdit={item}/>
        </>
    )
}

export default EditItem
