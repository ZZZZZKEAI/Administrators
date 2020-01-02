import React from 'react'
import DefaultHeader from './../Header/header'
import { Input, Button } from 'antd';
import { Link, BrowserRouter, Route } from 'react-router-dom'
var HomePageCSS = require('./homepage.css')
export default class HomePage extends React.Component {
  constructor(props){
    super(props)
    this.state={
      username:'',
      password:''
    }
  }
  changeValue = e=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  login = e=>{
    if (this.state.username=='123456'&&this.state.password=='123456') {
      alert('登陆成功');
      this.props.history.push('/menu')
    }else{
      alert('登陆失败')
    }
  }
  render() {
    return (
      <div className={HomePageCSS.login}>
        <DefaultHeader />
        <div className={HomePageCSS.login1}>
          <div className={HomePageCSS.username}>
            <Input placeholder="管理员账号" className={HomePageCSS.account} name="username" value={this.state.username} onChange={this.changeValue}/>
          </div>
          <div className={HomePageCSS.password}>
            <Input.Password placeholder="密码" className={HomePageCSS.word} name="password" value={this.state.password} onChange={this.changeValue}/>
          </div>
          <div className={HomePageCSS.button}>
            <Button className={HomePageCSS.b} onClick={this.login}>登录</Button>
          </div>
          <div className={HomePageCSS.button}>
            <Button className={HomePageCSS.c} Link to='./Register' onClick={this.Register}>注册</Button>
          </div>
          <div className={HomePageCSS.button}>
            <Button className={HomePageCSS.d} onClick={this.Register}>忘记密码</Button>
          </div>
        </div>

      </div>
    )
  }
}