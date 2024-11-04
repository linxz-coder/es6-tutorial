// 引入fs模块
const fs = require('fs');

// 读取文件
// fs.readFile('../txt/weixue.md', 'utf8', (err, data) => {
//     if (err) throw err; // 如果有错误，抛出错误
//     console.log(data);
// });

// 使用Promise封装
const p = new Promise((resolve, reject) => {
    fs.readFile('../txt/weixue.md', 'utf8', (err, data) => {
        if (err) reject(err); // 如果有错误，抛出错误
        resolve(data);
    });
});

p.then(value => {
    console.log(value);
}, reason => {
    console.log(reason);
});