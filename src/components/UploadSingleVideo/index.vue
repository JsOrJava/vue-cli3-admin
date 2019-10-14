/**
* @Description: 上传个视频 - 核心思想复杂类型引用类型公用同一个指针
* @author liuwenhua@tianli.com
* @date 2019-07-30
*/
<template>
  <div class="upload-file__wrapper clear">
    <div class="video-wh fl mr10" v-show="videoUploadUrl">
      <video ref="single-video" class="child" :src="videoUploadUrl" controls="controls" v-bind="$attrs" v-on="$listeners">
        您的浏览器不支持 video 标签。
      </video>
      <i class="el-icon-circle-plus-outline expanded-icon u-btn__cursor--p" title="放大视频" @click="handlePictureCardPreview"></i>
      <i class="el-icon-delete delete-icon u-btn__cursor--p" title="删除视频" @click="handleRemove"></i>
    </div>
    <el-upload
      class="fl mr10"
      :class="videoUploadUrl ? 'conceal--upload__image' : ''"
      accept=".mp4,.ogg"
      action=""
      :http-request="getAuthorizationT"
      list-type="picture-card"
      :show-file-list="false">
      <slot name="content">
        <i class="el-icon-plus"></i>
      </slot>
    </el-upload>
    <el-dialog
      title="视频展示"
      top="15vh"
      width="540px"
      :visible.sync="dialogConfig.dialogVisible"
      append-to-body>
      <video class="w480" style="max-height: 480px;" :src="dialogConfig.dialogImageUrl" controls="controls">
        您的浏览器不支持 video 标签。
      </video>
    </el-dialog>
  </div>
</template>
<script>
  import { validationStorage, ossStorage } from '@/api/storage-oss';
  export default {
    name: 'upload-image',
    components: {},
    props: {
      videoUrl: {
        default: ''
      }
    },
    data () {
      return {
        videoUploadUrl: null,
        // 弹框参数
        dialogConfig: {
          dialogVisible: false, // 是否显示
          dialogImageUrl: '' // 图片地址
        }
      }
    },

    watch: {
      videoUrl: {
        handler: function (val) {
          this.videoUploadUrl = val
        },
        immediate: true
      }
    },

    methods: {
      // 上传图片
      async getAuthorizationT(item) {
        try {
          let res = await validationStorage(item.file.type)
          const formData = new FormData()
          const ossUrl = res.data.data.url
          const arr = ['OSSAccessKeyId', 'Signature', 'callback', 'key', 'policy', 'Content-Type']
          arr.forEach(neItem => {
            formData.append(neItem, res.data.data[neItem])
          });
          formData.append('file', item.file)
          let ossRes = await ossStorage(ossUrl, formData)
          if (ossRes.data.errno === 0) {
            this.videoUploadUrl = ossRes.data.data.url
            this.$emit('update:videoUrl', this.videoUploadUrl)
          } else {
            this.$message.error(ossRes.data.errmsg)
          }
        } catch (err) {
          this.$message.error('授权失败，请重新授权')
        }
      },
      // 点击文件列表中已上传的文件时的钩子
      handlePictureCardPreview () {
        this.dialogConfig.dialogImageUrl = this.videoUploadUrl
        this.dialogConfig.dialogVisible = true
      },
      handleRemove () {
        this.videoUploadUrl = null
      }
    }
  }
</script>
<style lang="scss" scoped>
  .upload-file__wrapper {
    /deep/ .el-upload--picture-card{
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
    .el-upload-list--picture-card .el-upload-list__item {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0,0,0,.5);
      -webkit-transition: opacity .3s;
      transition: opacity .3s;
    }
    .conceal--upload__image /deep/ .el-upload--picture-card {
      display: none;
    }
    .video-wh {
      width: 148px;
      height: 148px;
      position: relative;
      .child {
        width: 100%;
        height: 100%;
      }
      .expanded-icon {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 18px;
        color: green;
        background-color: #d8dce5;
      }
      .delete-icon {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 18px;
        color: red;
        background-color: #d8dce5;
      }
    }
  }
</style>
