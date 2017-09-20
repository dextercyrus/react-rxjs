import React, { PureComponent } from 'react'
import Control from './control.jsx';
import List from './list.jsx';
import stateStore from './stateStore';

export default class TodoList extends PureComponent {
  render() {
    return <div>
        <Control />
        <List store={stateStore} />
      </div>
  }
}
