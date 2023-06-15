# management-of-clinical-trial-data

我们致力于研发一款医药研发临床试验数据隐私管理系统。该系统针对医药研发流程中临床试验阶段所得到的各种敏感数据，提供具有自动化脱敏处理、匿名处理，以及密文数据存储与检索等隐私保护措施的管理功能，并提供用户授权共享信息功能模块，为数据安全保驾护航，提高医药研发效率的同时增速中国医药研发领域发展。

## 文件结构

```json
- .husky    					---- git 上传配置
- .vscode    					---- vscode相关配置
- build   						---- Electron打包文件
- dist    						---- vite打包文件
- dist-electron					---- 编译后的Electron运行配置
- electron         				---- 编译前的Electron运行配置
- node_modules   				---- 引用到的外部库
- public						---- 共用的图标
- src
	- api						---- 相关的api接口配置
	- assets					---- 静态文件
	- components				---- 全局组件
	- pages						---- 页面目录
	- router					---- 路由管理
	- store						---- vue仓库
	- styles					---- 全局通用样式
	- utils						---- 全局通用工具函数
	- App.vue					---- vue入口
	- main.ts					---- 入口
	- vite-env.d.ts				---- vue环境
- index.html					---- 入口
- package.json					---- 开发运行配置
- pnpm-lock.yaml				---- 相关依赖项记录
- electron-builder.json5		---- Electron打包配置
- tailwind.config.js			---- TailWind样式配置
- tsconfig.json					---- ts配置
- vite.config.ts				---- vite脚手架配置
- .elintigore && .eslintrc && .prittierrc.js  			---- 代码检测和格式化配置
- .girignore && .cz-config.js && .commitlint.config.js	---- git配置
- auto-imports.d.ts && components.d.ts					---- 自动导入ElementPlus组件
- README						---- 项目说明
```

