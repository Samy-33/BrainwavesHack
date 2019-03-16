import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import { ActivityRow } from './activity-row';
import api from 'api';
import './style.css';

export class ActivityList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activityList: [],
      offset: this.props.offset,
      maxNumber: this.props.maxNumber
    };
  }

  componentDidMount () {
    let activities = api.getPaginatedActivityList(this.state.offset, this.state.maxNumber) || [];
    this.setState({
      ...this.state,
      activityList: activities
    });
  }

  render () {
    return (
      <div>
        <Container>
          <h1><b> Recent Activities </b></h1>
          <div className="activity-list">
            {this.state.activityList.map(activity => (
              <ActivityRow activity={activity} key={activity.key} />
            ))}
          </div>
          <div style={{'left': 0}}>
            <Button color="info" size="md">
              See more...
            </Button>
          </div>
        </Container>
      </div>
    );
  }
};