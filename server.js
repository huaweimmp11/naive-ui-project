import express from 'express'
import cors from 'cors'
import os from 'os'
import fs from 'fs'
import path from 'path'
import { createConnection } from 'mysql'
import bodyparser from 'body-parser'
import MusicRouter from './src/http/music.js'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

// 在 WebSocket 服务器中，clients 属性是一个集合（Set）
// 包含了所有当前连接到服务器的WebSocket客户端，这个集合的作用是方便遍历和管理所有连接的客户端，可以使用clients属性向所有连接的客户端广播消息
const clients = new Map()
// 新增离线消息 Map
const offlineMessages = new Map()
io.on('connection', (socket) => {
  socket.emit('connectionSuccess')
  let userName = socket.handshake.query.userName
  if (userName) {
    clients.set(userName, socket)
  }
  socket.on('user_name', (data) => {
    userName = data
    clients.set(userName, socket)
  })
  socket.on('message', (message) => {
    try {
      const { to, id, time, from, content } = message
      // 获取目标用户的socket
      const targetClient = clients.get(to)
      if (targetClient && targetClient.connected) {
        targetClient.emit('message', JSON.stringify({ from: userName, content, to, id, time }))
        const query = `INSERT INTO user_message (\`from\`, \`to\`, \`id\`, \`time\`, \`content\`) VALUES (?, ?, ?, ?, ?)`
        connection.query(query, [from, to, id, time, content], (error, results) => {
          if (error) {
            console.error('即时通讯消息存储失败: ', error)
          }
        })
      } else {
        // 如果目标用户不在线，将消息存储到离线消息 Map 中
        if (!offlineMessages.has(to)) {
          offlineMessages.set(to, [])
        }
        offlineMessages.get(to).push(message)
      }
    } catch (error) {
      console.error('Error processing message:', error)
    }
  })
  socket.on('disconnect', () => {
    console.log(`User ${userName} disconnected`)
    if (userName) clients.delete(userName)
  })
})

// 新增离线消息发送逻辑
function sendOfflineMessages() {
  offlineMessages.forEach((messages, to) => {
    const targetClient = clients.get(to)
    if (targetClient && targetClient.connected) {
      messages.forEach((message) => {
        const { id, time, from, content } = message
        targetClient.emit('message', JSON.stringify({ from: from, content, to, id, time }))
        const query = `INSERT INTO user_message (\`from\`, \`to\`, \`id\`, \`time\`, \`content\`) VALUES (?, ?, ?, ?, ?)`
        connection.query(query, [from, to, id, time, content], (error, results) => {
          if (error) {
            console.error('即时通讯消息存储失败: ', error)
          }
        })
      })
      offlineMessages.delete(to)
    }
  })
}

// 定时发送离线消息
setInterval(sendOfflineMessages, 5000) // 每 5 秒发送一次离线消息

app.use(bodyparser.json({ limit: '1000mb' }))
app.use(bodyparser.urlencoded({ limit: '1000mb', extended: true }))
app.use(cors())
app.use(MusicRouter)

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

function send200(data, message = 'success') {
  return {
    code: 200,
    data,
    message
  }
}

function queryFunc(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}

/** 将数据库查询结果转换为Markdown格式的字符串 */
function generateMarkdown(data) {
  if (data.length === 0) {
    return '# No Data'
  }
  let markdown = ''
  data.forEach((row) => {
    markdown += row.content // 添加内容
    markdown += `\n\n---\n\n` // 添加分割线
  })
  return markdown
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

app.get(`/user-list`, (req, res) => {
  connection.query(`SELECT * FROM user `, (err, rows) => {
    if (rows.length <= 0) return res.send(send500('无用户'))
    return res.send(send200(rows))
  })
})

// HomeView 获取卡片信息
app.get('/getHomeMottoMsg', (req, res) => {
  // 从 lifemotto 表中随机取20条数据
  queryFunc(`SELECT * FROM life_motto ORDER BY RAND() LIMIT 20`).then((rows) => {
    if (!rows) {
      res.send(send500('查询失败'))
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
  queryFunc(`SELECT * FROM image_upload`).then((rows) => {
    if (!rows) {
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
    res.send(send500('上传失败'))
  }
})

// 编辑器-MarkDown 获取已保存MarkDown列表
app.get('/markdown-list', (req, res) => {
  queryFunc(`SELECT * FROM markdown_list`).then((rows) => {
    if (!rows) {
      res.send(send500('获取失败'))
    } else {
      rows.sort((a, b) => a.no - b.no)
      res.send(send200(rows))
    }
  })
})

// 编辑器-MarkDown 更新
app.post('/markdown-update', (req, res) => {
  const { id, content, createTime, title } = req.body
  connection.query(
    `UPDATE markdown_list SET content = ${content}, title = '${title}', createTime = '${createTime}'  WHERE id = '${id}'
`,
    (err, rows) => {
      if (err) {
        res.send(send500('更新失败'))
      } else {
        res.send(send200(null, '更新成功'))
      }
    }
  )
})

// 编辑器-MarkDown 导出
app.post('/markdown-export', (req, res) => {
  const { id, filename } = req.body
  queryFunc(`SELECT * FROM markdown_list WHERE id = ${connection.escape(id)}`).then((rows) => {
    if (!rows || rows.length === 0) return res.send(send500('获取失败'))
    const markdownContent = generateMarkdown(rows)
    const filePath = path.join(os.tmpdir(), `${filename}.md`)
    fs.writeFile(filePath, markdownContent, 'utf8', (err) => {
      if (err) {
        return res.send(send500('文件生成失败'))
      }
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=${encodeURIComponent(filename)}.md`
      )
      res.setHeader('Content-Type', 'text/plain')
      const fileStream = fs.createReadStream(filePath)
      fileStream.pipe(res)
      fileStream.on('end', () => {
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error('临时文件删除失败', unlinkErr)
          }
        })
      })
    })
  })
})

// 编辑器-MarkDown 保存
app.post('/markdown-save', async (req, res) => {
  const { id, content, createTime, title } = req.body
  queryFunc(`SELECT * FROM markdown_list`).then((rows) => {
    if (!rows) return res.send(send500('获取失败'))
    const length = rows.length
    queryFunc(`SELECT * FROM markdown_list WHERE title = '${title}'`).then((rows) => {
      if (rows.length > 0) return res.send(send500('已有重复标题'))
      queryFunc(
        `INSERT INTO markdown_list (id, content, no, createTime, title) VALUES ('${id}', ${content}, ${length + 1}, '${createTime}', '${title}')`
      ).then((rows) => {
        if (!rows) return res.send(send500('保存失败'))
        return res.send({
          code: 200,
          data: null,
          message: '保存成功'
        })
      })
    })
  })
})

// 引用工具-视频播放 获取视频列表
app.post('/video-manage-list', (req, res) => {
  queryFunc(`SELECT * FROM video_manage`).then((rows) => {
    if (!rows) {
      res.send(send500('获取失败'))
    } else {
      res.send(send200(rows))
    }
  })
})

// 即时通讯列表
app.post('/user-message-list', (req, res) => {
  const { from, to } = req.body
  const query =
    from && to
      ? `
        (SELECT * FROM user_message WHERE \`from\` = '${from}' AND \`to\` = '${to}')
        UNION
        (SELECT * FROM user_message WHERE \`from\` = '${to}' AND \`to\` = '${from}')
        ORDER BY time ASC
      `
      : `SELECT * FROM user_message ORDER BY time ASC`
  queryFunc(query).then((rows) => {
    if (!rows) {
      res.send(send500('获取失败'))
    } else {
      res.send(send200(rows))
    }
  })
})

server.listen(port, () => {
  console.log(`node server 连接成功`)
})
