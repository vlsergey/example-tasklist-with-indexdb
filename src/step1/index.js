import React, { PureComponent } from 'react';
import counter from 'common/counter';
import IndexedDbRepository from './IndexedDbRepository';
import Spinner from 'react-bootstrap/Spinner';
import TaskList from '../common/TaskList';
import type { TaskType } from '../common/TaskType';

type StateType = {
  tasks : TaskType[],
};

export default class Step1 extends PureComponent<void, StateType> {

  constructor() {
    super( ...arguments );
    this.state = { tasks: null };

    this.handleAdd = async( newTaskText : string ) => {
      await this.repository.save( { id: counter(), text: newTaskText } );
      this.setState( { tasks: null } );
      this.setState( { tasks: await this.repository.findAll() } );
    };
    this.handleDelete = async( idToDelete : number ) => {
      await this.repository.deleteById( idToDelete );
      this.setState( { tasks: null } );
      this.setState( { tasks: await this.repository.findAll() } );
    };
  }

  componentDidMount() {
    this.repository = new IndexedDbRepository( 'id' );
    // Заполняем состояние компонента задачами
    this.repository.findAll().then( tasks => this.setState( { tasks } ) );
  }

  render() {
    if ( this.state.tasks === null )
      return <><Spinner animation="border" aria-hidden="true" as="span" role="status" /><span> Идёт загрузка...</span></>;

    return <>
      <h1>Вариант с хранением списка задач в IndexDB</h1>
      <h2>Обработка списка задач и обращение к IndexDb в одном компоненте</h2>
      <TaskList
        onAdd={this.handleAdd}
        onDelete={this.handleDelete}
        tasks={this.state.tasks} />
    </>;
  }

}
