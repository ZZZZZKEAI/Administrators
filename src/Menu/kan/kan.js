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
                        <div>目录</div>

                    </div>
                    <Link>
                        <div className={KanCss.lb1}>
                            <Icon type="book" style={{ fontSize: '25px' }} />
                            <div>加入书架</div>
                        </div>
                    </Link>
                    <Link to="/xiaoshuojm">
                        <div className={KanCss.lb1}>
                            <Icon type="book" style={{ fontSize: '25px' }} />
                            <div>返回</div>
                        </div>
                    </Link>
                    <Drawer
                        title="目录"
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                        <p><Link>第一章&nbsp;&nbsp;斗罗大陆,异界唐三</Link></p>
                        <p><Link>第二章&nbsp;&nbsp;废武魂与先天满魂力</Link></p>
                        <p><Link>第三章&nbsp;&nbsp;双生武魂</Link></p>
                        <p><Link>第四章&nbsp;&nbsp;异界唐三的第一件暗器</Link></p>
                        <p><Link>第五章&nbsp;&nbsp;大师?师傅?</Link></p>
                    </Drawer>
                </div>
                <div className={KanCss.zwk}>
                    <div className={KanCss.zw}>
                        <div className={KanCss.zj}>
                            <h3>第一章&nbsp;&nbsp;斗罗大陆,异界唐三</h3>
                        </div>
                        <div className={KanCss.zw1}>
                            <p>
                                这样一来，谁若是再将两人放在一起相比，无疑就只能令得旁人一笑了。
                            </p>
                        </div>
                    </div>
                    <div className={KanCss.dibu}>
                        <Link>上一章</Link>
                        <span></span>
                        <Link to="/homepage/xiaoshuo">目录</Link>
                        <span></span>
                        <Link>下一章</Link>      
                    </div>
                </div>
                <div className={KanCss.beijing}>

                </div>
            </div>
        )
    }
}