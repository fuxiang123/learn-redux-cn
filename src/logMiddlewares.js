
const fn1 = ({ dispatch, getState }) => next => action => {
    console.log('before fn1 next:' + getState().number);
    next(action);
    console.log('after fn1 next:' + getState().number);
}

const fn2 = ({ dispatch, getState }) => next => action => {
    console.log('before fn1 next:' + getState().number);
    next(action);
    console.log('after fn1 next:' + getState().number);
}

const fn3 = ({ dispatch, getState }) => next => action => {
    console.log('before fn3 next:' + getState().number);
    next(action);
    console.log('after fn3 next:' + getState().number);
}

export default [fn1,fn2,fn3]
