import { axiosInstance as axios } from './axios'
import queryString from 'querystring'
import URL from 'url'


export const get_filtered_data_for_queries = (dictionary) => {
    let url = '/api/mt300/message-sg/list/'
    const queries = queryString.stringify(dictionary)
    url = `${url}?${queries}`
    return axios.get(url)
        .then(response => response.data)
}

export const get_filtered_data_from_uri = (uri) => {
    const q = URL.parse(uri)
    const url = q.path
    return axios.get(url)
        .then(response => response.data)
}

export const get_matched_data_from_sg_message_id = (sg_message_id) => {
    const url = `/api/mt300/one2one/by/${sg_message_id}/retrieve/`
    return axios.get(url)
        .then(response => response.data)
}

export const get_closefit_data_from_sg_message_id = (sg_message_id) => {
    const url = `/api/mt300/closefit/by/${sg_message_id}/retrieve/`
    return axios.get(url)
        .then(response => response.data)
}