import {createStore} from 'src/myRedux'

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
```
然后创建一个名为Counter.js的文件，写入如下内容：
```javascript
import React,{useState,useEffect} from 'react'
import {View,Text,Button} from 'react-native'
import store from './storeConfig'

function Counter(){
    const [num,setNum]=useState(0);
    useEffect(()=>{
        const unsubsrcibe=store.subscribe(()=>{
            const state=store.getState();
            console.log(state)
            setNum(state.number);
        })
        return unsubsrcibe();
    },[])

    return (
        <View style={container}>
            <Text>{'当前的数字为：'+num}</Text>
            <Button title={'+'} onPress={add}/>
            <Button title={'-'} onPress={minus}/>
        </View>
    )
}

function add(){
    store.dispatch({type:'add'})
}

function minus(){
    store.dispatch({type:'minus'})
}

const container={
    flex:1,
    alignItems:'center',
    justifyContent:'center'
}

export default Counter;
