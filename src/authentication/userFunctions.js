import axios from 'axios';
import Cookies from 'js-cookie';

export const register = newUser => {
    return axios.post('user/register', {
        username: newUser.username,
        hashedPassword: newUser.hashedPassword,
        email: newUser.email,
        phone: newUser.phone,
        gender: newUser.gender,
        confirmPassword: newUser.confirmPassword 
    })
        .then(res => {
            if (res.data.error) {
                const check = {
                    status: false,
                    error: res.data.error
                }
                return check
            }
            else {
                const check = {
                    status: true,
                    data: res.data
                }
                return check
            }
        })
}

export const login = user => {
    return axios.post('user/login', {
        email: user.email,
        hashedPassword: user.hashedPassword
    })
        .then(res => {
            if (res.data.error) {
                const check = {
                    status: false,
                    error: res.data.error
                }
                return check
            }
            else {
                Cookies.set('usertoken', res.data)
                const check = {
                    status: true,
                    data: res.data
                }
                return check
            }
        })
}
