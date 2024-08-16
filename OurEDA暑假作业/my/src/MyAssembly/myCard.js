//import './Mycard.css';
//import { response } from 'express';
import { useState } from 'react';
import { useEffect } from 'react';
//import {myChecked} from './myChecked.js';

export default function Card({ Char, Time, CardCurrentTime, isDeleted,carduserId,id}) {
  const [charState, setcharState] = useState('');
  
  /*console.log("Char的值是",Char);
  console.log("charState的值是",isDeleted);
  console.log("userId的值是:",carduserId);
  console.log("id的值是:",id);*/
  /*function ShanChuChange() {
    //setcharState(!charState);

  }*/
  useEffect(()=>{
    setcharState(isDeleted);
  },[isDeleted])

  function ischarState(){
    if('true'===charState){
      return true;
    }else{
      return false;
    }
  }
  function ColorSet() {
    if (Time < CardCurrentTime) {
      return true;
    } else {
      return false;
    }
  }

  function ShanChuChange(){
    if('true'===charState){
      setcharState('false');
      fetch("http://localhost:3001/cardChange",{
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({
          userId:carduserId,
          id:id,
          isDeleted:'false'
        })
      })
      .then(response=>response.json())
      .then(date=>{
        console.log("修改isDeleted返回的数据是:",date);
      })
      .catch(error=>{
        console.error("修改isDeleted发生了错误，错误信息是:",error);
      })
    }else{
      setcharState('true');
      fetch("http://localhost:3001/cardChange",{
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({
          userId:carduserId,
          id:id,
          isDeleted:'true'
        })
      })
      .then(response=>response.json())
      .then(date=>{
        console.log("修改isDeleted返回的数据是:",date);
      })
      .catch(error=>{
        console.error("修改isDeleted发生了错误，错误信息是:",error);
      })
    }

  }

  //if('true'===isDeleted){
  return (
    <div class="Mother" style={{
      textDecoration: ischarState() ? 'line-through' : 'none',
      color: ColorSet() ? 'red' : 'black'
    }}>
      <div class="Child" >
        <div className="text-container">
          <p>{Char}</p>
          <p>{Time}</p>
        </div>
      </div>
      <input type="checkbox" onChange={ShanChuChange} checked={charState === 'true'}></input>
    </div>
  )
  /*}else{
    return (
      <div class="Mother" style={{
        textDecoration: ischarState() ? 'line-through' : 'none',
        color: ColorSet() ? 'red' : 'black'
      }}>
        <div class="Child" >
          <div className="text-container">
            <p>{Char}</p>
            <p>{Time}</p>
          </div>
        </div>
        <input type="checkbox" onChange={ShanChuChange} ></input>
      </div>
    )
  }*/

}
