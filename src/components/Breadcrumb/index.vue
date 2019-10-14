/* eslint-disable */
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/" style="float: left;line-height: 70px">
    <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index)  in levelList" :key="item.path + index">
          <template v-if="item.meta.title">
             <span v-if="item.redirect === 'noredirect' || index == levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
             <router-link v-else :to="item.redirect || item.path">{{item.meta.title}}</router-link>
          </template>
        </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    /* eslint-disable */
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name !== 'index') {
        matched = [{ path: '/index', meta: { title: '首页' } }].concat(matched)
      }
      this.levelList = matched
    }
  },
  created() {
    this.getBreadcrumb()
  }
}
</script>

<style  lang="scss" scoped>
  /deep/ .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
    font-weight: 700;
    text-decoration: none;
    -webkit-transition: color .2s cubic-bezier(.645,.045,.355,1);
    transition: color .2s cubic-bezier(.645,.045,.355,1);
    color: #fff;
  }
  /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
    font-weight: 400;
    color: #fff;
    cursor: text;
  }
  /deep/ .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    line-height: 10px;
    margin-left: 20px;
    a {
      font-weight: 400 !important;
    }
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
  /*breadcrumb*/
  .breadcrumb-enter-active,
  .breadcrumb-leave-active {
    transition: all .5s;
  }

  .breadcrumb-enter,
  .breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(20px);
  }

  .breadcrumb-move {
    transition: all .5s;
  }

  .breadcrumb-leave-active {
    position: absolute;
  }
  /*fade*/
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.28s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>
