import { lazy, Suspense } from 'react';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactLoader from './components/loader';
import * as ROUTES from './constants/routes';
import UserContext from './context/user';
import useAuthListener from './hooks/use-auth-listener';

import ProtectedRoute from './helpers/protected-route';

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Profile = lazy(() => import('./pages/profile'));
const AddPh = lazy(() => import('./pages/add-photo'));
const NotFound = lazy(() => import('./pages/not-found'));


export default function App() {
  const { user } = useAuthListener();

  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return (<Route component={NotFound} />);
      }
  
      return this.props.children; 
    }
  }

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <ErrorBoundary>
          <Suspense fallback={<ReactLoader />}>
            <Switch>
              <Route path={ROUTES.LOGIN} component={Login} />
              <Route path={ROUTES.SIGN_UP} component={SignUp} />
              <Route path={ROUTES.PROFILE} component={Profile} />
              <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
                <Dashboard />
              </ProtectedRoute>
              <ProtectedRoute user={user} path={ROUTES.ADD} exact>
                <AddPh />
              </ProtectedRoute>
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </UserContext.Provider>
  );
}
