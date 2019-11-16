import axios from 'axios';

export const transac = newUser => {
    return axios.post('transaction/pay')
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