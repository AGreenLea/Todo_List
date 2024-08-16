const express = require('express');
const sqlite3 = require('sqlite3');
const fs = require('fs');
const { message } = require('antd');
const { error } = require('console');
const crypto = require('crypto');
//const bodyParser = require('body-parser');

//const salt = bcrypt.genSaltSync(10);

fs.stat('./todolist.db', (err, stats) => {
  if (err) {
    console.error(err);
  } else {
    console.log(stats.mode); // 以八进制格式打印文件权限
  }
});
const app = express();
const db = new sqlite3.Database('./todolist.db');

//app.use(bodyParser.json()); // 解析 application/json 类型的请求体
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
console.log('This is a log message');


//用于获取用户总数
app.get('/get',(req,res)=>{
  db.all('SELECT userId FROM user ORDER BY userId DESC LIMIT 1', (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error executing SQL' });
      console.error(err);
    } else {
      res.send({ results });
      console.log(results);
    }
  });
})

/*app.post('/userIdget', (req,res)=>{
  const  sql  = req.body.query;
  console.log(sql);
  db.run(sql, (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error executing SQL' });
    } else {
      res.send({ results });
    }
  });
});*/
//用于在注册前检查是否已经存在该用户名
app.post('/userIsitHaved',(req,res)=>{
  //const userId=req.body.userId;
  //const userPassword=req.body.userPassword;
  console.log("接受到的数据:",req.body);
  const userNameFirst=req.body.userName;

  //产生哈希值
  const hash1 = crypto.createHash('sha256');
  hash1.update(userNameFirst);
  const userName= hash1.digest('hex');

  const sql="SELECT * FROM user WHERE userName=?";
  db.all(sql,userName,(err,results)=>{
    if(err){
      res.status(500).send({ message: '寻找用户失败' });
      console.error("产生了错误，错误信息:",err);
    }else{
      console.log("查询结果是:",results);
      res.json(results);
    }
  })
})

//用于注册用户
app.post('/register', (req, res) => {
  const userId=req.body.userId;
  const userNameFirst=req.body.userName;
  const userPasswordFirst=req.body.userPassword;

  //产生哈希值
  const hash1 = crypto.createHash('sha256');
  hash1.update(userNameFirst);
  const userName= hash1.digest('hex');
  const hash2 = crypto.createHash('sha256');
  hash2.update(userPasswordFirst);
  const userPassword= hash2.digest('hex');


  console.log(req.body);

  console.log(req.body.userId);
  console.log(req.body.userName);
  console.log(req.body.userPassword);

  console.log(userId);
  console.log(userName);
  console.log(userPassword);
  db.run('INSERT INTO user (userId, userName,userPassword) VALUES (?, ?, ?)', userId, userName,userPassword, (err,results) => {
    if (err) {
      res.status(500).send({ message: '注册用户失败' });
      console.error("err");
    } else {
      console.log("Results:", results);
      res.json({ success: true, message: '注册用户成功', userId, userName,userPassword });
      
    }
  });
});
app.post('/login', (req, res) => {
  //const { userId, userName, userPassword } = req.body;
  const userNameFirst=req.body.userName;
  const userPasswordFirst=req.body.userPassword;

  //产生哈希值
  const hash1 = crypto.createHash('sha256');
  hash1.update(userNameFirst);
  const userName= hash1.digest('hex');
  const hash2 = crypto.createHash('sha256');
  hash2.update(userPasswordFirst);
  const userPassword= hash2.digest('hex');


  console.log(req.body.userName);
  console.log(req.body.userPassword);
  const sql = 'SELECT userId FROM user WHERE userName=? AND userPassword=?';
  //SELECT userId FROM user WHERE userName='xiaobai4' AND userPassword='123'
  db.all(sql,[userName,userPassword], (err,results) => {
    if (err) {
      res.status(500).send({ message: '查询失败' });
      console.error("错误")
      console.error("err");
    } else {
      console.log("用户登陆寻址结果是Results:", results);
      res.json(results);     
    }
  });
});


app.post('/app', (req, res) => {
  const AppId=req.body.Id;
  console.log("req.body.AppId:",req.body.Id);
  console.log(AppId);

  const sql = 'SELECT * FROM thingOfTodoList WHERE userId=?';
  //SELECT userId FROM user WHERE userName='xiaobai4' AND userPassword='123'
  db.all(sql,[AppId], (err,results) => {
    if (err) {
      res.status(500).send({ message: '查询失败' });
      console.error("错误")
      console.error("err");
    } else {
      console.log("Results:", results);
      console.log("Results的长度:",results.length);
      res.json(results);     
    }
  });
});
app.post('/appAdd', (req, res) => {
  const userId=req.body.userId;
  const id=req.body.id;
  const Mystring=req.body.Mystring;
  const Mytime=req.body.Mytime;
  const isDeleted=req.body.isDeleted;
  const sql = 'INSERT INTO thingOfTodoList VALUES (?,?,?,?,?)';
  //SELECT userId FROM user WHERE userName='xiaobai4' AND userPassword='123'
  db.all(sql,[userId,id,Mystring,Mytime,isDeleted.toString()], (err,results) => {
    if (err) {
      res.status(500).send({ message: '查询失败' });
      console.error("错误")
      console.error("err");
    } else {
      console.log("Results:", results);
      res.json(results);     
    }
  });
});
app.post('/cardChange',(req,res)=>{
  const userId=req.body.userId;
  const id=req.body.id;
  //const Mystring=req.body.Mystring;
  //const Mytime=req.body.Mytime;
  const isDeleted=req.body.isDeleted;
  const sql = 'UPDATE thingOfTodoList SET isDeleted=? WHERE userId=? AND id=?';
  console.log("接受到的数据:",req.body);
  console.log("userId",userId);
  const params = [isDeleted, userId, id];
  console.log("要运行的语句",`Executing SQL: ${sql} with params: ${params}`);
  db.all(sql,[isDeleted,userId,id],(err,results)=>{
    if(err){
      res.status(500).send({message:"修改isDeleted值失败"});
      console.error("错误")
    }else{
      console.log("Results:", results);
      
      res.json(results); 
    }
  })
})
app.delete('/appDelete',(req,res)=>{
  const userId=req.body.userId;
  const id=req.body.id;
  console.log("接受到的数据:",req.body);
  const sql="DELETE FROM thingOfTodoList WHERE userId=? AND id=?";
  db.all(sql,[userId,id],(err,results)=>{
    if(err){
      console.error("删除失败，错误信息:",err);
      res.status(500).send({message:"删除失败"});
    }else{
      console.log("删除成功，返回信息:",results);
      res.json(results);
    }
  })
})
/*app.post('/api/users', (req, res) => {
  const { sql } = req.body;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error executing SQL' });
    } else {
      res.send({ results });
    }
  });
});*/
app.listen(3001, () => {
  console.log('Server started on port 3001');
});
