$(function () {
    //默认表单验证
    formValidator()
    formValidatorEdit()

    // 表单数据默认渲染
    var tableData = {
        array: [
            {
                id: '1',
                name: 'zhangsan',
                address:'北京',
                mold:'传感器1'
            },
            {
                id: '2',
                name: 'lisi',
                address:'上海',
                mold:'传感器2'
            },
            {
                id: '3',
                name: 'wangwu',
                address:'深圳',
                mold:'传感器3'
            },
            {
                id: '4',
                name: 'zhaoqian',
                address:'河南',
                mold:'传感器2'
            },
        ]
    }
    var html = template('tpl_tableContent', tableData);
    $('#tableContent').html(html)

    //点击添加按钮清空表单
    $('.add_configure').click(function () {
        $('#loginname').val('')
        $('#address').val('')
        $('#mold').val('')
        $('#addModal').on('hidden.bs.modal', function () {
            $("#addform").data('bootstrapValidator').destroy();
            $('#addform').data('bootstrapValidator', null);
            formValidator();
        });
    })

    //添加的提交按钮
    $('#submitBtn').click(function () {
        var bv = $('#addform').data('bootstrapValidator');
        bv.validate();
        if (bv.isValid()) {
            var addData = {}
            addData.id=Math.ceil(Math.random() * 100)
            addData.name = $('#loginname').val()
            addData.address = $('#address').val()
            addData.mold = $('#mold').val()
            tableData.array.push(addData)

            html = template('tpl_tableContent', tableData);
            $('#tableContent').html(html)

            $('#addModal').modal('hide')
            // console.log($('#updateform').serialize());
        }
        $('.btn-close, .close').click(function () {
            $('#addModal').on('hidden.bs.modal', function () {
                $("#addform").data('bootstrapValidator').destroy();
                $('#addform').data('bootstrapValidator', null);
                formValidator();
            });
            $("#addform").data("bootstrapValidator").resetForm();
        })
    })



    // 编辑赋值
    $('#tableContent').on('click','.edit',function () {
        var currId = $(this).parents().parents().attr('id')
        var myCurr = tableData.array.filter(item => (item.id == currId))
        localStorage.setItem('editId',currId)
        $('#loginname1').val(myCurr[0].name)
        $('#address1').val(myCurr[0].address)
        $('#mold1').val(myCurr[0].mold)

        $('#editModal').on('hidden.bs.modal', function () {
            $("#updateform").data('bootstrapValidator').destroy();
            $('#updateform').data('bootstrapValidator', null);
            formValidatorEdit();
        });

    })

    //编辑的提交按钮
    $('#submitBtn1').click(function () {
        var bv = $('#updateform').data('bootstrapValidator');
        bv.validate();
        if (bv.isValid()) {
            var getEditId = localStorage.getItem('editId')
            console.log(getEditId)
            for(var i=0;i<tableData.array.length;i++){
                if(tableData.array[i].id==getEditId){
                    tableData.array[i].name=$('#loginname1').val()
                    tableData.array[i].address=$('#address1').val()
                    tableData.array[i].mold=$('#mold1').val()
                }
            }
            html = template('tpl_tableContent', tableData);
            $('#tableContent').html(html)
            $('#editModal').modal('hide')

        }

    })
    // 删除
    $('#tableContent').on('click','.delete',function () {
        var currId = $(this).parents().parents().attr('id')
        tableData.array = tableData.array.filter(item => (item.id != currId))
        var html = template('tpl_tableContent', tableData);
        $('#tableContent').html(html)
    })

})

//表单验证
function formValidator() {
    $('#addform').bootstrapValidator({
        message: '输入值不合法',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            loginname: {
                message: 'SN码不合法',
                validators: {
                    notEmpty: {
                        message: 'SN码不能为空'
                    },
                    stringLength: {
                        min: 3,
                        max: 30,
                        message: '请输入3到30个字符'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\. \u4e00-\u9fa5 ]+$/,
                        message: 'SN码只能由字母、数字、点、下划线和汉字组成 '
                    }
                }
            },address: {
                validators: {
                    notEmpty: {
                        message: '地址不能为空'
                    }, stringLength: {
                        min: 2,
                        max: 60,
                        message: '请输入2到60个字符'
                    }
                }
            }, mold: {
                validators: {
                    notEmpty: {
                        message: '类型不能为空'
                    },stringLength: {
                        min: 2,
                        max: 60,
                        message: '请输入2到60个字符'
                    }
                }
            }
        }
    });
}
function formValidatorEdit() {
    $('#updateform').bootstrapValidator({
        message: '输入值不合法',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            loginname1: {
                message: 'SN码不合法',
                validators: {
                    notEmpty: {
                        message: 'SN码不能为空'
                    },
                    stringLength: {
                        min: 3,
                        max: 30,
                        message: '请输入3到30个字符'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\. \u4e00-\u9fa5 ]+$/,
                        message: 'SN码只能由字母、数字、点、下划线和汉字组成 '
                    }
                }
            }, address1: {
                validators: {
                    notEmpty: {
                        message: '地址不能为空'
                    }, stringLength: {
                        min: 2,
                        max: 60,
                        message: '请输入2到60个字符'
                    }
                }
            }, mold1: {
                validators: {
                    notEmpty: {
                        message: '类型不能为空'
                    },stringLength: {
                        min: 2,
                        max: 60,
                        message: '请输入2到60个字符'
                    }
                }
            }
        }
    });
}


