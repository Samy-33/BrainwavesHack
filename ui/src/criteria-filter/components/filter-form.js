import React from 'react'
import { Button, Col, Form, Row, FormGroup, Label, Input } from 'reactstrap'
import { STATUS_CONSTANTS } from '../../config/constants'

const currencies = ['Any', 'NOK', 'SEK', 'CAD', 'JPY', 'MXN', 'AUD', 'CHF', 'EUR', 'USD', 'GBP', 'TRY', 'TWD']

export class FilterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status:'any',
            trade_date_exact: true,
            settlement_date_exact: true,
            fixing_date_exact: true,
            buy_currency: 'Any',
            sell_currency: 'Any',
            settlement_date_start: '',
            settlement_date_end: '',
            settlement_date: '',
            trade_date_start: '',
            trade_date_end: '',
            trade_date: '',
            buy_amt_from: '',
            buy_amt_to: '',
            sell_amt_from: '',
            sell_amt_to: '',
            rate_exact: true,
            rate: '',
            rate_start: '',
            rate_end: '',
            cp_bic: '',
            reference: ''
        }
    }
    render () {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Label for="statusSelect">Status</Label>
                        <Input type="select" value={this.state.status} onChange={e=>this.setState({...this.state, status:e.target.value})} id="statusSelect">
                            {STATUS_CONSTANTS.map((value, ind) => {
                                return <option key={ind} value={value}>{value}</option>
                            })}
                        </Input>
                    </FormGroup>
                    <FormGroup check>
                        <Input checked={this.state.trade_date_exact} type="checkbox" onChange={() => this.setState({...this.state, trade_date_exact: !this.state.trade_date_exact})} name="check" id="tradeDateExact"/>
                        <b><Label for="tradeDateExact" check>Exact Trade Date</Label></b>
                    </FormGroup>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="tradeDate">Trade Date: </Label>
                                <Input disabled={!this.state.trade_date_exact} type="date" placeholder="DD/MM/YYYY" id="tradeDate"
                                    value={this.state.trade_date}
                                    onChange={(e) => this.setState({...this.state, trade_date: e.target.value})}/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="tradeDateStart">Trade Date From: </Label>
                                <Input disabled={this.state.trade_date_exact} type="date" placeholder="DD/MM/YYYY" id="tradeDateStart"
                                    value={this.state.trade_date_start}
                                    onChange={(e) => this.setState({...this.state, trade_date_start: e.target.value})}/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="tradeDateEnd">Trade Date To: </Label>
                                <Input disabled={this.state.trade_date_exact} type="date" placeholder="DD/MM/YYYY" id="tradeDateEnd"
                                    value={this.state.trade_date_end}
                                    onChange={(e) => this.setState({...this.state, trade_date_end: e.target.value})}/>
                            </FormGroup>
                        </Col>
                    </Row>



                    <FormGroup check>
                        <Input checked={this.state.settlement_date_exact} type="checkbox" onChange={() => this.setState({...this.state, settlement_date_exact: !this.state.settlement_date_exact})} name="check" id="settlementDateExact"/>
                        <b><Label for="settlementDateExact" check>Exact Settlement Date</Label></b>
                    </FormGroup>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="settlementDate">Trade Date: </Label>
                                <Input disabled={!this.state.settlement_date_exact} type="date" placeholder="DD/MM/YYYY" id="settlementDate"
                                    value={this.state.settlement_date}
                                    onChange={(e) => this.setState({...this.state, settlement_date: e.target.value})}/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="settlementDateStart">Settlement Date From: </Label>
                                <Input disabled={this.state.settlement_date_exact} type="date" placeholder="DD/MM/YYYY" id="settlementDateStart"
                                    value={this.state.settlement_date_start}
                                    onChange={(e) => this.setState({...this.state, settlement_date_start: e.target.value})}/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="settlementDateEnd">Settlement Date To: </Label>
                                <Input disabled={this.state.settlement_date_exact} type="date" placeholder="DD/MM/YYYY" id="settlementDateEnd"
                                    value={this.state.settlement_date_end}
                                    onChange={(e) => this.setState({...this.state, settlement_date_end: e.target.value})}/>
                            </FormGroup>
                        </Col>
                    </Row>


                    <FormGroup check>
                        <Input checked={this.state.fixing_date_exact} type="checkbox" onChange={() => this.setState({...this.state, fixing_date_exact: !this.state.fixing_date_exact})} name="check" id="fixingDateExact"/>
                        <b><Label for="fixingDateExact" check>Exact Fixing Date</Label></b>
                    </FormGroup>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="fixingDate">Fixing Date: </Label>
                                <Input disabled={!this.state.fixing_date_exact} type="date" placeholder="DD/MM/YYYY" id="fixingDate"
                                    value={this.state.fixing_date}
                                    onChange={(e) => this.setState({...this.state, fixing_date: e.target.value})}/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="fixingDateStart">Fixing Date From: </Label>
                                <Input disabled={this.state.fixing_date_exact} type="date" placeholder="DD/MM/YYYY" id="fixingDateStart"
                                    value={this.state.fixing_date_start}
                                    onChange={(e) => this.setState({...this.state, fixing_date_start: e.target.value})}/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="fixingDateEnd">Fixing Date To: </Label>
                                <Input disabled={this.state.fixing_date_exact} type="date" placeholder="DD/MM/YYYY" id="fixingDateEnd"
                                    value={this.state.fixing_date_end}
                                    onChange={(e) => this.setState({...this.state, fixing_date_end: e.target.value})}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={2}>
                            <FormGroup>
                                <Label for="buyCurrency"> Buy Currency </Label>
                                <Input type="select" id="buyCurrency" value={this.state.buy_currency} onChange={e => this.setState({...this.state, buy_currency: e.target.value})}>
                                    {currencies.map((currency, ind) => {
                                        return <option key={ind}>{currency}</option>
                                    })}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={5}>
                            <Label for="buyAmountFrom"> Buy Amount From </Label>
                            <Input type="number" id="buyAmountFrom" step="0.01"
                                value={this.state.buy_amt_from} onChange={e=>this.setState({...this.state, buy_amt_from:e.target.value})} />
                        </Col>
                        <Col md={5}>
                            <Label for="buyAmountTo"> Buy Amount To </Label>
                            <Input type="number" id="buyAmountTo" step="0.01"
                                value={this.state.buy_amt_to} onChange={e=>this.setState({...this.state, buy_amt_to:e.target.value})} />
                        </Col>
                    </Row>

                    <Row form>
                        <Col md={2}>
                            <FormGroup>
                                <Label for="sellCurrency"> Sell Currency </Label>
                                <Input type="select" id="sellCurrency">
                                    {currencies.map((currency, ind) => {
                                        return <option key={ind}>{currency}</option>
                                    })}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={5}>
                            <Label for="sellAmountFrom"> Sell Amount From</Label>
                            <Input type="number" id="sellAmountFrom" step="0.01"
                                value={this.state.sell_amt_from} onChange={e=>this.setState({...this.state, sell_amt_from:e.target.value})} />
                        </Col>
                        <Col md={5}>
                            <Label for="sellAmountTo"> Sell Amount To</Label>
                            <Input type="number" id="sellAmountTo" step="0.01"
                                value={this.state.sell_amt_to} onChange={e=>this.setState({...this.state, sell_amt_to:e.target.value})} />
                        </Col>
                    </Row>
                    

                    <FormGroup check>
                        <Input checked={this.state.rate_exact} type="checkbox" onChange={() => this.setState({...this.state, rate_exact: !this.state.rate_exact})} name="check" id="rateExact"/>
                        <b><Label for="rateExact" check>Exact Rate</Label></b>
                    </FormGroup>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="rate">Exchange Rate: </Label>
                                <Input disabled={!this.state.rate_exact} type="number" placeholder="xxxx.xx" step="0.01" id="rate"
                                    value={this.state.rate}
                                    onChange={(e) => this.setState({...this.state, rate: e.target.value})}/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="rateStart">Rate From: </Label>
                                <Input disabled={this.state.rate_exact} type="number" placeholder="xxxx.xx" step="0.01" id="rateStart"
                                    value={this.state.rate_start}
                                    onChange={(e) => this.setState({...this.state, rate_start: e.target.value})}/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="rateEnd">Rate To: </Label>
                                <Input disabled={this.state.rate_exact} type="number" placeholder="xxxx.xx" step="0.01" id="rateEnd"
                                    value={this.state.rate_end}
                                    onChange={(e) => this.setState({...this.state, rate_end: e.target.value})}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <Label for="counterpartyBIC">Counter Party BIC Contains</Label>
                            <Input type="text" value={this.state.cp_bic} onChange={e=>this.setState({...this.state, cp_bic: e.target.value})} />
                        </Col>
                        <Col md={6}>
                            <Label for="reference">Reference Contains</Label>
                            <Input type="text" value={this.state.reference} onChange={e=>this.setState({...this.state, reference: e.target.value})} />
                        </Col>
                    </Row>
                </Form>
                <br />
                <Button color="success" block onClick={f=>f}>Get Data</Button>
            </div>
        )
    }
}