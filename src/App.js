import React, { PureComponent } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Step0 from './step0';

type StateType = {
  step : number,
};

const STEPS = [ Step0 ];

export default class App extends PureComponent<void, StateType> {

  constructor() {
    super( ...arguments );
    this.state = {
      step: 0,
    };
  }

  render() {
    const { step } = this.state;

    return <>
      <Nav defaultActiveKey="/home" variant="tabs">
        { STEPS.map( ( step, index ) => <Nav.Item key={String( index )}>
          <Nav.Link active={step === index} eventKey="step-0">Step {index}</Nav.Link>
        </Nav.Item> ) }
      </Nav>
      <Container>
        { React.createElement( STEPS[ step ] ) }
      </Container>
    </>;
  }

}
