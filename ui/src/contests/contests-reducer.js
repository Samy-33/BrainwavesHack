import _ from 'lodash'
import { 
  LOAD_ALL_CONTESTS_FAILURE, LOAD_ALL_CONTESTS_PENDING, LOAD_ALL_CONTESTS_SUCCESS
} from '../config/constants'


const intialState = {
  contestLoading: null,
  ongoingContests: null,
  upcomingContests: null,
  pastContests: null,
  currentContest: null
}

export const contestReducer = (state=intialState, action) => {
  if(_.isEmpty(state)) {
    return intialState
  }

  switch(action.type) {
    case LOAD_ALL_CONTESTS_PENDING: {
      return {
        ...state,
        contestLoading: true
      }
    }

    case LOAD_ALL_CONTESTS_SUCCESS: {
      const contests = action.payload

      return {
        ...state,
        contestLoading: false,
        ongoingContests: contests.ongoing.content,
        upcomingContests: contests.upcoming.content,
        pastContests: contests.past.content
      }
    }

    default: return {...state}
  }
}