import React, { PureComponent } from 'react';
import Button from './AutoDisableButtonWithSpinner';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import type { TaskType } from './TaskType';

type PropsType = {
  onAdd : string => any,
  onDelete : number => any,
  tasks : TaskType[],
};

type StateType = {
  newTaskAdding : boolean,
  newTaskText : string,
};

export default class TaskList extends PureComponent<PropsType, StateType> {

  constructor() {
    super( ...arguments );

    this.state = {
      newTaskAdding: false,
      newTaskText: '',
    };

    this.handleAdd = async() => {
      this.setState( { newTaskAdding: true } );
      try {
        // сначала ждём добавления, только потом очищаем поле
        await this.props.onAdd( this.state.newTaskText );
        this.setState( { newTaskText: '' } );
      } finally {
        this.setState( { newTaskAdding: false } );
      }
    };

    this.handleDeleteF = ( idToDelete : number ) =>
      async() => await this.props.onDelete( idToDelete );

    this.handleNewTaskTextChange = ( { target: { value } } ) => this.setState( {
      newTaskText: value || '',
    } );
  }

  render() {
    return <Table bordered hover striped>
      <thead><tr>
        <th>#</th><th>Text</th><th />
      </tr></thead>
      <tbody>
        { this.props.tasks.map( task => <tr key={task.id}>
          <td>{task.id}</td>
          <td>{task.text}</td>
          <td><Button
            onClick={this.handleDeleteF( task.id )}
            type="button"
            variant="danger">Удалить</Button></td>
        </tr> ) }
        <tr key="+1">
          <td />
          <td><Form.Control
            disabled={this.state.newTaskAdding}
            onChange={this.handleNewTaskTextChange}
            placeholder="Текст новой задачи"
            type="text"
            value={this.state.newTaskText || ''} /></td>
          <td><Button
            onClick={this.handleAdd}
            type="button"
            variant="primary">Добавить</Button></td>
        </tr>
      </tbody>
    </Table>;
  }

}
