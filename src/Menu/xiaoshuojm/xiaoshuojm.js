import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Button } from 'antd';

var XiaoshuoCss = require('./xiaoshuojm.css')

export default class Xiaoshuojm extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props.location.state)
        return (
            <div>
                <div className={XiaoshuoCss.tu1}>
                </div>
                <div className={XiaoshuoCss.kuang}>
                    <Link to="/menu/xiaoshuo">
                        返回
                    </Link>
                    <div className={XiaoshuoCss.tk}>
                        <div>
                            <img src="/img/1.jfif"></img>
                        </div>

                        <div className={XiaoshuoCss.tk1}>
                            <h1>
                                <em>斗罗大陆</em>
                                <span>唐家三少</span>
                                <span>著</span>
                            </h1>
                            <p>
                                <span>完本</span>
                                <span>
                                    <Link to={{
                                        pathname: "/homepage/fenlei"
                                    }}>
                                        玄幻
                                        </Link>
                                </span>

                            </p>
                            <p>
                                <p>作品简介：</p>
                                唐门外门弟子唐三,因偷学内门绝学为唐门所不容,跳崖明志时却来到了另一个世界.一个属于武魂的世界---斗罗大陆...
                            </p>

                        </div>
                        <div className={XiaoshuoCss.tk2}>
                            <p>
                                <em>492.92</em>
                                <span>万字</span>
                                <i>|</i>
                                <em>811.63</em>
                                <span>万总推荐</span>
                            </p>
                            <Link to="/kan">
                                <Button type="primary">开始阅读</Button>
                            </Link>
                            <p>
                                <Link>
                                    <Button>加入书架</Button>
                                </Link>
                                <Button>力推此书</Button>
                            </p>
                        </div>
                    </div>
                    <div className={XiaoshuoCss.mulu}>
                        <div>
                            <h2>
                                目录·
                                <i>336章</i>
                            </h2>
                        </div>
                        <ul>
                            <li>
                                <Link to="/kan">第一章&nbsp;&nbsp;斗罗大陆,异界唐三</Link>
                            </li>
                            <li>
                                <Link to="/kan">第二章&nbsp;&nbsp;废武魂与先天满魂力</Link>
                            </li>
                            <li>
                                <Link to="/kan">第三章&nbsp;&nbsp;双生武魂</Link>
                            </li>
                            <li>
                                <Link to="/kan">第四章&nbsp;&nbsp;异界唐三的第一件暗器</Link>
                            </li>
                            <li>
                                <Link to="/kan">第五章&nbsp;&nbsp;大师?师傅?</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}