import './roadMap.scss';
import { Link } from "react-router-dom";


const RoadMap = () =>{
    
    return (
        <div className="road-map">
            <div className="road-map_title_box">
                <h3>Roadmap</h3>
                <Link to="/roadmap" className="road-map_link">View</Link>
            </div>
            <ul>
                <li>
                    <span className="roadmap_planned">
                        <span className='before planned'></span>
                        Planned
                    </span>
                    <span className="planned_count">2</span>
                </li>
                <li>
                    <span className="roadmap_planned">
                        <span className='before progress'></span>
                        In-Progress
                    </span>
                    <span className="planned_count">3</span>
                </li>                <li>
                    <span className="roadmap_planned"> 
                    <span className='before live'></span>
                        Live
                    </span>
                    <span className="planned_count">1</span>
                </li>
            </ul>
        </div>
    )
}

export default RoadMap;