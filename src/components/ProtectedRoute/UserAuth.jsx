import React from 'react'
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const UserAuth = (Component) => {
    return class extends React.Component {
        render() {
          const isAuthenticated = Cookies.get('Token'); // Check if token exists in cookies
          return isAuthenticated ? (
            <Component {...this.props} />
          ) : (
            <Navigate to={{ pathname: '/login' }} />
          );
        }
      };
  
}

export default UserAuth
