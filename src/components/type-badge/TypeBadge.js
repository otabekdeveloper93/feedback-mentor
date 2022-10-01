import './typeBadge.scss'

const TypeBadge = ({children, className = ""}) =>{
    return (
        <span className={`typeBadge ${className}`}>{children}</span>
    )
}
export default TypeBadge;