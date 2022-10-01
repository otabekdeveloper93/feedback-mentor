import Button from "../buttons/Button";
import { useRef } from "react";

const ReplyComments = ({data}) => {
    const ReplyForm = useRef();

    const handlerReplyForm = () =>{
        ReplyForm.current.classList.toggle('displayNone')
    }

    if(data){
        return (
            data.map(item =>(
                <div className="comment-user reply-comments" key={item.id}>
                    <div className="comment-user-header">
                        <div className="user-name-img">
                            <img src={item.user.image}/>
                            <div className="user-name-name">
                                <h5>{item.user.name}</h5>
                                <span>@{item.user.username}</span>
                            </div>
                        </div>
                        <button className="btn-reply-comments" onClick={handlerReplyForm}>Reply</button>
                    </div>
                    <p><span>@{item.replyingTo}</span> {item.content}</p>
                    <form className="reply-form-comments displayNone" ref={ReplyForm}>
                        <textarea className="reply-text-aria" placeholder="Type your comment here"></textarea>
                        <Button className="primary">Post Reply</Button>
                    </form> 
                </div>
            ))         
        );
    }
};

export default ReplyComments;