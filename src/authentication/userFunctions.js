import axios from 'axios';

export const register = newUser => {
    return axios.post('user/register', {
        username: newUser.username,
        hashedPassword: newUser.hashedPassword,
        email: newUser.email,
        phone: newUser.phone
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
                sessionStorage.setItem('usertoken', res.data)
                const check = {
                    status: true,
                    data: res.data
                }
                return check
            }
        })
}
