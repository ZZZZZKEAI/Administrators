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
export default class Tuijianlist1 extends React.Component {
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
          origin: '北京',
          destination: '八达岭长城',
          price: '58起',
          poster: <img src="/img/12.jpg" />,
          time:'06:59-14:30',
          address: '【长城专线】7-10-12点晚出发懒北京八达岭长城+直通车',
        },
        {
          key: '1',
          origin: '北京',
          destination: '圆明园',
          price: '56起',
          poster: <img src="/img/13.jpg" />,
          time:'取票时间:上午09:30;下午13:30',
          address: '圆明园门票+大水法遗址+资深导游讲解服务*成人票',
        },
        {
          key: '2',
          origin: '北京',
          destination: '故宫',
          price: '69起',
          poster: <img src="/img/14.jpg" />,
          time:'入园时间：上午8:30~11:00；下午13:30',
          address: '北京故宫大门票+资深导游讲解（配无线耳麦） *成人票',
        },
        {
          key: '3',
          origin: '北京',
          destination: '颐和园',
          price: '55起',
          poster: <img src="/img/15.jpg" />,
          time:'06:39-14:30',
          address: '限时特惠|7-10-12点八达岭长城丨颐和园丨十三陵丨自助餐',
        },
      ],
      count: 6,
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
      address: `特惠门票简介 ${count}`,
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
              增加特惠门票
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