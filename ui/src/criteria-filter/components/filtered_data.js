import React from 'react'
import { IconContext } from 'react-icons'
import { GoCheck, GoCircleSlash, GoDiff, GoPencil } from 'react-icons/go'
import { Table, Button } from 'reactstrap'


const FilteredTablePresent = props => {

    const {messages} = props

    return (
        <Table hover>
            <thead>
                <tr>
                    <th>
                        SG Reference Number (:20)
                    </th>
                    <th>
                        Status
                    </th>
                    <th>
                        Details
                    </th>
                </tr>
            </thead>
            <tbody>
               {messages.map((msg, ind) => {
                   return (
                       <tr key={ind}>
                            <td>
                                {msg.c_20}
                            </td>
                            <td>
                                {(()=>{
                                    if(msg.status == 'matched') {
                                        return <IconContext.Provider value={{color: 'green', size: '2em'}}> <GoCheck /> </IconContext.Provider>
                                    }
                                    else if(msg.status == 'unmatched') {
                                        return <IconContext.Provider value={{color: 'red', size: '2em'}}> <GoCircleSlash /> </IconContext.Provider>
                                    }
                                    else if(msg.status == 'closefit') {
                                        return <IconContext.Provider value={{color: 'orange', size: '2em'}}> <GoDiff /> </IconContext.Provider>
                                    } else if(msg.status == 'under-review') {
                                        return <IconContext.Provider value={{color: 'blue', size: '2em'}}> <GoPencil /> </IconContext.Provider>
                                    }
                                })()}
                            </td>
                            <td>
                                {(()=>{
                                    if(msg.status == 'matched') {
                                        return <Button color="success" block> Details </Button>
                                    }
                                    else if(msg.status == 'unmatched') {
                                        return <Button color="danger" block> Details </Button>
                                    }
                                    else if(msg.status == 'closefit') {
                                        return <Button color="warning" block> Details </Button>
                                    } else if(msg.status == 'under-review') {
                                        return <Button color="info" block> Details </Button>
                                    }
                                })()}
                            </td>
                       </tr>
                   )
               })}
            </tbody>
        </Table>
    )
}


export class FilteredTable extends React.Component {
    componentDidMount() {

    }

    render () {
        return <FilteredTablePresent messages={[{c_20: 'Hello123', status: 'matched'}, {c_20: 'oya', status: 'unmatched'}, {c_20: 'Hoya', status: 'closefit'}, {c_20: 'Holla', status: 'under-review'}]}/>
    }
}