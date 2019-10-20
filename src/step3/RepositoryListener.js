import IndexedDbRepository from './IndexedDbRepository';
import { PureComponent } from 'react';

type PropsType = {
  children : any,
  onChange : number => any,
  repository : IndexedDbRepository,
};

export default class RepositoryListener
  extends PureComponent<PropsType> {

  prevRepository : ?IndexedDbRepository;
  repositoryListener : number => any;

  constructor() {
    super( ...arguments );

    this.prevRepository = null;
    this.repositoryListener = repositoryStamp => this.props.onChange( repositoryStamp );
  }

  componentDidMount() {
    this.subscribe();
  }

  componentDidUpdate() {
    this.subscribe();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  subscribe() {
    const { repository } = this.props;
    if ( repository instanceof IndexedDbRepository && this.prevRepository !== repository ) {
      if ( this.prevRepository !== null ) {
        this.prevRepository.removeListener( this.repositoryListener );
      }
      this.prevRepository = repository;
      repository.addListener( this.repositoryListener );
    }
  }

  unsubscribe( ) {
    if ( this.prevRepository !== null ) {
      this.prevRepository.removeListener( this.repositoryListener );
      this.prevRepository = null;
    }
  }

  render() {
    return this.props.children || null;
  }

}
