import _ from 'lodash'
import { LOAD_FILTER_DATA_FAILURE, LOAD_FILTER_DATA_PENDING, LOAD_FILTER_DATA_SUCCESS,
LOAD_ONE_TO_ONE_MATCH_FAILURE, LOAD_ONE_TO_ONE_MATCH_PENDING, LOAD_ONE_TO_ONE_MATCH_SUCCESS,
LOAD_CLOSE_FIT_MATCH_FAILURE, LOAD_CLOSE_FIT_MATCH_PENDING, LOAD_CLOSE_FIT_MATCH_SUCCESS } from '../config/constants'

const initialState = {
    one2oneLoading: true,
    one2oneData: null,
    closefitLoading: true,
    closefitData: null,
    dataLoading: true,
    data: {},
}


export const filterReducer = (state=initialState, action) => {
    
    if (_.isEmpty(state)) return {...initialState}

    switch(action.type) {
        case LOAD_FILTER_DATA_PENDING: {
            return {
                ...state,
                dataLoading: true
            }
        }

        case LOAD_ONE_TO_ONE_MATCH_PENDING: {
            return {
                ...state,
                one2oneLoading: true
            }
        }

        case LOAD_CLOSE_FIT_MATCH_PENDING: {
            return {
                ...state,
                closefitLoading: true
            }
        }

        case LOAD_FILTER_DATA_SUCCESS: {
            const newState = _.cloneDeep(state)
            return {
                ...newState,
                dataLoading: false,
                data: action.payload
            }
        }

        case LOAD_ONE_TO_ONE_MATCH_SUCCESS: {
            return {
                ...state,
                one2oneLoading: false,
                one2oneData: action.payload
            }
        }

        case LOAD_CLOSE_FIT_MATCH_SUCCESS: {
            return {
                ...state,
                closefitLoading: false,
                closefitData: action.payload
            }
        }

        case LOAD_FILTER_DATA_FAILURE: {
            console.log(action.payload)
            return {
                ...state,
                dataLoading: false
            }
        }

        case LOAD_ONE_TO_ONE_MATCH_FAILURE: {
            console.log(action.payload)
            return {
                ...state,
                one2oneLoading: false
            }
        }

        case LOAD_CLOSE_FIT_MATCH_FAILURE: {
            console.log(action.payload)
            return {
                ...state,
                closefitLoading: false
            }
        }

        default: return {...initialState}
    }

}