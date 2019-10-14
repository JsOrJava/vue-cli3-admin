/**
 * @Description: 基础校验规则
 * @author liuwenhua@tianli.com
 * @date 2019-09-02
*/

const validators = {
  // 纯英文
  isPureEnglish: source => /^[a-zA-Z]*$/.test(source),

  // 纯汉字
  isPureChinese: source => /^[\u4e00-\u9fa5]*$/.test(source),

  // 纯数字
  isPureNumber: source => /^\d+$/.test(source),

  // url
  isUrl: source =>  /^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]*$/.test(source),

  // 邮箱
  isEmail: source => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(source),

  // IP 地址
  isIP: source => /(?=(\b|\D))(((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))(?=(\b|\D))/.test(source),

  // 手机号码
  isMobile: source => /^(13[0-9]|14[579]|15[0-3,5-9]|166|17[0135678]|18[0-9]|19[89])\d{8}$/.test(source),

  // 座机号码
  isTelephone: source => /0\d{2,3}-\d{7,8}/.test(source),

  // 身份证号
  isIDCard: source => /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(source),

  // 银行卡号
  isCreditCardNo: source => /^(\d{16}|\d{19})$/.test(source),

  // 包含汉字
  hasChinese: source => /[\u4e00-\u9fa5]/.test(source),

  // 包含数字
  hasNumber: source => /\d/.test(source),

  // 包含英文
  hasEnglish: source => /[a-zA-Z]/.test(source),

  // 包含空格
  hasEmpy: source => /\s/.test(source),

  // 包含特殊字符
  hasSpecialCharacter: source => /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#¥%⋯⋯&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im.test(source),

  // 包含 emoji
  hasEmoji: source => /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g.test(source)
}

export default validators
