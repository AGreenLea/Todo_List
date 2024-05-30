//import logo from './logo.svg';
import './App.css';
import './MyAssembly/Mycard.css';
import { useState } from 'react';
import Card from './MyAssembly/myCard.js'
//import moment from 'oment';
import { Button } from 'antd';
import moment from "moment";
import {DeleteOutlined} from '@ant-design/icons';

export default function App() {
  const[Char,setChar]=useState("");
  const[Time,setTime]=useState();
  const[Thing,setThing]=useState([]);
  //const[Thing,setThing2]=useState([]);
  const[Number,setNumber]=useState(0);
  //const[isDeleted,setisDeleted]=useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const charCurrentTime=moment(currentTime).format('YYYY-MM-DD');
  function ButtonCLick(){
    if(""!==Char&&""!==Time)
    {   setThing(
      [
        ...Thing,
        {
          id:Number,
          Mystring:Char,
          Mytime:Time,
          isDeleted:false
        }
      ]
    );
    setNumber(number=>number+1);
   }else{
      alert("请重新输入！");
    }
  }
  return (
    <div className="App">
      <h1>To do List</h1>
      
      <p>
      <input id="TEXT" defaultValue={Char} onChange={e=>setChar(e.target.value)} placeholder="输入任务名称"></input>
      </p>
      <input id="Time" type="date" defaultValue={Time} onChange={e=>setTime(e.target.value)} placeholder="请输入截止日期"></input>
      <Button onClick={ButtonCLick}>添加</Button>

      {Thing.map((item, index) => (
        <div class="card-container" key={item} >
        <Card class="Card" key={index} Char={item.Mystring} Time={item.Mytime} 
              CardCurrentTime={charCurrentTime}/>
         <Button onClick={()=>setThing(Thing.filter(t=>t.id!==item.id))}>
         <DeleteOutlined />
         </Button>
        </div>
      ))}
    </div>
  );
}

//export default App;
