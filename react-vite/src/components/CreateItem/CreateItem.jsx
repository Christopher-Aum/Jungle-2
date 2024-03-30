import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkEditItem, thunkPostItem } from "../../redux/item";
import './CreateItem.css'

const CreateItem = ({itemToEdit, dontNavigate=false}) => {
//MAKE A SEPARATE UPDATE PAGE WITH A SIMPLE EDIT BUTTON ON ITEMPAGE, THEN PASS DATA FROM EDIT PAGE TO CREATE PAGE
const dispatch = useDispatch();
    const navigate = useNavigate()
    const [errors, setErrors] = useState({});
    const [validation, setValidation] = useState({});
    const [disabled, setDisabled] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const [image, setImage] = useState()
    const [imageURL, setimageURL] = useState(itemToEdit ? itemToEdit.image: 'No Image URL')
    const [title, setTitle] = useState(itemToEdit ? itemToEdit.title : '')
    const [body, setBody] = useState(itemToEdit ? itemToEdit.body : '')
    const [type, setType] = useState(itemToEdit ? itemToEdit.type : '')

    function onImageChange(e) {
        if(e.target.files && e.target.files[0]){
            const url = URL.createObjectURL(e.target.files[0])
            setImage(e.target.files[0])
            setimageURL(url)
        }
    }

    function validate(){
        const tempValidation = {}
        if (''==title) tempValidation.title = 'Enter a title.'
        if(title.length <= 1) tempValidation.title = 'Title must have more than one character.'
        if(''==body) tempValidation.body = 'Enter a body.'
        if(body.length < 30) tempValidation.body = 'Enter more than 30 characters.'
        if(''==type) tempValidation.type = 'Pick a type.'
        if(!image && !itemToEdit) tempValidation.image = 'Enter an image.'
        setValidation(tempValidation)

        if(Object.values(tempValidation)?.length != 0){
            return false
        }
        return true
    }

    async function onSubmit(e){
        e.preventDefault()
        setDisabled(false)

        if(!validate()) return setDisabled(false)

        const payload = {
            title,
            body,
            type
        }
        if(image) payload.image = image
        if(itemToEdit) payload.id = itemToEdit.id
        let response;
        if(!dontNavigate) {response = await dispatch(itemToEdit ? thunkEditItem(payload) : thunkPostItem(payload))}

        if(response.errors){
            setErrors({errors: Object.values(response.errors)})
            setDisabled(false)
            return
        }
        if(!dontNavigate) navigate(`/items/${response.id}`)
        else setHasSubmitted(true)
    }

    function clearForm(e){
        e.preventDefault()
        setImage("No Image")
        setTitle('')
        setBody('')
        setType('')
    }

    return !hasSubmitted || !dontNavigate ? (
        <form onSubmit={onSubmit} className="upload-form-item">
            <div>
                <h1>Upload an Item</h1>
            </div>
                    {errors.errors && errors.errors.map((error, i)=> (<div key={i}>{error}</div>))}
            <div>
            <span>Image*</span>
            <div className="create-item-wrap">

                    <label className="image-label">

                    <img src={imageURL !='No Image URL' ? imageURL : 'https://jungle-capstone.s3.amazonaws.com/Plus.png'} />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={onImageChange}
                        />
                    </label>

                    {validation.image && <p className="errors">{validation.image}</p>}
                <div className="create-item-wrap">
                    <label>
                        Title*
                        <input
                        style={{borderRadius:'10px', marginLeft:'10px'}}
                        type="text"
                        value={title}
                        onChange={(e)=> setTitle(e.target.value)}
                        />
                        {validation.title && <p className="errors">{validation.title}</p>}
                    </label>
                    <label>
                        Set Category*
                        <select
                        type='select'
                        style={{borderRadius:'10px', marginLeft:'10px'}}
                        value={type}
                        onChange={(e)=> setType(e.target.value)}
                        >
                            <option value='' defaultValue hidden>None</option>
                            <option value='Computers'>Computers</option>
                            <option value='Electronics'>Electronics</option>
                            <option value='Gaming'>Gaming</option>
                            <option value='Music'>Music</option>
                            <option value='Home'>Home</option>
                        </select>
                        {validation.type && <p className="errors">{validation.type}</p>}
                    </label>
                    <label>
                        <label className="create-item-body">Body*</label>
                        <textarea
                        className="comment-input"
                        style={{height:'100px'}}
                        value={body}
                        onChange={(e)=> setBody(e.target.value)}

                        />
                        {validation.body && <p className="errors">{validation.body}</p>}
                    </label>
                    <span>* Required fields</span>
                    <div>
                        <button className="comment-button" type="cancel" onClick={clearForm}>Cancel</button>
                        <button className="comment-button" type="submit" disabled={disabled}>Submit</button>
                    </div>
                </div>
                </div>
            </div>
        </form>
    ) : (
        <div>
            <img src={imageURL} />
            <span>{title}</span>
            <span>{body}</span>
        </div>
    )
}

export default CreateItem
