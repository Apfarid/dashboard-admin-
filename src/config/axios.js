import axios from 'axios'

const clienteAxios = axios.create({
    baseURL: 'http://localhost:3500'
})

export default clienteAxios