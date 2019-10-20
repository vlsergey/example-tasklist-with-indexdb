import React, { PureComponent } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Step0 from './step0';
import Step01 from './step01';

type StateType = {
  tabIndex : number,
};

const STEPS = [
  { label: 'Шаг 0', reactClass: Step0 },
  { label: 'Шаг 0.1', reactClass: Step01 },
];

export default class App extends PureComponent<void, StateType> {

  constructor() {
    super( ...arguments );
    this.state = {
      tabIndex: 0,
    };
    this.handleSelectTab = ( tabIndex : number ) => () => this.setState( { tabIndex } );
  }

  render() {
    const { tabIndex } = this.state;

    return <>
      <Nav defaultActiveKey="/home" variant="tabs">
        { STEPS.map( ( step, index ) => <Nav.Item key={String( index )}>
          <Nav.Link
            active={tabIndex === index}
            onClick={this.handleSelectTab( index )}>{STEPS[ index ].label}</Nav.Link>
        </Nav.Item> ) }
      </Nav>
      <Container>
        { React.createElement( STEPS[ tabIndex ].reactClass ) }
      </Container>
    </>;
  }

}
