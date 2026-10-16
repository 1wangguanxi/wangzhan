/* ============================================================
   cases.html 页面专属脚本 page-cases.js（原生 ES6，零依赖）
   ------------------------------------------------------------
   功能：
   1. 专业筛选器：按钮式 tab 过滤案例卡，无结果时显示空状态；
   2. 案例详情弹窗 #case-modal：点击案例卡弹出，数据取自下方
      CASE_DATA（50 条真实辅导案例），支持左右翻图；
   3. 合作院校封面灯箱 #img-lightbox：点击封面缩略图放大查看。
   与 main.js 并存：挂在 window.YH 命名空间下，不改 main.js。
   兼容：iOS12+ / Android8+（不使用 ?. ?? 等新语法）。
   ============================================================ */
(function (window, document) {
  'use strict';

  var YH = window.YH = window.YH || {};

  /* ---------- 138 条真实辅导案例数据（原创素材，截图均已脱敏） ---------- */
  var CASE_DATA = [{"id": 1, "cat": "单片机·电气", "title": "STM32水质检测系统（PH/浊度/温度）", "imgs": ["images/cases/mcu/mcu-02.webp", "images/cases/mcu/mcu-05.webp"]}, {"id": 2, "cat": "单片机·电气", "title": "RFID智能门禁系统", "imgs": ["images/cases/mcu/mcu-08.webp", "images/cases/mcu/mcu-01.webp"]}, {"id": 3, "cat": "单片机·电气", "title": "紫色PCB万年历（DS1302+温湿度）", "imgs": ["images/cases/mcu/mcu-07.webp"]}, {"id": 4, "cat": "单片机·电气", "title": "太阳能自动追光装置", "imgs": ["images/cases/mcu/mcu-12.webp"]}, {"id": 5, "cat": "单片机·电气", "title": "智能浇花/环境控制系统", "imgs": ["images/cases/mcu/mcu-13.webp", "images/cases/mcu/mcu-04.webp"]}, {"id": 6, "cat": "单片机·电气", "title": "气体监测报警装置（双MQ传感器）", "imgs": ["images/cases/mcu/mcu-16.webp"]}, {"id": 7, "cat": "PLC·工控", "title": "四层电梯PLC控制系统仿真", "imgs": ["images/cases/plc/plc-01.webp"]}, {"id": 8, "cat": "PLC·工控", "title": "智能产线全自动锁螺丝机控制", "imgs": ["images/cases/plc/plc-03.webp"]}, {"id": 9, "cat": "PLC·工控", "title": "智能调温座椅控制系统", "imgs": ["images/cases/plc/plc-05.webp"]}, {"id": 10, "cat": "PLC·工控", "title": "印刷机PLC控制系统（三菱）", "imgs": ["images/cases/plc/plc-11.webp", "images/cases/plc/plc-12.webp"]}, {"id": 11, "cat": "PLC·工控", "title": "输液管生产线控制系统", "imgs": ["images/cases/plc/plc-18.webp"]}, {"id": 12, "cat": "PLC·工控", "title": "大型水库闸门控制系统", "imgs": ["images/cases/plc/plc-20.webp"]}, {"id": 13, "cat": "PLC·工控", "title": "楼宇风机照明智能控制", "imgs": ["images/cases/plc/plc-23.webp", "images/cases/plc/plc-24.webp"]}, {"id": 14, "cat": "PLC·工控", "title": "板栗制品生产线控制系统", "imgs": ["images/cases/plc/plc-25.webp"]}, {"id": 15, "cat": "PLC·工控", "title": "视觉筛选检测系统", "imgs": ["images/cases/plc/plc-58.webp"]}, {"id": 16, "cat": "PLC·工控", "title": "变频恒压供水系统", "imgs": ["images/cases/plc/plc-60.webp"]}, {"id": 17, "cat": "机械", "title": "管件自动上料搬运设备设计", "imgs": ["images/cases/mech/mech-02.webp"]}, {"id": 18, "cat": "机械", "title": "吊装工装夹具设计", "imgs": ["images/cases/mech/mech-04.webp"]}, {"id": 19, "cat": "机械", "title": "桌面式PCB雕刻机设计", "imgs": ["images/cases/mech/mech-05.webp", "images/cases/mech/mech-06.webp", "images/cases/mech/mech-49.webp"]}, {"id": 20, "cat": "机械", "title": "车门锁机构设计与有限元分析", "imgs": ["images/cases/mech/mech-17.webp", "images/cases/mech/mech-18.webp", "images/cases/mech/mech-19.webp"]}, {"id": 21, "cat": "机械", "title": "小型电动起重机设计", "imgs": ["images/cases/mech/mech-09.webp", "images/cases/mech/mech-12.webp", "images/cases/mech/mech-47.webp"]}, {"id": 22, "cat": "机械", "title": "ANSYS结构仿真分析", "imgs": ["images/cases/mech/mech-23.webp", "images/cases/mech/mech-24.webp", "images/cases/mech/mech-25.webp", "images/cases/mech/mech-48.webp"]}, {"id": 23, "cat": "机械", "title": "二级减速器设计", "imgs": ["images/cases/mech/mech-26.webp", "images/cases/mech/mech-43.webp", "images/cases/mech/mech-50.webp", "images/cases/mech/mech-51.webp"]}, {"id": 24, "cat": "机械", "title": "料袋码垛机器人设计", "imgs": ["images/cases/mech/mech-33.webp"]}, {"cat": "机械", "title": "固定板换热器（壳管式）设计", "imgs": ["images/cases/mech/mech-01.webp"], "id": 25}, {"cat": "机械", "title": "带料斗自动化加工设备", "imgs": ["images/cases/mech/mech-03.webp"], "id": 26}, {"cat": "机械", "title": "工装零件工程图（卡板/止动爪）", "imgs": ["images/cases/mech/mech-15.webp", "images/cases/mech/mech-16.webp"], "id": 27}, {"cat": "机械", "title": "管道检测爬行机器人", "imgs": ["images/cases/mech/mech-21.webp"], "id": 28}, {"cat": "机械", "title": "四旋翼无人机结构设计", "imgs": ["images/cases/mech/mech-22.webp"], "id": 29}, {"cat": "机械", "title": "皮带输送机参数化设计", "imgs": ["images/cases/mech/mech-30.webp"], "id": 30}, {"cat": "机械", "title": "履带式机器人底盘", "imgs": ["images/cases/mech/mech-35.webp"], "id": 31}, {"cat": "机械", "title": "双螺旋输送搅拌装置", "imgs": ["images/cases/mech/mech-36.webp"], "id": 32}, {"cat": "机械", "title": "翻转工装夹具设计", "imgs": ["images/cases/mech/mech-44.webp", "images/cases/mech/mech-45.webp", "images/cases/mech/mech-46.webp"], "id": 33}, {"cat": "机械", "title": "叶片泵装配与图纸（长图）", "imgs": ["images/cases/mech/mech-40.webp"], "id": 34}, {"cat": "机械", "title": "阀门装配与CAD图纸（长图）", "imgs": ["images/cases/mech/mech-41.webp"], "id": 35}, {"cat": "机械", "title": "球阀等CAD图纸拼版（长图）", "imgs": ["images/cases/mech/mech-42.webp"], "id": 36}, {"id": 37, "cat": "计算机", "title": "个人健康管理系统（Web）", "imgs": ["images/cases/cs/cs-13-zhiyu.webp", "images/cases/cs/cs-14-zhiyu.webp", "images/cases/cs/cs-15-zhiyu.webp"]}, {"id": 38, "cat": "计算机", "title": "汀州古城旅游攻略小程序", "imgs": ["images/cases/cs/cs-01.webp", "images/cases/cs/cs-29.webp", "images/cases/cs/cs-31.webp"]}, {"id": 39, "cat": "计算机", "title": "农产品交易平台", "imgs": ["images/cases/cs/cs-23.webp", "images/cases/cs/cs-24.webp", "images/cases/cs/cs-25.webp"]}, {"id": 40, "cat": "计算机", "title": "AI职场助手", "imgs": ["images/cases/cs/cs-18.webp", "images/cases/cs/cs-21.webp"]}, {"id": 41, "cat": "计算机", "title": "皮影纹样智能识别系统", "imgs": ["images/cases/cs/cs-02.webp"]}, {"id": 42, "cat": "计算机", "title": "深度学习预测算法优化（CNN-LSTM）", "imgs": ["images/cases/cs/cs-05.webp", "images/cases/cs/cs-06.webp"]}, {"cat": "仿真建模", "title": "综合能源多时间尺度调度优化", "imgs": ["images/cases/sim/sim-01.webp", "images/cases/sim/sim-02.webp", "images/cases/sim/sim-03.webp", "images/cases/sim/sim-04.webp", "images/cases/sim/sim-05.webp", "images/cases/sim/sim-06.webp"], "id": 43}, {"cat": "仿真建模", "title": "四旋翼无人机控制仿真", "imgs": ["images/cases/sim/sim-07.webp", "images/cases/sim/sim-08.webp", "images/cases/sim/sim-09.webp", "images/cases/sim/sim-10.webp", "images/cases/sim/sim-11.webp", "images/cases/sim/sim-12.webp"], "id": 44}, {"cat": "仿真建模", "title": "无人机编队飞行控制仿真", "imgs": ["images/cases/sim/sim-13.webp"], "id": 45}, {"cat": "仿真建模", "title": "机器人轨迹跟踪控制", "imgs": ["images/cases/sim/sim-14.webp"], "id": 46}, {"cat": "仿真建模", "title": "PID/微分先行PID/卡尔曼滤波对比", "imgs": ["images/cases/sim/sim-15.webp"], "id": 47}, {"cat": "仿真建模", "title": "机械臂运动学轨迹仿真", "imgs": ["images/cases/sim/sim-16.webp", "images/cases/sim/sim-17.webp", "images/cases/sim/sim-18.webp"], "id": 48}, {"cat": "仿真建模", "title": "三相桥式整流电路仿真", "imgs": ["images/cases/sim/sim-19.webp", "images/cases/sim/sim-20.webp", "images/cases/sim/sim-21.webp"], "id": 49}, {"cat": "仿真建模", "title": "风光储微电网仿真", "imgs": ["images/cases/sim/sim-22.webp", "images/cases/sim/sim-23.webp", "images/cases/sim/sim-24.webp", "images/cases/sim/sim-25.webp"], "id": 50}, {"cat": "仿真建模", "title": "电源与功率电子系统仿真", "imgs": ["images/cases/sim/sim-26.webp", "images/cases/sim/sim-27.webp", "images/cases/sim/sim-28.webp", "images/cases/sim/sim-29.webp", "images/cases/sim/sim-30.webp", "images/cases/sim/sim-31.webp", "images/cases/sim/sim-32.webp"], "id": 51}, {"cat": "仿真建模", "title": "电机拖动与控制系统仿真", "imgs": ["images/cases/sim/sim-33.webp", "images/cases/sim/sim-34.webp", "images/cases/sim/sim-35.webp"], "id": 52}, {"cat": "仿真建模", "title": "电力系统暂态稳定分析", "imgs": ["images/cases/sim/sim-36.webp"], "id": 53}, {"cat": "仿真建模", "title": "水泥水化微观结构仿真", "imgs": ["images/cases/sim/sim-37.webp", "images/cases/sim/sim-38.webp", "images/cases/sim/sim-39.webp"], "id": 54}, {"cat": "仿真建模", "title": "通信信号处理仿真", "imgs": ["images/cases/sim/sim-40.webp", "images/cases/sim/sim-41.webp", "images/cases/sim/sim-42.webp"], "id": 55}, {"cat": "仿真建模", "title": "金融时间序列分析", "imgs": ["images/cases/sim/sim-43.webp"], "id": 56}, {"cat": "仿真建模", "title": "多目标优化算法（Pareto前沿）", "imgs": ["images/cases/sim/sim-44.webp"], "id": 57}, {"cat": "仿真建模", "title": "物理场与曲面建模可视化", "imgs": ["images/cases/sim/sim-45.webp", "images/cases/sim/sim-46.webp", "images/cases/sim/sim-47.webp"], "id": 58}, {"cat": "仿真建模", "title": "运动学建模与数据拟合", "imgs": ["images/cases/sim/sim-48.webp", "images/cases/sim/sim-49.webp", "images/cases/sim/sim-50.webp"], "id": 59}, {"cat": "仿真建模", "title": "汽车悬架动力学仿真", "imgs": ["images/cases/sim/sim-51.webp"], "id": 60}, {"cat": "仿真建模", "title": "电池充放电特性仿真", "imgs": ["images/cases/sim/sim-52.webp"], "id": 61}, {"cat": "仿真建模", "title": "传感器标定仿真（磁力计/陀螺仪）", "imgs": ["images/cases/sim/sim-53.webp"], "id": 62}, {"id": 63, "cat": "土木", "title": "中学宿舍楼建筑平面设计", "imgs": ["images/cases/civil/civil-01.webp"]}, {"id": 64, "cat": "土木", "title": "宿舍楼立面与剖面设计", "imgs": ["images/cases/civil/civil-06.webp", "images/cases/civil/civil-07.webp", "images/cases/civil/civil-08.webp", "images/cases/civil/civil-03.webp", "images/cases/civil/civil-04.webp", "images/cases/civil/civil-05.webp"]}, {"id": 65, "cat": "艺术设计", "title": "医用艾灸理疗床设计", "imgs": ["images/cases/art/art-01a.webp"]}, {"id": 66, "cat": "艺术设计", "title": "膝离断义肢造型设计", "imgs": ["images/cases/art/art-01b.webp"]}, {"id": 67, "cat": "艺术设计", "title": "叠式风力灭火器设计", "imgs": ["images/cases/art/art-02a.webp"]}, {"id": 68, "cat": "艺术设计", "title": "民族元素服装《风花雪月》设计", "imgs": ["images/cases/art/art-02b.webp"]}, {"id": 69, "cat": "艺术设计", "title": "高空壁面清洗机器人设计", "imgs": ["images/cases/art/art-03a.webp"]}, {"id": 70, "cat": "艺术设计", "title": "CMF茶室家具设计", "imgs": ["images/cases/art/art-03b.webp"]}, {"id": 71, "cat": "艺术设计", "title": "汽车展厅空间设计", "imgs": ["images/cases/art/art-04b.webp"]}, {"id": 72, "cat": "艺术设计", "title": "「三茶序」茶叶包装设计", "imgs": ["images/cases/art/art-05b.webp", "images/cases/art/art-07b.webp"]}, {"id": 73, "cat": "艺术设计", "title": "通用笔壳结构设计", "imgs": ["images/cases/art/art-07a.webp"]}, {"id": 74, "cat": "艺术设计", "title": "近海无人浒苔清洁船设计", "imgs": ["images/cases/art/art-08a.webp"]}, {"id": 75, "cat": "艺术设计", "title": "「庐山云雾」茶品牌VI设计", "imgs": ["images/cases/art/art-08b.webp", "images/cases/art/art-09b.webp", "images/cases/art/art-10b.webp", "images/cases/art/art-12b.webp"]}, {"id": 76, "cat": "艺术设计", "title": "明清江南私家庭院设计", "imgs": ["images/cases/art/art-09a.webp"]}, {"id": 77, "cat": "艺术设计", "title": "社区景观更新设计", "imgs": ["images/cases/art/art-10a.webp"]}, {"id": 78, "cat": "艺术设计", "title": "「秋野树屋」糕点包装设计", "imgs": ["images/cases/art/art-13b.webp"]}, {"id": 79, "cat": "艺术设计", "title": "城市街道更新·光影记忆", "imgs": ["images/cases/art/art-13a.webp"]}, {"id": 80, "cat": "艺术设计", "title": "适老化智慧社区设计", "imgs": ["images/cases/art/art-15a.webp"]}, {"id": 81, "cat": "艺术设计", "title": "可上楼婴儿车设计", "imgs": ["images/cases/art/art-16a.webp"]}, {"cat": "单片机·电气", "title": "单片机仿真题目合集（10宫格）", "imgs": ["images/cases/mcu/mcu-101.webp"], "id": 82}, {"cat": "单片机·电气", "title": "智能鱼缸+STM32智能门禁功能设计", "imgs": ["images/cases/mcu/mcu-102.webp"], "id": 83}, {"cat": "单片机·电气", "title": "电子时钟+五种波形发生器", "imgs": ["images/cases/mcu/mcu-103.webp"], "id": 84}, {"cat": "单片机·电气", "title": "智能路灯控制+简易计数器", "imgs": ["images/cases/mcu/mcu-104.webp"], "id": 85}, {"cat": "单片机·电气", "title": "宠物自动喂养机+交通灯控制", "imgs": ["images/cases/mcu/mcu-105.webp"], "id": 86}, {"cat": "单片机·电气", "title": "环境光/人体红外/声控+光控照明", "imgs": ["images/cases/mcu/mcu-106.webp"], "id": 87}, {"cat": "单片机·电气", "title": "51/STM32仿真题目合集（12宫格）", "imgs": ["images/cases/mcu/mcu-107.webp"], "id": 88}, {"cat": "单片机·电气", "title": "节日彩灯控制器+万用表检测", "imgs": ["images/cases/mcu/mcu-108.webp"], "id": 89}, {"cat": "单片机·电气", "title": "教室灯光控制+太阳能充电", "imgs": ["images/cases/mcu/mcu-109.webp"], "id": 90}, {"cat": "单片机·电气", "title": "模拟红外遥控器+步进电机控制", "imgs": ["images/cases/mcu/mcu-110.webp"], "id": 91}, {"cat": "单片机·电气", "title": "RLC测量仪+RS485多机通信", "imgs": ["images/cases/mcu/mcu-111.webp"], "id": 92}, {"cat": "单片机·电气", "title": "单片机原理图合集（12宫格·一）", "imgs": ["images/cases/mcu/mcu-112.webp"], "id": 93}, {"cat": "单片机·电气", "title": "遥控/避障/循迹小车", "imgs": ["images/cases/mcu/mcu-113.webp"], "id": 94}, {"cat": "单片机·电气", "title": "红外测距报警器+机械臂", "imgs": ["images/cases/mcu/mcu-114.webp"], "id": 95}, {"cat": "单片机·电气", "title": "电流检测+灯光控制系统", "imgs": ["images/cases/mcu/mcu-115.webp"], "id": 96}, {"cat": "单片机·电气", "title": "大棚温控系统+定时流水灯", "imgs": ["images/cases/mcu/mcu-116.webp"], "id": 97}, {"cat": "单片机·电气", "title": "智能家居+智能花卉养护", "imgs": ["images/cases/mcu/mcu-117.webp"], "id": 98}, {"cat": "单片机·电气", "title": "单片机原理图合集（12宫格·二）", "imgs": ["images/cases/mcu/mcu-118.webp"], "id": 99}, {"cat": "单片机·电气", "title": "八路抢答器+30秒倒计时", "imgs": ["images/cases/mcu/mcu-119.webp"], "id": 100}, {"cat": "单片机·电气", "title": "篮球计时记分器+简易密码锁", "imgs": ["images/cases/mcu/mcu-120.webp"], "id": 101}, {"cat": "单片机·电气", "title": "称重检测系统+LED点阵广告牌", "imgs": ["images/cases/mcu/mcu-121.webp"], "id": 102}, {"cat": "单片机·电气", "title": "加热炉恒温+直流电机调速", "imgs": ["images/cases/mcu/mcu-122.webp"], "id": 103}, {"cat": "单片机·电气", "title": "单片机实物题目合集（18宫格）", "imgs": ["images/cases/mcu/mcu-123.webp"], "id": 104}, {"cat": "单片机·电气", "title": "温湿度检测控制系统", "imgs": ["images/cases/mcu/mcu-124.webp"], "id": 105}, {"cat": "单片机·电气", "title": "STM32智能厨房安全检测", "imgs": ["images/cases/mcu/mcu-125.webp"], "id": 106}, {"cat": "单片机·电气", "title": "STM32智能花盆系统", "imgs": ["images/cases/mcu/mcu-126.webp"], "id": 107}, {"cat": "单片机·电气", "title": "水塔水位监测+无刷电机调速", "imgs": ["images/cases/mcu/mcu-127.webp"], "id": 108}, {"cat": "单片机·电气", "title": "电流电压功率测试+编码器", "imgs": ["images/cases/mcu/mcu-128.webp"], "id": 109}, {"cat": "单片机·电气", "title": "单片机实物精品合集（6宫格）", "imgs": ["images/cases/mcu/mcu-129.webp"], "id": 110}, {"cat": "单片机·电气", "title": "STM32智能窗帘系统", "imgs": ["images/cases/mcu/mcu-130.webp"], "id": 111}, {"cat": "单片机·电气", "title": "51智能多功能探测小车", "imgs": ["images/cases/mcu/mcu-131.webp"], "id": 112}, {"cat": "单片机·电气", "title": "STM32智能药箱/定时药盒", "imgs": ["images/cases/mcu/mcu-132.webp"], "id": 113}, {"cat": "单片机·电气", "title": "单片机最小系统原理图合集", "imgs": ["images/cases/mcu/mcu-133.webp"], "id": 114}, {"cat": "单片机·电气", "title": "浇水/时钟/照明/温控风扇合集", "imgs": ["images/cases/mcu/mcu-134.webp"], "id": 115}, {"cat": "单片机·电气", "title": "PM2.5/温湿度/密码锁等合集", "imgs": ["images/cases/mcu/mcu-135.webp"], "id": 116}, {"cat": "单片机·电气", "title": "STM32冷链运输监控", "imgs": ["images/cases/mcu/mcu-136.webp"], "id": 117}, {"cat": "单片机·电气", "title": "STM32智能净化器", "imgs": ["images/cases/mcu/mcu-137.webp"], "id": 118}, {"cat": "单片机·电气", "title": "STM32厨房火灾监测", "imgs": ["images/cases/mcu/mcu-138.webp"], "id": 119}, {"cat": "单片机·电气", "title": "恒温箱/病床呼叫/心率计合集", "imgs": ["images/cases/mcu/mcu-139.webp"], "id": 120}, {"cat": "单片机·电气", "title": "单片机设计实物合集（招牌版）", "imgs": ["images/cases/mcu/mcu-140.webp"], "id": 121}, {"cat": "单片机·电气", "title": "PWM调光灯+心率脉搏计", "imgs": ["images/cases/mcu/mcu-141.webp"], "id": 122}, {"cat": "单片机·电气", "title": "STM32智能井盖系统", "imgs": ["images/cases/mcu/mcu-142.webp"], "id": 123}, {"cat": "单片机·电气", "title": "STM32智能体重秤", "imgs": ["images/cases/mcu/mcu-143.webp"], "id": 124}, {"cat": "单片机·电气", "title": "STM32智能头盔系统", "imgs": ["images/cases/mcu/mcu-144.webp"], "id": 125}, {"cat": "单片机·电气", "title": "转速仪+数码秒表", "imgs": ["images/cases/mcu/mcu-145.webp"], "id": 126}, {"cat": "单片机·电气", "title": "密码锁+热敏电阻测温", "imgs": ["images/cases/mcu/mcu-146.webp"], "id": 127}, {"cat": "单片机·电气", "title": "STM32人体健康监测+智能花盆", "imgs": ["images/cases/mcu/mcu-147.webp"], "id": 128}, {"cat": "单片机·电气", "title": "STM32水质检测+语音分类垃圾桶", "imgs": ["images/cases/mcu/mcu-148.webp"], "id": 129}, {"cat": "单片机·电气", "title": "门铃音乐播放器+数码管时钟", "imgs": ["images/cases/mcu/mcu-149.webp"], "id": 130}, {"cat": "单片机·电气", "title": "8x8点阵广告牌+电子秤", "imgs": ["images/cases/mcu/mcu-150.webp"], "id": 131}, {"cat": "单片机·电气", "title": "单片机模块原理图散集", "imgs": ["images/cases/mcu/mcu-151.webp"], "id": 132}, {"cat": "单片机·电气", "title": "RP2040/树莓派主控原理图合集", "imgs": ["images/cases/mcu/mcu-152.webp"], "id": 133}, {"cat": "单片机·电气", "title": "AD590温度检测+PT100测温计", "imgs": ["images/cases/mcu/mcu-153.webp"], "id": 134}, {"cat": "单片机·电气", "title": "竞赛抢答器+直流电压电流测量", "imgs": ["images/cases/mcu/mcu-154.webp"], "id": 135}, {"cat": "单片机·电气", "title": "智能鞋柜+冷链运输（双拼）", "imgs": ["images/cases/mcu/mcu-155.webp"], "id": 136}, {"cat": "单片机·电气", "title": "汽车充电安全检测+智能花盆", "imgs": ["images/cases/mcu/mcu-156.webp"], "id": 137}, {"cat": "单片机·电气", "title": "STM32智能衣柜系统", "imgs": ["images/cases/mcu/mcu-157.webp"], "id": 138}];

  function $(s, ctx) { return (ctx || document).querySelector(s); }
  function $all(s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); }

  /* ==================== 1. 专业筛选器 ==================== */
  var filterBtns = $all('.case-filter__btn');
  var cards = $all('.case-card');
  var emptyBox = $('#cases-empty');

  function applyFilter(cat) {
    var shown = 0;
    cards.forEach(function (card) {
      var hit = (cat === 'all' || card.getAttribute('data-cat') === cat);
      card.style.display = hit ? '' : 'none';
      if (hit) shown++;
    });
    if (emptyBox) emptyBox.style.display = shown ? 'none' : '';
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
      applyFilter(btn.getAttribute('data-filter'));
    });
  });

  /* ==================== 2. 案例详情弹窗（翻图） ==================== */
  var modal = $('#case-modal');
  var mTags = $('#case-modal-tags');
  var mTitle = $('#case-modal-title');
  var fImg = $('#case-flip-img');
  var fPrev = $('#case-flip-prev');
  var fNext = $('#case-flip-next');
  var fCount = $('#case-flip-count');
  var cur = null;      // 当前案例对象
  var curIdx = 0;      // 当前图索引
  var lastFocus = null;

  function findCase(id) {
    for (var i = 0; i < CASE_DATA.length; i++) {
      if (String(CASE_DATA[i].id) === String(id)) return CASE_DATA[i];
    }
    return null;
  }

  function renderFlip() {
    if (!cur) return;
    fImg.src = cur.imgs[curIdx];
    fImg.alt = cur.title + '（截图 ' + (curIdx + 1) + '/' + cur.imgs.length + '，已脱敏）';
    fCount.textContent = (curIdx + 1) + ' / ' + cur.imgs.length;
    var multi = cur.imgs.length > 1;
    fPrev.style.display = multi ? '' : 'none';
    fNext.style.display = multi ? '' : 'none';
    /* 预加载相邻图 */
    if (multi) {
      var pre = new Image();
      pre.src = cur.imgs[(curIdx + 1) % cur.imgs.length];
    }
  }

  function openCase(id) {
    var data = findCase(id);
    if (!data || !modal) return;
    cur = data;
    curIdx = 0;
    mTags.innerHTML = '<span class="tag">' + data.cat + '</span>';
    mTitle.textContent = data.title;
    renderFlip();
    lastFocus = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    var closeBtn = $('.modal__close', modal);
    if (closeBtn) closeBtn.focus();
  }

  function closeCase() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    cur = null;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      openCase(card.getAttribute('data-case-id'));
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCase(card.getAttribute('data-case-id'));
      }
    });
  });

  if (modal) {
    $('.modal__overlay', modal).addEventListener('click', closeCase);
    $all('[data-close-modal]', modal).forEach(function (b) {
      b.addEventListener('click', closeCase);
    });
    fPrev.addEventListener('click', function () {
      if (!cur) return;
      curIdx = (curIdx - 1 + cur.imgs.length) % cur.imgs.length;
      renderFlip();
    });
    fNext.addEventListener('click', function () {
      if (!cur) return;
      curIdx = (curIdx + 1) % cur.imgs.length;
      renderFlip();
    });
    /* CTA 点击时先关掉案例弹窗，避免双层弹窗 */
    $all('[data-open-modal="qrcode-modal"]', modal).forEach(function (b) {
      b.addEventListener('click', closeCase);
    });
  }

  /* ==================== 3. 合作院校封面灯箱 ==================== */
  var lb = $('#img-lightbox');
  var lbImg = $('#lb-img');
  var lbPrev = $('#lb-prev');
  var lbNext = $('#lb-next');
  var lbItems = $all('.schools-grid__item');
  var lbIdx = 0;

  function renderLb() {
    var it = lbItems[lbIdx];
    if (!it) return;
    lbImg.src = it.getAttribute('data-full');
    lbImg.alt = it.alt || '封面大图';
  }

  function openLb(idx) {
    if (!lb) return;
    lbIdx = idx;
    renderLb();
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeLb() {
    if (!lb) return;
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  lbItems.forEach(function (it, idx) {
    it.addEventListener('click', function () { openLb(idx); });
  });

  if (lb) {
    $all('[data-lb-close]', lb).forEach(function (b) {
      b.addEventListener('click', closeLb);
    });
    lbPrev.addEventListener('click', function () {
      lbIdx = (lbIdx - 1 + lbItems.length) % lbItems.length;
      renderLb();
    });
    lbNext.addEventListener('click', function () {
      lbIdx = (lbIdx + 1) % lbItems.length;
      renderLb();
    });
  }

  /* ==================== 键盘支持 ==================== */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeCase();
      closeLb();
    }
    if (cur && modal && modal.classList.contains('is-open')) {
      if (e.key === 'ArrowLeft') fPrev.click();
      if (e.key === 'ArrowRight') fNext.click();
    }
    if (lb && lb.classList.contains('is-open')) {
      if (e.key === 'ArrowLeft') lbPrev.click();
      if (e.key === 'ArrowRight') lbNext.click();
    }
  });

  YH.casesPage = { openCase: openCase };
})(window, document);
