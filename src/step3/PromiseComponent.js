import { PureComponent } from 'react';

type PropsType = {
  children : any => any,
  cleanOnPromiseChange? : ?boolean,
  fallback? : ?any,
  promise? : ?Promise< any >,
};

type StateType = {
  error : ?any,
  value? : ?any,
};

export default class PromiseComponent extends PureComponent<PropsType, StateType> {

  prevPromise : ? Promise< any >;

  constructor() {
    super( ...arguments );
    this.state = {
      error: null,
      value: null,
    };
    this.prevPromise = null;
  }

  componentDidMount() {
    this.subscribe();
  }

  componentDidUpdate( ) {
    this.subscribe();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  subscribe() {
    const { cleanOnPromiseChange, promise } = this.props;
    if ( promise instanceof Promise && this.prevPromise !== promise ) {
      if ( cleanOnPromiseChange ) this.setState( { error: null, value: null } );
      this.prevPromise = promise;
      promise.then( value => {
        if ( this.prevPromise === promise ) {
          this.setState( { error: null, value } );
        }
      } )
        .catch( error => {
          if ( this.prevPromise === promise ) {
            this.setState( { error, value: null } );
          }
        } );
    }
  }

  unsubscribe( ) {
    if ( this.prevPromise !== null ) {
      this.prevPromise = null;
    }
  }

  render() {
    const { children, fallback } = this.props;
    const { error, value } = this.state;

    if ( error !== null ) {
      throw error;
    }
    if ( value === undefined || value === null ) {
      return fallback || null;
    }
    return children( value );

  }
}
