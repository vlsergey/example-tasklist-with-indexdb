import React, { PureComponent } from 'react';
import Button from 'react-bootstrap/Button';
import counter from 'common/counter';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import type { TaskType } from '../common/TaskType';

type StateType = {
  newTaskText : string,
  tasks : TaskType[],
};

export default class Step0 extends PureComponent<void, StateType> {

  constructor() {
    super( ...arguments );

    this.state = {
      newTaskText: '',
      tasks: [
        { id: counter(), text: 'Sample task' },
      ],
    };

    this.handleAdd = () => {
      this.setState( state => ( {
        tasks: [ ...state.tasks, { id: counter(), text: state.newTaskText } ],
        newTaskText: '',
      } ) );
    };
    this.handleDeleteF = ( idToDelete : number ) => () => this.setState( state => ( {
      tasks: state.tasks.filter( ( { id } ) => id !== idToDelete ),
    } ) );
    this.handleNewTaskTextChange = ( { target: { value } } ) => this.setState( {
      newTaskText: value || '',
    } );
  }

  render() {
    return <>
      <h1>Вариант с хранением списка задач в компоненте</h1>
      <h2>Обработка списка задач и отображение в одном компоненте</h2>
      <Table bordered hover striped>
        <thead><tr>
          <th>#</th><th>Text</th><th />
        </tr></thead>
        <tbody>
          { this.state.tasks.map( task => <tr key={task.id}>
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
      </Table>
    </>;
  }

}
