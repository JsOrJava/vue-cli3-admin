/**
 * @Description: 混入基础设施
 * @author liuwenhua@tianli.com
 * @date 2019-09-11
*/
export default {
    data () {
        return {
            tableMethod: '',
            queryParams: {},
            pageParams: {
                pageSize: 20,
                currentPage: 1,
                total: 0,
            }
        }
    },

    methods: {
        getTableParams () {
            return {}
        },
        getTableIndex (index) {
            const rowIndex = this.pageParams.pageSize * (this.pageParams.currentPage - 1) + index + 1
            return rowIndex < 10 ? `0${rowIndex}` : rowIndex
        },
        getTableList () {
            this.pageParams = {
                ...this.pageParams,
                currentPage: 1
            };
            this.queryParams = this.getTableParams()
            this.useTableMethod()
        },
        handleSizeChange (pageSize) {
            this.pageParams = {
                ...this.pageParams,
                pageSize,
            };
            this.queryParams = {
                ...this.queryParams,
                page: this.pageParams.currentPage,
                size: this.pageParams.pageSize,
            };
            this.useTableMethod()
        },
        handleCurrentChange (currentPage) {
            this.pageParams = {
                ...this.pageParams,
                currentPage,
            };
            this.queryParams = {
                ...this.queryParams,
                page: this.pageParams.currentPage,
            };
            this.useTableMethod();
        },
        useTableMethod () {
            this[this.tableMethod]()
        },
        routerBack () {
            this.$router.back()
        },
        /**
         * 用来显示提示信息，判断是否要删除记录
         * @param msg {String} 传入提示信息字符串
         * @param titleStr {String} 传入弹框标题，默认为确认删除
         * @return {String} 返回接口返回参数
         * @author 刘文华
         */
        /* eslint-disable */
        _deleteRecord (msg='您确定删除选中数据吗？', titleStr = '确认删除') {
            return new Promise((resolve, reject) => {
                this.$confirm(
                    `<div style="color: #ff6660;">${msg}</div> `,
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        dangerouslyUseHTMLString: true,
                        title: titleStr
                    }
                ).then(() => {
                    resolve()
                }).catch((err) => {
                    this.$message.info('您已取消操作')
                    // reject(err)
                })
            })
        },
        /**
         * 表单校验
         * @param target 当前Vue实例
         * @param form {String} 表单ref
         * @return Promise对象：可执行;false：不可执行
         * @author 刘文华
         */
        /* eslint-disable */
        _checkForm (target, form) {
            return new Promise((resolve, reject) => {
                target.$refs[form].validate((valid) => {
                    if (valid) {
                        resolve()
                    } else {
                        this.$message.warning('您的信息没有填写完全，请补充')
                        return false
                    }
                })
            })
        },
        /**
         * 函数节流
         * @param method 需要节流的函数
         * @param delay  延时时间
         * @param duration 时间间隔
         * @returns {Function}
         * @private
         * @author 刘文华
         */
        /* eslint-disable */
        _throttle (method, delay = 300, duration = 500) {
            let timer = null
            let begin = new Date()
            return function () {
                let context = this
                let args = arguments
                let current = new Date()

                if (current.getTime() - begin.getTime() >= duration) {
                    method.apply(context, args)
                    begin = current
                } else {
                    timer = setTimeout(function () {
                        method.apply(context, args)
                    }, delay, duration)
                }
            }
        }
    }
}
