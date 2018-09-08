const Utils =  {
  formatNum(value, isFixed) {

    function isInt(number) {
      return parseInt(number) == number;
    }

    function isFixedX(num) {
      if (isFixed || (isFixed == 0) || (isFixed == '0')) {
        return Number(num).toFixed(Number(isFixed));
      }
      return num;
    }

    function formatNumToY(num, flag) {

      function isFixedX(num) {
        if (flag || (flag == 0) || (flag == '0')) {
          try {
            return num.toFixed(Number(flag));
          } catch (e) {
            return num;
          }
        }
        return num;
      }
      /**
       *  十、百 不做格式化处理
       */

      if (Math.abs(num) >= 1000) {
        // return isFixedX(num);
        return isInt(num / 1000) ? num / 1000 + "千" : isFixedX(num);
      } else if (Math.abs(num) >= 100) {
        // return isInt(num / 100) ? num / 100 + " 百" : isFixedX(num);
        return isFixedX(num);
      } else if (Math.abs(num) >= 10) {
        // return isInt(num / 10) ? num / 10 + " 十" : isFixedX(num);
        return isFixedX(num);
      } else {
        return isFixedX(num);
      }
    }

    if (Math.abs(value) >= 100000000) {
      return ((value / 100000000) > 100) ? (formatNumToY(value / 100000000, isFixed) + '亿') : (isFixedX(value / 100000000) + '亿');
    } else if (Math.abs(value) >= 10000) {
      return ((value / 10000) > 100) ? (formatNumToY(value / 10000, isFixed) + '万') : (isFixedX(value / 10000) + '万');
    } else if (Math.abs(value) < 10000) {
      return (Math.abs(value) >= 100) ? formatNumToY(value, isFixed) : isFixedX(value);
    } else return formatNumToY(value, isFixed);
  },
  formatQueryObj(queryObj) {
    let queryStr = ''
    Object.keys(queryObj).forEach((key, index) => {
      const value = queryObj[key]
      if (!value) return
      if (index === 0) {
        queryStr += `?${key}=${value}`
      } else {
        queryStr += `&${key}=${value}`
      }
    })
    return queryStr
  },
}

export {
  Utils
}