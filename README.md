# anta-element-ui-vue3-template

##  注意

1. 在 script setup 情况下 hot reload 不支持 keep alive，要使用defineComponent，出现错误如下：
```node
runtime-core.esm-bundler.js?d2dd:6035 Uncaught (in promise) TypeError: parentComponent.ctx.deactivate is not a function
```

2. 页面组件需要定义component name 和 route name 一致 才会被缓存

## 记录

```node
yarn add anta-element-ui-components-next@0.2.21 anta-element-ui-schema-form@0.0.37 anta-element-ui-schema-table@0.0.23 -T
```