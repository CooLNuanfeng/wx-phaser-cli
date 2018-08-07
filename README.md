## 目录结构

``` html
    .
    ├── build // webpack 配置目录
    │   └── webpack.config.js
    ├── dist // 小游戏的根目录
    │   ├── assets
    │   ├── game.js
    │   ├── game.json
    │   ├── main.js
    │   └── vendor.js
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    └── src  //小游戏源代码目录
        ├── assets  //小游戏 静态资源目录
        │   ├── atlas // tiled 资源
        │   ├── images // 图片资源
        │   └── media // 音频视频资源
        ├── game.js  //小游戏必备文件(建议不要编辑此文件)
        ├── game.json //小游戏必备配置文件
        ├── js  //小游戏 js 部分
        │   └── states //场景 js
        │       ├── BootState.js
        │       ├── GameState.js
        │       └── PreloadState.js
        ├── libs //phaser及工具
        │   ├── phaser-wx.js
        │   └── weapp-adapter.js
        └── main.js  //游戏入口(代码入口)
```


## 使用说明

    phaser -h


## Example

step1:

    $ phaser example
    $ cd phaser-plane
    $ npm run dev

step2:

    打开微信小程序开发工具，将 dist 目录作为根目录添加到开发工具中(配置小程序appid)

step3:

    微信开发工具编译运行
