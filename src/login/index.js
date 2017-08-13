import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rx from 'rxjs';
import * as service from '@common/service'
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameList: [],
            isShowGetUserInfo: false
        }
        this.userName = new Rx.Subject();
    }
    componentDidMount() {
        let self = this;
        Rx.Observable
            .from(this.userName)
            .map(target => target.value)
            .filter(value => value.length > 1)
            .debounceTime(500)
            .switchMap(value => service.getNames(value))
            .subscribe(
                list => {
                    self.setState({ nameList: list })
                },
                err => {
                    console.error(err);
                }
            )

    }
    componentWillUnmount() {
        this.userName.unsubscribe();
    }
    onKeyUp(event) {
        let target = event.target;
        let e = event;
        this.setState({ [target.name]: target.value }, () => {
            if (target.name == "userName")
                this.userName.next(target)
        })
    }
    login(event) {
        let self = this;
        let target = event.target;
        target.disabled = true;
        service
            .login(this.state.userName, this.state.password)
            .subscribe(
            result => {
                target.disabled = false;
                self.setState({ isShowGetUserInfo: true })
            },
            err => {
                target.disabled = false;
                console.error(err);
            },
            () => {
                target.disabled = false;
            }
            )
    }
    getUserInfo(event) {
        let target = event.target;
        target.disabled = true;

        service
            .getFullUserInfo()
            .subscribe(
            result => {
                console.log(result);
                target.disabled = false;
            },
            err => {
                target.disabled = false;
                console.error(err);
            },
            () => {
                target.disabled = false;
            }
            )
    }
    render() {
        return <dl className="loginPanel">
            <dt className="loginPanel-title">Login</dt>
            <dd className="loginPanel-content">
                <label>UserName:</label><input type="text" name="userName" onKeyUp={this.onKeyUp.bind(this)} pattern="[\w\s]{4,}" list="nameList" />
                <label>Password:</label><input type="password" name="password" onKeyUp={this.onKeyUp.bind(this)} />
                <datalist id="nameList">
                    {this.state.nameList.map((n, i) => <option key={`nameKey${i}`} value={n} />)}
                </datalist>
                <button onClick={this.login.bind(this)}>submit</button>
                <button style={this.state.isShowGetUserInfo ? { display: "block" } : { display: "none" }} onClick={this.getUserInfo.bind(this)}>Get User info</button>
            </dd>
        </dl>

    }
}
