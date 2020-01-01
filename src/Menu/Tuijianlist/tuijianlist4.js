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
export default class Tuijianlist4 extends React.Component {
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
        title: '开放时间',
        dataIndex: 'time',
        editable: true,
        width: '10%',
      },
      {
        title: '景点简介',
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
          origin: '四川省',
          destination: '峨眉山',
          price: '155起',
          poster: <img src="/img/24.jpg" />,
          time:'06:00-18:00',
          address: '峨眉山位于中国四川峨眉山市境内，景区面积154平方公里3099米，是著名的旅游胜地和佛教名山。1996年12月6日被列入《世界遗产名录》。峨眉山平畴突起，巍峨、秀丽、古老、神奇。它以优美的自然风光、悠久的佛教文化、丰富的动植物资源、独特的地质地貌而著称于世。被人们称为“仙山佛国”、“植物王国”、“动物乐园”、“地质博物馆”等，素有“峨眉天下秀”之美誉。',
        },
        {
          key: '1',
          origin: '四川省',
          destination: '乐山大佛',
          price: '80起',
          poster: <img src="/img/25.jpg" />,
          time:'旺季4月1日-10月7日7:30-18:30；淡季10月8日-次年3月31日8:00-17:30',
          address: '乐山大佛——山是一尊佛，参拜，庄严雄伟；佛是一座山，仰视，气势崴嵬在风景壮丽的四川乐山，在大渡河、青衣江、岷江的合流处，端然正坐着一座高达七十多米的佛像，还高二十多米。景区包括乐山大佛、灵宝塔、凌云禅院、海师洞、九曲—凌云栈道、巨型睡佛等。据记载，乐山大佛开凿的发起人是海通和尚。',
        },
        {
          key: '2',
          origin: '四川省',
          destination: '青城山',
          price: '40起',
          poster: <img src="/img/26.jpg" />,
          time:'夏季开放时间8:00-17:30；冬季开放时间8:30-17:00',
          address: '青城山位于四川省都江堰市西南、成都平原西北部，距都江堰市区16公里。古称丈人山，为邛崃山脉的分支。青城山靠岷山雪岭，面向川西平原，与剑门之险、峨眉之秀、夔门之雄齐名。古人记述中，青城山有“三十六峰”“八大洞”“七十二小洞”“一百八景”之说。青城山分前、后山。',
        },
        {
          key: '3',
          origin: '四川省',
          destination: '九寨沟',
          price: '268起',
          poster: <img src="/img/27.jpg" />,
          time:'04-01～11-15：08:30～17:00开放；11-16～03-31：08:30～17:00开放',
          address: '九寨沟位于四川省西北部岷山山脉南段的阿坝藏族羌族自治州九寨沟县漳扎镇境内，地理坐标东经100·30·-104·27·，北纬30·35·-34·19·。系长江水系嘉陵江上游白水江源头的一条大支沟，流域面积651.34km，因沟内有树正、荷叶、则查洼等九个藏族村寨而得名。九寨沟年均气温6-14℃度，冬无严寒，夏季凉爽，四季景色各异：仲春树绿花艳，盛夏幽湖翠山，金秋尽染山林，隆冬冰塑自然。以翠湖、叠瀑、彩林、雪峰、藏情、蓝冰“六绝”著称于世。',
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
      address: `当季景点门票简介 ${count}`,
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
              增加当季景点门票
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