import React, { PureComponent } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Step0 from './step0';
import Step01 from './step01';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import Step5 from './step5';

type StateType = {
  tabIndex : number,
};

const STEPS = [
  { label: 'Шаг 0', reactClass: Step0 },
  { label: 'Шаг 0.1 (TaskList)', reactClass: Step01 },
  { label: 'Шаг 1 (IndexedDbRepository)', reactClass: Step1 },
  { label: 'Шаг 2 (RepositoryListener)', reactClass: Step2 },
  { label: 'Шаг 3 (DataProvider)', reactClass: Step3 },
  { label: 'Шаг 4 (connect)', reactClass: Step4 },
  { label: 'Шаг 5 (library)', reactClass: Step5 },
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
