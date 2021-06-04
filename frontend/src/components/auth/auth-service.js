import axios from 'axios';
 
const service = axios.create({
    baseURL: 'http://localhost:5000/auth',
    withCredentials: true
});
 
const errorHandler = err => {
  throw err;
};
 
export default {
    service,

    signup: (username, password, campus, course) => {
    return service.post('/signup', { username, password, campus, course })
        .then(response => response.data)
        .catch(errorHandler)
    },

    loggedin: () => {
    return service.get('/loggedin')
        .then(response => response.data)
    },

    login: (username, password) => {
        return service.post('/login', { username, password })
            .then(response => response.data)
    },

    logout: () => {
        return service.post('/logout', {})
            .then(response => response.data)
    },

    upload: data => {
        return service.post('/upload', data)
            .then(response => response.data)
    },

    edit: data => {
        return service.post('/edit', data)
            .then(response => response.data)
    } 
}