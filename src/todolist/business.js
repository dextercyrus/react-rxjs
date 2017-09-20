import service from './service';
import Rx from 'rxjs';
class todoListBusiness {
    add(value){
      return  Rx.Observable.timer(2000).switchMap(()=>service.add(value))
    }
    edit(value){
        return Rx.Observable.timer(2000).switchMap(()=>service.edit(value));
    }
    delete(index){
        return Rx.Observable.timer(2000).switchMap(()=>service.delete(index));
    }
    getAll(value){
        return Rx.Observable.timer(2000).switchMap(()=>service.getAll());
    }
} 
export default new todoListBusiness();