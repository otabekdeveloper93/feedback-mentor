import { BiChevronDown,BiCheck, BiChevronUp} from "react-icons/bi";
import "./editFeedback.scss";
import EditIcon from "../../assets/img/edit.svg";
import Button from "../../components/buttons/Button";
import BackHomeLink from "../../components/back-to-link/BackHomeLink";
import { TodosContext } from "../../components/contexts/todos";
import { useContext, useRef, useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { categoryArr, statusArr } from "../../array";

const EditFeedback = () => {
    
    const {filterData, setFilterData} = useContext(TodosContext);
    const {itemId} = useParams();
    const editObj = filterData.find(item => item.id === +itemId)

    const inputTitle = useRef();
    const categoryValue = useRef();
    const statusValue = useRef();
    const descriptionValue = useRef();
    const categoryList = useRef();
    const statusList = useRef();
    const [displayChevron, setDisplayChevron] = useState(false)
    const backToHome = useNavigate();
    useEffect(() => {
        inputTitle.current.value = editObj.title;
        categoryValue.current.textContent = editObj.category;
        editObj.status ? statusValue.current.textContent = editObj.status : statusValue.current.textContent = "Planned";
        descriptionValue.current.value = editObj.description;
    },[editObj])
    

    const SubmitEditFeedback = (evt) => {
        evt.preventDefault();
        const dataSetId = +evt.target.dataset.id;
        const indexArray = filterData.findIndex(item => item.id === dataSetId);
        const afterArray = filterData.slice(0, indexArray);
        const beforeArray = filterData.slice(indexArray + 1);
       
        const newObj = {
            ...editObj,
            title: inputTitle.current.value,
            category: categoryValue.current.textContent,
            status: statusValue.current.textContent,
            description: descriptionValue.current.value
        }
        setFilterData([...afterArray,newObj,...beforeArray])
        
        backToHome('/')
    }

    const deleteFeedback = () => {
        const dataSetId = +itemId;
        const indexArray = filterData.findIndex(item => item.id === dataSetId);
        const afterArray = filterData.slice(0, indexArray);
        const beforeArray = filterData.slice(indexArray + 1);
        setFilterData([...afterArray,...beforeArray]);

        backToHome('/')
    }

    const handlerUlList = (evt) =>{
        evt.target.nextElementSibling.classList.toggle('diplayNone');
        setDisplayChevron(!displayChevron)
    }

    const [categoryState, setCategory] = useState(categoryArr);

    const handlerCategory = (evt) =>{
        categoryState.map(item => item.status = false);
        const status = categoryState.find(item => item.id === +evt.target.dataset.id);
        const arrIdx = categoryState.findIndex(item => item.id === +evt.target.dataset.id);
        if(status.status === false) status.status = true;
        categoryState.splice(arrIdx,1,status);
        setCategory([...categoryState])
        categoryValue.current.textContent = evt.target.children[0].textContent;
        setDisplayChevron(!displayChevron)
        categoryList.current.classList.toggle('diplayNone');
    }

    const [statusState, setStatus] = useState(statusArr);

    const handlerStatus = (evt) =>{
        statusState.map(item => item.status = false);
        const status = statusState.find(item => item.id === +evt.target.dataset.id);
        const arrIdx = statusState.findIndex(item => item.id === +evt.target.dataset.id)
        if(status.status === false) status.status = true;  
        statusState.splice(arrIdx,1,status);
        setStatus([...statusState])
        statusValue.current.textContent = evt.target.children[0].textContent;
        statusList.current.classList.toggle('diplayNone');
        setDisplayChevron(!displayChevron)
        
    }
    return (
        <div className="edit-page">
            <div className="Edit-feedback-box">
                <BackHomeLink />
                <div className="edit-feedback-cart">
                    <div className="icon-plus">
                        <img src={EditIcon} alt="edit-icon" />
                    </div>
                    <h2 className="edit-title">Editing '{editObj ? editObj.title : ""}'</h2>
                    <form className="edit-feedback-form" onSubmit={SubmitEditFeedback} data-id={itemId} >
                        <h4>Feedback Title</h4>
                        <p> Add a short, descriptive headline</p>
                            <input ref={inputTitle} name="title" id="editTitle" className="edit-feedback-title_input" type="text"/>
                        <h4>Category</h4>
                        <p>Choose a category for your feedback</p>

                        <div className="feedback-category" onClick={handlerUlList}>
                            <span id="category" className="category-input" ref={categoryValue}>Feature</span>
                            {displayChevron ? <BiChevronUp className="biChevron"/> : <BiChevronDown className="chevron-down"/>}
                        </div>
                        <ul className="choise-category diplayNone" ref={categoryList} >
                                {categoryArr.map(element => (
                                    <li data-id={element.id} key={element.id} onClick={handlerCategory}>
                                        <span>{element.names}</span>
                                        {element.status === true ? <BiCheck /> : <span></span>}
                                    </li>
                                ))}
                        </ul>
                        <h4>Update Status</h4>
                        <p>Change feedback state</p>
                        <div className="feedback-category" onClick={handlerUlList}>
                            <span id="status" className="category-input" ref={statusValue}>Planned</span>
                            {displayChevron ? <BiChevronUp className="biChevron"/> : <BiChevronDown className="chevron-down"/>}
                        </div>
                        <ul className="choise-category edit-status diplayNone" ref={statusList}>
                            {statusArr.map(element => (
                                <li data-id={element.id} key={element.id} onClick={handlerStatus}>
                                    <span>{element.names}</span>
                                    {element.status === true ? <BiCheck /> : <span></span>}
                                </li>
                            ))}
                        </ul>
                        <h4>Feedback Detail</h4>
                        <p>Include any specific comments on what should be improved, added, etc.</p>
                        <textarea className="textAria" cols="40" rows="4" ref={descriptionValue}></textarea>
                        <div className="btn-group">
                            <Button className="danger" type={"button"} onClick={deleteFeedback}>Delete</Button>
                            <Button className="dark" to="/">Cancel</Button>
                            <Button className="primary">Add Feedback</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default EditFeedback;