import {Route, Switch} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import ProtectedRoute from './components/ProtectedRoute'
import HomeRoute from './components/HomeRoute'
import PopularRoute from './components/PopularRoute'
import PageNotFound from './components/PageNotFound'

import MovieDetailViewRoute from './components/MovieDetailViewRoute'
import AccountDetailsSection from './components/AccountDetailsSection'
import SearchRoute from './components/SearchRoute'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={HomeRoute} />
    <ProtectedRoute exact path="/popular" component={PopularRoute} />
    <ProtectedRoute exact path="/movies/:id" component={MovieDetailViewRoute} />
    <ProtectedRoute exact path="/account" component={AccountDetailsSection} />
    <ProtectedRoute exact path="/search" component={SearchRoute} />
    <Route component={PageNotFound} />
  </Switch>
)

export default App
