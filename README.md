# anta-element-ui-vue3-template

##  注意

1. 在 script setup 情况下 hot reload 不支持 keep alive，要使用defineComponent，出现错误如下：
```node
runtime-core.esm-bundler.js?d2dd:6035 Uncaught (in promise) TypeError: parentComponent.ctx.deactivate is not a function
```