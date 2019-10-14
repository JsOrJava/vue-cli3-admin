/**
 * @Description: 上传单个图片 - 核心思想vue .sync语法糖
 * @author liuwenhua@tianli.com
 * @date 2019-07-30
*/
<template>
  <div class="upload-file__wrapper">
    <el-upload
      class="avatar-uploader"
      action=""
      :http-request="getAuthorization"
      list-type="picture-card"
      :show-file-list="false"
      accept=".jpg,.jpeg,.png,.gif">
      <img v-if="picUrl" :src="picUrl" class="pro-img">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { validationStorage, ossStorage } from '@/api/storage-oss'

export default {
  name: "UploadSigleImage",
  props: {
    imgUrl: {
      default: ''
    }
  },

  data () {
    return {
      picUrl: null
    }
  },

  watch: {
    imgUrl: {
      handler: function (val) {
        this.picUrl = val
      },
      immediate: true
    }
  },

  methods: {
    // 上传图片
    getAuthorization(item) {
      validationStorage(item.file.type).then(res => {
        const formData = new FormData()
        const ossUrl = res.data.data.url
        formData.append('OSSAccessKeyId', res.data.data.OSSAccessKeyId)
        formData.append('Signature', res.data.data.Signature)
        formData.append('callback', res.data.data.callback)
        formData.append('key', res.data.data.key)
        formData.append('policy', res.data.data.policy)
        formData.append('Content-Type', res.data.data['Content-Type'])
        formData.append('file', item.file)
        ossStorage(ossUrl, formData).then(ossRes => {
          if (ossRes.data.errno === 0) {
            this.picUrl = ossRes.data.data.url
            this.$emit('update:imgUrl', this.picUrl)
          } else {
            this.$message.error(ossRes.data.errmsg)
            return
          }
        })
      }).catch(() => {
        this.$message.error('授权失败，请重新授权')
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .upload-file__wrapper {
    /deep/ .el-upload--picture-card {
      background-color: #fbfdff;
      border: 1px dashed #c0ccda;
      border-radius: 6px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 148px;
      height: 148px;
      line-height: 146px;
      vertical-align: top;
    }
  }
</style>
