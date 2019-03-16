import React from 'react';
import { Card, CardImg, CardTitle,
  CardText, CardBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './style.css';

const defaultCardImgSrc = 'https://increasify.com.au/wp-content/uploads/2016/08/default-image.png';

export const PrettyCard = (props) => {
  return (
    <div className="head-card">
      <Card>
        <CardImg top width="100%" height="180px" src={props.imgSrc || defaultCardImgSrc} alt={props.imgAlt} />
        <CardBody>
          <CardTitle> {props.title} </CardTitle>
          <CardText> {props.text} </CardText>
          <Link to={props.buttonLink}>
            <Button color={props.buttonColor} size="md" block> {props.buttonText} </Button>
          </Link>
        </CardBody>
      </Card>
    </div>
  );
};
