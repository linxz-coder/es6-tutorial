// 引入fs模块
const fs = require('fs');

// 读取文件 - 回调地狱
/* fs.readFile('../txt/weixue.md', 'utf8', (err, data1) => {
    fs.readFile('../txt/tangshi.md', 'utf8', (err, data2) => {
        fs.readFile('../txt/duhougan.md', 'utf8', (err, data3) => {
            let result = data1 + '\r\n' + data2 + '\r\n' + data3;
            console.log(result);
        });
    });
}); */

// 使用Promise封装
const p = new Promise((resolve, reject) => {
    fs.readFile('../txt/weixue.md', 'utf8', (err, data) => {
        if (err) reject(err); // 如果有错误，抛出错误
        resolve(data);
    });
});

p.then(value => {
    return new Promise((resolve, reject) => {
        fs.readFile('../txt/tangshi.md', 'utf8', (err, data) => {
            if (err) reject(err); // 如果有错误，抛出错误
            resolve([value,data]); // 将第一个文件和第二个文件的内容传递给下一个Promise
        });
    }).then(value => {
        return new Promise((resolve, reject) => {
            fs.readFile('../txt/duhougan.md', 'utf8', (err, data) => {
                value.push(data); // 将第三个文件的内容添加到数组中
                resolve(value); 
            });
        });
    }).then(value => {
        console.log(value.join('\r\n')); // 将三个文件的内容合并为一个字符串
    });
});