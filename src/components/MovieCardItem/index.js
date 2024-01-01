import {Link} from 'react-router-dom'
import './index.css'

const MovieCardItem = props => {
  const {details} = props
  const {title, id, posterPath} = details
  return (
    <li className="movie-item">
      <Link to={`/movies/${id}`}>
        <img src={posterPath} alt={title} className="movie-item-image" />
      </Link>
    </li>
  )
}
export default MovieCardItem
