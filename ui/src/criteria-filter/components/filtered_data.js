import _ from 'lodash'
import React from 'react'
import { IconContext } from 'react-icons'
import { GoCheck, GoCircleSlash, GoDiff, GoPencil } from 'react-icons/go'
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { connect } from 'react-redux'
import { load_filtered_data_from_uri, load_one_to_one_matched_data_for_sg_id, load_close_fit_data_for_sg_id } from '../actions'


const FilteredTablePresent = props => {

    const {messages, matchModal, toggleMatch, matchedData, closeFitModal, closeFitData, toggleCloseFit,
        handleCloseFitApproval, handleCloseFitDenial} = props

    return (
        <div>

            <Modal isOpen={matchModal} toggle={toggleMatch}>
                <ModalHeader toggle={toggleMatch}>Message Detail</ModalHeader>
                <ModalBody>
                    {matchedData &&
                        (()=>{
                            const obj = {...matchedData.sg_message, ...matchedData.cp_message}
                            const object_keys = Object.keys(obj)
                            return (
                                <Table hover>
                                    <caption>{matchedData.remark}</caption>
                                    <thead>
                                        <tr>
                                            <th>Field</th>
                                            <th>MessageSG Value</th>
                                            <th>MessageCP Value</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {object_keys.map((value, ind) => {
                                            return (
                                                <tr key={ind}>
                                                    <td> <b> {value} </b> </td>
                                                    <td>{matchedData.sg_message[value]}</td>
                                                    <td>{matchedData.cp_message[value]}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            )
                        })()
                    }
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={()=>toggleMatch(null)}>Cancel</Button>
                </ModalFooter>
            </Modal>

            {/* Modal For CloseFit */}
            <Modal isOpen={closeFitModal} toggle={toggleCloseFit}>
                <ModalHeader toggle={()=>toggleCloseFit(null)}>Message Detail</ModalHeader>
                <ModalBody>
                    {closeFitData &&
                        (()=>{
                            const obj = {...closeFitData.sg_message, ...closeFitData.cp_message}
                            const object_keys = Object.keys(obj)
                            return (
                                <Table hover>
                                    <caption>{closeFitData.remark}</caption>
                                    <thead>
                                        <tr>
                                            <th>Field</th>
                                            <th>MessageSG Value</th>
                                            <th>MessageCP Value</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {object_keys.map((value, ind) => {
                                            return (
                                                <tr key={ind}>
                                                    <td> <b> {value} </b> </td>
                                                    <td>{closeFitData.sg_message[value]}</td>
                                                    <td>{closeFitData.cp_message[value]}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            )
                        })()
                    }
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={()=>handleCloseFitApproval(closeFitData.id)}> Match </Button>
                    <Button color="danger" onClick={()=>handleCloseFitDenial(closeFitData.id)}> UnMatch </Button>
                    <Button color="secondary" onClick={()=>toggleCloseFit(null)}>Cancel</Button>
                </ModalFooter>
            </Modal>


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
                                        if(msg.status === 'matched') {
                                            return <IconContext.Provider value={{color: 'green', size: '2em'}}> <GoCheck /> </IconContext.Provider>
                                        }
                                        else if(msg.status === 'unmatched') {
                                            return <IconContext.Provider value={{color: 'red', size: '2em'}}> <GoCircleSlash /> </IconContext.Provider>
                                        }
                                        else if(msg.status === 'closefit') {
                                            return <IconContext.Provider value={{color: 'orange', size: '2em'}}> <GoDiff /> </IconContext.Provider>
                                        } else if(msg.status === 'under-review') {
                                            return <IconContext.Provider value={{color: 'blue', size: '2em'}}> <GoPencil /> </IconContext.Provider>
                                        }
                                    })()}
                                </td>
                                <td>
                                    {(()=>{
                                        if(msg.status === 'matched') {
                                            return <Button color="success" onClick={() => toggleMatch(msg.id)} block> Details </Button>
                                        }
                                        else if(msg.status === 'unmatched') {
                                            return <Button color="danger" block> Details </Button>
                                        }
                                        else if(msg.status === 'closefit') {
                                            return <Button color="warning" onClick={()=>toggleCloseFit(msg.id)} block> Details </Button>
                                        } else if(msg.status === 'under-review') {
                                            return <Button color="info" block> Details </Button>
                                        }
                                    })()}
                                </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
            <div className="d-flex flex-row-reverse">
                <Button color="primary" onClick={() => props.handlePaginationClick(props.nextPageLink)} disabled={!props.nextPageLink}>
                    Next
                </Button>
                <Button color="info" onClick={() => props.handlePaginationClick(props.prevPageLink)} disabled={!props.prevPageLink}>
                    Previous
                </Button>
                
            </div>
        </div>

    )
}


class FilteredTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {matchModal: false, closeFitModal: false}
    }

    toggleMatchModal = (sg_message_id=null) => {
        if(sg_message_id !== undefined && sg_message_id !== null) this.props.load_one_to_one_matched_data_for_sg_id(sg_message_id)
        this.setState({...this.state, matchModal: !this.state.matchModal})
    }

    toggleCloseFitModal = (sg_message_id=null) => {
        if(sg_message_id !== undefined && sg_message_id !== null) this.props.load_close_fit_data_for_sg_id(sg_message_id)
        this.setState({...this.state, closeFitModal: !this.state.closeFitModal})
    }

    handleCloseFitApproval = (close_fit_id) => {

    }

    handleCloseFitDenial = (close_fit_id) => {

    }

    handlePaginationClick = (uri) => {
        this.props.load_filtered_data_from_uri(uri)
    }

    render () {

        let {messages, one2oneMatchData, closefitData} = this.props
        console.log(this.props.prevPageLink, this.props.nextPageLink)
        if(_.isEmpty(messages)) messages = []
        return <FilteredTablePresent messages={messages} prevPageLink={this.props.prevPageLink}
            nextPageLink={this.props.nextPageLink} handlePaginationClick={this.handlePaginationClick}
            toggleMatch={this.toggleMatchModal} matchModal={this.state.matchModal} matchedData={one2oneMatchData}
            toggleCloseFit={this.toggleCloseFitModal} closeFitModal={this.state.closeFitModal} closeFitData={closefitData}
            handleCloseFitApproval={this.handleCloseFitApproval} handleCloseFitDenial={this.handleCloseFitDenial}/>
    }
}

const mapStateToProps = ({criteria}) => ({messages: criteria.data.results, prevPageLink: criteria.data.previous,
    nextPageLink: criteria.data.next, one2oneMatchData: criteria.one2oneData, closefitData: criteria.closefitData})

const mapDispatchToProps = {load_filtered_data_from_uri, load_one_to_one_matched_data_for_sg_id, load_close_fit_data_for_sg_id}

export default connect(mapStateToProps, mapDispatchToProps)(FilteredTable)