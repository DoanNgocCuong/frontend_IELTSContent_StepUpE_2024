const config = {
  development: {
    API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000'
  },
  production: {
    API_BASE_URL: process.env.REACT_APP_API_URL || 'http://103.253.20.13:5000'
  }
};

export default config[process.env.NODE_ENV || 'development']; 