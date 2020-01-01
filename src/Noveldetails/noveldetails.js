import React from 'react'
import { Link, BrowserRouter, Route } from 'react-router-dom'
import { Table, Input, Button, Popconfirm, Form } from 'antd';
var NoveldetailsCSS = require('./noveldetails.css')
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
              message: `${title} 不能为空`,
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
export default class Noveldetails extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '国内目的地',
        dataIndex: 'origin',
        width: '10%',
        editable: true,
      },
      {
        title: '门票所在地',
        dataIndex: 'destination',
        editable: true,
        width: '10%',
      },
      {
        title: '门票价格',
        dataIndex: 'price',
        editable: true,
        width: '10%',
      },
      {
        title: '景点图片',
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
        title: '特惠门票简介',
        dataIndex: 'address',
        editable: true,
        width: '35%',
      },
      {
        title: '功能',
        dataIndex: 'operation',
        width: '5%',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <div>
              <Link className={NoveldetailsCSS.yuedu} to="/xiaoshuojm">购买</Link>
              <Popconfirm title="确认通过?" onConfirm={() => this.handleDelete(record.key)}>
                <a href="javascript:;">通过</a>
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
          name: '',
          time: '',
          price: '',
          origin: '',
          destination: '',
          address: '',
        },
        {
          key: '0',
          name: '',
          time: '',
          price: '',
          origin: '',
          destination: '',
          address: '',
        },
        {
          key: '0',
          name: '',
          time: '',
          price: '',
          origin: '',
          destination: '',
          address: '',
        },
        {
          key: '0',
          name: '',
          time: '',
          price: '',
          origin: '',
          destination: '',
          address: '',
        },

      ],
    };
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
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
      <div className={NoveldetailsCSS.menu}>

        <div className={NoveldetailsCSS.addlist}>
          <div className={NoveldetailsCSS.list}>
            <Link to="/menu/xiaoshuo"><Button className={NoveldetailsCSS.B}>返回</Button></Link>
          </div>
          <div className={NoveldetailsCSS.add}>
            <Table
              components={components}
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={dataSource}
              columns={columns} />
          </div>
        </div>
      </div>

    )
  }
}