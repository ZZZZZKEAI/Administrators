import React from 'react';
import { Link,  } from 'react-router-dom';
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
                            <img src="/img/48.jpg"></img>
                        </div>

                        <div className={XiaoshuoCss.tk1}>
                            <h1>
                                <em>黄鹤楼</em>
                                <span>武汉</span>
                            </h1>
                            <p>
                                <span>5A景区</span>
                                <span>
                                    <Link to={{
                                        pathname: "/homepage/fenlei"
                                    }}>
                                        4.9分
                                        </Link>
                                </span>

                            </p>
                            <p>
                                <p>名胜简介：</p>
                                黄鹤楼的形制自创建以来，各朝皆不相同，但都显得高古雄浑，极富个性。与岳阳楼、滕王阁相比，黄鹤楼的平面设计为四边套八边形，谓之“四面八方”。这些数字透露出古建筑文化中数目的象征和伦理表意功能。从楼的纵向看各层排檐与楼名直接有关，形如黄鹤，展翅欲飞。整座楼的雄浑之中又不失精巧，富于变化的韵味和美感。
                            </p>

                        </div>
                        <div className={XiaoshuoCss.tk2}>
                            <p>
                                <em>武汉市武昌区蛇山</em>
                                <i>|</i>
                                <em>44050条评论</em>
                            </p>
                            <Link to="/kan">
                                <Button type="primary">了解门票详情</Button>
                            </Link>
                            <p>
                                <Link>
                                    <Button>查看评论</Button>
                                </Link>
                                <Button>强力推荐</Button>
                            </p>
                        </div>
                    </div>
                    <div className={XiaoshuoCss.mulu}>
                        <div>
                            <h2>
                                旅游地点
                            </h2>
                        </div>
                        <ul>
                            <li>
                                <Link to="/kan">武汉&nbsp;&nbsp;厦门  三亚  青岛</Link>
                            </li>
                            <li>
                                <Link to="/kan">北京&nbsp;&nbsp;深圳  厦门  苏州</Link>
                            </li>
                            <li>
                                <Link to="/kan">上海&nbsp;&nbsp;重庆  杭州  丽江</Link>
                            </li>
                            <li>
                                <Link to="/kan">成都&nbsp;&nbsp;南京  大连  昆明</Link>
                            </li>
                            <li>
                                <Link to="/kan">广州&nbsp;&nbsp;天津  桂林  张家界</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}