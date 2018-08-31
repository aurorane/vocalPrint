$(function () {
    var myChart = echarts.init(document.getElementById('myChart'));
    var option = {
        title: {
            text: '折线图堆叠'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['开机连接手机','开机连接Dongle','关机连接手机','关机连接Dongle']
        },
        grid: {
            left: '3%',
            right: '6%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            // feature: {
            //     saveAsImage: {}
            // }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            show: true,
            name:'次数',
            data: ['1','2','3','4','5','6','7','8','9','10']
        },
        yAxis: {
            type: 'value',
            show: true,
            name:'时长'
        },
        series: [
            {
                name:'开机连接手机',
                type:'line',
                stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210,60,80,120]
            },
            {
                name:'开机连接Dongle',
                type:'line',
                stack: '总量',
                data:[220, 182, 191, 234, 290, 330, 310,90, 230, 210]
            },
            {
                name:'关机连接手机',
                type:'line',
                stack: '总量',
                data:[320, 332, 301, 334, 390, 330, 320,234, 290, 330]
            },
            {
                name:'关机连接Dongle',
                type:'line',
                stack: '总量',
                data:[820, 932, 901, 934, 1290, 1330, 1320,932, 901, 934]
            }
        ]
    };

    myChart.setOption(option);
    // window.onresize = function () {
    //     myChart.resize()
    // }
})