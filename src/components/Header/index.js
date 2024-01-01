import {Component} from 'react'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {MdMenuOpen} from 'react-icons/md'
import './index.css'

class Header extends Component {
  state = {
    currentPath: '',
    showMenu: false,
  }

  componentDidMount() {
    const path = window.location.pathname
    this.setState({currentPath: path})
  }

  showSearchInput = () => {
    const {currentPath} = this.state
    return currentPath === '/search'
  }

  toggleMenuItems = () => {
    this.setState(prevState => ({
      showMenu: !prevState.showMenu,
    }))
  }

  onShowSearchInput = () => {
    const {getSearchApiData} = this.props
    const showInput = this.showSearchInput()
    if (showInput) {
      getSearchApiData()
    }
  }

  onEnterKeyDown = event => {
    const {getSearchApiData} = this.props
    if (event.key === 'Enter') {
      getSearchApiData()
    }
  }

  onChangeSearchInput = event => {
    const {changeSearchInput} = this.props
    changeSearchInput(event.target.value)
  }

  render() {
    const {showMenu} = this.state
    const showInput = this.showSearchInput()
    console.log(showInput)
    return (
      <nav>
        <div className="navbar">
          <div className="navbar-logo-link-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1669787785/Movies%20App/Movies_Logo_nu3gsl.png"
                alt="website logo"
                className="website-logo"
              />
            </Link>

            <ul className="header-link-container">
              <Link to="/" className="route-link">
                <li className="header-link">Home</li>
              </Link>

              <Link to="/popular" className="route-link">
                <li className="header-link">Popular</li>
              </Link>
            </ul>
          </div>
          <div className="search-and-avatar">
            <div className="search-container">
              {showInput && (
                <input
                  type="search"
                  onChange={this.onChangeSearchInput}
                  onKeyDown={this.onEnterKeyDown}
                  className="search-input"
                />
              )}
              <Link to="/search">
                <button
                  type="button"
                  className="search-button"
                  testid="searchButton"
                  onClick={this.onShowSearchInput}
                >
                  <HiOutlineSearch size={18} color="#ffffff" />
                </button>
              </Link>
            </div>
            <Link to="/account">
              <img
                src="https://res.cloudinary.com/dfekejyho/image/upload/v1703960142/Avatar_cwmznq.png"
                alt="profile"
                className="avatar-image"
              />
            </Link>

            <button
              type="button"
              className="menu-button"
              onClick={this.toggleMenuItems}
            >
              <MdMenuOpen />
            </button>
          </div>
        </div>
        {showMenu && (
          <ul className="menu-link-container">
            <Link to="/" className="route-link">
              <li className="menu-link">Home</li>
            </Link>
            <Link to="/popular" className="route-link">
              <li className="menu-link">Popular</li>
            </Link>
            <Link to="/account" className="route-link">
              <li className="menu-link">Account</li>
            </Link>
            <li>
              <button
                type="button"
                className="close-button"
                onClick={this.toggleMenuItems}
              >
                <AiFillCloseCircle />
              </button>
            </li>
          </ul>
        )}
      </nav>
    )
  }
}
export default Header
