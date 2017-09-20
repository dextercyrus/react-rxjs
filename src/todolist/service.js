import Rx from 'rxjs';
import {action} from 'mobx';
import stateStore from './stateStore';

let data = [111,222]

export default {
    add:value => {
        return Rx.Observable.create(
            observer => {
                action(()=>{
                    stateStore.list.push(value);
                })();
                observer.next(value)
            }
        )
    },
    delete:index => {
        return Rx.Observable.create(
            observer => {
                action(()=>{
                    stateStore.list.splice(index,1);
                })();
                observer.next(index)
            }
        )
    },
    edit:value => {
        return Rx.Observable.create(
            observer => {
                action(()=>{
                    stateStore.list[index]=value;
                })();
                observer.next(value)
            }
        )
    },
    getAll:()=>{
        return Rx.Observable.create(
            observer => {
                if(stateStore.list.length == 0){
                    action(()=>{
                        stateStore.list=data;
                    })();
                    observer.next(data)
                }else{
                    observer.next(stateStore.list)
                }
                
            }
        )
    }
}

