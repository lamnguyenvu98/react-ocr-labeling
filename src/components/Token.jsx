import Cookies from 'js-cookie'

import {
    Navigate ,
    useLocation,
  } from "react-router-dom";


export const fetchToken = () => {
    return Cookies.get("access_token", {path: '/'})
}

export const RequireToken = ({ children }) => {
  let auth = fetchToken();
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}
