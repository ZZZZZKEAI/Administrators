import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Button, Icon } from 'antd';

var KanCss = require('./kan.css')





export default class Kan extends React.Component {
    state = { visible: false };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>

                <div className={KanCss.lb}>
                    <div className={KanCss.lb1} type="primary" onClick={this.showDrawer}>
                        <Icon type="ordered-list" style={{ fontSize: '25px' }} />
                        <div>主页</div>

                    </div>
                    <Link>
                        <div className={KanCss.lb1}>
                            <Icon type="book" style={{ fontSize: '25px' }} />
                            <div>立即加入</div>
                        </div>
                    </Link>
                    <Link to="/xiaoshuojm">
                        <div className={KanCss.lb1}>
                            <Icon type="book" style={{ fontSize: '25px' }} />
                            <div>返回</div>
                        </div>
                    </Link>
                    <Drawer
                        title="主页"
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                    </Drawer>
                </div>
                <div className={KanCss.zwk}>
                    <div className={KanCss.zw}>
                        <div className={KanCss.zj}>
                            <h3>5A景区&nbsp;&nbsp;门票预订</h3>
                        </div>
                        <div className={KanCss.zw1}>
                            <p>
                            【刷身份证入园】【官方直销】【提前一天】黄鹤楼成人票  ¥65
                            </p>
                            <p>
                            【刷二维码入园】-武汉黄鹤楼-成人票  ¥65
                            </p>
                            <p>
                            黄鹤楼优待人群票  ¥35
                            </p>
                            <p>
                            【当天可定】黄鹤楼成人票  ¥65
                            </p>
                            <p>
                            【提前一天】黄鹤楼成人票  ¥65
                            </p>
                            <p>
                            黄鹤楼双人票  ¥130
                            </p>
                            <p>
                            黄鹤楼优待人群票 适用对象：老人/儿童/学生  ¥35
                            </p>
                        </div>
                    </div>
                    <div className={KanCss.dibu}>
                        <Link>上一页</Link>
                        <span></span>
                        <Link to="/homepage/xiaoshuo">主页</Link>
                        <span></span>
                        <Link>下一页</Link>      
                    </div>
                </div>
                <div className={KanCss.beijing}>

                </div>
            </div>
        )
    }
}