import "./roadmapcard.scss";
import TypeBadge from "../type-badge/TypeBadge";
import { BiChevronUp } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { useDrag } from "react-dnd";

const RoadmapCard = ({item}) => {


    const [{isDraging}, drag] = useDrag(() => ({
        type: "div",
        item: {id: item.id},
        collect: monitor => ({
          isDragging: !!monitor.isDragging()
        }),
      }))

   if(item){
        return(
            <div className='road-map-card' ref={drag} style = {{opacity: isDraging ? 0.5 : 1}}>
                <span className={`type-color ${item.status}`}></span>
                <div className="road-map-card-info-box">
                    <div className="roadmap-title-info">
                        <span className={`iconca ${item.status}`}></span>
                        <span className="roadInfo">{item.status}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <TypeBadge>{item.category}</TypeBadge>
                    <div className="road-nimadir">
                        <TypeBadge className="colorDark">
                            <BiChevronUp />
                            <span>{item.upvotes}</span>
                        </TypeBadge>
                        <div className="feedback_comments">
                            <FaComment clasname="feedback-comment"/>
                            <span>{item.comments ? item.comments.length : 0}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
   }
};


export default RoadmapCard;