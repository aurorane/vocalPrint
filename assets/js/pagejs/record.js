$(function () {
    var tableData = {
        array:[
            {
                id:'1',
                userName:'张安乐',
                time:'2018-03-12 16:18:20',
                journal:'大部分商用和开源的 HTTP 应用程序都支持以一种或多种常用格式进行日志记录'
            },
            {
                id:'2',
                userName:'丽芳丝',
                time:'2018-04-13 12:18:20',
                journal:'应用程序支持管理者使用这些更标准的格式的主要好处之一就在于，可以充分利用那些已构建好的工具处理这些日志，并产生基本的统计信息。'
            },
            {
                id:'3',
                userName:'薛芳菲',
                time:'2018-05-19 11:18:20',
                journal:'最常见的日志格式之一就是常用日志格式'
            },
            {
                id:'4',
                userName:'雷凤岱',
                time:'2018-06-20 09:18:20',
                journal:'另一种常用日志格式为组合日志格式(Combined Log Format)，' +
                    '例如 Apache 服务器就支持这种格式。组合日志格式与常用日志格式很类似。' +
                    '实际上，它就是常用日志 格式的精确镜像，只是添加了两个字段。 '+
                '另一种常用日志格式为组合日志格式(Combined Log Format)，' +
                        '例如 Apache 服务器就支持这种格式。组合日志格式与常用日志格式很类似。' +
                    '实际上，它就是常用日志 格式的精确镜像，只是添加了两个字段。 '
            }
        ]
    }

    var html = template('tpl_tableContent', tableData)
    $('#tableContent').html(html)




})
