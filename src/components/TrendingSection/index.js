import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import VideoSlider from '../VideosSlider'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class TrendingSection extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    trendingData: [],
  }

  componentDidMount() {
    this.getTrendingData()
  }

  getTrendingData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const trendingApiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(trendingApiUrl, options)
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
        trendingData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {trendingData} = this.state
    return <VideoSlider videoData={trendingData} />
  }

  renderLoadingView = () => (
    <div className="home-loader-container" testid="loader">
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
        onClick={this.getTrendingData}
      >
        Try Again
      </button>
    </div>
  )

  renderTrendingFinalView = () => {
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
    return this.renderTrendingFinalView()
  }
}
export default TrendingSection
