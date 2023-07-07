import React from 'react'
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const EmpAuth = (Component) => {
    return class extends React.Component {
        render() {
          const isAuthenticated = Cookies.get('empToken'); // Check if token exists in cookies
          return isAuthenticated ? (
            <Component {...this.props} />
          ) : (
            <Navigate to={{ pathname: '/emplogin' }} />
          );
        }
      };
  
}

export default EmpAuth