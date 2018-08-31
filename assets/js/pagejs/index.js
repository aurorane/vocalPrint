$(function () {
    localStorage.clear();        //页面刷新删除本地存储
    //柱状图
    var myChart1 = echarts.init(document.getElementById('myChart1'));
    var xAxisData = ['8.20', '8.21', '8.22', '8.23', '8.24', '8.25', '8.27'];
    var data1 = ['145', '147', '153', '188', '96', '50', '84'];
    var data2 = ['21','23','43','55','5','33','21']
    var tableData = {
        array:[
            {
                id: 1,
                time:'2018-06-27 12:23:34',
                record:'通讯事故',
                city:'北京',
                state: '已处理',
                content:'北京已处理',
                warnUrl: 'assets/audio/1.mp3'
            },
            {
                id: 2,
                time:'2018-06-07 18:23:34',
                record:'PZ80L通讯事故',
                city:'上海',
                state: '未处理',
                content:'上海未处理',
                warnUrl: 'assets/audio/2.mp3'
            },
            {
                id: 8,
                time:'2018-06-12 12:45:34',
                record:'10P72ZL通讯事故',
                city:'菏泽',
                state: '已处理',
                content:'菏泽已处理',
                warnUrl: 'assets/audio/3.mp3'
            },
            {
                id: 4,
                time:'2018-06-23 14:35:34',
                record:'10P72ZL通讯事故',
                city:'武汉',
                state: '未处理',
                content:'武汉未处理',
                warnUrl: 'assets/audio/4.mp3'
            },
            {
                id: 5,
                time:'2018-7-02 11:30:32',
                record:'10P72ZL通讯事故',
                city:'武汉',
                state: '已处理',
                content:'武汉已处理',
                warnUrl: 'assets/audio/5.mp3'
            }

        ]
    }
    optiona(xAxisData,data1,data2,'北京')


    //点击告警部分
    myChart1.on('click',columnar );
    function columnar(param){
        //获取到城市名称
        var getCityName = localStorage.getItem('cityName');
        if(param.seriesName == '告警' && getCityName == '武汉'){
            // tableData.array = tableData.array.filter((item) => item.city == getCityName );
            tableData = {
                array:[
                    {
                        id: 4,
                        time:'2018-06-23 14:35:34',
                        record:'10P72ZL通讯事故',
                        city:'武汉',
                        state: '未处理',
                        content:'武汉未处理',
                        warnUrl: 'assets/audio/4.mp3'
                    },
                    {
                        id: 5,
                        time:'2018-7-02 11:30:32',
                        record:'10P72ZL通讯事故',
                        city:'武汉',
                        state: '已处理',
                        content:'武汉已处理',
                        warnUrl: 'assets/audio/5.mp3'
                    }

                ]
            }
            tableContent(tableData)
        }else if(param.seriesName == '告警' && getCityName == '菏泽') {
            tableData = {
                array:[
                    {
                        id: 8,
                        time:'2018-06-12 12:45:34',
                        record:'10P72ZL通讯事故',
                        city:'菏泽',
                        state: '已处理',
                        content:'菏泽已处理',
                        warnUrl: 'assets/audio/3.mp3'
                    }
                ]
            }
            tableContent(tableData)
        }else if(param.seriesName == '告警' && getCityName == null) {
            tableData = {
                array:[
                    {
                        id: 1,
                        time:'2018-06-27 12:23:34',
                        record:'通讯事故',
                        city:'北京',
                        state: '已处理',
                        content:'北京已处理',
                        warnUrl: 'assets/audio/1.mp3'
                    }
                ]
            }
            tableContent(tableData)
        }else {
            return false;
        }

    }

    if (option1 && typeof option1 === "object") {
        myChart1.setOption(option1, true);
    }


    window.onresize = function () {
        myChart1.resize()
        myChart2.resize()
    }


    // 地图
    var myChart2 = echarts.init(document.getElementById("myChart2"));
    var data = [
        {name: '菏泽', value: 194},
        {name: '武汉', value: 273},
    ];
    //经纬度
    var geoCoordMap = {
        '菏泽': [115.480656, 35.23375],
        '武汉': [114.31, 30.52],
    };

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };

    option2 = {
        title: {
            text: '全国主要城市工业声纹统计',
            subtext: 'data from Industry',
            sublink: '',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: function (maptip) {
                return maptip.seriesName+'<br>'+maptip.name+' : '+maptip.data.value[2]
            }
        },
        bmap: {
            center: [104.114129, 37.550339],
            zoom: 5,
            roam: true,
            mapStyle: {
                styleJson: [{
                    'featureType': 'water',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'land',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#f3f3f3'
                    }
                }, {
                    'featureType': 'railway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'highway',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#fdfdfd'
                    }
                }, {
                    'featureType': 'highway',
                    'elementType': 'labels',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry.fill',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'poi',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'green',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'subway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'manmade',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'local',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'labels',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'boundary',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#fefefe'
                    }
                }, {
                    'featureType': 'building',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#d1d1d1'
                    }
                }, {
                    'featureType': 'label',
                    'elementType': 'labels.text.fill',
                    'stylers': {
                        'color': '#999999'
                    }
                }]
            }
        },
        series: [
            {
                name: '声纹统计',
                type: 'scatter',
                coordinateSystem: 'bmap',
                data: convertData(data),
                symbolSize: function (val) {
                    return val[2] / 10;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'purple'
                    }
                }
            }
        ]
    };

    //返回对应点的城市名称
    myChart2.on('click',cityName);
    function cityName(param){
        localStorage.setItem('cityName',param.name)
        if(param.name == '武汉'){
            data1 = ['100', '100', '123', '134', '144', '156', '123'];
            data2 = ['50','40','30','20','10','5','32']
            optiona(xAxisData,data1,data2,param.name)
            myChart1.setOption(option1, true);
        }
        if(param.name == '菏泽'){
            data1 = ['50', '100', '70', '40', '60', '120', '123'];
            data2 = ['10','23','34','45','56','23','12']
            optiona(xAxisData,data1,data2,param.name)
            myChart1.setOption(option1, true);
        }else {
            return false;
        }
    }

    if (option2 && typeof option2 === "object") {
        myChart2.setOption(option2, true);
    }


    //  省市区
    var $distpicker = $('#distpicker');
    $distpicker.distpicker({
        province: '福建省',
        city: '厦门市',
        district: '思明区'
    });
    // 时间段选择
    $('.form_datetime').datetimepicker({});
    $('.form_date').datetimepicker({});

    //音频地址及对应时间段
    var audioUrlTime={}
    //确定按钮
    $('#btn_sure').click(function () {
        var province = $('#province').val();
        var city = $('#city').val();
        var district = $('#district').val();
        var equipment = $('#equipment').val();
        var startTime = $('#dtp_input1').val()
        var endTime = $('#dtp_input2').val()
        if(province== '' || city=='' || district=='' || equipment==null || startTime=='' || endTime==''){
            alert('信息不完整')
        }else {
            audioUrlTime = {
                array:[
                    {
                        url:'http://img.tukuppt.com/origin_music/08/03/17/12a0c5aee10b63bd587f7bf9e73aeeaf.mp3',
                        currentTime:'2018-06-12 15:33:42'
                    },
                    {
                        url:'http://img.tukuppt.com/origin_music/08/03/18/3c91f2bf99158e4dbe09459ec42486bb.wav',
                        currentTime:'2018-06-13 12:14:16'
                    },
                    {
                        url:'http://img.tukuppt.com/origin_music/08/03/18/cc451fa193d0d6a8be946340e6c5d7e4.mp3',
                        currentTime:'2018-06-14 18:16:12'
                    }
                ]
            }
            audioPlay(audioUrlTime)
            // $('.audio').attr('src', 'assets/mm.wav')
        }
    })

    //实时按钮
    $('#btn_realTime').click(function () {
        var province1 = $('#province').val();
        var city1 = $('#city').val();
        var district1 = $('#district').val();
        var equipment1 = $('#equipment').val();
        if(province1== '' || city1=='' || district1=='' || equipment1==null){
            alert('信息不完整')
        }else {
            audioUrlTime={
                array:[
                    {
                        url:'assets/audio/mm.wav',
                        currentTime:getSystemTime()
                    }
                ]
            }
            audioPlay(audioUrlTime)
        }
    })

    //表格数据显示
    tableContent(tableData)

})



//柱状图数据
var optiona=function (xAxisData,data1,data2,titleCity) {
    option1 = {
        backgroundColor: '#eee',
        legend: {
            data: ['正常', '告警'],
            align: 'left',
            left: 10
        },
        title: {
            left: 'center',
            text:titleCity+'告警记录',
        },
        toolbox: {
            feature: {
                magicType: {
                    type: ['stack', 'tiled']
                },
                dataView: {}
            }
        },
        tooltip: {},
        xAxis: {
            data: xAxisData,
            name: 'X',
            silent: true,
            axisLine: {onZero: true},
            splitLine: {show: false},
            splitArea: {show: false}
        },
        yAxis: {
            inverse: false,
            splitArea: {show: false}
        },
        grid: {
            left: 30
        },
        series: [
            {
                name: '正常',
                type: 'bar',
                stack: 'two',
                itemStyle:{
                    normal:{
                        color:'#26EA0F'
                    }
                } ,
                data: data1
            },
            {
                name: '告警',
                type: 'bar',
                stack: 'two',
                itemStyle: {
                    normal: {
                        color:'#FFF200'
                    }
                },
                data: data2
            }
        ]
    };
}
//表格操作
var tableContent=function (tableData) {
    var html = template('tpl_tableCont',tableData)
    document.getElementById('tableCont').innerHTML = html;
    $('#tableCont').on('click','.btn',function () {
        var currId = $(this).parents().parents().attr('id')
        for(var i=0;i<tableData.array.length;i++){
            if(tableData.array[i].id==currId){
                $('.modal-body').html('<p>'+tableData.array[i].content+'</p>')
            }
        }
    })
    //音频
    $('#tableCont').on('click','.tdAudioImg',function () {
        var audio = $(this).siblings().get(0)
        audio.play();

    })
}
//音频播放
var audioPlay = function (obj) {
    var arr=[];
    var arr2=[];
    for(var i=0;i<obj.array.length;i++){
        arr.push(obj.array[i].url)
        arr2.push(obj.array[i].currentTime)
    }
    arr = arr.reverse();
    arr2=arr2.reverse()

    var myAudio=$('#myAudio').get(0)
    myAudio.src = arr.pop();
    $('#audioTime').html('当前采集时间：'+arr2.pop())
    myAudio.addEventListener('ended', playEndedHandler, false);
    myAudio.play();               //默认自动调用
    myAudio.loop = false;
    function playEndedHandler(){
        myAudio.src = arr.pop();
        $('#audioTime').html('当前采集时间：'+arr2.pop())
        myAudio.play();
        !arr.length && myAudio.removeEventListener('ended',playEndedHandler,false);
    }
}

//获取系统当前时间
var getSystemTime = function () {
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    var day = myDate.getDate();
    var hours = myDate.getHours();
    var min = myDate.getMinutes();
    var second = myDate.getSeconds();

    month = month < 10 ? ('0'+month) : month;
    day = day < 10 ? ('0'+day) : day;
    hours = hours < 10 ? ('0'+hours) : hours;
    min = min < 10 ? ('0'+min) : min;
    second = second < 10 ? ('0'+second) : second;

    return year + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + second

}
