import http from './Interceptors'
import TokenService from './TokenService'

const forgotPassword = email => {
  return http.post('/mentees/auth/password_reset_request', {
    email: email,
  })
}

// TODO: check if BE compare the two password
const passwordChange = password => {
  return http.post('/mentees/auth/password_change', {
    password: password,
    password2: password,
  })
}

// TODO: Check what is the required params from BE
const register = (email, password, name = '') => {
  return http.post('/mentees', {
    email,
    password,
    name,
  })
}

const login = (email, password) => {
  return http
    .post('/mentees/auth', {
      email,
      password,
    })
    .then(response => {
      if (response.data.access_token) {
        TokenService.setUser(response.data)
      }
      return response.data
    })
    .catch(error => {
      return error.response.data.message
    })
}

// BE doesn't have an official logout function
const logout = () => {
  TokenService.removeUser()
}

export default {
  register,
  login,
  logout,
  forgotPassword,
  passwordChange,
}
