import { useDispatch } from "react-redux";
import { useState } from "react";
import { thunkEditComment } from "../../redux/item";
import { thunkPostComment } from "../../redux/item";
import { useModal } from "../../context/Modal";
import { thunkGetItem } from "../../redux/item";




export default function CommentModal({itemId, prevComment}){

    const [comment, setComment] = useState(prevComment ? prevComment.body : '')
    const [errors, setErrors] = useState({})
    const [validation, setValidation] = useState({});
    const [disabled, setDisabled] = useState(false);
    const {closeModal} = useModal()
    const dispatch = useDispatch()

    function validate(){
        const tempValidation={}
        if(''===comment) tempValidation.comment = 'Enter your comment.'
        setValidation(tempValidation)

        if(Object.values(tempValidation)?.length != 0){
            return false
        }
        return true
    }

    async function submitComment(e){
        e.preventDefault()
        setDisabled(false)

        if(!validate()) return setDisabled(false)

        const payload = {
            body: comment
        }
        if(prevComment)payload.id = prevComment.id
        let response;
        response = await dispatch(prevComment ? thunkEditComment(itemId, payload) : thunkPostComment(itemId, payload))

        if(response.errors){
            setErrors({errors: Object.values(response.errors)})
            setDisabled(false)
            return
        }
        dispatch(thunkGetItem(itemId))
        closeModal()

    }

    return (
        <div>
            <div>Post Your Comment!</div>
            {errors.errors && errors.errors.map((error, i)=> (<div key={i}>{error}</div>))}
            <form onSubmit={submitComment}>
                <textarea
                value={comment}
                onChange={(e)=> setComment(e.target.value)}
                placeholder="Enter Your Comment!"
                required
                />
                {validation.comment && <p>{validation.comment}</p>}
                <button type="submit" disabled={disabled}>Submit Your Comment!</button>
            </form>
        </div>
    )
}
