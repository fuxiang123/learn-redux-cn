
function createStore(reducer,initState,enhancer){
    let currentReducer=reducer;
    let currentState=initState;
    let currentListener=[];

function dispatch(action){
    //调用currentReducer方法，生成新的state数
    //并把新生成的state树赋值给currentState
    currentState=currentReducer(currentState,action)
    //遍历currentListener数组，依次调用保存在其中的listener
    for(let i=0;i<currentListener.length;i++){
        const listener=currentListener[i];
        listener();
    }
}

    function getState(){
        return currentState;
    }

    function subscribe(listener){
        currentListener.push(listener);
        return function unsubscribe(){
            const index=currentListener.indexOf(listener);
            currentListener.splice(index,0);
        }
    }

    return {
        dispatch,
        getState,
        subscribe
    }
}

export default createStore;