//import './Mycard.css';
import { useState } from 'react';
export default function Card({Char,Time,CardCurrentTime}){
    const[charState,setcharState]=useState(false);
    //const[cardCharColor,setcardCharColor]=useState(false);
    function ShanChuChange()
    {
        setcharState(!charState);
    }
    function ColorSet(){
      if(Time<CardCurrentTime){
        return true;
      }else{
        return false;
      }
    }
    return(
    <div  class="Mother"  style={{ textDecoration:charState? 'line-through' : 'none' ,
      color: ColorSet()?'red':'black'
    }}>
    <div class="Child" >      
      <div className="text-container">
        <p>{Char}</p> 
        <p>{Time}</p>
      </div>
    </div>
     <input type="checkbox" onChange={ShanChuChange}></input>  
    </div>
    )
}
