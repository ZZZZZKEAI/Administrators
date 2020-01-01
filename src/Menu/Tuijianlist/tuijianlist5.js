import React from 'react'
import { Link, BrowserRouter, Route } from 'react-router-dom'
import { Table, Input, Button, Popconfirm, Form } from 'antd';
var TuijianlistCss = require('./tuijianlist.css')
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
          onClick={this.toggleEdit}
        >
          {children}
        </div>
      );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
            children
          )}
      </td>
    );
  }
}
export default class Tuijianlist5 extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '游记名称',
        dataIndex: 'name',
        width: '10%',
        editable: true,
      },
      {
        title: '游记作者',
        dataIndex: 'zz',
        editable: true,
        width: '10%',
      },
      {
        title: '地点',
        dataIndex: 'place',
        editable: true,
        width: '10%',
      },
      {
        title: '游记封面',
        dataIndex: 'poster',
        editable: true,
        width: '30%',
      },
      {
        title: '简介',
        dataIndex: 'address',
        editable: true,
        width: '35%',
      },
      {
        title: '功能',
        dataIndex: 'operation',
        width: '10%',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <div>
              <Link className={TuijianlistCss.yuedu}></Link>
              <Popconfirm title="确定增加?" onConfirm={() => this.handleDelete(record.key)}>
              <a href="javascript:;">增加</a>
            </Popconfirm>
            <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.key)}>
              <a href="javascript:;">删除</a>
            </Popconfirm>
            </div>
          ) : null,
      },
    ];

    this.state = {
      dataSource: [
        {
          key: '0',
          name: '呼伦贝尔亲子游，原来你也可以很温情',
          zz: '郭文文530',
          place: '呼伦贝尔',
          poster: <img src="/img/28.jpg" />,
          address: '之前也有过草原游的经历，曾在新婚燕尔的时候与河马先生自驾坝上草原，却差点迷失在草原深处不知所处，也曾陪着叮当参加草原夏令营，大巴上的 鄂尔多斯 草原却少了些许自由与随性的气质。所以这次， 呼伦贝尔 ，我们选择了在当地包车，选一个靠谱的老司机，既熟知地形不会把我们丢了，也可以在疯狂飞奔的路上随意叫停，任性的踏遍草原的每一寸土地，大概，这也才是草原最正确的打开方式吧~',
        },
        {
          key: '1',
          name: '瓯江古埠传渔歌，丽水源头藏画乡',
          zz: 'JOJO带你游世界',
          place: '丽水',
          poster: <img src="/img/29.jpg" />,
          address: '瓯江上有渔歌，樟树下有桃花酒，住在有江风的小木楼，看一行白鹭，载来了我的乡愁。我大约是在五岁的时候离开老家的，我记得那里有条河，河边有颗茂密得连太阳都照不进来的大树，我是如此的喜欢这里，那份浓郁得化不开的思乡之情在心里激荡着，我要带着儿子在这里住下，看着那画家的笔，诗人的歌在这瓯江之上能奏出怎样的激荡。',
        },
        {
          key: '2',
          name: ' 不负嵊夏好时光，泗乎太安逸',
          zz: 'jinliuwendy',
          place: '嵊泗',
          poster: <img src="/img/30.jpg" />,
          address: '世界上最远的距离就是，你知道嵊泗近在咫尺，却7年不曾踏上这颗 东海 遗珠。来上海这么多年，突然被发达的国际航线，得天独厚的优越出行条件蒙蔽了双眼，一有闲暇之余都想到出境游，东南亚小城，海岛，甚至欧洲成了度假首选，难得假期还是想走远一点。其实在我心中一直藏着这样一个地方：周边，度假，海滩……但由于种种原因并未成行，那就是嵊泗。',
        },
        {
          key: '3',
          name: '厦门,带娃出行与幸福同行',
          zz: '凯叔',
          place: '厦门',
          poster: <img src="/img/31.jpg" />,
          address: '其实很多时候，我们带江宝出游，并没有具体的行程规划，更没有非去不可的景点，有美景有美食有沙滩的城市或海岛，是我们的亲子游出游首选，厦门就是一个符合亲子游的所有条件的地方。在这里，我们可以白天去一去景点，如果孩子累了就回客栈睡个午觉，然后下午找个沙滩玩玩沙子，吹吹海风，没必要为了打卡和时间赛跑，每天都身心舒畅最重要。',
        },
      ],
      count: 3,
    };
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `旅行攻略 ${count}`,
      zz: 'xxx',
      place: 'xx',
      poster: '<img src=""></img>',
      address: `简介 ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div className={TuijianlistCss.menu}>
        <div className={TuijianlistCss.addlist}>
          <div className={TuijianlistCss.button}>
            <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
              增加旅行攻略
            </Button>
          </div>
          <div className={TuijianlistCss.add}>
            <Table
              components={components}
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={dataSource}
              columns={columns} />
          </div></div>
      </div>

    )
  }
}