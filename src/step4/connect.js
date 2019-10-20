import React, { PureComponent } from 'react';
import IndexedDbRepository from './IndexedDbRepository';
import PromisesComponent from './PromisesComponent';
import repository from './RepositoryHolder';
import RepositoryListener from './RepositoryListener';

type ChildPropsType = any;
type PromisesObject = { [string] : Promise< any > };
type ActionsObject = { [string] : any };

type PropsType = {
  childClass : any,
  childProps : any,
  mapRepoToActions : ( IndexedDbRepository, ChildPropsType ) => { [string] : any },
  mapRepoToProps : ( IndexedDbRepository, ChildPropsType ) => { [string] : any },
};

class Connected extends PureComponent<PropsType, StateType> {

  propsToPromises : ( ChildPropsType, ( ( IndexedDbRepository, ChildPropsType ) => PromisesObject ), IndexedDbRepository, number ) => PromisesObject;

  constructor() {
    super( ...arguments );
    this.handleRepoChanged = () => this.forceUpdate();
  }

  render() {
    const { childClass, childProps, mapRepoToProps, mapRepoToActions } = this.props;
    const promises : PromisesObject = mapRepoToProps( repository, childProps );
    const actions : ActionsObject = mapRepoToActions( repository, childProps );

    return <RepositoryListener onChange={this.handleRepoChanged} repository={repository}>
      <PromisesComponent promises={promises}>
        { values => React.createElement( childClass, {
          ...childProps,
          ...values,
          ...actions,
        } )}
      </PromisesComponent>
    </RepositoryListener>;
  }
}

/* eslint react/display-name: 0 */
export default function connect( mapRepoToProps, mapRepoToActions ) {
  return childClass => props => <Connected
    childClass={childClass}
    childProps={props}
    mapRepoToActions={mapRepoToActions}
    mapRepoToProps={mapRepoToProps} />;
}
