import React, { Component } from 'react';
import {Form, Icon, Avatar,Input, Button,Pagination, Checkbox,Select,Row,Col ,Switch,Modal,Layout,Card,Tree,} from 'antd';
import {Link} from 'react-router-dom'
import './Creatcourse/creatcourse.css'
import $ from 'jquery';
import PropTypes from "prop-types"
import { connect } from 'react-redux';
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/tree';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

const { TextArea } = Input;
const data= {
    "children": [
        {
            "children": [],
            "name": "一级目录",
        },
    ],
    "name": "课件总目录"
  }
const Option = Select.Option;
const {  Content, Sider,Header, } = Layout;
const TreeNode = Tree.TreeNode;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  class Updatecourse extends Component {
    static contextTypes={
      router:PropTypes.object
    }
    constructor(props, context) {
        super(props, context)
        this.state = {
          arrSize: 0,
          collapsed: false,//控制sider折叠
          isOpen:"0",
          visible: true, //控制弹出框的呈现与隐藏
          coursecatalog:[],//课件目录
          knowledges:[],
          coursedata:{},//课件信息
        }
        this.arr = [this.generateROW()]
      }
      // 传入课件名称
      Inputcoursename(e){
        this.setState({
          courseName: e.target.value,
        });
      }
      //年级科目
      Inputgrade(value){
        this.setState({
          grade:value,
        });
      }
      Inputsubject(value){
        this.setState({
          subject:value,
        });
      }
      //传入课件描述
      Inputdescript(e){
        this.setState({
          descript: e.target.value,
        });
      }
      //传入是否公开
      Inputisopen(value){
        console.log(value);
        if(value==true){
        this.setState({
          isOpen:"1",
        });}
        else{
          this.setState({
            isOpen:"0",
          });
        }
      }
      //侧栏知识点弹出框事件
      toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      }
      //树状知识点点击事件
      onSelect = (value) => {
        console.log(value);
        const knowledges1=this.state.knowledges; 
        knowledges1.push(value) ;
        console.log(knowledges1);
        this.setState({
          knowledges:knowledges1
        });
      }
      onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
      }
      handlePlus() {
        if (this.state.arrSize < 7) {
          this.arr.push(this.generateROW())
          this.setState({ 
              arrSize: this.state.arrSize + 1 ,
              coursecatalog:[],

        })
        } else {
          Modal.warning({
            title: '注意：',
            content: '最多8个目录！',
          });
        }
      }
    
      handleMinus() {
        if (this.state.arrSize > 0) {
          this.arr.pop()
          this.setState({ 
              arrSize: this.state.arrSize - 1 ,
              coursecatalog:[],
        })
        } else {
          Modal.warning({
            title: '注意：',
            content: '最少1个目录！',
          });
        }
      }
      generateROW() {
        return (
          <div>
              <Input placeholder="课件目录名称"  style={{ width: 300 }}/>
          </div>
        )
      }
      creatcourse = () =>{
        const { user_info }=this.props;
        //创建课件
        console.log("进入ajax")
        console.log(JSON.stringify(this.state.coursecatalog))
        $.ajax({
            url: "http://localhost:3000/api/createCourse",
            type: "POST",
            dataType: "json",
            data:{
              // "user_id":2,
              "user_id":user_info.user_id,
              "courseName":this.state.courseName,
              "grade": this.state.grade,
              "subject": this.state.subject,
              "descript":  this.state.descript,
              "knowledges":JSON.stringify(this.state.knowledges),
              "isOpen": this.state.isOpen,
              "isEdit": 1,
              "name": "课件目录",
              "children":this.state.coursecatalog,
            //   "children": [{
            //     "children": [],
            //     "name": "数学知识点1"
            // }],
        
              "templateId": 1,
              "slide": [{
                  "pageId": 1,
                  "pageThumbnail": {
                      "pageurl": "./1.png",
                      "style": {
                          "pagewidth": "100px",
                          "pageheight": "100px"
                      }
                  },
                  "media":[
                      {
                          "id":2314,
                          "position":[0,0],
                          "rotation":0,
                          "scale":[1,1],
                          "shape":{"cx":100,"cy":100,"n":30,"z":40},
                          "style":{"fill":"none"},
                          "type":"house"
                      }
                  ]
              }],     
              "fileSize": "100M",
              "scope": "k12教育",
              "addTime": 20190124,
              "views": 300,
              "url": "D:/Graduate/11.jpg",
              "width": "30px",
              "height": "40px"
          },
            success: function (data) {
                if (data.errorCode == 0) {
                    console.log('成功保存课件');
                    console.log(data.msg);
                    console.log(data.msg._id);
                    Modal.success({
                      title: '消息提示',
                      content: '成功创建课件！',
                    });
                    console.log(JSON.stringify(this.state.coursecatalog));
                    this.context.router.history.push("/APP");
                }
                else {
                    console.log('成功获取搜索资源');
                    // this.setState({ resource: data.msg });
                    console.log(data.msg);
                }
            }.bind(this),
            error: function (xhr, status, err) {
            }.bind(this)
        });
    }
    getdata() {
        const { login_info }=this.props;
        var a="5c6f67e482fe1b11f077042f";
        var data = {
            "_id" :a.toString(),
        };
        console.log('进入researchByCourseId接口');
        console.log(JSON.stringify(data));
        $.ajax({
          url: "http://localhost:3000/api/researchByCourseId",
          async:false,
          type: "GET",
          contentType:"application/json;charset=UTF-8",
          dataType: "json",
          data:data,
          beforeSend:function(request){
            request.setRequestHeader("Authorization",'Bearer '+login_info.access_token);
          },
          success: function(data) {
            if (data.errorCode == 0) {
              console.log('获取查询权限111');
              console.log(data);
              this.setState({
                coursedata:data.msg[0],
                arrSize: data.msg[0].catalog.children.length,
                isOpen:data.msg[0].isOpen,
                coursecatalog:data.msg[0].catalog.children,
              });
            }
            else {   
              console.log('获取查询权限2222');
               
            }
          }.bind(this),
          error: function (xhr, status, err) {
          }.bind(this)
        });
      }
      componentWillMount(){
        this.getdata();
      }
     componentDidMount() {
        console.log("课件展示区")
        console.log(JSON.stringify(this.state.coursecatalog))
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        // myChart.showLoading();    //显示Loading标志； var myChart = echarts.init(document.getElementById('页面中div的id')); 
// $.get('./data.json', function (data) {
    // myChart.hideLoading();    //得到数据后隐藏Loading标志
 
    echarts.util.each(data.children, function (datum, index) {
        index % 2 === 0 && (datum.collapsed = true);
    });    //间隔展开子数据，animate，display，physics，scale，vis是展开的
 
    myChart.setOption({
        tooltip: {    //提示框组件
            trigger: 'item',    //触发类型，默认：item（数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用）。可选：'axis'：坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。'none':什么都不触发。
            triggerOn: 'mousemove'    //提示框触发的条件，默认mousemove|click（鼠标点击和移动时触发）。可选mousemove：鼠标移动时，click：鼠标点击时，none：        
        },
        series: [    //系列列表
            {
                type: 'tree',    //树形结构
                data: [{
                  "children": this.state.coursecatalog,
                //   "children": [{
                //     "children": [],
                //     "name": "数学知识点1"
                //  }],
                  "name": "课件总目录"
                }],    //上面从flare.json中得到的数据
 
                top: '1%',       //距离上
                left: '15%',      //左
                bottom: '1%',    //下
                right: '20%',    //右的距离
 
                symbolSize: 7,   //标记的大小，就是那个小圆圈，默认7
 
                label: {         //每个节点所对应的标签的样式
                    normal: {
                        position: 'left',       //标签的位置
                        verticalAlign: 'middle',//文字垂直对齐方式，默认自动。可选：top，middle，bottom
                        align: 'right',         //文字水平对齐方式，默认自动。可选：top，center，bottom
                        fontSize: 9             //标签文字大小
                    }
                },
 
                leaves: {    //叶子节点的特殊配置，如上面的树图示例中，叶子节点和非叶子节点的标签位置不同
                    label: {
                        normal: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    }
                },
 
                expandAndCollapse: true,    //子树折叠和展开的交互，默认打开
                animationDuration: 550,     //初始动画的时长，支持回调函数,默认1000
                animationDurationUpdate: 750//数据更新动画的时长，默认300
            }
        ]
      });
// });
    }
    render() {
        const sidecontent=(
            <div>
                <div borderd={false} title="选择知识点" style={{ margin: '16px 16px 16px 16px'}}>
                      <Tree showLine defaultExpandedKeys={['一次方程概念', '一次方程应用']} onSelect={this.onSelect}>
                        <TreeNode title="一次方程" key="一次方程">
                          <TreeNode title="一次方程概念" key="一次方程概念" />
                          <TreeNode title="一次方程特点" key="一次方程特点" />
                          <TreeNode title="一次方程应用" key="一次方程应用">
                            <TreeNode title="应用实例" key="应用实例" />
                          </TreeNode>
                        </TreeNode>
                        <TreeNode title="二次方程" key="二次方程">
                          <TreeNode title="二次方程概念" key="二次方程概念" />
                          <TreeNode title="二次方程特点" key="二次方程特点" />
                          <TreeNode title="二次方程应用" key="二次方程应用">
                            <TreeNode title="应用实例" key="应用实例" />
                          </TreeNode>
                        </TreeNode>
                        <TreeNode title="二次函数" key="二次函数" />
                        <TreeNode title="分数" key="分数" />
                        <TreeNode title="比值" key="比值" />
                      </Tree>
                    </div>
            </div>
        );
     
      return (
        <Layout style={{ backgroundColor: '#fff',height:'100%',width:'100%' }}> 
        <Sider 
        width={250}
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
        collapsedWidth={0}
       
        className="Sider"
        style={{width: '100%', height: '700px'}}
        >
         {sidecontent}
        </Sider>
         <div className='flowbar' style={{right:30,top:20}}>
        <Link to='/User'><Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} size="large" >U</Avatar></Link>
        <span style={{padding:10,fontSize:15}}>当前用户</span>
        </div>
         
       
     
        {/* </Header> */} 
      <Card  style={{height:'100%',width:'100%'}}>
         
        <div>
         <Row gutter={16}>
         <Col span={9}>
        <div style={{ color: 'green', fontSize:'20px',margin:'20px 0px 30px 0px' }} >修改课件</div>
         
        <Form style={{margin:'20px 0px 0px 0px'}}>
          <Form.Item label="课件名称" {...formItemLayout}>
            <Input value={this.state.coursedata.courseName} onChange={this.Inputcoursename.bind(this)} style={{ width: 300 }}/>
          </Form.Item>
          <Form.Item label="年级科目" {...formItemLayout}>
          <Row gutter={16}>
          <Col span={12}>
          <Select onChange={this.Inputgrade.bind(this)} style={{width:'100%'}} value={this.state.coursedata.grade}>
                    <Option value="小学">小学</Option>
                    <Option value="初中"> 初中</Option>
                    <Option value="高中">高中</Option>
          </Select> 
          </Col> 
          <Col span={12}>
           <Select onChange={this.Inputsubject.bind(this)} style={{width:'100%'}} value={this.state.coursedata.subject}>
                    <Option value="语文">语文</Option>
                    <Option value="数学">数学</Option>
                    <Option value="英语">英语</Option>
                    <Option value="物理">物理</Option>
                    <Option value="化学">化学</Option>
                    <Option value="生物">生物</Option>
                    <Option value="政治">政治</Option>
                    <Option value="历史">历史</Option>
                    <Option value="地理">地理</Option>
            </Select> 
            </Col> 
            </Row>                 
          </Form.Item>
          <Form.Item label="课件简介" {...formItemLayout}>
           <TextArea onChange={this.Inputdescript.bind(this)} style={{ minHeight: 32 ,minWidth: 300}} value={this.state.coursedata.descript} rows={4} />
          </Form.Item>

          <Form.Item label="知识点" {...formItemLayout}>
          <Row gutter={16}>
          <Col span={20}>
             <TextArea placeholder={this.state.coursedata.knowledges} value={this.state.knowledges} style={{ width:'100%'}} rows={4}/>
          </Col> 
           <Col span={4}>
              <Button onClick={this.toggle}>选择知识点</Button>
            </Col> 
            </Row>                 
          </Form.Item>
          <Form.Item label="公开/私密" {...formItemLayout}>
          <Row gutter={8}>
          <Col span={10}>
             <Switch onChange={this.Inputisopen.bind(this)} checkedChildren="公开" unCheckedChildren="私密" defaultChecked={this.state.coursedata.isOpen}/>
          </Col> 
          </Row>
          </Form.Item>
          <Form.Item label="课件目录" {...formItemLayout}>
          <Row gutter={16}>
           <Col span={12}>
            <Button type="dashed" style={{ width: '100%' }} onClick={this.handlePlus.bind(this)}><Icon type="plus" />添加</Button>
            </Col>
            <Col span={12}>
            <Button type="dashed" style={{ width:'100%' }} onClick={this.handleMinus.bind(this)}><Icon type="minus" />删除</Button>
            </Col>
            </Row>
          </Form.Item>
          <Form.Item label="目录名称" {...formItemLayout}>
          <Row key={this.state.arrSize}>
                <Col span={8}>
                  {
                    this.arr.map((v, i) => {
                      return (
                        <Row gutter={8} key={i}>
                           <Col span={10}>
                          <Input onPressEnter={(e)=>{
                                const coursecatalog1 = {}; 
                                coursecatalog1['children'] =[];   
                                coursecatalog1['name'] = e.target.value; 
                                this.state.coursecatalog.push(coursecatalog1);
                                this.CourseAppear();  
                            }} 
                            placeholder={v}  style={{ width: 300 }}/>
                           </Col>
                        </Row>
                      )
                    })
                  }
                </Col>
            </Row>
            </Form.Item>
        </Form>
           <Row>
             <Button type="primary" onClick={this.getdata} style={{margin:'0px 0px 0px 100px'}}>确认修改</Button>
           </Row>
            </Col>
            <Col span={15}>
              <Card style={{margin:'80px 0px 30px 80px',width:550 }} title="课件目录大纲">
               <div id="main" style={{ width: 500, height: 500 }}></div>
              </Card>
            </Col>
          </Row>
        </div>
      </Card>
      </Layout>
      );
    }
  }
  const Updatecourse_Index=Form.create()(Updatecourse);
  function  mapStateToProps(state) {
    return{
       login_info:state.reducer_login.login_info,
       user_info:state.reducer_user.user_info,
    };
  }
  function mapDispatchToProps(dispatch){
    return{

    };
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Updatecourse_Index);
