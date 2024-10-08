/**
 *@description 常用类型
 *@author slh
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

export interface VideoTableColumn {
  id: string
  no: number
  name: string
  uploadTime: string
  size: string
}

export type vue3VideoPlayOptions = {
  /** 播放器宽度 */
  width: string
  /** 播放器高度 */
  height: string
  /** 主题色 */
  color: string
  /** 视频名称 */
  title: string
  /** 视频源 */
  src: string
  /** 静音 */
  muted: boolean
  /** 全屏 */
  webFullScreen: boolean
  /** 播放倍速 ['0.75', '1.0', '1.25', '1.5', '2.0'] */
  speedRate: string[]
  /** 自动播放 */
  autoPlay: boolean
  /** 循环播放 */
  loop: boolean
  /** 镜像画面 */
  mirror: boolean
  /** 关灯模式 */
  ligthOff: boolean
  /** 默认音量大小 */
  volume: number
  /** 是否显示控制 */
  control: boolean
  /** 显示控件按钮 */
  controlBtns: vue3VideoPlayControlBtns[]
}

export enum vue3VideoPlayControlBtns {
  /** 音轨切换按钮 */
  audioTrack = 'audioTrack',
  /** 视频质量切换按钮 */
  quality = 'quality',
  /** 速率切换按钮 */
  speedRate = 'speedRate',
  /** 音量 */
  volume = 'volume',
  /** 设置 */
  setting = 'setting',
  /** 画中画按钮 */
  pip = 'pip',
  /** 网页全屏按钮 */
  pageFullScreen = 'pageFullScreen',
  /** 全屏按钮 */
  fullScreen = 'fullScreen'
}

/** 模态框回调状态 */
export enum ModelStatus {
  /** 确认 */
  Confirmed = 'Confirmed',
  /** 关闭 */
  Close = 'Close',
  /** 取消 */
  Cancel = 'Cancel'
}

export type ImListData = {
  /** 接收人 */
  to: string
  /** 发送人 */
  from: string
  id: string
  /** 发送时间 */
  time: string
  /** 发送内容 */
  content: string
}
