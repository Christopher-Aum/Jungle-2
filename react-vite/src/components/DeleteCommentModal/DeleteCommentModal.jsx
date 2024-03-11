
export default function DeleteCommentModal({comment, onCancel, onConfirm}){
    return (
        <div style={{padding:'30px'}}>
            <div className="log-title">Confirm Deletion</div>
            <div style={{color:'black', marginTop:'10px'}}>Do you want to delete this comment?</div>
            <br></br>
            <div>
                <button className="comment-button" style={{backgroundColor:"#EF3E2B"}} onClick={()=> onConfirm(comment)}>Yes</button>
            </div>
            <br></br>
            <div>
                <button className="comment-button" onClick={onCancel}>No</button>
            </div>
        </div>
    )
}
