import mount from 'dashboard/DashboardApp';
import React, { useRef, useEffect, useContext } from 'react';
import { UNSAFE_NavigationContext, useLocation } from 'react-router-dom';


const DashboardApp = () => {
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
     
    })
    const unlisten = navigator.listen(onParentNavigate);

    return unlisten; // <-- cleanup listener on component unmount
  }, []);

  return <div ref={ref}></div>
}

export default DashboardApp;

