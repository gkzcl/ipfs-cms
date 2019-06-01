import React from 'react';
import ipfsAPI from 'ipfs-api';

const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'})

class Files extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileNames: []
        }
    }

    render() {
        const {fileNames} = this.state;
        return (
            <div>
                <h2>文件/文件夹操作</h2>

                <div>
                    <h3>查看路径(ls)</h3>
                    <hr/>
                    <input type="text" placeholder="请输入路径" ref={input => this.inputNode = input}/>
                    <button onClick={() => {
                        let inputPath = this.inputNode.value;
                        console.log(inputPath);
                        inputPath = inputPath || '/'; // inputPath为空时, 把/作为默认值

                        ipfs.files.ls(inputPath, (err, files) => {
                            // files.forEach((file) => {
                            //     console.log(file.name)
                            // })
                            let fileNames = files.map((file, i) => file.name);
                            this.setState({
                                fileNames: fileNames
                            })
                        })
                    }}>查看文件/文件夹
                    </button>

                    <button onClick={() => {

                        let inputPath = this.inputNode.value;
                        console.log(inputPath);
                        inputPath = inputPath || '/'; // inputPath为空时, 把/作为默认值

                        ipfs.files.stat(inputPath, (err, stats) => {
                            console.log(stats.hash)
                            this.setState({
                                fileNames: [stats.hash]
                            })
                        })
                    }}>查看hash
                    </button>

                    <ul>
                        {
                            fileNames.map((filename, index) => {
                                return <li key={index}>{`${index} -> ${filename}`}</li>
                            })
                        }
                    </ul>

                </div>
                <div>
                    <h3>复制到路径(cp)</h3>
                    <hr/>
                    <input type="text" placeholder="hash file dir"
                           ref={input => this.srcInput = input}/> ->
                    <input type="text" placeholder="dist-path"
                           ref={input => this.distInput = input}/>
                    <button onClick={() => {
                        const src = this.srcInput.value
                        const dist = this.distInput.value

                        ipfs.files.cp(src, dist, (err) => {
                            if (err) {
                                throw err
                            }
                            console.log("cp success");
                        })

                    }}>执行复制
                    </button>

                </div>
                <div>
                    <h3>删除路径(rm)</h3>
                    <hr/>

                    <input type="text" placeholder="filepath" ref={input => this.delInput = input}/>
                    <button onClick={() => {

                        ipfs.files.rm(this.delInput.value, (err) => {
                            if (err) {
                                throw err
                            }

                            console.log("cp success");
                        })
                    }}>执行删除
                    </button>

                </div>
            </div>
        );
    }
}

export default Files;
