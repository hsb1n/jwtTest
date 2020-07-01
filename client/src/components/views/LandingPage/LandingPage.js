import React,{useEffect} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom'


const LandingPage = (props) => {

    useEffect(()=>{
        axios.get('/api/hello')
        .then(response=>{console.log(response)})
        //req를 서버에다 보냈는데요 
        //서버에서 돌아오는 res를 콘솔창에 보이게 해줌
    },[])

    const onClickHandler=()=>{
        axios.get('/api/users/logout')
        .then(response =>{
            if(response.data.success){
                props.history.push("/login")
            }else{
                alert('ㅋㅋ로그아웃 실패ㅋㅋ')
            }
            
        })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width:'100%', height:'100vh'
        }} >
            <h2>시작 페이지</h2>
            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    
    );
};

export default withRouter(LandingPage);