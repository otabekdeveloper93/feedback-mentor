import { Link } from "react-router-dom";
import "./button.scss";

const Button = ({onClick,type,children,className,to}) => {

    if(to){
        return (
            <Link to={to} className={`link btn-button ${className}`}>
                {children}
            </Link>
            )
    }
    return (
        <button onClick={onClick} type={type} className={`btn-button ${className}`}>
            {children}
        </button>
    );
};

export default Button;