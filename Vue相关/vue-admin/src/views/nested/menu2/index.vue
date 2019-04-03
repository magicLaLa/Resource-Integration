<template>
  <div id="menu2Box">
    <!-- 顶栏 -->
    <el-menu mode="horizontal" class="menuBox" :default-active="activeIndex" @select="handleSelect">
      <el-menu-item index="1">啦啦啦1</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
    </el-submenu>
      <!-- 禁用的按钮 -->
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <!-- 带跳转的 -->
      <el-menu-item index="4">
        <a href="https://www.baidu.com" target="_blank">订单管理</a>
      </el-menu-item>
    </el-menu>
    <!-- 侧栏 -->
    <div class="divMain">
      <el-scrollbar wrapClass="menu2Scroll">
        <el-menu
          mode="vertical"
          default-active="2"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <!-- 通过el-menu-item-group组件可以实现菜单进行分组，分组名可以通过title属性直接设定，也可以通过具名 slot 来设定。 -->
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
      <!-- div -->
      <div class="divR">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="onPreview"
          :on-remove="onRemove"
          :before-upload="beforeUpload"
          :on-success="onSuccess"
          :on-error="onError"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log('handleSelect', key, keyPath)
    },
    handleOpen (key, keyPath) {
      console.log('handleOpen', key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log('handleClose', key, keyPath)
    },
    onPreview (file) {
      console.log('onPreview', file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    onRemove (file, fileList) {
      console.log('onRemove', file, fileList)
    },
    beforeUpload (file) {
      console.log('beforeUpload', file)
      const fileSize = file.size / 1024 < 1.6
      if (!fileSize) {
        this.$message.error('上传头像图片大小不能超过 1.5MB!')
      }
      return fileSize
    },
    onSuccess (response, file, fileList) {
      console.log('onSuccess', response, file, fileList)
    },
    onError (err, file, fileList) {
      console.log('onError', err, file, fileList)
    }
  }
}
</script>

<style lang="scss">
#menu2Box .el-scrollbar {

  .el-scrollbar__view {
    height: 100%;
    ul {
      height: 100%;
    }
  }
}
#app #menu2Box .menu2Scroll .el-submenu__title .el-submenu__icon-arrow  {
  display: block;
}
</style>

<style lang="scss" scoped>
#menu2Box {
  width: 100%;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.divMain {
  flex: 1;
  display: flex;

  .el-scrollbar {
    flex: 1;
    height: calc(100% + 15px);
  }
  .divR {
    flex: 5;
  }
}
</style>
