import "./roadmappage.scss";
import Container from "../../components/container/Container";
import BackHomeLink from "../../components/back-to-link/BackHomeLink";
import Button from "../../components/buttons/Button";
import RoadmapCard from "../../components/roadmapCard/roadmapCard";
import { TodosContext } from "../../components/contexts/todos";
import { useContext, useEffect, useState} from "react";
import { useDrop } from "react-dnd";

const Roadmap = () => {
    
    const {data} = useContext(TodosContext);
    const [filterMap, setFilterMap] = useState(data)
    const [planned, setPlanned] = useState([]);
    const [progress, setProgress] = useState([]);
    const [live, setLive] = useState([]);


    useEffect(() => {

        const plannedArr = filterMap.filter(item => item.status === "planned");
        const progressArr = filterMap.filter(item => item.status === "in-progress");
        const liveArr = filterMap.filter(item => item.status === "live");
        setPlanned([...plannedArr]);
        setProgress([...progressArr]);
        setLive([...liveArr])

    }, [filterMap]);




    const [{ isOver1 }, drop1] = useDrop(
        () => ({
          accept: "div",
          drop: (item) => addCartBoard1(item.id),
          collect: (monitor) => ({
            isOver: !!monitor.isOver()
          })
        }),
      );
      const [{ isOver2 }, drop2] = useDrop(
        () => ({
          accept: "div",
          drop: (item) => addCartBoard2(item.id),
          collect: (monitor) => ({
            isOver: !!monitor.isOver()
          })
        }),
      );
      const [{ isOver3 }, drop3] = useDrop(
        () => ({
          accept: "div",
          drop: (item) => addCartBoard3(item.id),
          collect: (monitor) => ({
            isOver: !!monitor.isOver()
          })
        }),
      );

    const addCartBoard1 = (id) => {
        const dropObj = data.find(item => item.id === id);
        const newDropObj = {
            ...dropObj,
            status: "planned"
        }
        const dataIndex = data.findIndex(item => item.id === id);
        const beforeArr = data.slice(0, dataIndex);
        const afterArr = data.slice(dataIndex + 1);
        setFilterMap([...beforeArr, newDropObj, ...afterArr]);
        
    }
    const addCartBoard2 = (id) => {
        const dropObj = data.find(item => item.id === id);

        const newDropObj = {
            ...dropObj,
            status: "progress"
        }
        const dataIndex = data.findIndex(item => item.id === id);
        const beforeArr = data.slice(0, dataIndex);
        const afterArr = data.slice(dataIndex + 1);
        setFilterMap([...beforeArr, newDropObj, ...afterArr]);
        
    }
    const addCartBoard3 = (id) => {
        const dropObj = data.find(item => item.id === id);

        const newDropObj = {
            ...dropObj,
            status: "live"
        }
        const dataIndex = data.findIndex(item => item.id === id);
        const beforeArr = data.slice(0, dataIndex);
        const afterArr = data.slice(dataIndex + 1);
        setFilterMap([...beforeArr, newDropObj, ...afterArr]);
        
    }
    const [plannedStats, setPlannedStats] = useState(true)
    const [progressStats, setProgressStats] = useState(false)
    const [liveStats, setLiveStats] = useState(false)

    const roadmapCardHandler = (e) => {
        setPlannedStats(false)
        setProgressStats(false)
        setLiveStats(false)

        switch (e.target.textContent.split(' ')[0]) {
            case "Planned":
                setPlannedStats(true)
                console.log(isOver1);
            break;
            case "Progress":
                setProgressStats(true)
                console.log(isOver2);
            break;            
            case "Live":
                setLiveStats(true)
                console.log(isOver3);
            break;
            default:
                break;
        }
    }

    return (
        <div className="road-map-page">
            <Container>
                <div className="road-map-header">
                    <div>
                        <BackHomeLink className="white" />
                        <h1>Roadmap</h1>
                    </div>
                    <Button className="primary" to="/create">+ Add Feedback</Button>
                </div>
                <div className="roadmap-section">
                    <div className="mobile-roadmap">
                        <div className="roadmap-section__mobile-indicator">
                            <button className="mobile-indicator__btn" style={plannedStats ? {borderBottom: "4px solid #F49F85"} : {}} onClick={roadmapCardHandler} type="button">
                                Planned <span>(2)</span>
                            </button>
                            <button className="mobile-indicator__btn" style={progressStats ? {borderBottom: "4px solid #ad1fea"} : {}} onClick={roadmapCardHandler} type="button">
                                Progress <span>(3)</span>
                            </button>
                            <button className="mobile-indicator__btn" style={liveStats ? {borderBottom: "4px solid #62BCFA"} : {}} onClick={roadmapCardHandler} type="button">
                                Live <span>(1)</span>
                            </button>
                        </div>
                        <div className="boxbek planned-box" style={plannedStats ? {display: "block"} : {display: "none"}} >
                            <div className="planned-title">
                                <h3>Planned <span>(2)</span></h3>
                                <p>Ideas prioritized for research</p>
                            </div>
                            {planned.map(item => (
                                <RoadmapCard item={item} key={item.id}/>
                            ))}
                        </div>
                        <div className="boxbek progress-box" style={progressStats ? {display: "block"} : {display: "none"}}>
                            <div className="planned-title">
                                <h3>In-Progress <span>(3)</span></h3>
                                <p>Currently being developed</p>
                            </div>
                            {progress.map(item => (
                                <RoadmapCard item={item} key={item.id}/>
                            ))}
                        </div>
                        <div className="boxbek live-box" style={liveStats ? {display: "block"} : {display: "none"}}>
                            <div className="planned-title">
                                <h3>Live <span>(1)</span></h3>
                                <p>Released features</p>
                            </div>
                            {live.map(item => (
                                <RoadmapCard item={item} key={item.id}/>
                            ))}
                        </div>
                    </div>
                    <div className="device-roadmap">
                        <div className="boxbek planned-box" ref={drop1}>
                            <div className="planned-title">
                                <h3>Planned <span>(2)</span></h3>
                                <p>Ideas prioritized for research</p>
                            </div>
                            {planned.map(item => (
                                <RoadmapCard item={item} key={item.id}/>
                            ))}
                        </div>
                        <div className="boxbek progress-box" ref={drop2}>
                            <div className="planned-title">
                                <h3>In-Progress <span>(3)</span></h3>
                                <p>Currently being developed</p>
                            </div>
                            {progress.map(item => (
                                <RoadmapCard item={item} key={item.id}/>
                            ))}
                        </div>
                        <div className="boxbek live-box" ref={drop3}>
                            <div className="planned-title">
                                <h3>Live <span>(1)</span></h3>
                                <p>Released features</p>
                            </div>
                            {live.map(item => (
                                <RoadmapCard item={item} key={item.id}/>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};


export default Roadmap;




