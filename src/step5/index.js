import { connect, IndexDbRepository } from '@vlsergey/react-indexdb-repo';
import React, { PureComponent } from 'react';
import counter from 'common/counter';
import getRepository from './getRepository';
import Spinner from 'react-bootstrap/Spinner';
import TaskList from '../common/TaskList';
import type { TaskType } from '../common/TaskType';

const EMPTY_OBJECT = Object.freeze( {} );

const mapPropsToRepo = () => getRepository();
const mapRepoToProps = ( repository : IndexDbRepository ) => ( {
  tasks: repository.findAll(),
} );
const extractPropsForMemo = () => EMPTY_OBJECT;
const mapRepoToActions = ( repository : IndexDbRepository ) => ( {
  doAdd: ( newTaskText : string ) => repository.save( { id: counter(), text: newTaskText } ),
  doDelete: ( idToDelete : number ) => repository.deleteById( idToDelete ),
} );

type PropsType = {
  doAdd? : string => any,
  doDelete? : number => any,
  tasks? : ?( TaskType[] ),
};

export default
@connect( mapPropsToRepo, extractPropsForMemo, mapRepoToProps, mapRepoToActions )
class Step5 extends PureComponent<PropsType> {
  render() {
    return <>
      <h1>Вариант с хранением списка задач в IndexDB</h1>
      <h2>Использование библиотеки <a href="https://www.npmjs.com/package/@vlsergey/react-indexdb-repo">@vlsergey/react-index-db</a></h2>
      { this.props.tasks === undefined || this.props.tasks === null
        ? <><Spinner animation="border" aria-hidden="true" as="span" role="status" /><span> Идёт загрузка...</span></>
        : <TaskList
          onAdd={this.props.doAdd}
          onDelete={this.props.doDelete}
          tasks={this.props.tasks} />
      }
    </>;
  }
}
