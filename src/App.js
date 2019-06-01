import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import TextPage from "./pages/text";
import Pic from "./pages/pic";
import Media from "./pages/media";
import Files from "./pages/files";
import './css/app.css'

import {Layout, Menu, Icon} from 'antd';

const {Header, Sider, Content} = Layout;

class App extends Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Router>
                <Layout>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}>
                        <div className="logo"/>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1">
                                <Link to="/text">
                                    <Icon type="file-text"/>
                                    <span>文本</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/pic">
                                    <Icon type="video-camera"/>
                                    <span>图片</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/media">
                                    <Icon type="upload"/>
                                    <span>多媒体</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to="/files">
                                    <Icon type="folder-open"/>
                                    <span>文件/文件夹</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{background: '#fff', padding: 0}}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                        </Header>
                        <Content style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: window.screen.height
                        }}>
                            <Route path="/" exact={true}
                                   render={() => <h2 style={{textAlign: 'center'}}>ipfs内容管理</h2>}/>
                            <Route path="/text" component={TextPage}/>
                            <Route path="/pic" component={Pic}/>
                            <Route path="/media" component={Media}/>
                            <Route path="/files" component={Files}/>
                        </Content>
                    </Layout>

                </Layout>
            </Router>

        );
    }
}

export default App;
