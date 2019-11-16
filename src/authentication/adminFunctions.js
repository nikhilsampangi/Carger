import axios from 'axios';
import Cookies from 'js-cookie';

export const addpetrolstation = details => {
    return axios.post('admin/addstation', {
        name: details.name,
        email: details.email,
        address: details.address,
        fuelDetails: details.fuelDetails,
        petrolpumps: details.petrolpumps,
        dieselpumps: details.dieselpumps,
        cngpumps: details.cngpumps
    })
    .then(res => {
        if(res.data.error) {
            const check = {
                error: res.data.error
            }
            return check
        }
        else {
            const check = {
                data: res.data
            }
            return check
        }
    })
}

export const register = newUser => {
    return axios.post('admin/register', {
        username: newUser.username,
        hashedPassword: newUser.hashedPassword,
        email: newUser.email
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
    return axios.post('admin/login', {
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

// export const addOutlet = outlet => {
//     return axios.post('admin/login', {
//         email: user.email,
//         hashedPassword: user.hashedPassword
//     })
//         .then(res => {
//             if (res.data.error) {
//                 const check = {
//                     status: false,
//                     error: res.data.error
//                 }
//                 return check
//             }
//             else {
//                 Cookies.set('usertoken', res.data)
//                 const check = {
//                     status: true,
//                     data: res.data
//                 }
//                 return check
//             }
//         })
// }
