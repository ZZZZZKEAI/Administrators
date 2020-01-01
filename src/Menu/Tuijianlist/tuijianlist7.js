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
export default class Tuijianlist7 extends React.Component {
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
          name: '在建水蒙自沙溪邂逅诗和远方',
          zz: 'dinhoidinh',
          place: '建水',
          poster: <img src="/img/36.jpg" />,
          address: '建水——因为一块小豆腐被圈粉的古镇;诺邓——一个建在山上的小村，寂静，原始，却不会觉得无法融入;沙溪——一开始给了我一个下马威，但是却是最不舍离开的地方;大理——再去看一眼那洱海，那云雾缭绕的苍山;香格里拉——涅槃的独克宗还是我认识的那个独克宗吗？去布宫之前再去看一眼松赞林寺吧',
        },
        {
          key: '1',
          name: '唯美桂林,文艺范旅行札记',
          zz: '马玛丽',
          place: '桂林',
          poster: <img src="/img/37.jpg" />,
          address: '这一次的目的是是桂林！一座城让人爱还是恨，取决于你如何支配在这里的生活。而生活让人爱还是恨，则取决于你对它摆出何种姿态。桂林美旅，不跟风也不跟团，只为寻找优美的高于生活的“理想生活”。15个新拍照圣地只为逃离人群，我的旅行，可以平凡，但绝不甘于平庸。',
        },
        {
          key: '2',
          name: '叮咚!釜山小众旅行功略待签收',
          zz: '郭文文530',
          place: '釜山',
          poster: <img src="/img/38.jpg" />,
          address: '见识过首尔国际大都市的繁华，也感受过济州岛自然风光的魅力，殊不知，釜山，却是那样一个低调又内敛的存在,作为韩国的第二大城市，它不缺少现代化的都市气息，却又在一个又一个的文化村中，固执的坚守着韩国人骨子里的那份文艺情怀,滨海的地理位置，让它拥有一片广阔的海域。',
        },
        {
          key: '3',
          name: '别样厦门之小清新遇见人间烟火气',
          zz: '我就是十三呀',
          place: '厦门',
          poster: <img src="/img/39.jpg" />,
          address: '萌生编辑美食攻略想法就是来源于这段话，本身算是吃货一枚，热衷于走街串巷寻找好吃的小馆子，似乎在剧里看到了一点点自己的影子。独自生活的孤独，社会规矩的束缚，经济压力，被客户刁难，丢业务等等让人丧气的事情。都在香喷喷的美食中得到了抚慰。',
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
      name: `小说 ${count}`,
      zz: 'xxx',
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
              删除订单
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