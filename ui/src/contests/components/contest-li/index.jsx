import React from 'react'
import { ListGroupItem } from 'reactstrap'
import { CONTESTS_ROUTE } from '../../../config/constants'
import { Link } from 'react-router-dom'
import { getFormatedTimeFromTZString } from '../../../utils/time-utils'
import './contest-li.css'

export const ContestLi = (props) => {

  const { contest } = props

  return (
    <ListGroupItem tag={Link} to={`${CONTESTS_ROUTE}/${contest.code}`}
      key={contest.id}
      action
      className="d-flex flex-column justify-contenst-around contest-li">
      <div className="p-2 d-flex justify-content-between">
        <div><h4>{contest.name}</h4> {contest.code}</div>
        <div><b>From: </b>{getFormatedTimeFromTZString(contest.startTime)} &nbsp;&nbsp;<b> To: </b> {getFormatedTimeFromTZString(contest.endTime)}</div>
      </div>
      <div className="p-2 contest-li-description">
        {contest.description}
      </div>
    </ListGroupItem>
  )
}