import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const modify = async newObject => {
    const config = {
        headers: { Authorization: token },
    }
    const blogId = newObject.id
    const response = await axios.put(baseUrl + "/" + blogId, newObject, config)
    return response.data
}

const remove = async blogToBeRemoved => {
    const config = {
        headers: { Authorization: token },
    }
    const blogId = blogToBeRemoved.id
    const response = await axios.delete(baseUrl + "/" + blogId, config)
    return response.data
}

export default { getAll, create, setToken, modify, remove }