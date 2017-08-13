# Rxjs 介绍及典型应用案例
### 什么是Rxjs
#### Rxjs 的全称是 Reactive Extensions for Javascript ， 网络上对它有各种各样的解释，我更喜欢将它解释为一个“数据流”编程工具。
这里的数据流并非是指程序中的一个 Stream对象，我们可以把这个数据流想象成水流，而Rx则是 水管、阀门、蓄水池、净水器、淋浴器、水枪、等等一切和水有关的工具集合

#### 那么我们直接看一些Rx 在实际应用中能做些什么吧，
### 我们需要做制作一个输入名称并自动完成的输入框。
通常情况下 我们需要在每次keyup 事件上确认当前输入的字符是否超过n个, 如果超过n个 在定义一个 setTimeout 并在每次输入时clear掉setTimeout 或者在超过500毫秒后 通过ajax请求 得到可选名称列表。

如果用Rxjs来实现会是这样
```js

let self = this;
Rx.Observable
    .fromEvent(document.getDocumentId("#name"),"keyup") //将input的keyup事件转化为一个可观察对象
    .map(event => event.target.value) //将输出的event转换为input的value
    .filter(value => value.length > 1) //只有输入的字符超过1个才会继续执行后面的
    .debounceTime(500)//数据流超过500毫秒无任何变动
    .switchMap(value => service.getNames(value)) //将当前可观察对象转换为获取名称列表的观察对象
    .subscribe( //订阅结果
        list => { //成功时将名称列表保存起来
            self.setState({ nameList: list })
        },
        err => {
            console.error(err);
        }
    )
```
是不是一切都变得简单了？

我们再来看看 ```service.getNames(value)```的实现
```js
import Rx from 'rxjs';


let defaultOption = {
    request: {
        method: "GET",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            "Content-Type": "application/json",
            "script-charset": "utf-8"
        }
    }
}
//Fetch 是一个用来取代 XMLHttpRequest 的技术 以后不再能称为ajax了,这里不做更多介绍
export const getNames = (name) => {
    return Rx.Observable.create(observer=>{
        fetch(url, defaultOption)
            .then(function (response) {
                return response.json();
            }).then(function (result) {
                observer.next(result)
            }).catch(function (error) {
                observer.error(error);
            });
    })
    .map(names => names.filter(n => n.indexOf(name) >= 0));
}
```

#### 现在我们的需求升级了，我们需要对我们的service层增加一些对数据进行初步处理的功能

```js
    import Rx from 'rxjs';


let defaultOption = {
    request: {
        method: "GET",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            "Content-Type": "application/json",
            "script-charset": "utf-8"
        }
    }
}

const createFetch = (url, params) => {
    return observer => {
        fetch(url, defaultOption)
            .then(function (response) {
                return response.json();
            }).then(function (result) {
                observer.next(result)
            }).catch(function (error) {
                observer.error(error);
            });
    }
}

const resultHandle = result => {
    if (result == undefined) //如果没有返回结果则将观察对象转换为一个异常对象
        return Rx.Observable.throw({ Success: false });
    if (result.Success) { //如果成功则直接将结果数据转换为观察的对象
        return Rx.Observable.of(result.Data);
    } else {//如果失败则告知失败原因
        alert(result.Message);
        return Rx.Observable.throw(result);
    }
};

export const getNames = (name) => {
    return Rx.Observable.create(createFetch('/service/name.json'))
        .switchMap(resultHandle) //只需要把结果的处理步骤放到这个环节就可以了
        .map(names => names.filter(n => n.indexOf(name) >= 0));
}
```

#### 现在需求又升级了 
我们前面做的只是系统中的一部分，一个用来登陆系统用的 名称输入框，现在我们需要登陆系统后 在点击一个按钮获取 当前用户的信息，但是用户的level信息是另一个接口，我们现在需要将这两个接口整合成一个 并返回结果，当其中一个失败则失败，并且level接口依赖于 user接口。

```js

export const getUserInfo = () => {
    return Rx.Observable.create(
        createFetch('/service/getUserInfo.json')
    ).switchMap(resultHandle);
}
export const getLevelInfo = (level) => {
    return Rx.Observable.create(
        createFetch('/service/getLevelInfo.json', { level })
    ).switchMap(resultHandle);
}

//
export const getFullUserInfo = () => {
    return Rx.Observable.from(getUserInfo())
        .switchMap(user => {
            return getLevelInfo(user.Level).map(level => {
                return { ...user, ...level };
            })
        })
}

```

现在 我们得到了我们想要的完整用户信息了。

以上只是Rxjs 能做的九牛一毛，它将很多以前需要复杂逻辑来处理的事情变得简单。

如果想要学习的同学 请从Rxjs 5.x进行学习，它的很多方法相对于4.x进行了改变

下面推荐一些学习资料

rxjs官网[http://reactivex.io/rxjs/](http://reactivex.io/rxjs/)

rxjs中文教程 [https://www.gitbook.com/book/buctwbzs/rxjs](https://www.gitbook.com/book/buctwbzs/rxjs)

RxJs 介绍 [http://www.tuicool.com/articles/iYv2qiR](http://www.tuicool.com/articles/iYv2qiR)

构建流式应用—RxJS详解 [http://www.alloyteam.com/2016/12/learn-rxjs/](http://www.alloyteam.com/2016/12/learn-rxjs/)

rxjs简单入门 [https://yq.aliyun.com/articles/65027](https://yq.aliyun.com/articles/65027)

RxJS 5 基本原理 [https://rxjs-cn.github.io/rxjs5-ultimate-cn/](https://rxjs-cn.github.io/rxjs5-ultimate-cn/)