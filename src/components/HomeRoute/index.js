import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import VideoSlider from '../VideosSlider'
import TrendingSection from '../TrendingSection'
import FooterSection from '../FooterSection'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class HomeRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    originalsData: [],
  }

  componentDidMount() {
    this.getOriginalsData()
  }

  getOriginalsData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const originalsApiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(originalsApiUrl, options)
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
        originalsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderPosterSuccessView = () => {
    const {originalsData} = this.state
    const randomGuess = Math.floor(Math.random() * originalsData.length)
    const poster = originalsData[randomGuess]
    //  console.log('................')
    //  console.log(poster.backdropPath)

    return (
      <div
        style={{backgroundImage: `url(${poster.backdropPath}) `}}
        className="bg-image"
      >
        <Header />

        <div className="movie-content-container">
          <h1 className="poster-title">{poster.title}</h1>
          <p className="poster-overview">{poster.overview}</p>
          <button className="play-button" type="button">
            Play
          </button>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="home-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderPosterFailureView = () => (
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
        onClick={this.getOriginalsData}
      >
        Try Again
      </button>
    </div>
  )

  renderPosterFinalView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPosterSuccessView()
      case apiStatusConstants.failure:
        return this.renderPosterFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderOriginalsSuccessView = () => {
    const {originalsData} = this.state
    return <VideoSlider videoData={originalsData} />
  }

  renderOriginalsFailureView = () => (
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
        onClick={this.getOriginalsData}
      >
        Try Again
      </button>
    </div>
  )

  renderOriginalsFinalView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderOriginalsSuccessView()
      case apiStatusConstants.failure:
        return this.renderOriginalsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="home-bg-container">
          {this.renderPosterFinalView()}
          <hr />
          <h1 className="section-title">Trending Now</h1>
          <div className="video-slider-container">
            <TrendingSection />
          </div>
          <h1 className="section-title">Originals</h1>
          <div className="video-slider-container">
            {this.renderOriginalsFinalView()}
          </div>
          <hr />
          <FooterSection />
        </div>
      </>
    )
  }
}
export default HomeRoute
