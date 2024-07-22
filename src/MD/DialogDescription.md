## Naive UI 关于 dialog 组件的使用

官方文档: https://www.naiveui.com/zh-CN/light/components/dialog#Dialog-Slots

基本使用：

```js
<n-button @click="showDialog">Default</n-button>

/** 调用 success 类型的对话框 */
const showDialog = () => {
  window.$dialog.success(options)
}
```

| 调用类型 |         |
| :------: | :-----: |
|   警告   | warning |
|   成功   | success |
|   错误   |  error  |

### 接收属性

|        名称         |            类型             |       默认值        |                  说明                  |
| :-----------------: | :-------------------------: | :-----------------: | :------------------------------------: |
|       action        |     `() => VNodeChild`      |     `undefined`     |  操作区域的内容，需要是 `render` 函数  |
|      autoFocus      |          `boolean`          |       `true`        | 是否自动聚焦 Modal 第一个可聚焦的元素  |
|     blockScroll     |          `boolean`          |       `true`        |       是否在打开时禁用 body 滚动       |
|      bordered       |          `boolean`          |       `false`       |           是否显示 `border`            |
|        class        |            `any`            |     `undefined`     |                  类名                  |
|      closable       |          `boolean`          |       `true`        |         是否显示 `close` 图标          |
|     closeOnEsc      |          `boolean`          |       `true`        |   是否在摁下 Esc 键的时候关闭对话框    |
|       content       |           `string           | (() => VNodeChild)` |              `undefined`               | 对话框内容，可以是 `render` 函数 |
|    iconPlacement    |           `'left'           |       'top'`        |                `'left'`                | 图标的位置                       |
|        icon         |     `() => VNodeChild`      |     `undefined`     |  对话框 `icon`, 需要是 `render` 函数   |
|       loading       |          `boolean`          |       `false`       |        是否显示 `loading` 状态         |
|    maskClosable     |          `boolean`          |       `true`        |   是否可以通过点击 `mask` 关闭对话框   |
| negativeButtonProps |        `ButtonProps`        |     `undefined`     |             取消按钮的属性             |
|    negativeText     |          `string`           |     `undefined`     | 取消按钮的文字，不填对应的按钮不会出现 |
| positiveButtonProps |        `ButtonProps`        |     `undefined`     |             确认按钮的属性             |
|    positiveText     |          `string`           |     `undefined`     | 确认按钮的文字，不填对应的按钮不会出现 |
|      showIcon       |          `boolean`          |       `true`        |            是否显示 `icon`             |
|        style        |           `string           |       Object`       |              `undefined`               | 样式                             |
|        title        |           `string           | (() => VNodeChild)` |              `undefined`               | 标题，可以是 `render` 函数       |
|   transformOrigin   |          `'mouse'           |      'center'`      |               `'mouse'`                | 对话框动画出现的位置             |
|        type         |           `'error           |      'success'      |               'warning'`               | `'warning'`                      | 对话框类型                                                                                        |
|    onAfterEnter     |        `() => void`         |     `undefined`     |         出现动画完成执行的回调         |
|    onAfterLeave     |        `() => void`         |     `undefined`     |         关闭动画完成执行的回调         |
|       onClose       |       `() => boolean        |  Promise<boolean>   |                  any`                  | `undefined`                      | 默认行为是关闭确认框。返回 `false` 或者 `resolve false` 或者 `Promise` 被 `reject` 会避免默认行为 |
|   onNegativeClick   | `(e: MouseEvent) => boolean |  Promise<boolean>   |                  any`                  | `undefined`                      | 默认行为是关闭确认框。返回 `false` 或者 `resolve false` 或者 `Promise` 被 `reject` 会避免默认行为 |
|   onPositiveClick   | `(e: MouseEvent) => boolean |  Promise<boolean>   |                  any`                  | `undefined`                      | 默认行为是关闭确认框。返回 `false` 或者 `resolve false` 或者 `Promise` 被 `reject` 会避免默认行为 |
|     onMaskClick     |        `() => void`         |     `undefined`     |          点击蒙层后执行的回调          |





