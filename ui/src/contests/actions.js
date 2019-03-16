import { getAllContests as getAllContestsAPI } from '../api/contests'
import { LOAD_ALL_CONTESTS } from '../config/constants'

export const getAllContests = () => {
  return dispatch => {
    return dispatch({
      type: LOAD_ALL_CONTESTS,
      payload: getAllContestsAPI()
    })
  }
}