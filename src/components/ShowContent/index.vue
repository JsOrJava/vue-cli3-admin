<template>
  <div>
    <div v-show="isOpened">
      <slot name="content"></slot>
    </div>
    <div class="collapse-box">
      <el-button type="text" :icon="isOpened ?  'el-icon-arrow-up' : 'el-icon-arrow-down'" @click="()=> $emit('update:isOpened', !isOpened)">
        {{ isOpened ?  '收起' : '展开更多信息' }}
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    isOpened: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .collapse-box{
    border-top: 1px dashed #dcdfe6;
    text-align: center;
    margin-bottom: 20px;
    .el-button{
      margin-top: -1px;
      border: 1px dashed #dcdfe6;
      border-top: none;
      background-color: #ffffff;
      padding: 12px;
      outline: none;
    }
  }
</style>
