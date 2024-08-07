/**
 *@description 音乐相关接口参数所用类型
 *@author slh
 *@copyright NanJing Anshare Tech .Com
 *@createDate 2024年08月05日 17:56:37
 */

/** 歌手地区 */
export const enum ArtistArea {
  /** 全部 */
  all = '-1',
  /** 华语 */
  zh = '7',
  /** 欧美 */
  ea = '96',
  /** 日本 */
  ja = '8',
  /** 韩国 */
  kr = '16',
  /** 其他 */
  other = '0'
}

/** 歌手类型 */
export const enum ArtistType {
  /** 男歌手 */
  male = '1',
  /** 女歌手 */
  female = '2',
  /** 乐队 */
  band = '3',
  /**全部 */
  all = '-1'
}

export type ArtistListParams = {
  type: ArtistType
  area: ArtistArea
  /** 歌手名首字母索引 */
  initial?: string
}

/** 新碟上架查询地区 */
export const enum AlbumArea {
  /** 全部 */
  ALL = 'ALL',
  /** 华语 */
  ZH = 'ZH',
  /** 欧美 */
  EA = 'EA',
  /** 日本 */
  JP = 'JP',
  /** 韩国 */
  KR = 'KR'
}

/** 新碟上架查询类型 */
export const enum AlbumType {
  /** 默认 全部 */
  new = 'new',
  /** 热门 */
  hot = 'hot'
}

export type AlbumListParams = {
  area: AlbumArea
  type: AlbumType
  limit?: number
  offset?: number
  year?: number | string
  month?: number | string
}

/** 音乐管理首页 新碟上架列表 */
export interface MusicListNewDiscList {
  id?: number | string
  /** 封面 */
  picUrl?: string
  type?: string
  name?: string
  /** 歌手 */
  artist?: {
    id?: number | string
    name?: string
    picUrl?: string
  }
}

/** 音乐管理首页 热门推荐列表 */
export interface MusicListTopPlayList {
  id?: number | string
  /** 封面 */
  coverImgUrl?: string
  /** 播放次数 */
  playCount: number
  /** 歌曲数量 */
  trackCount?: number
  name: string
  tags?: string[]
}

/** 音乐管理首页 请求 热门推荐列表 */
export interface TopPlayListParams {
  limit?: number
  /** 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot' */
  order: 'new' | 'hot'
  cat: string
  offset?: number
}
