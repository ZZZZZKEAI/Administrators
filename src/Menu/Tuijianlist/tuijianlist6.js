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
export default class Tuijianlist6 extends React.Component {
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
          name: '一路向西去大理,咔嚓一场慢时光',
          zz: '漫小蔓',
          place: '大理',
          poster: <img src="/img/32.jpg" />,
          address: '1、天气很干燥很干燥很干燥，记得疯狂带补水面膜和做好保湿工作；2、紫外线特别强特别强特别强，防晒霜还是喷雾都要带；3、大理冬天的天气早晚温差大，有太阳还好，没有太阳的时候降温特别恐怖，要注意保暖，厚衣服不能少！薄外套也可以带一件！4、大理的冬天正是“下关风”放肆的季节，记得带上口罩。',
        },
        {
          key: '1',
          name: ' 在秘密花园,领略意大利风情',
          zz: 'Candy__凯迪',
          place: '意大利',
          poster: <img src="/img/33.jpg" />,
          address: '延续过往游记风格，像意大利这样历史悠久的地方，干货历史多讲一点；像意大利南部这种攻略信息略少的地方，吃喝住行推荐一点；像世界上50个必去目的地这样美丽的地方，海量美图来一套。只需3天，从创世之初地壳抬升遗留的断崖蓝海出发在世界最顶级的海岸线自驾兜风，路过扎克伯格蜜月之地——阿玛尔菲',
        },
        {
          key: '2',
          name: '带着相机去旅行,圆一场青海梦',
          zz: '阿久的旅记',
          place: '青海',
          poster: <img src="/img/34.jpg" />,
          address: '相对于城市风光来说，我更偏爱于自然风光，比如我国的大西北。这是我上大学时就特别想去的地方，但一直到这两年才实现了这个愿望。第一次去大西北，是去年六月份，那时候的我刚辞掉工作，听说文艺青年失业后都要需要一趟旅行让自己静一静？不管怎样，那时候的我一个人在大西北呆了十天，那是一趟散心之旅，没有刻意拍很多照片。。',
        },
        {
          key: '3',
          name: '陪你去三亚,陪你去海角天涯',
          zz: 'HoneyandJoy',
          place: '三亚',
          poster: <img src="/img/35.jpg" />,
          address: '很多人旅拍是带着摄影师粗去旅行顺便拍粗美美的照片，但是这样不仅要支出摄影师拍摄的费用，还要有摄影师和化妆师的交通和住宿费用，有时甚至要负责预定所有随行人员的住宿与交通，想想真有点头大。因此我们选择了在三亚的本地旅拍摄影机构，既能拍到三亚碧海蓝天，也没有太多的额外费用，工作室还提供两晚的住宿，可以说是很省钱省心了。',
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
      origin: `小说 ${count}`,
      destination: 'xxx',
      fl: 'xx',
      poster: '<img src=""></img>',
      address: `小说简介 ${count}`,
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
              增加订单
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