/**
 * @file 音乐接口
 * @author slh
 * @copyright NanJing Anshare Tech .Com
 *@createDate 2024年08月05日 17:35:29
 */

import express from 'express'
const router = express.Router()
import * as NeteaseCloudMusicApi from 'NeteaseCloudMusicApi'

const { artist_top_song, artist_list, top_album, top_playlist } = NeteaseCloudMusicApi.default

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

router.get('/artist-top-song', async (req, res) => {
  const { id } = req.query
  const response = await artist_top_song({ id })
  const { body } = response
  if (body.code !== 200) return res.send(send500('获取失败'))
  res.send(send200(body.songs))
})

router.get('/artist-list', async (req, res) => {
  const { type, area, initial } = req.query
  const response = await artist_list({ type, area, initial })
  const { body } = response
  if (body.code !== 200) return res.send(send500('获取失败'))
  res.send(send200(body.artists))
})

router.get('/top-album', async (req, res) => {
  const { area, type, limit, offset, year, month } = req.query
  const response = await top_album({ area, type, limit, offset, year, month })
  const { body } = response
  if (body.code !== 200) return res.send(send500('获取失败'))
  res.send(send200(body.monthData))
})

router.get('/top-playlist', async (req, res) => {
  const { order, limit, cat, offset } = req.query
  const response = await top_playlist({ order, limit, cat, offset })
  const { body } = response
  if (body.code !== 200) return res.send(send500('获取失败'))
  res.send(send200(body.playlists))
})

export default router
