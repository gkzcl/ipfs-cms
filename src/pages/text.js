import React from 'react';
import ipfsAPI from 'ipfs-api';
import {Button} from 'antd';

const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'})


class TextPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hash: '',
            inputHash: '',
            peerId: ''
        }
    }

    // 组件已挂载
    componentDidMount() {
        ipfs.id((err, identity) => {
            if (err) {
                throw err
            }
            this.setState({
                peerId: identity.id,
                hash: '',
                inputHash: ''
            })
        })
    }

    uploadClick = () => {
        let msg = this.inputNode.value;
        // add到ipfs网络
        let data = Buffer.from(msg, 'utf-8');
        ipfs.files.add(data, (err, files) => {
            if (err) {
                throw err;
            }
            this.setState({
                hash: files[0].hash,
                inputHash: files[0].hash,
            });
        })
    }


    fetchClick = () => {
        const ipfsPath = this.state.inputHash;
        ipfs.files.cat(ipfsPath, (err, file) => {
            if (err) {
                throw err
            }
            let outputString = file.toString('utf8');
            this.refs.outputArea.value = outputString;
        })
    }

    render() {
        const {hash, peerId, inputHash} = this.state;
        return (
            <div>
                <h2>文本上传及获取</h2>
                <p>当前ipfs节点id:{peerId}</p>
                <div>
                    <h3>文本上传</h3>
                    <hr/>
                    <textarea cols="30" rows="10" ref={input => this.inputNode = input}/><br/>
                    <Button type="primary" onClick={this.uploadClick}>添加</Button>
                    {/*hash有值就显示*/}
                    {
                        hash && <p>上传完毕, 当前文件Hash是:{hash}</p>
                    }
                </div>
                <div>
                    <h3>文本获取</h3>
                    <hr/>
                    <textarea disabled name="" id="" cols="30" rows="10" ref="outputArea"/><br/>
                    <input type="text" placeholder="请输入hash值" value={inputHash} onChange={(e) => {
                        this.setState({inputHash: e.target.value})
                    }}/>
                    <Button type="primary" onClick={this.fetchClick}>获取</Button>
                </div>
            </div>
        );
    }
}

export default TextPage;
