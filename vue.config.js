const path = require('path');
module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, "src/assets/css/main.less")
      ]
    },
    electronBuilder: {
      builderOptions: {
        "appId": "com.memo.app",
        "productName": "便签",//项目名，也是生成的安装文件名，即定时关机 - by：Jahn.exe
        "copyright": "Copyright © 2020 Jahn",//版权信息
        "directories": {
          "output": "./dist"//输出文件路径
        },
        "asar": true,
        "win": {//win相关配置
          "target": [
            {
              "target": "nsis",//利用nsis制作安装程序
              "arch": [
                "x64",//64位
                "ia32"//32位
              ]
            }
          ]
        },
        "nsis": {
          "oneClick": false, // 是否一键安装
          "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          "allowToChangeInstallationDirectory": true, // 允许修改安装目录
          "installerIcon": "build/icons/icon.ico",// 安装图标
          "uninstallerIcon": "build/icons/icon.ico",//卸载图标
          "installerHeaderIcon": "build/icons/icon.ico", // 安装时头部图标
          "createDesktopShortcut": true, // 创建桌面图标
          "createStartMenuShortcut": true,// 创建开始菜单图标
        }
      }
    }
  }
}
