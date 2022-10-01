import { Link } from "react-router-dom";
import { BiChevronLeft} from "react-icons/bi";
import "./backtolink.scss";

const BackHomeLink = ({className = ""}) => {
    return (
        <Link to="/" className={`back-to-home_link ${className}`}>
            <BiChevronLeft />
            Go Back
        </Link>
    );
};

export default BackHomeLink;