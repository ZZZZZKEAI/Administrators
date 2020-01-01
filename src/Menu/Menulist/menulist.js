import React from 'react'
var MenulistCSS= require('./menulist.css')
export default class MenulistPage extends React.Component{
    
    render(){
        return(
            <div className={MenulistCSS.menu}>
                <div className={MenulistCSS.addlist}>
                      <h2>旅行网管理系统欢迎您</h2>
                </div>
            </div>
            
        )
    }
}