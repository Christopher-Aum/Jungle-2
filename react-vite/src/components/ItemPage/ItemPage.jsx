import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { thunkGetItem } from "../../redux/item"
import { useState } from "react"
import { useEffect } from "react"
// import { useNavigation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import { useModal } from "../../context/Modal"
import { thunkEditComment, thunkDeleteComment } from "../../redux/item"
import DeleteCommentModal from "../DeleteCommentModal/DeleteCommentModal"
import CommentModal from "../CommentModal/CommentModal"
import './ItemPage.css'


/*
MAKE COMMENT POST PAGE AND UPDATE PAGE,
 SET CONDITION WHERE IF THEY HAVE NOT POSTED,
 SHOW BUTTON TO NAVIGATE TO PAGE
*/
const ItemPage = () => {
    const {itemId} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {closeModal, setModalContent} = useModal()
    const [editingComment, setEditingComment] = useState(-1)
    const [commentText, setCommentText] = useState('')
    const [notPosted, setNotPosted] = useState(true)
    useEffect(()=> {
        dispatch(thunkGetItem(itemId))
    }, [dispatch, itemId])



    const item = useSelector(state => state.items.items[itemId])
    const currentUser = useSelector((state)=>state.session.user)
    const itemComments = item?.comments


    useEffect(()=> {
        if(currentUser && itemComments?.find(comment => comment.user_id?.id == currentUser?.id)){
            setNotPosted(false)
        } else setNotPosted(true)
    })
    if (!item) return <h1>Loading</h1>
    const confirmDeletion = async (itemId, commentId) => {
        await dispatch(thunkDeleteComment(itemId, commentId))
        closeModal()
        await dispatch(thunkGetItem(itemId))
    }

    const OpenDelete = (comment) => {
        setModalContent(
            <DeleteCommentModal
            onConfirm={()=> confirmDeletion(itemId, comment.id)}
            onCancel={closeModal}
            />
        )
    }


    const postedAtDate = (created_at) => {
        const date = new Date(created_at + " UTC")
        const now = new Date()

        const timeDiff = now - date -  date.getTimezoneOffset() * 60000
        const secondsDiff = Math.floor(timeDiff / 1000)
        const minutesDiff = Math.floor(secondsDiff / 60)
        const hoursDiff = Math.floor(minutesDiff / 60)
        const daysDiff = Math.floor(hoursDiff / 24)
        const monthsDiff = Math.floor(daysDiff / 30)
        const yearsDiff = Math.floor(monthsDiff / 12)

        if(yearsDiff >=1){
            return `${yearsDiff} year${yearsDiff !== 1 ? 's': ''} ago`
        } else if (monthsDiff >= 1){
            return `${monthsDiff} month${monthsDiff !== 1 ? 's': ''} ago`
        } else if (daysDiff >= 1){
            return `${daysDiff} day${daysDiff !== 1 ? 's' : ''} ago`
        } else {
            const happyTime = Math.max(0, hoursDiff)
            return `${happyTime} hour${happyTime !== 1 ? 's' : ''} ago`
        }
    }


    return (
        <>
        <h1 className="item-title">{item.title}</h1>
        <div className="item-container">
        <div className="item-buttons-wrap">
        <img className="item-image" src={item.image}/>

        {item.owner == currentUser?.username && <button className="item-buttons" onClick={()=> navigate(`/items/${itemId}/edit`)}>Edit Item</button>}
        {item.owner == currentUser?.username && <button className="item-buttons"><OpenModalMenuItem
                                    itemText="Delete Item"
                                    modalComponent={<DeleteItemModal itemId={itemId} navigate={navigate} />}
                                /></button>}
        </div>
        <h4 className="item-body">{item.body}</h4>
        </div>
        <div className="comments">
            <span>


                {notPosted && currentUser && currentUser?.username !== item?.owner && <button className="item-buttons post-comment"><OpenModalMenuItem
                                    itemText="Post Comment"
                                    modalComponent={<CommentModal itemId={itemId} navigate={navigate} />}
                                /></button>}

            {itemComments?.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at))
            .map((comment)=> {

                return <>
                {}
                    <span key={comment?.id}>
                        <p> {}
                            <h2>{comment?.user_id?.username}</h2> {postedAtDate(comment?.updated_at)}

                        </p>
                        <p>{comment?.body}</p>
                        {comment?.user_id?.id !== currentUser?.id &&  (<>

                        </>
                            ) }
                                    <div className="comment-buttons">

                                    {currentUser && (comment?.user_id?.id === currentUser?.id) &&
                                    <button className="item-buttons"><OpenModalMenuItem
                                    itemText="Manage Comment"
                                    modalComponent={<CommentModal itemId={itemId} prevComment={comment} navigate={navigate} />}
                                /></button>
                                }
                                {currentUser && (comment?.user_id?.id === currentUser?.id) &&

                                        <button className="item-buttons" onClick={() => OpenDelete(comment)} style={{backgroundColor: "#EF3E2B"}}>
                                            Delete
                                        </button>

                                    }
                                    </div>


                    </span>
                </>
            })}

            </span>
        </div>
        </>
    )
}

export default ItemPage
