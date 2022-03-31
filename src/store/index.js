import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

/**
 * require.context是什么
一个webpack的api,通过执行require.context函数获取一个特定的上下文,主要用来实现自动化导入模块,在前端工程中,
如果遇到从一个文件夹引入很多模块的情况,可以使用这个api,它会遍历文件夹中的指定文件,然后自动导入,使得不需要每次显式的调用import导入模块

require.context函数接受三个参数

directory {String} -读取文件的路径

useSubdirectories {Boolean} -是否遍历文件的子目录

regExp {RegExp} -匹配文件的正则

上面的代码遍历当前目录下的test文件夹的所有.test.js结尾的文件,不遍历子目录

作者：心_c2a2
链接：https://www.jianshu.com/p/c894ea00dfec
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 */
// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// modulesFiles.keys()=./app.js,./errorLog.js,./permission.js,./settings.js,./tagsView.js,./user.js

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
})

export default store
