
export default function DeleteCommentModal({comment, onCancel, onConfirm}){
    return (
        <div>
            <div>Confirm Deletion</div>
            <div>Do you want to delete this comment?</div>
            <br></br>
            <div>
                <button onClick={()=> onConfirm(comment)}>Yes</button>
            </div>
            <br></br>
            <div>
                <button onClick={onCancel}>No</button>
            </div>
        </div>
    )
}
