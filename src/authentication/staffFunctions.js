import axios from 'axios';
import Cookies from 'js-cookie';


export const register = newUser => {
    return axios.post('manager/register', {
        username: newUser.username,
        hashedPassword: newUser.hashedPassword,
        email: newUser.email,
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
    return axios.post('manager/login', {
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

export const fuelDetails = details => {
    // console.log(details.token)
    // const header = { Authorization: details.token }
    // console.log(header)
    return axios.get('manager/fueldetails',{headers: {'Authorization': details.token}})
    .then(res => {
        // console.log(res)
        // return res
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
                data: res.data.link
            }
            console.log(res)
            return res
        }
    })
}


export const updateFuel = details => {
    console.log(details.token)
    // const header = { Authorization: details.token }
    // console.log(header)
    return axios.post('manager/updatefueldetails',{ fuel:details.fuel, quantity:details.quantity }, {headers: {'Authorization': details.token}})
    .then(res => {
        // console.log(res)
        // return res
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
                data: res.data.link
            }
            console.log(res)
            return res
        }
    })
}

