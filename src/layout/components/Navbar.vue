<template>
  <div class="navbar">

    <!-- 最左边的svg；控制菜单隐藏显示（.hideSidebar 样式） -->
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <!-- 中间面包屑  当前路由的所有嵌套路径片段的路由记录-->
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <!-- 右侧4个图标 -->
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <!-- 图标1:搜索 根据$store.getters.permission_routes过滤 -->
        <el-tooltip content="这是搜索框" effect="dark" placement="bottom">
          <search id="header-search" class="right-menu-item" />
        </el-tooltip>

        <!-- settings.js 文件中配置errorLog -->
        <!-- https://cn.vuejs.org/v2/guide/deployment.html#%E8%B7%9F%E8%B8%AA%E8%BF%90%E8%A1%8C%E6%97%B6%E9%94%99%E8%AF%AF
        如果在组件渲染时出现运行错误，错误将会被传递至全局 Vue.config.errorHandler 配置函数 (如果已设置)。利用这个钩子函数来配合错误跟踪服务是个不错的主意。
         -->
        <error-log class="errLog-container right-menu-item hover-effect" />

        <!-- 图标2:全屏 使用插件screenfull -->
        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <!-- 图标3:改变字体大小 -->
        <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>

      </template>

      <!-- 图标4:登录用户信息 -->
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- 图标4-1:用户信息 -->
          <router-link to="/profile/index">
            <el-dropdown-item>Profile</el-dropdown-item>
          </router-link>

          <!-- 图标4-2:回首页快速链接？ -->
          <router-link to="/">
            <el-dropdown-item>Dashboard</el-dropdown-item>
          </router-link>

          <!-- 图标4-3\4:源码&文档 github链接 -->
          <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>

          <!-- 图标4-5:退出登录 -->
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      // 模板字符串 ES2015新增的符号；模板字符串的符号[`]是按键~下的符号
      // 退出登录时把当前路由路径带过去，登录后回到当前页面
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
