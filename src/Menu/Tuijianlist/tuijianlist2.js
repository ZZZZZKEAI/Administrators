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
export default class Tuijianlist2 extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '一日游出发地',
        dataIndex: 'origin',
        width: '10%',
        editable: true,
      },
      {
        title: '一日游',
        dataIndex: 'destination',
        editable: true,
        width: '10%',
      },
      {
        title: '一日游价格',
        dataIndex: 'price',
        editable: true,
        width: '10%',
      },
      {
        title: '特惠一日游精选图片',
        dataIndex: 'poster',
        editable: true,
        width: '30%',
      },
      {
        title: '行程时间',
        dataIndex: 'time',
        editable: true,
        width: '10%',
      },
      {
        title: '特惠一日游简介',
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
          destination: '成都出发一日游',
          price: '229起',
          poster: <img src="/img/16.jpg" />,
          time:'08:00-20:00',
          address: '熊猫基地+都江堰1日游（赠皮影戏+老字号川菜+可选正宗川剧）',
        },
        {
          key: '1',
          origin: '成都',
          destination: '成都出发一日游',
          price: '198起',
          poster: <img src="/img/17.jpg" />,
          time:'07:00-17:00',
          address: '青城山+都江堰一日游【变脸秀+耳麦+可选头等舱+真纯玩】',
        },
        {
          key: '2',
          origin: '成都',
          destination: '成都出发一日游',
          price: '198起',
          poster: <img src="/img/18.jpg" />,
          time:'06:00-21:30',
          address: '真纯玩毕棚沟一日游（含门票三环接+可选头等舱座椅+雪山海子）',
        },
        {
          key: '3',
          origin: '成都',
          destination: '成都出发一日游',
          price: '20起',
          poster: <img src="/img/19.jpg" />,
          time:'08:00-11:00',
          address: '熊猫基地直通车（可选门票·电子票·多出发时间）',
        },
      ],
      count: 4,
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
      address: `特惠一日游简介 ${count}`,
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
              增加特惠一日游
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