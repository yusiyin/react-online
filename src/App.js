import React, { Component } from 'react';
import { Layout, Menu,Select, Row,Col,Input,Button,Drawer,Avatar, Badge,Icon,Dropdown,Popover,Modal, Card} from 'antd';
import './App.css';
import {Link} from 'react-router-dom';

import Bodysider from './components/Resource/sider';
import DrawView from './components/ZoomPic/drawerview';

import EditorWithBar from './components/Editor/EditorWithBar';

var MyDeck = [[{
  "id":2312,
  "type":"isogon",
  "position":[700,500],
  "rotation":[0,0],
  "scale":[1,1],
  "shape":{
      "n":3,
      "r":50,
      "x":100,
      "y":100
  },
  "style":{

  }
},
{
  "id":2313,
  "type":"isogon",
  "position":[300,500],
  "rotation":[0,0],
  "scale":[1,1],
  "shape":{
      "n":3,
      "r":50,
      "x":100,
      "y":100
  },
  "style":{

  }
}],[{
  "id":2314,
  "type":"rect",
  "position":[400,700],
  "rotation":[0,0],
  "scale":[1,1],
  "shape":{
      "height":50,
      "r":0,
      "width":50,
      "x":100,
      "y":100  //如果没有初始化值会被0覆盖，问题在于判断函数，待修改
  },
  "style":{

  }
},
{
  "id":2315,
  "type":"house",
  "position":[300,100],
  "rotation":[0,0],
  "scale":[1,1],
  "shape":{
      "n":3,
      "r":40,
      "r0":20,
      "cx":100,
      "cy":100
  },
  "style":{
      "fill":"none",
      "stroke":"green"
  }
}]];

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_981127_oee7kc1cksg.js',
});
const IconAvator = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1009791_ev29rcbfmfr.js',
});

const {  Content, Sider } = Layout;
const Option = Select.Option;
function handleChange(value) {
  console.log(`selected ${value}`);
}

const content=(
  <div style={{ width: 500 }}>
  <Card >
  <div className="left">
     <p style={{fontSize:'25px'}} >
        <IconAvator type="icon-touxiangnvhai"/>
        <Input placeholder="这个协同web真棒！"  style={{ width: 200 }}/>
     </p> 
  </div>
  <div className="right">
     <p style={{fontSize:'25px'}} >
        <Input placeholder="我也觉得"  style={{ width: 200 }}/>
        <IconAvator type="icon-icon-test3"/>
     </p> 
  </div>
  <div className="left">
     <p style={{fontSize:'25px'}} >
        <IconAvator type="icon-icon-test2"/>
        <Input placeholder="js继承大家听懂了吗？" style={{ width: 200 }}/>
     </p> 
  </div>
  <div className="left">
     <p style={{fontSize:'25px'}} >
        <IconAvator type="icon-icon-test1"/>
        <Input placeholder="只知道prototype这个属性很重要"  style={{ width: 300 }}/>
     </p> 
  </div>
  <div className="right">
     <p style={{fontSize:'25px'}} >
        <Input placeholder="哈哈哈！"  style={{ width: 200 }}/>
        <IconAvator type="icon-icon-test"/>
     </p> 
  </div>
  <div className="right">
    <Input placeholder="发送消息"  style={{ width: 300 }}/>
     <Button type="primary">发送</Button>
  </div>  
  </Card>
  </div>
);
const text =
  <div>
  <Link to='/Account'><Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} size="large" >Tom</Avatar>
  </Link><span>当前用户</span>
  <Popover placement="bottomRight" content={content} trigger="click">
      <Button style={{margin:"0px 0px 0px 4px"}}type="primary" size="small" ghost>交流</Button>
  </Popover>
  </div>;
const menu = (
  <Menu>
    <Menu.Item key="0">
      <div>
       <Icon type="smile" theme="twoTone" twoToneColor="#eb2f96" />
        梁静茹
      </div>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1" >
      <div>
       <Icon type="meh" theme="twoTone" twoToneColor="#52c41a"/>
        王菲
      </div>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2">
      <div>
       <Icon type="frown" theme="twoTone"/>
        程奕迅
      </div>
    </Menu.Item>
  </Menu>
);
const ContentModal = (
 <div>
      <Row style={{margin: '8px 8px 8px 16px'}}> 
        <a style={{float:"left"}}>加入</a>
        <Button style={{float:"right"}} type="primary" ghost>JLFABSKA</Button>
      </Row>
      <Row style={{margin: '8px 8px 8px 16px'}}> 
        <a style={{float:"left"}}>https://ant.design/components/icon-cn/</a>
        <Button style={{float:"right"}} type="primary" >分享</Button>
      </Row>
    <Row style={{margin: '8px 8px 8px 16px'}}>
    <Menu.Divider />
    </Row>
    <Row style={{margin: '8px 8px 8px 16px'}}>
    
     <Select defaultValue="1" onChange={handleChange} style={{width:'100%'}}>
      
       <Option value="1"><IconFont type="anticon-piliangbianji" />允许任何人进行编辑</Option>
       <Option value="2"> <IconFont type="anticon-iconkuozhan_liulanpre" />只能查看浏览</Option>
     </Select>
     </Row>
    <Row style={{margin: '8px 8px 8px 16px'}}>
    <Menu.Divider />
    </Row>
      <Row style={{margin: '8px 8px 8px 16px'}}>
      <Select defaultValue="1" style={{ margin:'0px,0px,0px,-10px',width: '80% ',float:'left'}} onChange={handleChange}>
      
      <Option value="1">查找成员</Option>
      <Option value="2">胡歌</Option>
      <Option value="3">李健</Option>
      <Option value="4">周杰伦</Option>
      </Select>
      <Button style={{float:"right"}} type="primary" >添加</Button>
      </Row>
   </div> 

);

class App extends Component {
  constructor(props, context) {
    super(props, context)
     // this.initPie = this.initPie.bind(this)
     
   // this.thumbnail=this.thumbnail.bind(this)
  }
    state = {
      collapsed: false,
      visible: false,
      modalvisible:false,
      page:1,
    };
    pageChoose = (Xst) => {
      this.setState({
        page: Xst,
      });
      console.log(Xst)
    }
    showModal = () => {
      this.setState({
        modalvisible: true,
      });
    }
    handleOk = (e) => {
      console.log(e);
      this.setState({
        modalvisible: false,
      });
    }
    handleCancel = (e) => {
      console.log(e);
      this.setState({
        modalvisible: false,
      });
    }
    onCollapse = (collapsed) => {
      console.log(collapsed);
      this.setState({ collapsed });
    }
    showDrawer = () => {
      this.setState({
        visible: true,
      });
    };
  
    onClose = () => {
      this.setState({
        visible: false,
      });
    };
    render() {
      return (
        <Layout style={{width: '100%', height: '100vh'}}>
          <Sider 
          width={700}
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          collapsedWidth={0}
         
          className="Sider"
          style={{width: '100%', height: '100vh'}}
          >
            <Bodysider/>
          </Sider>
         
         
         
          
            <div className="flowbar" style={{right:80,top: 20}}>
               <Button type="primary" onClick={this.showDrawer}>
                 视图
              </Button>
              <Drawer
                width={300}
                title="幻灯片缩略图"
                placement="right"
                closable={false}
                onClose={this.onClose}
                visible={this.state.visible}
              >
                <DrawView pageChoose={this.pageChoose}/>{/*thumbnail={"当前幻灯片"}*/}
              </Drawer>
            </div>
            <div className="flowbar" style={{right:10,top:20}}>
            <span style={{ marginRight: 24, }}>
                <Badge count={3}><Link to='/Account'><Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}  icon="user" /></Link></Badge>
              </span>
            </div>
            
            {/* <Layout className='Layoutstyle'> */}
            <Content className="Content" style={{height: '100vh',margin: '0 16px'}}>
            <div>
            <div className="flowbar" style={{right:170,top:20}}>
            {/* <div className="flowbar" style={{right:200,top:20}}> */}
           <Popover placement="bottomLeft" title={text} content={menu} trigger="click">
           <Button type="dashed" shape="circle" >
           <Icon type="ellipsis" />
           {/* <Icon type="team" />  */}
           </Button>

         </Popover>
                
            
          </div>
          {/* <div className="flowbar" style={{right:160,top:20}}>
              <Button shape="circle" type="primary" ghost icon="share-alt" onClick={this.showModal}></Button> */}
              
           {/* </div> */}
          <div className="flowbar" style={{right:10,top:20}}>
            <span style={{ marginRight: 24, }}>
                <Badge count={1}><Avatar onClick={this.showModal} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}  icon="user" /></Badge>
                <Modal
                 title="邀请成员"
                 visible={this.state.modalvisible}
                 onOk={this.handleOk}
                 onCancel={this.handleCancel}
              >
                {ContentModal}
              </Modal>
              </span>
            </div>
            <EditorWithBar initContent={MyDeck[this.state.page]}/>
            </div>
            </Content>
            {/* </Layout> */}
          </Layout>
      );
    }
  }

  export default App;