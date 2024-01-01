import {Link} from 'react-router-dom'
import './index.css'

const PageNotFound = () => (
  <div className="not-found-container">
    <div className="not-found-page-content-con">
      <h1 className="not-found-page-heading">Lost Your Way?</h1>
      <p className="not-found-page-description">
        we are sorry, the page you requested could not be found Please go back
        to the homepage.
      </p>
      <Link to="/">
        <button type="button" className="not-found-page-button">
          Go to Home
        </button>
      </Link>
    </div>
  </div>
)

export default PageNotFound
