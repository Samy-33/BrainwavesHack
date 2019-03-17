import { get_filtered_data_for_queries, get_filtered_data_from_uri, get_matched_data_from_sg_message_id,
    get_closefit_data_from_sg_message_id } from '../api/trade_filter'
import { LOAD_FILTER_DATA, LOAD_ONE_TO_ONE_MATCH, LOAD_CLOSE_FIT_MATCH } from '../config/constants'


export const load_filtered_data_for_queries = (query_dictionary) => {
    return dispatch => {
        return dispatch({
            type: LOAD_FILTER_DATA,
            payload: get_filtered_data_for_queries(query_dictionary)
        })
    }
}

export const load_filtered_data_from_uri = (uri) => {
    return dispatch => {
        return dispatch({
            type: LOAD_FILTER_DATA,
            payload: get_filtered_data_from_uri(uri)
        })
    }
}

export const load_one_to_one_matched_data_for_sg_id = (sg_message_id) => {
    return dispatch => {
        return dispatch({
            type: LOAD_ONE_TO_ONE_MATCH,
            payload: get_matched_data_from_sg_message_id(sg_message_id)
        })
    }
}

export const load_close_fit_data_for_sg_id = (sg_message_id) => {
    return dispatch => {
        return dispatch({
            type: LOAD_CLOSE_FIT_MATCH,
            payload: get_closefit_data_from_sg_message_id(sg_message_id)
        })
    }
}
