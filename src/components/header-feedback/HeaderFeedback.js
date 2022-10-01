import "./headerFeedback.scss";
import bulb from "../../assets/img/bulb.svg";
import Button from "../buttons/Button";
import { BiChevronDown, BiChevronUp} from "react-icons/bi";
import { useRef, useContext, useState} from "react";
import { TodosContext } from "../contexts/todos";


const HeaderFeedback = () => {
    const ulRef = useRef();
    const sortTitle = useRef();
    const { filterData, setFilterData } = useContext(TodosContext);
    const [displayNone, setDisplayNone] = useState(false)

    const handlerDiplayNone = () => { 
        setDisplayNone(!displayNone);
    }
    const sortFeedback = (e) => {

        sortTitle.current.textContent = e.target.textContent;

        const newFilterArr = filterData.sort((a,b) => {
            switch (e.target.textContent) {
                case "Most Upvotes":
                    return b.upvotes - a.upvotes
                case "Least Upvotes":
                    return a.upvotes - b.upvotes
                case "Most Comments":
                    if(a.comments && b.comments && a.comments.length !== 0){
                        return b.comments.length - a.comments.length
                    } 
                    break;
                case "Least Comments":
                    if(a.comments && b.comments && a.comments.length !== 0){
                        return a.comments.length - b.comments.length
                    } 
                    break;
                default:
                    return filterData
            }
            return filterData
        })
        setFilterData([...newFilterArr])
        setDisplayNone(false)
    }
    
    
    return (
        <div className="header-feedback">
            <div className="feedback-logo">
                <img src={bulb} className="logo" alt="bulpPng"/>
                <h1>6 Suggestions</h1>
            </div>
            <div className="feedback-sort-btn-box">
                <button className="sort-btn" onClick={handlerDiplayNone}>
                    <span>Sort by :</span>
                    <span ref={sortTitle}>Most Upvotes</span>
                    { displayNone ? <BiChevronUp className="Chevron"/> : <BiChevronDown className="Chevron"/>}
                </button>
                <ul style={displayNone ? {display: "block"} : {display: "none"}} ref={ulRef}>
                    <li onClick={sortFeedback}>Most Upvotes</li>
                    <li onClick={sortFeedback}>Least Upvotes</li>
                    <li onClick={sortFeedback}>Most Comments</li>
                    <li onClick={sortFeedback} className="borderNone">Least Comments</li>
                </ul>
            </div>
            <Button className="primary" to="/create">
            + Add Feedback
            </Button>
        </div>
    );
};

export default HeaderFeedback;