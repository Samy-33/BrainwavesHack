import { Table } from 'reactstrap';
import React from 'react';
/**
 * 
 * @param {*} props
 * props contains following: 
 * @property { String } title: Title at the top of the table
 * @property { String } firstColName : heading of the first Column
 * @property { String } secondColName : heading of the second Column
 * @property { Array } data : Array containing at most 10 values of type {username, score}
 */
export const TopTenTable = (props) => {

  // TODO: sort the values according to the score
  let dataVal = <tr><td bgcolor="#ff6868" colSpan={3}>No data available</td></tr>;
  if (props.data !== null && props.data !== undefined && props.data.length > 0) {
    dataVal = props.data.map(dict => {
      return (
        <tr>
          <td colSpan={2}>{dict.username}</td>
          <td>{dict.score}</td>
        </tr>
      );
    })
  }

  return (
    <div>
      <h4 bgcolor="#b5fff8">{props.title}</h4>
      <hr />
      <Table bordered>
        <thead>
          <tr>
            <th colSpan={2}>{props.firstColName}</th>
            <th>{props.secondColName}</th>
          </tr>
        </thead>
        <tbody>
          {dataVal}
        </tbody>
      </Table>
    </div>
  );
};