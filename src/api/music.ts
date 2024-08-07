/**
 *@description 音乐管理使用请求api
 *@author slh
 *@copyright NanJing Anshare Tech .Com
 *@createDate 2024年08月05日 14:54:10
 */

import { service } from '@/utils/axios'
import type { AlbumListParams, ArtistListParams, TopPlayListParams } from '../utils/musicTypes'

/**
 * 获取指定歌手的热门 50 首歌曲
 * @param id 歌手 id
 */
export const artistTopSong = (id: string) => {
  return service({
    url: 'artist-top-song',
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 歌手分类列表
 * @param params  type: 歌手类型
 * @param params  area: 歌手地区
 * @param params  initial: 歌手名首字母索引
 */
export const artistList = (params: ArtistListParams) => {
  return service({
    url: '/artist-list',
    params
  })
}

/**
 * 新碟上架查询
 */
export const topAlbumSearch = (params: AlbumListParams) => {
  return service({
    url: '/top-album',
    params
  })
}

/**
 * 热门推荐 查询
 */
export const topPlayListSearch = (params: TopPlayListParams) => {
  return service({
    url: '/top-playlist',
    params
  })
}
