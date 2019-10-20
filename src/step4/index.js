import React, { PureComponent } from 'react';
import connect from './connect';
import counter from 'common/counter';
import Spinner from 'react-bootstrap/Spinner';
import TaskList from '../common/TaskList';
import type { TaskType } from '../common/TaskType';

type PropsType = {
  doAdd : string => any,
  doDelete : number => any,
  tasks : ?TaskType[],
};

class Step4 extends PureComponent<PropsType> {
  render() {
    return <>
      <h1>Вариант с хранением списка задач в IndexDB</h1>
      <h2>Использование connect()</h2>
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

const mapRepoToProps = repository => ( {
  tasks: repository.findAll(),
} );
const mapRepoToActions = repository => ( {
  doAdd: ( newTaskText : string ) => repository.save( { id: counter(), text: newTaskText } ),
  doDelete: ( idToDelete : number ) => repository.deleteById( idToDelete ),
} );
const Step4Connected = connect( mapRepoToProps, mapRepoToActions )( Step4 );
export default Step4Connected;
