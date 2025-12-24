> 该项目是在[wao3/luogu-stats-card](https://github.com/wao3/luogu-stats-card)和[yrxdzj/luogu-card/](https://github.com/cyrxdzj/luogu-card/)的基础上三次开发的，感谢TA们的贡献。

> 注意：为了不滥用洛谷服务器流量，本项目利用 vercel 的边缘缓存功能缓存了 12 小时数据，即同一个用户卡片 **24 小时内最多只会向洛谷服务器请求 2 次数据**，并且只有在用户访问卡片时才会请求数据。不过，可以禁用缓存。

## 简介

`luogu-excard`是一个动态生成洛谷用户数据卡片的工具，可以展示自己的做题情况。可以用于个人主页、博客、github等可以插入图片的地方。

## TODO

- [x] ~~修复获取数据错误和用户设置数据不可见的bug~~
- [x] ~~增加黑暗模式~~
- [x] ~~增加咕值卡片~~

以上内容由第一位作者完成。

- [x] ~~增加About卡片~~ 
- [x] ~~增加用户 tag~~
- [x] ~~增加“卡片生成时间”标签~~
- [x] ~~自动从咕值排名中获取咕值~~
- [x] ~~禁用缓存~~
- [x] ~~在练习情况里增加“写挂了”（实际执行情况是“心有余而力不足”）~~（蒟蒻我觉得不好看，去掉了）

以上内容由第二位作者完成。

- [x] 通过数加减法
- [ ] 用户练习情况比较
- [ ] 链接域名以支持国内直接使用

## 如何使用

卡片用图片的方式嵌入。markdown语法如下：

```markdown
![描述信息](链接）
```

### 基本信息

![Sin Watt 的基本信息](https://luogu-excard.vercel.app/about?id=883464)

此卡片用于显示一个用户的基本信息，包括用户类型、关注、咕值排名、个性签名。

```markdown
![Sin Watt 的基本信息](https://luogu-excard.vercel.app/about?id=883464)
```

### 练习情况

![Sin Watt 的练习情况](https://luogu-excard.vercel.app/practice?id=883464)

```markdown
![Sin Watt 的练习情况](https://luogu-excard.vercel.app/practice?id=883464)
```

### 咕值信息

![Sin Watt 的咕值信息](https://luogu-excard.vercel.app/guzhi?id=883464)

~~咕值信息一般无法自动获取数据，如果需要必须要提供cookie，但是这种方法十分不安全，并且不方便。所以获取咕值卡片可能需要手动输入咕值信息，具体使用方法如下：~~

~~复制以下内容到任意 markdown 编辑器中，并将 `?id=`后面的数字更改为自己的 id，将`scores=`后面更换为自己的咕值信息，一共 5 个数字，用逗号分隔。~~

现在 luogu 支持查看别人的咕值了。

```markdown
![Sin Watt 的咕值信息](https://luogu-excard.vercel.app/guzhi?id=883464)
```


### 通过数加减法

引用通过题目的数量进行加减，返回一个数字。这个东西用法宽泛。比如

> 距离做题数严格单调递增，仅差![220](https://luogu-excard.vercel.app/calc?ask=883464_6-883464_7+1&co_fr=e74c3c)道黑题

```markdown
距离做题数严格单调递增，仅差![220](https://luogu-excard.vercel.app/calc?ask=883464_6-883464_7+1&co_fr=e74c3c)道黑题
```

关于问号后的参数。

1. `ask=` 后接一个计算式。
    - 用 `id_p` 代表某个人某个难度的题目的通过数，`0-7` 分别表示从 `未评定` 到 `NOI/NOI+/CTSC`。id不要求是同一个人的，但要求每一个人都没开完隐。
    - 允许计算式中有数字常量。
    - 允许且仅允许加减法，但可以没有一次加减计算。**~~注意：由于URL中 `+` 有特殊含义，所以需要用转义符 `%2B`。~~ 已暴力解决**
    - 参考正则匹配方案 `[1-9]\d*(_[0-7])?([-+ ][1-9]\d*(_[0-7])?)*`。
3. `co_fr=` 和 `co_ba=` 后接一个十六进制颜色，分别表示前景色和后景色。默认前黑后白。**注意：由于URL中 `#` 有特殊含义，所以不写 '#'，或用转义符 `%23`**。
4. `fo_si=` 后接一个数字，表字号。默认 30。
5. 下面自定义选项都不可用。

### 自定义选项

使用卡片时，支持设定自定义效果选项，可以组合使用。

1. **隐藏标题**，只需在链接最后带上`&hide_title=true`即可，例如：

   ```markdown
   ![Sin Watt 的练习情况](https://luogu-excard.vercel.app/practice?id=883464&hide_title=true)
   ```

   效果：

   ![Sin Watt 的练习情况](https://luogu-excard.vercel.app/practice?id=883464&hide_title=true)

2. **黑暗模式**，只需在链接最后带上`&dark_mode=true`即可，例如：

   ```markdown
   ![Sin Watt 的练习情况](https://luogu-excard.vercel.app/practice?id=883464&dark_mode=true)
   ```

   效果：

   ![Sin Watt 的练习情况](https://luogu-excard.vercel.app/practice?id=883464&dark_mode=true)

3. **自定义宽度**，默认500，限制宽度在500到1920之间，只需在链接最后带上`&card_width=需要的宽度`即可，例如：

   ```markdown
   ![Sin Watt 的练习情况](https://luogu-excard.vercel.app/practice?id=883464&card_width=750)
   ```

   效果：

   ![Sin Watt 的练习情况](https://luogu-excard.vercel.app/practice?id=883464&card_width=750)
   
4. **禁用缓存**，默认情况下，程序会有12小时的缓存。但是只需在链接最后带上`&disable_cache=true`即可禁用缓存，每次访问都将刷新。

## 如何参与贡献

#### 提供bug反馈或建议

使用 [issue](https://github.com/Lim-Watt/luogu-excard/issues) 反馈bug时，尽可能详细描述 bug 及其复现步骤

#### 贡献代码的步骤

1. fork项目到自己的repo
2. 把fork过去的项目也就是你的项目clone到你的本地
3. 修改代码
4. commit后push到自己的库
5. 在Github首页可以看到一个 pull request 按钮，点击它，填写一些说明信息，然后提交即可。
6. 等待作者合并

## 其他

如果对你有所帮助的话，希望能在右上角点一个 star (★ ω ★)
