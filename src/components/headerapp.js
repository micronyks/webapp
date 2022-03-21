import mount from 'header/HeaderApp';
import React, { useRef, useEffect, useContext } from 'react';
import { UNSAFE_NavigationContext, useLocation, useNavigate } from 'react-router-dom';


const HeaderApp = (props) => {
  console.log('headerapp props', props);
  const ref = useRef(null);
  const { navigator } = useContext(UNSAFE_NavigationContext); // the browser history object  
  const location = useLocation();
  const navigation = useNavigate();

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
      sendNavigationTo: (navigateTo) => {
        console.log('webapp received navigation request from header', navigateTo);
        const pathname = location.pathname;
        if (pathname !== navigateTo) {
          navigation(navigateTo);
        }
      },
      onProfileMenuClickHandler: (selectedMenuItem) => {
        console.log('webapp received selected menu item from header', selectedMenuItem);
        props.onProfileMenuClickHandler(selectedMenuItem);
      }
    },
    props.isAuthenticated
    )
    const unlisten = navigator.listen(onParentNavigate);

    return unlisten; // <-- cleanup listener on component unmount
  }, []);

  return <div ref={ref}></div>
}

export default HeaderApp;

