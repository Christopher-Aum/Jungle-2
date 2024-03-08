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
    console.log(currentUser)
    console.log('Comments', itemComments)

    useEffect(()=> {
        if(itemComments?.find(comment => comment.user_id.id == currentUser.id)){
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
        <h1>{item.title}</h1>
        <img src={item.image}/>
        {item.owner == currentUser?.username && <button onClick={()=> navigate(`/items/${itemId}/edit`)}>Edit</button>}
        {item.owner == currentUser?.username && <button><OpenModalMenuItem
                                    itemText="Delete"
                                    modalComponent={<DeleteItemModal itemId={itemId} navigate={navigate} />}
                                /></button>}
        <h4>{item.body}</h4>
        <div>
            <span>


                {notPosted && currentUser?.username !== item.owner && <button><OpenModalMenuItem
                                    itemText="Post Comment"
                                    modalComponent={<CommentModal itemId={itemId} navigate={navigate} />}
                                /></button>}

            {itemComments?.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at))
            .map((comment)=> {

                return <>
                {}
                    <span key={comment.id}>
                        <p> {console.log(comment.user_id.username)}
                            <h2>{comment.user_id?.username}</h2> {postedAtDate(comment.updated_at)}

                        </p>
                        <p>{comment.body}</p>
                        {comment.user_id?.id !== currentUser.id &&  (<>

                        </>
                            ) }
                        {currentUser && (comment.user_id?.id === currentUser?.id) &&
                                    <button><OpenModalMenuItem
                                    itemText="Manage Comment"
                                    modalComponent={<CommentModal itemId={itemId} prevComment={comment} navigate={navigate} />}
                                /></button>
                                }
                                {currentUser && (comment.user_id?.id === currentUser?.id) &&

                                        <button onClick={() => OpenDelete(comment)} style={{color: "#000433", border: "1.5px solid rgba(0, 4, 51, .3)", borderRadius: "5px", padding: "1px 15px", margin: "10px", backgroundColor: "#EF3E2B"}}>
                                            Delete
                                        </button>

                                    }

                    </span>
                </>
            })}

            </span>
        </div>
        </>
    )
}

export default ItemPage
