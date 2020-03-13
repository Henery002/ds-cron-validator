const FIELDLENGTH = 5;
const monthIndex = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};

const weekDayIndex = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
};

// 判断参数是否介于有效值范围内
const validInRange = (value, start, end) => {
  return value >= start && value <= end;
};

// 检测字段是否符合要求
const validFieldRange = (value, start, end) => {
  if (!/[\d-,*]/.test(value)) {
    return false;
  }

  return value.split(',').every(item => {
    const sides = item.split('-');

    switch (sides.length) {
      case 1:
        return value === '*' || validInRange(Number(sides[0]), start, end);
      case 2: {
        return (
          Number(sides[0]) <= Number(sides[1]) &&
          validInRange(Number(sides[0]), start, end) &&
          validInRange(Number(sides[1]), start, end)
        );
      }
      default:
        return false;
    }
  });
};

/**
 * month/weekday字段支持数字/字母简写，不支持 ? L W C # 特殊字符
 * @param {*} value
 * @param {*} matchTarget
 * @return index/value
 */
const matchValueIndex = (value, matchTarget) => {
  if (/^[a-zA-Z]{3}$/.test(value)) {
    return value
      .toLowerCase()
      .replace(/[a-z]{3}/, item => matchTarget[item] || item);
  }
  return value;
};

const validMinute = minute => validFieldRange(minute, 0, 59);
const validHour = hour => validFieldRange(hour, 0, 23);
const validDay = day => validFieldRange(day, 1, 31);
const validMonth = month =>
  validFieldRange(matchValueIndex(month, monthIndex), 1, 12);
const validWeekDay = weekday =>
  validFieldRange(matchValueIndex(weekday, weekDayIndex), 0, 6);

/**
 * 判断表达式是否符合cron规则
 * @param {string} cron - cron表达式
 * @description
 *  1. 默认无第二个参数
 *  2. 不支持second、year，只支持五位字段（min/hour/day/month/weekday）
 *  3. 各字段只支持 * , - 三种特殊字符，day/weekday字段不支持 ? L W # 字符
 *  4. month/weekday字段支持缩写、大小写
 */
const isValidCron = cron => {
  const fields = cron.split(/\s/);
  if (fields.length !== FIELDLENGTH) {
    return false;
  }
  return (
    validMinute(fields[0]) &&
    validHour(fields[1]) &&
    validDay(fields[2]) &&
    validMonth(fields[3]) &&
    validWeekDay(fields[4])
  );
};

export default isValidCron;
