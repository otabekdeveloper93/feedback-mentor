import Container from "../../components/container/Container";
import Feedback from "../../components/feedback/Feedback";
import FilterBadge from "../../components/filter-badge/FilterBadge";
import HeaderFeedback from "../../components/header-feedback/HeaderFeedback";
import RoadMap from "../../components/road-map/RoadMap";
import Notification from "../../components/notification-feedback/Notification";
import "./home.scss";
import { TodosContext } from "../../components/contexts/todos";
import { useContext, useState} from "react";
import { BiMenu, BiX } from "react-icons/bi";

const Home = () => {

    const {filterData} = useContext(TodosContext);

    const [isBool, setIsBool] = useState(false);

    const handlerIsBool = () => {
        setIsBool(!isBool)
    }
    return (
        <>
           <div className={`Home ${isBool ? "active" : ""}`}>
                <Container className="home_container">
                    <div className="Sidebar">
                        <div className="Title">
                            <div className="Title_block">
                                <h1>Frontend Mentor</h1>
                                <p>Feedback Board</p>
                            </div>
                            <div className="Title_icons" onClick={handlerIsBool}>
                                <BiMenu className={`Title_menu ${isBool ? "diplayNone" : ""}`}/>
                                <BiX className={`Title_menu ${isBool ? "" : "diplayNone"}`}/>
                            </div>
                        </div>
                        <div className={`sidebar-options ${isBool ? "active" : ""}`}>
                            <FilterBadge />
                            <RoadMap />
                        </div>
                        <div className={`background-span ${isBool ? "active" : ""}`}>

                        </div>
                    </div>
                    <div className="Content">
                        <HeaderFeedback />
                        <div className="feedbackBox">
                            {filterData.length === 0 ? <Notification /> : <Feedback data={filterData}/>}
                        </div>
                    </div>
                </Container>
           </div>
        </>
    );
};

export default Home;