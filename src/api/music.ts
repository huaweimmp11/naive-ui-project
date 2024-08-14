/**
 *@description 音乐管理使用请求api
 *@author slh
 *@createDate 2024年08月05日 14:54:10
 */

import { service } from '@/utils/axios'
import type { AlbumListParams, ArtistListParams, TopPlayListParams } from '../utils/musicTypes'
import type { AxiosResponse } from 'axios'

interface MyAxiosResponse<T = any> extends AxiosResponse<T> {
  code?: number
  message?: string
}

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
  }) as unknown as MyAxiosResponse
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
  }) as unknown as MyAxiosResponse
}

/**
 * 新碟上架查询
 */
export const topAlbumSearch = (params: AlbumListParams) => {
  return service({
    url: '/top-album',
    params
  }) as unknown as MyAxiosResponse
}

/**
 * 热门推荐 查询
 */
export const topPlayListSearch = (params: TopPlayListParams) => {
  return service({
    url: '/top-playlist',
    params
  }) as unknown as MyAxiosResponse
}

/**
 * 获取所有榜单
 */
export const topListSearch = () => {
  return service({
    url: '/toplist'
  }) as unknown as MyAxiosResponse
}

/**
 * 根据榜单ID查询曲目
 */
export const topListSearchById = (id: string) => {
  return service({
    url: '/playlist-detail',
    params: {
      id,
      s: 8
    }
  }) as unknown as MyAxiosResponse
}

/**
 * 生成二维码key
 */
export const getLoginQrcodeKey = () => {
  return service({
    url: '/login-qr-key'
  }) as unknown as MyAxiosResponse
}
