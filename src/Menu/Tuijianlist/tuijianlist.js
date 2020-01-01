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
export default class Tuijianlist extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '旅行出发地',
        dataIndex: 'origin',
        width: '10%',
        editable: true,
      },
      {
        title: '旅行目的地',
        dataIndex: 'destination',
        editable: true,
        width: '10%',
      },
      {
        title: '旅行价格',
        dataIndex: 'price',
        editable: true,
        width: '10%',
      },
      {
        title: '目的地海报',
        dataIndex: 'poster',
        editable: true,
        width: '30%',
      },
      {
        title: '今日特惠简介',
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
          origin: '成都',
          destination: '哈尔滨',
          price: '2070起',
          poster: <img src="/img/8.jpg" />,
          address: '成都—哈尔滨,5天跟团游,网红款·0购物·1080元礼包+雪乡360°旅拍+亚布力滑雪：哈尔滨5日游',
        },
        {
          key: '1',
          origin: '成都',
          destination: '芽庄',
          price: '980起',
          poster: <img src="/img/9.jpg" />,
          address: '成都—芽庄,6天跟团游,芽庄+珍珠岛丨0自费，住珍珠岛上酒店，包含珍珠岛乐园，市区游，出海游，泥浆浴',
        },
        {
          key: '2',
          origin: '成都',
          destination: '普吉岛',
          price: '1380起',
          poster: <img src="/img/10.jpg" />,
          address: '成都—普吉岛,6天跟团游,直飞普吉岛，泰式精品泳池酒店，赠送人妖表演，浮潜，泰式按摩',
        },
        {
          key: '3',
          origin: '成都',
          destination: '俄罗斯',
          price: '3960起',
          poster: <img src="/img/11.jpg" />,
          address: '成都—俄罗斯,9天跟团游,免签直飞！俄罗斯双首都+金环谢镇+叶卡捷琳娜花园8日~精选酒店 ',
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
      origin: `特惠 ${count}`,
      destination: 'xxx',
      price: 'xx',
      poster: '<img src=""></img>',
      address: `今日特惠简介 ${count}`,
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
              增加旅程
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