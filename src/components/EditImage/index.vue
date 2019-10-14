<template>
  <div class="tinymec-pic">
    <el-button :style="{background:color,borderColor:color}" size="mini" type="primary" @click=" dialogVisible=true">多图上传
    </el-button>
    <form-dialog
      title="多图上传"
      :show.sync="dialogVisible"
      :handleClose="handleCancel"
      class="editor-image" append-to-body>
      <div slot="content">
        <el-upload
          :multiple="true"
          :file-list="fileList"
          :show-file-list="true"
          :on-remove="handleRemove"
          class="editor-slide-upload"
          action=""
          :http-request="tinymceImgLoad"
          list-type="picture-card">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
      <div slot="footer">
        <el-button size="medium" @click="handleCancel">取消</el-button>
        <el-button size="medium" type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </form-dialog>
  </div>
</template>

<script>
import { validationStorage, ossStorage } from '@/api/storage-oss'
import FormDialog from '@/components/FormDialog'

export default {
  name: 'EditImage',
  components: {
    FormDialog
  },
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      fileList: [],
      listItem: ''
    }
  },
  methods: {
    // 取消操作
    handleCancel() {
      this.dialogVisible = false
      this.fileList = []
    },
    handleSubmit() {
      if (!this.fileList.length) {
        this.$message.warning('请上传至少一张图片')
        return
      }
      this.$emit('successCBK', this.fileList)
      this.handleCancel()
    },
    handleRemove(file) {
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].url === file.url) {
          this.fileList.splice(i, 1)
        }
      }
    },
    tinymceImgLoad(item) {
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
            this.listItem = {
              url: item.file.name
            }
            this.listItem.url = ossRes.data.data.url
            this.fileList.push(this.listItem)
          } else {
            this.$message.error(ossRes.data.errmsg)
            return
          }
        })
      }).catch(() => {
        this.$message.error('授权失败，请重新授权')
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tinymec-pic {
  position: absolute;
  right: 5px;
  top: -3px;
}
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
