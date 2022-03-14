# 介绍
uniapp模块是一个能够快速搭建前端项目的模块，而且web编译发布后可以直接上线，不需要额外在搭建前端项目环境。支持vue2、vue3环境。
# 安装

```shell
php bin/hyperf.php hcms:install uniapp
```

# 使用

## XBuilder
将 `View/uniapp` 项目放入到XBuilder编辑器中直接开发。如果你想要使用uni cli 可以看具体点[文档](https://uniapp.dcloud.io/worktile/CLI.html#h5)

## 目录结构
- components 公共组件
- libs 封装库 
- pages 
  - module 模块
    - api 存放模块相关API信息
    - page 存放具体页面
    - route 页面路由信息
    - store 模块vuex配置
- static 静态文件

## 开发
### 路由跳转
```js
this.$nav('home.demo',{param1:"123123"})
```
### http请求
```js
this.$request('home.index').then(res => {
    // console.log('res', res)
    uni.showToast({
        title: '请求成功'
    })
}).catch(err_res => {
    //业务错误
    console.log('err_res', err_res)
})
```

### 部署上线
默认模块中的uniapp代码是将编译后的代码隐藏的，如果你需要部署h5项目上线的，可以在 `.gitignore`取消忽略，这样就可以将编译后的代码提交上去。

### 应用名称
默认应用名称是`nuiapp`这个决定路由的访问，可以在`manifest.json`修改"应用名称"来改变访问的url：`http://127.0.0.1:9501/uniapp/`。根据业务需要可以将应用名称留空，但是需要修改 `UniappController` 的路由。
