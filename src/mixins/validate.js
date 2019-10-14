export default {
  methods: {
    // 价格校验-可以输入0
    validator_prices_zero (rule, value, callback) {
      let reg = /^(([0-9])|([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
      if (value === '' || value === null || value === undefined) {
        callback(new Error('请填写价格'));
      } else if (!reg.test(value)) {
        callback(new Error('请输入正确格式的价格'));
      } else {
        callback();
      }
    },
    validator_phone(rule, value, callback) {
      let reg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
      if (value === '' || value === null || value === undefined) {
        callback(new Error('请输入手机号'));
      } else if (!reg.test(value)) {
        callback(new Error('手机号码格式不正确'));
      } else {
        callback();
      }
    },
    validator_serialNum(rule, value, callback) {
      let reg = /^[A-Za-z0-9]+$/;
      if (value === '' || value === null || value === undefined) {
        callback(new Error('请填写编号'));
      } else if (!reg.test(value)) {
        callback(new Error('请输入由数字及字母组成的编号'));
      } else {
        callback();
      }
    },
    validator_rate(rule, value, callback) {
      let reg = /^([0-9]*)+(.[0-9]{1,2})?$/;
      if (value === '' || value === null || value === undefined) {
        callback(new Error('请填写比例'));
      } else if (!reg.test(value)) {
        callback(new Error('数据不符合规范，（保留两位小数）'));
      } else {
        callback();
      }
    },
    validator_bankCard(rule, value, callback) {
      let reg = /^([1-9]{1})(\d{15}|\d{18})$/;
      if (value === '' || value === null || value === undefined) {
        callback(new Error('请填写银行账号'));
      } else if (!reg.test(value)) {
        callback(new Error('银行账号16或19位，且首位不能为0'));
      } else {
        callback();
      }
    },
    validator_passWord(rule, value, callback) {
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
      if (!reg.test(value)) {
        callback(new Error('请输入6～16位数字和字母'));
      } else {
        callback();
      }
    },
    validator_account(rule, value, callback) {
      let reg = /^[0-9a-zA-Z]{2,10}$/;
      if (!reg.test(value)) {
        callback(new Error('请输入2～10位登录账号'));
      } else {
        callback();
      }
    },
    validator_numberW(rule, value, callback) {
      let reg = /^[a-zA-Z0-9]+$/;
      if (value === '' || value === null || value === undefined) {
        callback(new Error('运单号不能为空'));
      } else if (!reg.test(value)) {
        callback(new Error('运单格式不正确'));
      } else {
        callback();
      }
    },
    validator_shipFees(rule, value, callback) {
      let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if (value === '' || value === null || value === undefined) {
        callback(new Error('请输入运费'));
      } else if (!reg.test(value)) {
        callback(new Error('运费不能小于0且最多2位小数'));
      } else {
        callback();
      }
    },
    validator_idCard(rule, value, callback) {
      let city = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江 ',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北 ',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏 ',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外 ',
      };
      let tip = '';
      let pass = true;

      if (!value || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)) {
        tip = '身份证号格式错误';
        callback(new Error('身份证号格式错误'));
        pass = false;
      } else if (!city[value.substr(0, 2)]) {
        tip = '地址编码错误';
        callback(new Error('地址编码错误'));
        pass = false;
      } else {
        // 18位身份证需要验证最后一位校验位
        if (value.length === 18) {
          value = value.split('');
          // ∑(ai×Wi)(mod 11)
          // 加权因子
          let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          // 校验位
          let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
          let sum = 0;
          let ai = 0;
          let wi = 0;
          for (let i = 0; i < 17; i++) {
            ai = value[i];
            wi = factor[i];
            sum += ai * wi;
          }
          if ('' + parity[sum % 11] !== value[17]) {
            tip = '校验位错误';
            callback(new Error('校验位错误'));
            pass = false;
          }
        }
      }
      callback();
      return pass;
    },
  },
};
