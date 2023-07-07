import React from 'react'
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AdminAuth = (Component) => {
    return class extends React.Component {
        render() {
          const isAuthenticated = Cookies.get('adminToken'); // Check if token exists in cookies
          return isAuthenticated ? (
            <Component {...this.props} />
          ) : (
            <Navigate to={{ pathname: '/adlogin' }} />
          );
        }
      };
  
}

export default AdminAuth