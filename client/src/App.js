import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Auth from './components/Auth.jsx'
import Profile from './components/Profile.jsx'
import Public from './components/Public.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { UserContext } from './context/UserProvider.jsx'

export default function App() {
  const { token, logout, getIssues } = useContext(UserContext)
  return (
    <div className="app">
      {token && <Navbar getIssues={getIssues} logout={logout} />}
      <Switch>
        <Route
          exact path="/"
          render={() => token ? <Redirect to="/profile" /> : <Auth />}
        />
        <ProtectedRoute
          path="/profile"
          component={Profile}
          redirectTo="/"
          token={token}
        />
        <ProtectedRoute
          path="/public"
          component={Public}
          redirectTo="/"
          token={token}
        />
      </Switch>
    </div>
  )
}