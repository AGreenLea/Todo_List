//import { Button, Input } from "antd";
import { useState} from 'react';
import { useEffect} from 'react';
import axios from 'axios';
import { Button } from 'antd';
import App from '../App.js';
import './login.css';
//import { response } from 'express';
//const [userId,setuserId]=userState("");
/*import db from "../../index/index.js";
const firstFind=db.prepare("SELECT userId FROM user ORDER BY userId DESC LIMIT 1");
userId=firstFind.run();
function LoginButtonClick(userNameChar,userPasswordChar){
    const add=db.prepare("SELECT * FROM user WHERE userId=1 AND userName='小白1' AND userPassword='123'");
}*/


export default function Login(){
    const [userNameChar, setuserNameChar] = useState("");
    const [userPasswordChar, setuserPasswordChar] = useState("");
    const [userId,setuserId]=useState("");
    //const [userName,setuserName]=useState("");
    //const [userPassword,setuserPassword]=useState("");
    const [showJS,setshowJS]=useState(true);
    const [AppId,setAppId]=useState('');

    //const [isIthaved,setisIthaved]=useState(0);
    let isIthaved=0;
    const testChar=/^[a-zA-Z]+@[0-9]+$/;


    //const url='/api/users';
    //const sqlQuery='SELECT userId FROM user ORDER BY userId DESC LIMIT 1';
    /*const myHeaders = new Headers();
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "/*");
    myHeaders.append("Host", "localhost:3001");
    myHeaders.append("Connection", "keep-alive");
    const raw = "query=SELECT userId FROM user ORDER BY userId DESC LIMIT 1";

    const requestOptions = {
       method: 'POST',
       headers: myHeaders,
       body: ,
       redirect: 'follow'
    };*/
  //useEffect(() => {
    fetch("http://localhost:3001/get", {
      method:'GET',
    })
       .then(response => response.json())
       .then(result => {
        if (result && result.results && result.results.length > 0) {
          const userIdChar = result.results[0].userId;
          setuserId(userIdChar);
          console.log("userId的值是",userId);
        } else {
          console.error("来自 API 的无效响应:", result);
        }})
       .catch(error => console.log('error', error));
  //},[]);
  //console.log(userId);

  function theUserIsitHaved(){
   return fetch("http://localhost:3001/userIsitHaved",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        userName:userNameChar
      }),
    })
    .then(response=>response.json())
    .then(date=>{
      console.log("运行成功，返回的数据是",date);
      //setisIthaved(date.length);
      console.log(date.length);
      //isIthaved=date.length;
      console.log("date.length的值是",date.length);
      return date.length;
      //callback(isIthaved > 0);
    })
    .catch(error=>{
      console.error("运行错误，错误信息是:",error);
      return -1;
      //callback(false);
    })
  }

      //处理登录按钮点击
      function LoginButtonCLick(userNameChar,userPasswordChar){
        fetch("http://localhost:3001/login",{
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify(
            {
              userName:userNameChar,
              userPassword:userPasswordChar,
            }
          )
        })
        .then(response=>response.json())
        .then(result=>{
          if(result.length>0){
            console.log("准备登入");
            console.log("result[0].userId:",result[0].userId);
            setAppId(result[0].userId);
            console.log("result:",result);
            setshowJS(showJS=>!showJS);
          }else{
            console.log("准备驳回");
            alert("用户名或密码不正确！");
          }
        })
        .catch(error=>{
          console.error();
        })
        console.log("发送的JSON数据：",JSON.stringify(
          {
            userName:userNameChar,
            userPassword:userPasswordChar,
          }));
    };


      //处理注册按钮点击
      function RegisterButtonCLick(userId,userNameChar,userPasswordChar){
        //theUserIsitHaved();
        
        theUserIsitHaved().then(result=>{
          console.log("result的值是:",result);
          isIthaved=result;
          console.log("isIthaved的值是:",isIthaved);

          //核心功能区
          if(testChar.test(userNameChar)){
            if(testChar.test(userPasswordChar)){
              if(0===isIthaved){
                console.log("判断时使用的isIthaved值是:",isIthaved);
          setuserId(userId+1);
          //const SQL='SELECT * FROM user WHERE userName=? AND userPassword=?'
          console.log(userId);
          console.log(userNameChar);
          console.log(userPasswordChar);
            fetch('http://localhost:3001/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId:userId.current,
                userName:userNameChar,
                userPassword:userPasswordChar
              })
            })
            .then(response => response.json())
            .then(data => {
              console.log(data); // 获取服务器端的响应数据
            })
            .catch(error => {
              setuserId(userId - 1);
              console.log(userId);
              console.error(error);
            });
            console.log(userId); 
           }else{
            console.log("判断时使用的isIthaved值是:",isIthaved);
            alert("该用户名已经被注册！");
           }
          }else{
            alert("用户密码不合规范！")
          }
      }else{
        alert("用户名不合规范！")
      }
        })

        //console.log(theUserIsitHaved());
        //console.log("用户名检查结果:",testChar.test(userNameChar));
        
  };

      //处理登出按钮点击
      function LogoutButtonCLick(){
        setshowJS(showJS=>!showJS);
      }

      // userId={userId} userNameChar={userNameChar} userPasswordChar={userPasswordChar}
    if(true===showJS){
    return (
        <div >
          <h1 className="title-margin" class="title">To do List 用户登录</h1>
            <p className="p-margin">
            <input id="userName" defaultValue={userNameChar} onChange={e => setuserNameChar(e.target.value)} placeholder="输入用户名称"></input>
            </p>
            <p className="p-margin">
            <input id="userPassword" defaultValue={userPasswordChar} onChange={e => setuserPasswordChar(e.target.value)} placeholder="输入用户密码"></input>
            </p>
            <div id="Button"> 
              <p>
              <Button className="button-margin" onClick={()=>LoginButtonCLick(userNameChar,userPasswordChar)} >登录</Button>
              <Button onClick={()=>RegisterButtonCLick(userId,userNameChar,userPasswordChar)}>注册</Button>
              </p>
            </div>
        </div>
    )}else{
      return(
        <div>
        <App AppId={AppId}/>
        <div id="LogoutButton">
        <Button  onClick={LogoutButtonCLick}>登出</Button>
        </div>
        
        </div>
      )
    }
}