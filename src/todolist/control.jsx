import React, { PureComponent } from 'react'
import todoListBusiness from './business';

export default class Control extends PureComponent {

  onClick(event){
    let target = event.target;
    target.disabled = true;
    todoListBusiness.add(this.refs.input.value).subscribe(result=>{
      target.disabled = false;
    });
  }
  render() {
    return <fieldset>
        <legend>input</legend>
        <input type="input" ref="input" /><button onClick={this.onClick.bind(this)}>add</button>
      </fieldset>
  }
}
