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
export default class Tuijianlist8 extends React.Component {
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
          name: '黄山、宏村、婺源——畅玩青黛白墙',
          zz: 'Lia-lia',
          place: '黄山',
          poster: <img src="/img/40.jpg" />,
          address: '之前就想过走黄山，宏村，婺源这条线，这次我只是大概看了一些攻略，提前预定了在黄山山下和山上的两晚住宿，之后定住宿和路线都是随性而为。这对于我这种行程控还是第一次，不过如果大家旺季出门，建议还是提前订好，防止影响行程。',
        },
        {
          key: '1',
          name: '12日畅玩希腊，你想看的这里都有',
          zz: 'lhlq1263',
          place: '希腊',
          poster: <img src="/img/41.jpg" />,
          address: '花了一些时间泡在咖啡馆，在穷游上看了一些图片，看到罗德岛的时候眼前一亮，觉得这里颠覆了我对希腊的印象，中世纪的城堡非常吸引人（虽然那时候我不知道中世纪是哪个年代）；而克里特是我认为必然有生活气息的地方。虽然不喜欢如同动物园一般的圣托里尼，但毕竟还是要去看一看。',
        },
        {
          key: '2',
          name: '魅力湘西，烟雨古城在凤凰',
          zz: '沐家菇娘',
          place: '湘西',
          poster: <img src="/img/42.jpg" />,
          address: '神秘湘西，天道眷顾，大自然的鬼斧神工酿造了如今的山水画卷，千百年的历史传承成就了如今的凤凰古城，那一场古朴典雅而又活色生香的梦境，回荡着苗家大鼓和土家摆手唱歌交织而成的华美乐章。',
        },
        {
          key: '3',
          name: '平遥古城全新游玩攻略，这一篇就够',
          zz: '以记忆关联',
          place: '平遥',
          poster: <img src="/img/43.jpg" />,
          address: '相传平遥古城墙始建于2700年前，现在的砖石城墙是明洪武三年扩建改造而成的。我们在来时的路上就一直在感叹城墙的魅力，透过车窗看到的城墙还是那么威严，甚是有的地方已经有些残缺了，近三千年的风雨洗礼，平遥古城墙依然能这么完整的呈现在现代人的面前，实属不易了，同时也感叹着那些建造城墙的工匠们的鬼斧神工。城墙是我认为来平遥古城一定不能错过的景点了，不仅仅是因为它厚重的历史感，还有它这多少年来都屹立不倒的勇气和建造的巧妙。',
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