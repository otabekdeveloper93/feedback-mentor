import notFeedback from "../../assets/img/group.png";
import Button from "../buttons/Button";
import "./notification.scss";
const Notification = () => {
    return (
        <div className="notification">
            <div className="notification-box">
                <img src={notFeedback}/>
                <h2>There is no feedback yet.</h2>
                <p>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
                <Button className="primary" to="/create">
                + Add Feedback
                </Button>
            </div>
        </div>
    );
};

export default Notification;