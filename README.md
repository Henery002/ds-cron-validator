## cron validator

> date: 2020/03/12
> from: sandbox

Danastudio v4.5.2 自定义 cron 表达式校验规则

在 cron 表达式规则基础上定制部分内容，满足以下校验：

1. 默认无第二个参数
2. 不支持 second/year 字段，只支持五位字段（min/hour/day/month/weekday）
3. 各字段只支持 \* - , 三种特殊字符，day/weekday 字段不支持 ? L W C # 字符
4. month/weekday 字段支持缩写、大小写
5. 不支持表达式首尾空格，各字段间不支持多空格

enjoy!
