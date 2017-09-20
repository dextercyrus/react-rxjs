import React, { PureComponent } from 'react'
import { observer } from "mobx-react";
import todoListBusiness from './business';
class List extends PureComponent {

    componentWillMount() {
        todoListBusiness.getAll().subscribe();
    }
    onDelete(index) {
        return (event) => {
            let target = event.target;
            target.disabled = true;
            todoListBusiness.delete(index).subscribe(()=>{
                target.disabled = false;
            });
        }
    }
    render() {
        let list = this.props.store.list || [];
        return <div>
            {list.length == 0 ? <div>loading...</div> : undefined}
            <ul>
                {
                    list.map((item, index) => {
                        return <li key={`key-${index}`}>{item} <button onClick={this.onDelete(index)}>delete</button></li>;
                    })
                }
            </ul>
        </div>
    }
}

export default observer(List);