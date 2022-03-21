import React, { Fragment, Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

import ErrorBoundary from "./components/error-boundary.component";


// const HeaderApp = React.lazy(() => import("./components/headerapp"));
import HeaderApp from "./components/headerapp";
const AuthApp = React.lazy(() => import("./components/authapp"));
const DashboardApp = React.lazy(() => import("./components/dashboardapp"));

// import NotificationModule from "common/NotificationModule";


const notification = {
  title: 'first notification',
  description: 'My First ever notification created !',
  color: 'red'
}


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const navigate = useNavigate();

  // const localStorageData = JSON.parse(JSON.stringify(localStorage.getItem('wideui_isAuthenticated')) || '');

  useEffect(() => {
    if (isAuthenticated) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);

  const onProfileMenuClickHandler = (value: string) => {
    console.log('cg', value);
    if (value === 'logout') {
      navigate('/auth/login');
      setSelectedMenuItem(value);
    }
  }

  return (<Fragment>

    <header className="webapp-header">
      <ErrorBoundary>
        {isAuthenticated && <HeaderApp
          onProfileMenuClickHandler={onProfileMenuClickHandler}
          isAuthenticated={isAuthenticated}
        />
        }
      </ErrorBoundary>
    </header>


    {/* <NotificationModule notification={notification} /> */}

    <Suspense fallback="Loading...">
      <section className='webapp-viewport'>
        <ErrorBoundary>
          <Routes>
            <Route
              path='/auth/*'
              element={
                <AuthApp
                  onAuthChange={setIsAuthenticated}
                  selectedMenuItem={selectedMenuItem}
                />
              } />

            <Route path='/dashboard/*' element={<DashboardApp />} />

            <Route path='/' element={<Navigate to='/auth' />} />
          </Routes>
        </ErrorBoundary>
      </section>
      <footer className="webapp-footer"><b>@All right reserved!</b></footer>
    </Suspense>

  </Fragment >)
}

export default App;