import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'
import FooterSection from '../FooterSection'

const AccountDetailsSection = props => {
  const {history} = props

  const onClickLogout = () => {
    // const jwtToken = Cookies.get('jwt_token')
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <Header />

      <div className="account-details-container">
        <h1 className="heading">Account</h1>
        <hr className="separator-line" />
        <div className="membership-container">
          <p className="side-heading">Member ship:</p>
          <div className="credentials">
            <p>rahul@gamil.com</p>
            <p>Password:*******</p>
          </div>
        </div>
        <hr className="separator-line" />
        <div className="plan-details-container">
          <p className="side-heading">Plan Details</p>
          <p>Premium</p>
          <p className="ultra-text">Ultra HD</p>
        </div>
        <hr className="separator-line" />
        <div className="button-container">
          <button className="button" type="button" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </div>
      <FooterSection />
    </>
  )
}
export default AccountDetailsSection
