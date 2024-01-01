import {Component} from 'react'
import Cookies from 'js-cookie'
// import {Link} from "react-router-dom"
import Loader from 'react-loader-spinner'
import MovieCardItem from '../MovieCardItem'
import FooterSection from '../FooterSection'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class PopularRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    popularMoviesData: [],
  }

  componentDidMount() {
    this.getPopularMoviesData()
  }

  getPopularMoviesData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const popularApiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(popularApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        popularMoviesData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {popularMoviesData} = this.state

    return (
      <>
        <Header />
        <ul className="popular-list-container">
          {popularMoviesData.map(each => (
            <MovieCardItem details={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="popular-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="poster-failure-view">
      <img
        src="https://res.cloudinary.com/dfekejyho/image/upload/v1703917977/alert-triangle_j3hjxx.svg"
        alt="failure view"
        className="poster-failure-image"
      />
      <p className="failure-title">Something went wrong. Please try again</p>
      <button
        type="button"
        className="failure-retry-button"
        onClick={this.getPopularMoviesData}
      >
        Try Again
      </button>
    </div>
  )

  renderPopularFinalView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="popular-bg-container">
          {this.renderPopularFinalView()}
          <FooterSection />
        </div>
      </>
    )
  }
}
export default PopularRoute
