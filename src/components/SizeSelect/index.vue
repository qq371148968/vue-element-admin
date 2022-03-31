<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class-name="size-icon" icon-class="size" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item of sizeOptions" :key="item.value" :disabled="size===item.value" :command="item.value">
        {{
          item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  data() {
    return {
      sizeOptions: [
        { label: 'Default', value: 'default' },
        { label: 'Medium', value: 'medium' },
        { label: 'Small', value: 'small' },
        { label: 'Mini', value: 'mini' }
      ]
    }
  },
  computed: {
    size() {
      return this.$store.getters.size
    }
  },
  methods: {

    /**
     * 下面方法翻译成手工操作步骤如下：
     * vm.$store.state.app.size='mini'
     * 修改cookie中值
     * vm.$ELEMENT.size='mini'
     * vm.$store.state.tagsView.cachedViews=[]
     * 重新打开一个页面后，新的字体生效
     */
    handleSetSize(size) {
      // $ELEMENT是elementui 在Vue原型上加的属性：https://github.com/ElemeFE/element/blob/dev/src/index.js
      // 有啥用？待研究
      this.$ELEMENT.size = size
      this.$store.dispatch('app/setSize', size) // 修改state中size属性，Cookies中存放size属性
      this.refreshView()
      this.$message({
        message: 'Switch Size Success',
        type: 'success'
      })
    },
    refreshView() {
      // In order to make the cached page re-rendered
      this.$store.dispatch('tagsView/delAllCachedViews', this.$route)

      const { fullPath } = this.$route

      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath
        })
      })
    }
  }

}
</script>
