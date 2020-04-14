import {createStore} from 'myRedux'

const initState={number:0}

function reducer(state,action){
  switch(action.type){
    case 'add':
      return {...state,number:state.number+1}
    case 'minus':
      return {...state,number:state.number-1}
    default:
      return state;
  }
}

const store=createStore(reducer,initState)

export default store;
