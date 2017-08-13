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
    if (result == undefined)
        return Rx.Observable.throw({ Success: false });
    if (result.Success) {
        return Rx.Observable.of(result.Data);
    } else {
        alert(result.Message);
        return Rx.Observable.throw(result);
    }
};

export const getNames = (name) => {
    return Rx.Observable.create(createFetch('/service/name.json'))
        .switchMap(resultHandle)
        .map(names => names.filter(n => n.indexOf(name) >= 0));
}

export const login = (userName, password) => {
    return Rx.Observable.create(
        createFetch('/service/login.json', { userName, password })
    ).switchMap(resultHandle);
}
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

export const getFullUserInfo = () => {
    return Rx.Observable.from(getUserInfo())
        .switchMap(user => {
            return getLevelInfo(user.Level).map(level => {
                return { ...user, ...level };
            })
        })
}

