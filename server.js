import express from 'express'
import cors from 'cors'
import os from 'os'
/** createConnection 建立连接&关闭连接 */
import { createConnection } from 'mysql'
import bodyparser from 'body-parser'

const app = express()
/** 获取 post请求传递来的参数 */
app.use(bodyparser())

app.use(cors())

/** （监听的端口号） */
const port = 1025

const connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'naiveUi',
  post: 3306
})
connection.connect()

// 解决跨域
app.all('*', function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', '*')
  //允许的header类型
  res.header('Access-Control-Allow-Headers', 'content-type')
  //跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
  next()
})

app.post(`/login`, (req, res) => {
  const { username, password } = req.body
  connection.query(`SELECT * FROM user WHERE name = '${username}'`, (err, rows) => {
    if (rows.length <= 0) {
      res.send({
        code: 500,
        data: null,
        message: '无此用户'
      })
    } else {
      const user = rows[0]
      if (user.password === password) {
        res.send({
          code: 200,
          data: rows,
          message: 'success'
        })
      } else {
        return res.send({
          code: 500,
          data: null,
          message: '密码错误'
        })
      }
    }
  })
})

app.get('/getHomeMottoMsg', (req, res) => {
  // 从 lifemotto 表中随机取20条数据
  connection.query(`SELECT * FROM lifemotto ORDER BY RAND() LIMIT 20`, (err, rows) => {
    if (err) {
      res.send({
        code: 500,
        data: null,
        message: '密码错误'
      })
    } else {
      res.send({
        code: 200,
        data: rows,
        message: 'success'
      })
    }
  })
})

// 获取本机私有 IPV4 地址
app.get('/private-ip', (req, res) => {
  const interfaces = os.networkInterfaces()
  let privateIP = '未找到私有IP'
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        privateIP = iface.address
        break
      }
    }
    if (privateIP !== '未找到私有IP') break
  }
  res.send({
    code: 200,
    data: privateIP,
    message: 'success'
  })
})

app.listen(port, () => {
  console.log(`连接成功`)
})
