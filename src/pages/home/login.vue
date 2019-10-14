<template>
    <div class="login-wrap__ f-va-tx-middle">
        欢迎来到管理端
        <p class="f-margin-bottom20">
            {{222 | convertCurrencyFilter}}
        </p>


        <div style="position: relative;" class="f-margin-bottom20">
            <editor :init="editorInit" v-model="detail"></editor>
            <editor-image @successCBK="imageSuccessCBK"></editor-image>
        </div>

        <el-table
            class="f-margin-bottom20"
            :data="tableData"
            style="width: 100%">
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column prop="" label="操作">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="pagination-container f-margin-bottom20">
            <el-pagination align="left" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageParams.currentPage"
                           :page-sizes="[10,20,30,40]" :page-size="pageParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageParams.total">
            </el-pagination>
        </div>

        <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

        <el-dialog
            v-dialogDrag
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
                <el-form :inline="true" :model="form" ref="form">
                    <el-form-item label="客户手机号：" class="el-form-item-child" prop="mobile"
                    :rules="{required: true, message:'不能为空', triangle: 'blur'}">
                        <el-input v-model="form.mobile" placeholder="请输入手机号" size="mini" clearable style="width: 200px;"></el-input>
                    </el-form-item>

                    <el-form-item label="样图" prop="image"  :rules="[{ required: true, message:'请上传样图', trigger:'blur' }]">
                        <upload-single-image
                                :imgUrl.sync="form.image">
                        </upload-single-image>
                        <p>支持jpg/jpeg/png格式，建议311px*311px</p>
                    </el-form-item>

                    <el-form-item label="宣传画廊" prop="gallerylList"  :rules="[{ required: true, message:'请上传宣传画廊', trigger:'blur' }]">
                        <upload-multiple-image
                                :photoList="form.gallerylList"
                                :limit="6">
                        </upload-multiple-image>
                        <p>支持jpg/jpeg/png格式，建议495px*495px</p>
                    </el-form-item>
                </el-form>
                 <span slot="footer" class="dialog-footer">
                 <el-button @click="dialogVisible = false">取 消</el-button>
                 <el-button type="primary" @click="handleSubmit('form')">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import EditorImage from '@/components/EditImage'
import UploadSingleImage from '@/components/UploadSingleImage'
import UploadMultipleImage from '@/components/UploadMultipleImage'
import { validationStorage, ossStorage } from '@/api/storage-oss'

    export default {
    name: "index",
    components: {
        Editor,
        EditorImage,
        UploadSingleImage,
        UploadMultipleImage
    },
    data() {
        return {
            tableMethod: 'apiTableData',
            queryParams: {
                name: null
            },
            form: {
                mobile: null,
                image: null,
                gallerylList: []
            },
            detail: null,
            dialogVisible: false,
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            editorInit: {
                language: 'zh_CN',
                plugins: ['advlist anchor autolink autoresize autosave emoticons fullscreen hr image imagetools importcss insertdatetime legacyoutput link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace tabfocus table template textcolor textpattern visualblocks visualchars wordcount'],
                toolbar: ['fontsizeselect bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript ', 'hr bullist numlist link image charmap preview anchor pagebreak fullscreen media table emoticons forecolor backcolor'],
                images_upload_handler: function(blobInfo, success, failure) {
                    validationStorage(blobInfo.blob().type).then(res => {
                        const formData = new FormData()
                        const ossUrl = res.data.data.url
                        formData.append('OSSAccessKeyId', res.data.data.OSSAccessKeyId)
                        formData.append('Signature', res.data.data.Signature)
                        formData.append('callback', res.data.data.callback)
                        formData.append('key', res.data.data.key)
                        formData.append('policy', res.data.data.policy)
                        formData.append('Content-Type', res.data.data['Content-Type'])
                        formData.append('file', blobInfo.blob())
                        ossStorage(ossUrl, formData).then(ossRes => {
                            if (ossRes.data.errno === 0) {
                                success(ossRes.data.data.url)
                            } else {
                                this.$message.error(ossRes.data.errmsg)
                                return
                            }
                        })
                    }).catch(() => {
                        failure('上传失败，请重新上传')
                    })
                }
            }
        }
    },
    methods: {
        /* eslint-disable */
        async handleSubmit (form) {
            await this._checkForm(this, form)
            console.info(1111)
        },
        /* eslint-disable */
        handleDelete ({ date }) {
            this._deleteRecord()
            console.info(date)
        },
        /* eslint-disable */
        getTableParams () {
            return {
                ...this.queryParams,
                page: this.pageParams.currentPage,
                size: this.pageParams.pageSize,
            }
        },
        async apiTableData () {
            const res = await Promise.resolve([])
            this.tableData = res
        },
        handleClose() {

        },
        // tinymce多图片上传
        imageSuccessCBK(arr) {
            const _this = this
            arr.forEach(v => {
                _this.detail ?
                    _this.detail = _this.detail + `<img class="wscnph" src="${v.url}" >` :
                    _this.detail = `<img class="wscnph" src="${v.url}" >`
            })
        }
    }
}
</script>

<style scoped>

</style>
