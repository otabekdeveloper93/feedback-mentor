import TypeBadge from "../type-badge/TypeBadge";
import "./feedback.scss"
import { FaComment } from "react-icons/fa";
import {BiChevronUp} from "react-icons/bi";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { TodosContext } from "../contexts/todos";

const Feedback = ({data}) => {
    
    const { setUpvote } = useContext(TodosContext);

    const handlerUpvotes = (evt) =>{
        const newObj = data.find(item => item.id === +evt.target.dataset.id);
        setUpvote(newObj.upvotes += 1);
        evt.target.classList.add('activeBlue')
    }

    return (
        data?.map(item => (
            <div className="feedback-item" key={item.id}>
                <div className="upvotes" onClick={handlerUpvotes} data-id={item.id}>
                    <BiChevronUp />
                    <p>{item.upvotes}</p>
                </div>
                <Link to={`/comments/${item.id}`} >
                    <div className="Feedback-title-box">
                            <h3 className="feedback-title">{item.title}</h3>
                            <p className="feedback-description">{item.description}</p>
                            <TypeBadge>{item.category}</TypeBadge>
                    </div>
                    <div className="feedback_comments" data-id={item.id}>
                        <FaComment clasname="feedback-comment"/>
                        <span>{item.comments ? item.comments.length : ""}</span>
                    </div>
                    

                </Link>
                <div className="feedback_comment-box">
                    <div className="upvotes mobileUpvotes" onClick={handlerUpvotes} data-id={item.id}>
                        <BiChevronUp />
                        <p>{item.upvotes}</p>
                    </div>
                    <div className="feedback_comments active" data-id={item.id}>
                        <FaComment clasname="feedback-comment"/>
                        <span>{item.comments ? item.comments.length : 0}</span>
                    </div>
                </div>
            </div>
        ))
    );
};


export default Feedback;