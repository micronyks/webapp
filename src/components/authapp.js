import mount from 'auth/AuthApp';
import React, { useRef, useEffect, useContext } from 'react';
import { UNSAFE_NavigationContext, useLocation } from 'react-router-dom';


const AuthApp = (props) => {
  console.log('AuthApp props', props);

  const ref = useRef(null);
  const { navigator } = useContext(UNSAFE_NavigationContext); // the browser history object  
  const location = useLocation();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: location.pathname,
      onNavigate: (result) => {
        console.log('webapp noticed route change', result.location.pathname);
        const { pathname } = location;
        if (pathname !== result.location.pathname) {
          navigator.push(result.location.pathname);
        }
      },
      onAuthChange: (isAuthenticated) => {
        props.onAuthChange(isAuthenticated);
      }
    },
    props.selectedMenuItem
    )
    const unlisten = navigator.listen(onParentNavigate);

    return unlisten; // <-- cleanup listener on component unmount
  }, []);

  return <div ref={ref}></div>
}

export default AuthApp;

