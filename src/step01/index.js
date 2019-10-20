import React, { PureComponent } from 'react';
import counter from 'common/counter';
import TaskList from '../common/TaskList';
import type { TaskType } from '../common/TaskType';

type StateType = {
  tasks : TaskType[],
};

export default class Step01 extends PureComponent<void, StateType> {

  constructor() {
    super( ...arguments );
    this.state = { tasks: [
      { id: counter(), text: 'Sample task' },
    ] };

    this.handleAdd = ( newTaskText : string ) => {
      this.setState( state => ( {
        tasks: [ ...state.tasks, { id: counter(), text: newTaskText } ],
      } ) );
    };
    this.handleDelete = ( idToDelete : number ) => this.setState( state => ( {
      tasks: state.tasks.filter( ( { id } ) => id !== idToDelete ),
    } ) );
  }

  render() {
    return <>
      <h1>Вариант с хранением списка задач в компоненте</h1>
      <h2>Обработка списка задач и отображение в разных компонентах</h2>
      <TaskList
        onAdd={this.handleAdd}
        onDelete={this.handleDelete}
        tasks={this.state.tasks} />
    </>;
  }

}
