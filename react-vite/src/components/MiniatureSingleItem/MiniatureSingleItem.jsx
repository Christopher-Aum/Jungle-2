import './MiniatureSingleItem.css'
import {Link} from "react-router-dom"

const MiniatureSingleItem = ({item}) => {
    const picture = item.image

    return (
        <span className='Single-Item-Container'>
            <Link to={`/items/${item.id}`}>
            <img className='Mini-Single-Item-Image' src={picture} />
            </Link>
            <p className='Single-Item-Title'>{item.title}</p>
        </span>
    )
}

export default MiniatureSingleItem
