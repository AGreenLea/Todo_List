//import logo from './logo.svg';
import './App.css';
import './MyAssembly/Mycard.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import Card from './MyAssembly/myCard.js'
//import moment from 'oment';
import { Button, Result } from 'antd';
import moment from "moment";
import { DeleteOutlined } from '@ant-design/icons';
//import { response } from 'express';


export default function App(AppId) {
  const [Char, setChar] = useState("");
  const [Time, setTime] = useState();
  const [Thing, setThing] = useState([]);
  //const[Thing,setThing2]=useState([]);
  const [Number, setNumber] = useState(0);
  //const[isDeleted,setisDeleted]=useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const charCurrentTime = moment(currentTime).format('YYYY-MM-DD');

  //const [charState,setcharState]=useState(false);用于myCard组件内部，用来画横线

  //const {isIthaveGetThing,setisIthaveGetThing}=useState(false);
  //const {i,seti}=useState(0);
  
  //const id=AppId;
  //const idWhichUsed=AppId.AppId;
  //const object={"Id": idWhichUsed};



  console.log("App组件接受到的AppId变量:",AppId);
  console.log("向app接口发送的数据",JSON.stringify({Id: AppId.AppId}));
  //if(false===isIthaveGetThing){
  useEffect(()=>{
    //console.log("执行了初始化POST请求");
    fetch("http://localhost:3001/app",{
      method:"POST",
      //{'Content-Type': 'application/json',},
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({Id: AppId.AppId})
    })
    .then(response=>response.json())
    .then(results=>{
      /*console.log("返回的数据是:",results);
      console.log("返回的第一个数据是:",results[0]);
      console.log("返回的第二个数据是:",results[1]);
      console.log("返回的第三个数据是:",results[2]);
      console.log("返回的数据长度是:",results.length);*/
      if(results.length>0){
        //isIthaveGetThing=true;
        //console.log(isIthaveGetThing);    
          setThing(
            [
              ...Thing,
              ...results.map(result => ({
                id: result.id,
                Mystring: result.Mystring,
                Mytime: result.Mytime,
                isDeleted: result.isDeleted
              }))
            ]
          );
          setNumber(results[results.length-1].id+1);
          //console.log("results[results.length-1].Id的值是:",results[results.length-1].id);
      }else{
        console.log("该用户没有待办事项");
        //isIthaveGetThing=false;
        //console.log(isIthaveGetThing);
      }
    })
    .catch(error=>{
      console.error("发生了错误，错误信息是:",error);
    })
  },[AppId])
  //}

  function isItNotNull(){
    if(Char!==""){
      return true;
    }
  }

  function ButtonCLick() {
    console.log("Number的值是:",Number); 
    console.log("接受到的字符是:",Char,Time);
    console.log("Char判断的结果是:",{result: Char !== "" });
    console.log("Time判断的结果是:",{result: Time !== undefined });
    console.log("Chat的值是:",Char);
    console.log("Time的值是:",Time);
    if (Char !== "" && Time !== undefined ) {
      
      setThing(
        [
          ...Thing,
          {
            id: Number,
            Mystring: Char,
            Mytime: Time,
            isDeleted: false
          }
        ]
      );
      setNumber(number => number + 1);
      fetch("http://localhost:3001/appAdd",{
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({
          userId:AppId.AppId,
          id:Number,
          Mystring: Char,
          Mytime: Time,
          isDeleted: false
        })
      })
      .then(response=>response.json())
      .then(date=>{
        console.log(date);
        console.log("添加成功");
      })
      .catch(error=>{{
        console.error("出错了，错误信息是:",error);
      }})

    } else {
      alert("请重新输入！");
    }
  }

  function sqlDelete(getId){
    //setThing(Thing.filter(t => t.id !== item.id));
    console.log("删除请求即将发送的数据",JSON.stringify({
      userId:AppId.AppId,
      id:getId,
    }))
    fetch("http://localhost:3001/appDelete",{
      method:"DELETE",
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({
        userId:AppId.AppId,
        id:getId,
      })
    })
    .then(response=>response.json())
    .then(date=>{
      console.log(date);
      console.log("删除成功");
    })
    .catch(error=>{{
      console.error("出错了，错误信息是:",error);
    }})
  }
  


  return (
    <div className="App">
      <h1>To do List</h1>

      <p>
        <input id="TEXT" defaultValue={Char} onChange={e => setChar(e.target.value)} placeholder="输入任务名称"></input>
      </p>
      <input id="Time" type="date" defaultValue={Time} onChange={e => setTime(e.target.value)} placeholder="请输入截止日期"></input>
      <Button onClick={ButtonCLick}>添加</Button>

      {Thing.map((item, index) => (
        <div class="card-container" key={item} >
          <Card class="Card" key={index} Char={item.Mystring} Time={item.Mytime}
            CardCurrentTime={charCurrentTime} isDeleted={item.isDeleted} carduserId={AppId.AppId} id={item.id}/>
          <Button onClick={()=>{
            setThing(Thing.filter(t => t.id !== item.id));
            sqlDelete(item.id);
            }} >
              <DeleteOutlined />
          </Button>
        </div>
      ))}
    </div>
  );
}

//export default App;
