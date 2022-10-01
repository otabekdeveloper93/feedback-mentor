import BackHomeLink from "../../components/back-to-link/BackHomeLink";
import Button from "../../components/buttons/Button";
import Feedback from "../../components/feedback/Feedback";
import "./commentPage.scss";
import { useState,useContext,useEffect } from "react";
import { useParams } from "react-router-dom";
import UserComment from "../../components/UserComment/UserComment";
import { TodosContext } from "../../components/contexts/todos";

const Max_length = 250;
const CommentPage = () => {
    
    const {filterData, setFilterData} = useContext(TodosContext);
    const {id} = useParams();
    const useObj = filterData.find(item => item.id === +id);
    const dataElementIndex = filterData.findIndex(item => item.id === +id);
    const [newObject, setObj] = useState(useObj);
    
    const objArr = [newObject];
    
    const [newCommentCouter, setNewCommentCouter] = useState('');
    const leftLetterCount = Max_length - newCommentCouter.length;
    const [message, setMassage] = useState('');

    const handlerTextAriaValue = (evt) => {
        if(Max_length - evt.target.value.length >= 0){
            setNewCommentCouter(evt.target.value);
        }
    }
    useEffect(() => {
       if(leftLetterCount === 0){
            setMassage(" Ma'lumot to'ldi!")
       }else{
            setMassage(" Characters left")
       }
    }, [leftLetterCount]);

    const addCommentHandler = (evt) => {
        evt.preventDefault();

        if(newCommentCouter.trim()){
            const newComment = {
                id: Math.floor(Math.random() * 1000),
                content: newCommentCouter,
                user: {
                    image: './assets/img/Oval.png',
                    name: 'Otabek Ismoilov',
                    username: 'I.O.Developer'
                }
            }
            if(newObject.comments){
                const newCommentArray = [newComment, ...newObject.comments];
                const newObj = {...newObject, comments: newCommentArray};
                setObj(newObj);
                const beforeData = filterData.slice(0,dataElementIndex);
                const afterData = filterData.slice(dataElementIndex+1);
                setFilterData([...beforeData,newObj,...afterData])
                setNewCommentCouter('')
            }else{
                const newCommentArray = [newComment];
                const newObj = {...newObject, comments: newCommentArray};
                const beforeData = filterData.slice(0,dataElementIndex);
                const afterData = filterData.slice(dataElementIndex+1);
                setFilterData([...beforeData,newObj,...afterData])
                setObj(newObj);
                setNewCommentCouter('')
            }
        }

    }

    return (
        <div className="comment-page">
            <div className="comment-header">
                <div className="header-link-box">
                    <BackHomeLink />
                    <Button to={`/edit/${newObject.id}`} className="active-color">Edit Feedback</Button>
                </div>
                <Feedback data={objArr} />
            </div>
            <div className="comment-body">
                <h4 className="comment-count"><span>{0}</span> Comments</h4>
                <UserComment data={newObject.comments ? newObject.comments : false}/>
            </div>
            <div className="add-comment-box">
                <h3>Add Comment</h3>
                <form className="add-comments-form" onSubmit={addCommentHandler}>
                <textarea value={newCommentCouter} className="add-comment-text-aria" onChange={handlerTextAriaValue} placeholder="Type your comment here"></textarea>
                <div className="comment-flex-box">
                    <p><span>{Max_length - newCommentCouter.length}</span>{message}</p>
                    <Button type="submit" className="primary">Post Comment</Button>
                </div>
                </form>
            </div>
        </div>
    );
};

export default CommentPage;