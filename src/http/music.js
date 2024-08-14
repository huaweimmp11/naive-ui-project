/**
 * @file 音乐接口
 * @author slh
 *@createDate 2024年08月05日 17:35:29
 */

import express from 'express'
const router = express.Router()
import * as NeteaseCloudMusicApi from 'NeteaseCloudMusicApi'

const {
  artist_top_song,
  artist_list,
  top_album,
  top_playlist,
  toplist,
  playlist_detail,
  login_qr_key
} = NeteaseCloudMusicApi.default

const send500 = (message) => {
  return {
    code: 500,
    data: null,
    message
  }
}

const send200 = (data, message = 'success') => {
  return {
    code: 200,
    data,
    message
  }
}

/** 获取指定歌手的热门 50 首歌曲 */
router.get('/artist-top-song', async (req, res) => {
  const { id } = req.query
  const response = await artist_top_song({ id })
  const { body } = response
  if (body.code !== 200) return res.send(send500('获取失败'))
  res.send(send200(body.songs))
})

/** 歌手分类列表 */
router.get('/artist-list', async (req, res) => {
  const { type, area, initial } = req.query
  const response = await artist_list({ type, area, initial })
  const { body } = response
  if (body.code !== 200) return res.send(send500('获取失败'))
  res.send(send200(body.artists))
})

/** 新碟上架查询 */
router.get('/top-album', async (req, res) => {
  const { area, type, limit, offset, year, month } = req.query
  const response = await top_album({ area, type, limit, offset, year, month })
  const { body } = response
  if (body.code !== 200) return res.send(send500('获取失败'))
  res.send(send200(body.monthData))
})

/** 热门推荐 */
router.get('/top-playlist', async (req, res) => {
  const { order, limit, cat, offset } = req.query
  const response = await top_playlist({ order, limit, cat, offset })
  const { body } = response
  if (body.code !== 200) return res.send(send500('获取失败'))
  res.send(send200(body.playlists))
})

/** 获取所有榜单 */
router.get('/toplist', async (req, res) => {
  const response = await toplist()
  const { body } = response
  if (body.code !== 200) return res.send(send500('获取失败'))
  res.send(send200(body.list))
})

/** 根据榜单ID查询曲目 */
router.get('/playlist-detail', async (req, res) => {
  const { id, s } = req.query
  const response = await playlist_detail({ id, s })
  const { body } = response
  if (body.code !== 200) return res.send(send500('获取失败'))
  res.send(send200(body.playlist.tracks.slice(0, 6)))
})

/** 生成二维码key */
router.get('/login-qr-key', async (req, res) => {
  const response = await login_qr_key()
  const { body } = response
  if (body.code !== 200) return res.send(send500('获取失败'))
  res.send(send200(body.data.unikey))
})

export default router
