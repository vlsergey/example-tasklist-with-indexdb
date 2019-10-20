import React, { PureComponent } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

type PropType = {
  children? : any,
  disabled? : ?boolean,
  inProgress? : ?boolean,
  onClick? : ?( any => any ),
};

type StateType = {
  inProgress : boolean,
};

export default class AutoDisableButtonWithSpinner extends PureComponent<PropType, StateType> {

  // need to prevent warning: "Can't perform a React state update on an unmounted component"
  // in case if click will lead to unmounting
  mounted : boolean;

  constructor() {
    super( ...arguments );
    this.mounted = false;

    this.state = {
      inProgress: false,
    };

    this.handleClick = this.handleClick.bind( this );
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  async handleClick() {
    const { onClick } = this.props;
    this.setState( { inProgress: true } );
    try {
      if ( onClick ) return await onClick( ...arguments );
    } finally {
      // do not call setState() if unmounting
      if ( this.mounted ) this.setState( { inProgress: false } );
    }
  }

  render() {
    /* eslint no-unused-vars: 0 */
    const { children, disabled, inProgress, onClick, ...etc } = this.props;
    const actualInProgress = inProgress || this.state.inProgress || false;

    return <Button disabled={disabled || actualInProgress} onClick={this.handleClick} {...etc}>
      { actualInProgress && <>
        <Spinner animation="border" aria-hidden="true" as="span" role="status" size="sm" />
        {' '}
        </> }
      {children}
    </Button>;
  }

}
