import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import format from 'date-fns/format'
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

class MovieDetailViewRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    similarMoviesData: [],
    detailMovieData: [],
    genreDetailsData: [],
    languagesData: [],
  }

  componentDidMount() {
    this.getDetailMovieData()
  }

  getMovieData = data => ({
    id: data.id,
    backdropPath: data.backdrop_path,
    overview: data.overview,
    posterPath: data.poster_path,
    title: data.title,
    adult: data.adult,
    budget: data.budget,
    releaseDate: data.release_date,
    runtime: data.runtime,
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
  })

  getSimilarMoviesData = data => ({
    id: data.id,
    backdropPath: data.backdrop_path,
    posterPath: data.poster_path,
    title: data.title,
  })

  getGenresData = data => ({
    id: data.id,
    name: data.name,
  })

  getSpokenLanguagesData = data => ({
    id: data.id,
    englishName: data.english_name,
  })

  getDetailMovieData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const DetailMovieApiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(DetailMovieApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedMovieData = this.getMovieData(data.movie_details)
      const genresData = data.movie_details.genres.map(each =>
        this.getGenresData(each),
      )

      const similarMoviesData = data.movie_details.similar_movies.map(each =>
        this.getSimilarMoviesData(each),
      )

      const spokenLanguageData = data.movie_details.spoken_languages.map(each =>
        this.getSpokenLanguagesData(each),
      )

      this.setState({
        detailMovieData: updatedMovieData,
        similarMoviesData,
        genreDetailsData: genresData,
        apiStatus: apiStatusConstants.success,
        languagesData: spokenLanguageData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  runtime = () => {
    const {detailMovieData} = this.state
    const hours = Math.floor(detailMovieData.runtime / 60)
    const minutes = Math.floor(detailMovieData.runtime) % 60

    return `${hours}h ${minutes}m`
  }

  releasedYear = () => {
    const {detailMovieData} = this.state
    const {releaseDate} = detailMovieData
    if (releaseDate !== undefined) {
      return format(new Date(releaseDate), 'yyyy')
    }
    return null
  }

  formattedDate = () => {
    const {detailMovieData} = this.state
    const {releaseDate} = detailMovieData

    if (releaseDate !== undefined) {
      return format(new Date(releaseDate), 'do MMMM yyyy')
    }
    return null
  }

  renderSuccessView = () => {
    const {
      detailMovieData,
      similarMoviesData,
      genreDetailsData,
      languagesData,
    } = this.state

    const censor = detailMovieData.adult ? 'A' : 'U/A'

    return (
      <div className="detail-movie-bg-con">
        <div
          style={{backgroundImage: `url(${detailMovieData.backdropPath})`}}
          className="bg-image"
        >
          <Header />
          <div className="movie-content-container">
            <h1 className="poster-title">{detailMovieData.title}</h1>
            <div className="time-year-container">
              <p className="year-time">{this.runtime()}</p>
              <p className="censor-criteria">{censor}</p>
              <p className="year-time">{this.releasedYear()}</p>
            </div>
            <p className="poster-description">{detailMovieData.overview}</p>
            <button type="button" className="play-button">
              Play
            </button>
          </div>
        </div>

        <hr />
        <div className="movie-detail-flex-container">
          <div className="movie-content-details">
            <h1 className="movie-content-title">Genres</h1>
            {genreDetailsData.map(each => (
              <p className="movie-content-description" key={each.id}>
                {each.name}
              </p>
            ))}
          </div>

          <div className="movie-content-details">
            <h1 className="movie-content-title">Audio Available</h1>
            {languagesData.map(each => (
              <p className="movie-content-description" key={each.id}>
                {each.englishName}
              </p>
            ))}
          </div>

          <div className="movie-content-details">
            <h1 className="movie-content-title">Rating Count</h1>
            <p className="movie-content-description">
              {detailMovieData.voteCount}
            </p>

            <h1 className="movie-content-title">Rating Average</h1>
            <p className="movie-content-description">
              {detailMovieData.voteAverage}
            </p>
          </div>

          <div className="movie-content-details">
            <h1 className="movie-content-title">Budget</h1>
            <p className="movie-content-description">
              {detailMovieData.budget}
            </p>

            <h1 className="movie-content-title">Release Date</h1>
            <p className="movie-content-description">{this.formattedDate()}</p>
          </div>
        </div>
        <hr />
        <h1 className="more-movies-title">More Like This</h1>

        <ul className="more-movies-container">
          {similarMoviesData.map(each => (
            <MovieCardItem details={each} key={each.id} />
          ))}
        </ul>
        <FooterSection />
      </div>
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
        onClick={this.getDetailMovieData}
      >
        Try Again
      </button>
    </div>
  )

  renderMovieDetailOutputView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return <>{this.renderMovieDetailOutputView()}</>
  }
}

export default MovieDetailViewRoute
