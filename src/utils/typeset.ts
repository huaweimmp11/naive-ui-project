/**
 *@description 常用类型
 *@author slh
 *@copyright NanJing Anshare Tech .Com
 *@createDate 2024年07月30日 13:52:36
 */

export interface MarkDownTableColumn {
  id: string
  no: number
  content: string
  createTime: string
  title: string
  [key: string]: any
}

export enum MapStyle {
  /** 普通 */
  normal = 'normal',
  /** 暗黑 */
  dark = 'dark',
  /** 清新 */
  light = 'light',
  /** 红色 */
  redalert = 'redalert',
  /** 清新蓝 */
  lightblue = 'lightblue',
  /** 午夜蓝 */
  midnight = 'midnight',
  /** 浪漫 */
  romantic = 'romantic',
  /** 雅致 */
  grayscale = 'grayscale',
  /** 清新绿 */
  green = 'green',
  /** 午夜蓝绿 */
  blue = 'blue'
}
