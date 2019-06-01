import React from 'react';
import {addFile} from '../util/ipfsUtil'
import {Button} from 'antd';

class Media extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hash: '',
            inputHash: ''
        }
    }

    uploadClick = () => {
        let files = this.fileInput.files;
        const file = files[0];
        addFile(file)
            .then(hash => {
                this.setState({hash, inputHash: hash})
            })
            .catch(e => console.error(e))
    }

    render() {
        const {hash, inputHash} = this.state;
        return (
            <div>
                <h2>多媒体上传&获取</h2>
                <div>
                    <h2>多媒体上传</h2>
                    <hr/>
                    <fieldset>
                        <legend>请选择文件:</legend>
                        <input type="file" multiple ref={input => this.fileInput = input}/>
                    </fieldset>

                    <Button type="primary" onClick={this.uploadClick}>上传多媒体</Button>

                    {hash && <p>多媒体Hash是: {hash}</p>}

                </div>
                <div>
                    <h2>多媒体播放</h2>
                    <hr/>
                    <input type="text" placeholder='请输入媒体hash' value={inputHash}
                           onChange={(e) => this.setState({inputHash: e.target.value})}/>
                    <Button type="primary"
                            onClick={() => this.setState({hash: inputHash})}>查看媒体</Button>
                    {
                        hash && (
                            <div>
                                <video controls src={`http://127.0.0.1:8080/ipfs/${hash}`}/>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default Media;
