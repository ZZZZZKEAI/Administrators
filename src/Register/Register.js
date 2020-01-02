import React from 'react';
import  { Component } from 'react';
import { Input, Button, message } from 'antd';
import { render } from 'react-dom';

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state={}
    }
    changeValue=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    upload = ()=>{
        //XHR
        var xhr = new XMLHttpRequest()
        var data={
            "username":this.state.username,
            "password":this.state.password,
            "name":this.state.name,
            "age":this.state.age,
            "gender":this.state.gender
        }
        //open连接
        xhr.open("post","/user/register")
        //fetch
        xhr.onreadystatechange=function() {
            if(xhr.readyState==4){
                if(xhr.status==200){
                    console.log(xhr.responseText)
                    var result = JSON.parse(xhr.responseText)
                    if(result.state==2){
                        message.info("用户名已存在")
                    }else if(result.state==1){
                        message.info("注册成功")
                        this.props.history.push("/homepage")
                    }
                }else{
                        message.info(xhr.status)
                }
            }
        }
        //发送数据
        xhr.setRequestHeader('content-type','application/json');

        xhr.send(JSON.stringify(data))

        //fetch

        //axios

    }
    render() {
        return (
            <div>
                用户名:
                <Input type="text"  name="username" value={this.state.username} onChange={e=>this.changeValue(e)}/>
                <br/>
                密码:
                <Input type="password" name="password" value={this.state.password} onchage={e=>this.changeValue(e)}/>
                姓名:
                <Input type="text" name="name" value={this.state.name} onChange={e=>this.changeValue(e)}/>
                年龄:
                <Input type="text" name="age" value={this.state.age} onChange={e=>this.changeValue(e)}/>
                性别:
                <Input type="gender" name="gender" value={this.state.gender} onChange={e=>this.changeValue(e)}/>
                <Button onClick={this.upload}>注册</Button>
            </div>
        );
    }
}

export default Register;