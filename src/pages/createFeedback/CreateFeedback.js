import { BiChevronUp,BiChevronDown,BiCheck} from "react-icons/bi";
import "./createFeedback.scss";
import Button from "../../components/buttons/Button";
import BackHomeLink from "../../components/back-to-link/BackHomeLink";
import { useState, useRef} from "react";
import { TodosContext } from "../../components/contexts/todos";
import { useContext } from "react";
import { categoryArr } from "../../array";
import { useNavigate } from "react-router-dom";

const CreateFeedback = () => {
    
    const {data,setData} = useContext(TodosContext);
    const backToHome = useNavigate();
    const [massageInput, setMassageInput] = useState('');
    const [massageTextAria, setMassageTextAria] = useState('');
    const categoryList = useRef();
    const inputTitle = useRef();
    const categoryRef = useRef();
    const desciptionRef = useRef();

    const handlerUlList = (evt) =>{
        categoryList.current.classList.toggle('diplayNone');
        evt.target.children[1].classList.toggle('diplayNone');
        evt.target.children[2].classList.toggle('diplayNone');
    }

    const handlerCreateFeedback = (evt) => {
        evt.preventDefault();
        if(inputTitle.current.value && desciptionRef.current.value){
            const newObj = {
                id: Math.floor(Math.random() * 10000),
                title: inputTitle.current.value,
                category: categoryRef.current.textContent,
                description: desciptionRef.current.value,
                upvotes: 0
            }
            const newArray = [newObj, ...data]
            setData([...newArray]);
            setMassageInput('')
            setMassageTextAria('')
            desciptionRef.current.style.border = "none";
            inputTitle.current.style.border = "none";
            backToHome('/');
        }
        else if(!inputTitle.current.value){
            inputTitle.current.style.border = "1px solid #f00";
            desciptionRef.current.style.border = "none";
            setMassageInput("Can’t be empty")
            setMassageTextAria('')
        }
        else if(!desciptionRef.current.value){
            desciptionRef.current.style.border = "1px solid #f00";
            inputTitle.current.style.border = "none";
            setMassageInput('')
            setMassageTextAria("Can’t be empty")
        }
    }

    const [statusState, setStatus] = useState(categoryArr);
    
    const handlerCategory = (evt) =>{
        statusState.map(item => item.status = false);
        const status = statusState.find(item => item.id === +evt.target.dataset.id);
        const arrIdx = statusState.findIndex(item => item.id === +evt.target.dataset.id)
        if(status.status === false) status.status = true;  
        statusState.splice(arrIdx,1,status);
        setStatus([...statusState])
        categoryRef.current.textContent = evt.target.children[0].textContent;
        evt.target.parentElement.classList.toggle('diplayNone');
        categoryRef.current.nextElementSibling.classList.toggle('diplayNone');
        categoryRef.current.nextElementSibling.nextElementSibling.classList.toggle('diplayNone');
    }

    return (
        <div className="create-feedback-page">
            <div className="Create-feedback-box">
                <BackHomeLink />
                <div className="create-feedback-cart">
                    <div className="icon-plus">
                        +
                    </div>
                    <h2 className="create-title">Create New Feedback</h2>
                    <form className="create-feedback-form" onSubmit={handlerCreateFeedback}>
                        <h4>Feedback Title</h4>
                        <p> Add a short, descriptive headline</p>
                            <input ref={inputTitle} name="title" className="create-feedback-title_input" type="text"/>
                            <small>{massageInput}</small>
                        <h4>Category</h4>
                        <p>Choose a category for your feedback</p>
                        <div className="feedback-category" onClick={handlerUlList}>
                            <span ref={categoryRef} className="category-input">Feature</span>
                            <BiChevronDown className="biChevron"/>
                            <BiChevronUp className="biChevron diplayNone"/>
                        </div>
                        <ul className="choise-category diplayNone" ref={categoryList}>
                            {statusState.map(element => (
                                <li data-id={element.id} key={element.id} onClick={handlerCategory}>
                                    <span>{element.names}</span>
                                    {element.status === true ? <BiCheck /> : <span></span>}
                                </li>
                            ))}
                        </ul>
                        <h4>Feedback Detail</h4>
                        <p>Include any specific comments on what should be improved, added, etc.</p>
                        <textarea ref={desciptionRef} className="textAria" cols="40" rows="4"></textarea>
                        <small>{massageTextAria}</small>
                        <div className="btn-group">
                            <Button className="dark" to="/">Cancel</Button>
                            <Button className="primary">Add Feedback</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default CreateFeedback;