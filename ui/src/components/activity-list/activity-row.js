import React from 'react';
import { Row, Col, Button } from 'reactstrap';

export const ActivityRow = (props) => {
  return (
    <div>
      <a href="#activity-row">
        <Button className="activity-row" color="white" size="lg" key={props.key}>
            <Row>
              <Col>
                <h3><b> {props.activity.title} </b></h3>
                <div className="activity-desc">
                  {props.activity.description}
                </div>
              </Col>
            </Row>
        </Button>
      </a>
    </div>
  );
}