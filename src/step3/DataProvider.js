import React, { PureComponent } from 'react';
import IndexedDbRepository from './IndexedDbRepository';
import PromiseComponent from './PromiseComponent';
import repository from './RepositoryHolder';
import RepositoryListener from './RepositoryListener';

type DataType = any;

type PropsType = {
  children : DataType => any,
  doCalc : IndexedDbRepository => Promise< DataType >,
};

export default class DataProvider extends PureComponent<PropsType> {

  constructor() {
    super( ...arguments );
    this.handleRepoChanged = () => this.forceUpdate();
  }

  render() {
    return <RepositoryListener onChange={this.handleRepoChanged} repository={repository}>
      <PromiseComponent promise={this.props.doCalc( repository )}>
        {data => this.props.children( data )}
      </PromiseComponent>
    </RepositoryListener>;
  }
}
