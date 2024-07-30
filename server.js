import express from 'express'
import cors from 'cors'
import os from 'os'
import { createConnection } from 'mysql'
import bodyparser from 'body-parser'

const app = express()

app.use(bodyparser.json({ limit: '1000mb' }))
app.use(bodyparser.urlencoded({ limit: '1000mb', extended: true }))
app.use(cors())

const port = 1025

const connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'naiveUi',
  post: 3306
})
connection.connect()

function send500(message) {
  return {
    code: 500,
    data: null,
    message
  }
}

function send200(data) {
  return {
    code: 200,
    data,
    message: 'success'
  }
}

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
      res.send(send500('无此用户'))
    } else {
      const user = rows[0]
      if (user.password === password) {
        res.send(send200(rows))
      } else {
        return res.send(send500('密码错误'))
      }
    }
  })
})

// HomeView 获取卡片信息
app.get('/getHomeMottoMsg', (req, res) => {
  // 从 lifemotto 表中随机取20条数据
  connection.query(`SELECT * FROM life_motto ORDER BY RAND() LIMIT 20`, (err, rows) => {
    if (err) {
      res.send(send500('密码错误'))
    } else {
      res.send(send200(rows))
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
  res.send(send200(privateIP))
})

// 引用工具-图片上传 获取图片列表
app.get('/image-upload-list', (req, res) => {
  connection.query(`SELECT * FROM image_upload`, (err, rows) => {
    if (err) {
      res.send(send500('获取失败'))
    } else {
      res.send(send200(rows))
    }
  })
})

// 引用工具-图片上传 上传接口
app.post('/image-upload', async (req, res) => {
  const { id, fileName, url } = req.body
  try {
    connection.query(
      `INSERT INTO image_upload (id, filename, url) VALUES ("${id}", "${fileName}", "${url}")`,
      (err, rows) => {
        if (err) {
          res.send(send500('上传失败'))
        } else {
          res.send({
            code: 200,
            data: null,
            message: '上传成功'
          })
        }
      }
    )
  } catch (error) {
    res.send({
      code: 500,
      data: null,
      message: '上传失败'
    })
  }
})

// 编辑器-MarkDown 获取已保存MarkDown列表
app.get('/markdown-list', (req, res) => {
  connection.query(`SELECT * FROM markdown_list`, (err, rows) => {
    if (err) {
      console.log(err)
      res.send(send500('获取失败'))
    } else {
      res.send(send200(rows))
    }
  })
})

// 编辑器-MarkDown 保存
app.post('/markdown-save', async (req, res) => {
  const { id, content, createTime } = req.body
  try {
    connection.query(
      `INSERT INTO markdown_list (id, content, createTime) VALUES ('${id}', ${content}, '${createTime}')`,
      (err, rows) => {
        if (err) {
          res.send(send500('保存失败'))
        } else {
          res.send({
            code: 200,
            data: null,
            message: '保存成功'
          })
        }
      }
    )
  } catch (error) {
    res.send({
      code: 500,
      data: null,
      message: '上传失败'
    })
  }
})

app.listen(port, () => {
  console.log(`连接成功`)
})
