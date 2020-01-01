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
export default class Tuijianlist9 extends React.Component {
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
          name: '醉美花鸟岛攻略，漂洋过海来看你',
          zz: '大菊在路上',
          place: '嵊泗',
          poster: <img src="/img/44.jpg" />,
          address: '花鸟岛位于嵊泗列岛的最北面，其形如展翅欲飞的海鸥，岛上花草丛生，林壑秀美，故得名花鸟岛。由于岛上终年云雾缭绕，故又名雾岛。岛上最着名景观为远东第一大灯塔的花鸟灯塔。花鸟岛上的老虎洞、云雾洞、猿猴洞等亦是佳景之一，据说云雾洞可深达海底。花鸟岛自然繁花遍地，杜鹃、百合、水仙等名花随处可见。尤其到春季，山花烂熳，香气袭人。沿岛的岩缝中还出产贻贝与石斑鱼，是登山、野营、垂钓的理想去处。',
        },
        {
          key: '1',
          name: '趁，此身未老，我们去马尔代夫',
          zz: '阿音iris',
          place: '马尔代夫',
          poster: <img src="/img/45.jpg" />,
          address: '不知从什么时候，在心底种下了这颗种子，我向往着白色沙滩躺椅旁的橘子汽水，我期待着骑行在丛林的轻快节奏，我幻想着住在一个面朝大海的House，听潮起潮落，守望日出或等候日落，这些记忆是让生活过成诗的章节，它也注定会写在我的故事里，但在你到来的前一天里，我仍然可以独自上路，怀揣所有美好的期待，相信一切未知的美丽。',
        },
        {
          key: '2',
          name: '海鸥遍地的人间仙境—海驴岛',
          zz: '大鱼儿_silverdew',
          place: '海驴岛',
          poster: <img src="/img/46.jpg" />,
          address: '成山头、 神雕山野生动物自然保护区、海驴岛，这三个地方最终选择了海驴岛，成山头景色也不错，但是商业化太严重，所以放弃掉了，动物园带着小朋友比较合适，最后我们选择了海驴岛，当时商业化还不是很严重，这个岛确实不错，如果岛上有住宿的地方就更棒了，下次可以带着帐篷来试试。海面上仙气缭绕，看到那束白色仙气吗，仿佛有仙人从这里飞海而过，突然想到三生三世白浅去给东海贺寿的场景。',
        },
        {
          key: '3',
          name: '超全攻略带你玩转涠洲岛',
          zz: '诺亚方舟162',
          place: '广西',
          poster: <img src="/img/47.jpg" />,
          address: '去广西涠洲岛，提前要做的事就是必需要买到往返涠洲岛的船票，否则，计划不能实施。涠洲岛的住宿也是贵的离谱，每天从400元到1000多元不等，客栈环境和价格不能谈性价比了。总结：有时间的人不要在旺季的时候去任何景点打卡，不要因为有高速免费而入误区，其实高速路费并不贵，在淡季旅行，吃住行方面的综合费用要低得很多。',
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