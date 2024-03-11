import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { thunkDeleteItem } from "../../redux/item";

function DeleteItemModal({itemId, navigate}){
    const {closeModal} = useModal()
    const dispatch = useDispatch()

    const deleteItem= async(e) => {
        e.preventDefault()
        await dispatch(thunkDeleteItem(itemId))
        navigate('/')
        closeModal()
    }

    const keepItem = (e) => {
        e.preventDefault()
        closeModal()
    }

    return (
        <>
        <form className="DeleteForm">
        <h1 className="log-title">Confirm Delete</h1>
        <h3 style={{color:'black', marginTop:'10px'}}>Are you sure you want to delete this Item?</h3>
                <button className="comment-button" style={{backgroundColor:"#EF3E2B"}} onClick={deleteItem}>Yes (Delete Item)</button>
                <button className="comment-button" onClick={keepItem}>No (Keep Item)</button>
        </form>
        </>
    )
}

export default DeleteItemModal
