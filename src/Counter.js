import React,{useState,useEffect} from 'react'
import store from './store'

function Counter(){
    const [num,setNum]=useState(0);
    useEffect(()=>{
        const unsubsrcibe=store.subscribe(()=>{
            const state=store.getState();
            setNum(state.number);
        });
        return unsubsrcibe();
    },[]);

    return (
        <div style={styles.outer}>
            <div>{'当前的数字为：'+num}</div>
            <button title={'+'} onClick={add} style={styles.button}>+</button>
            <button title={'-'} onClick={minus} style={styles.button}>-</button>
        </div>
    )
}

function add(){
    store.dispatch({type:'add'})
}

function minus(){
    store.dispatch({type:'minus'})
}

const styles = {
    outer:{
        display:'flex',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        fontSize:'30px',
    },
    button:{
        width:'80px',
        height:'50px',
        margin:'10px',
        fontSize:'30px',
        textAlign:'center',
        borderRadius: '25px'
    }
}

export default Counter;
