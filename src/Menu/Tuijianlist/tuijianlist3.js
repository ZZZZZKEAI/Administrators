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
export default class Tuijianlist3 extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '出发地',
        dataIndex: 'origin',
        width: '10%',
        editable: true,
      },
      {
        title: '目的地',
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
        title: '当季热门度假图片',
        dataIndex: 'poster',
        editable: true,
        width: '30%',
      },
      {
        title: '行程时长',
        dataIndex: 'time',
        editable: true,
        width: '10%',
      },
      {
        title: '当季热门度假简介',
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
          origin: '四川成都',
          destination: '成都-曼谷',
          price: '1880起',
          poster: <img src="/img/20.jpg" />,
          time:'6天自由行',
          address: '【自由行】往返机票丨成都直飞曼谷往返特价包机机票（包含机建燃油税）',
        },
        {
          key: '1',
          origin: '四川成都',
          destination: '成都-清迈',
          price: '2299起',
          poster: <img src="/img/21.jpg" />,
          time:'6天自由行',
          address: '【自由行】清迈|直飞白班机|机+酒自由行5～6天|入住高端品质酒店|赠送接送机+保险',
        },
        {
          key: '2',
          origin: '四川成都',
          destination: '成都-缅甸',
          price: '2290起',
          poster: <img src="/img/22.jpg" />,
          time:'6天跟团游',
          address: '【跟团游】王牌金三国！0自费！直飞清莱探秘神秘金三角级~老挝~缅甸~泰国！升五星级酒店',
        },
        {
          key: '3',
          origin: '四川成都',
          destination: '成都-三亚',
          price: '3480起',
          poster: <img src="/img/23.jpg" />,
          time:'5天自由行',
          address: '【自由行】亲子🔥家庭定制/出海：亚特兰蒂斯+三亚湾红树林，水世界/水族馆/旅拍/接机',
        },
      ],
      count: 5,
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
      time: 'xx',
      address: `当季热门度假简介 ${count}`,
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
              增加当季热门度假
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