import { useRef } from 'react';
import Button from '../buttons/Button';
import ReplyComments from '../reply-comments/replyComments'

const UserComment = ({data}) => {
    const replyForm = useRef();

    const handlerReplyForm = () =>{
        replyForm.current.classList.toggle('displayNone')
    }

    // console.log(data);
    if(data !== false){
        return (
            data.map(item => (
                <div className="comment-user" key={item.id}>
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
                    <p>{item.content}</p>
                    <form className="reply-form-comments displayNone" ref={replyForm}>
                        <textarea className="reply-text-aria" placeholder="Type your comment here"></textarea>
                        <Button className="primary">Post Reply</Button>
                    </form>
                    <ReplyComments data={item.replies}/>
                </div>
            ))
        )
    }
};


export default UserComment;