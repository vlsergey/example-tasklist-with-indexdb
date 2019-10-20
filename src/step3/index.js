import React, { PureComponent } from 'react';
import counter from 'common/counter';
import DataProvider from './DataProvider';
import repository from './RepositoryHolder';
import Spinner from 'react-bootstrap/Spinner';
import TaskList from '../common/TaskList';

export default class Step3 extends PureComponent<void> {

  constructor() {
    super( ...arguments );
    this.doFindAllTasks = repository => repository.findAll();

    this.handleAdd = async( newTaskText : string ) => {
      await repository.save( { id: counter(), text: newTaskText } );
    };
    this.handleDelete = async( idToDelete : number ) => {
      await repository.deleteById( idToDelete );
    };
  }

  render() {
    return <>
      <h1>Вариант с хранением списка задач в IndexDB</h1>
      <h2>Отдельный класс DataProvider</h2>
      <DataProvider
        doCalc={this.doFindAllTasks}
        fallback={<><Spinner animation="border" aria-hidden="true" as="span" role="status" /><span> Идёт загрузка...</span></>}>
        { tasks => <TaskList
          onAdd={this.handleAdd}
          onDelete={this.handleDelete}
          tasks={tasks} /> }
      </DataProvider>
    </>;
  }

}
