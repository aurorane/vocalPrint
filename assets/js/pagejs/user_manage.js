$(function () {
    var tableData={
        array:[
            {
                id:'1',
                userName:'Mike',
                position:'总经理',
                role:'管理员',
                company:'青岛通产伟博大数据运营有限公司',
                address:'山东省青岛市黄岛区峨眉山路396号青岛光'
            },
            {
                id:'2',
                userName:'Abbey',
                position:'总经理',
                role:'管理员',
                company:'北京易驾佳信息科技有限公司',
                address:'北京市海淀区知春路17号中关村人工智能创'
            },
            {
                id:'3',
                userName:'Belinda',
                position:'总裁',
                role:'管理员',
                company:'广东航宇卫星科技有限公司',
                address:'汕头市龙湖区中山东路珠池港区3号桥西航天卫星大厦'
            },
            {
                id:'4',
                userName:'Daisy',
                position:'法人',
                role:'管理员',
                company:'阁瑞钛伦特软件(北京)有限公司',
                address:'北京市朝阳区高碑店民俗文化园爱家臻品宫'
            }
        ]
    }
    var html = template('tpl_tableContent',tableData)
    $('#tableContent').html(html)

    var addModal = $('#addModal')
    var addForm = $('#addform')

    formValidator(addForm)

    //添加按钮清空表单
    $('.btn-add').click(function () {
        $('#username').val('')
        $('#position').val('')
        $('#role').val('')
        $('#company').val('')
        $('#address').val('')
        formReset(addModal, addForm)

        $('#editSubmitBtn').css('display','none')
        $('#addSubmitBtn').css('display','inline-block')
    })

    //添加的提交按钮
    $('#addSubmitBtn').click(function () {
        var bv = addForm.data('bootstrapValidator');
        bv.validate();
        if(bv.isValid()){
            var addData = {}
            addData.id=Math.ceil(Math.random() * 100)
            addData.userName = $('#username').val()
            addData.position = $('#position').val()
            addData.role = $('#role').val()
            addData.company = $('#company').val()
            addData.address = $('#address').val()
            tableData.array.push(addData)
            html = template('tpl_tableContent',tableData)
            $('#tableContent').html(html)
            addModal.modal('hide')
        }

    })

    //模态框的关闭按钮
    $('.btn-close, .close').click(function () {
        formReset(addModal, addForm)
    })

    //点击编辑按钮
    $('#tableContent').on('click','.btn-edit',function () {
        var currEditId = $(this).parents().parents().attr('id')
        var myCurr = tableData.array.filter(item => (item.id == currEditId))
        localStorage.setItem('editId',currEditId)
        $('#username').val(myCurr[0].userName)
        $('#position').val(myCurr[0].position)
        $('#role').val(myCurr[0].role)
        $('#company').val(myCurr[0].company)
        $('#address').val(myCurr[0].address)

        $('#editSubmitBtn').css('display','inline-block')
        $('#addSubmitBtn').css('display','none')
    })

    $('#editSubmitBtn').click(function () {
        var bv = addForm.data('bootstrapValidator');
        bv.validate();
        if(bv.isValid()){
            var getEditId = localStorage.getItem('editId')
            for(var i=0;i<tableData.array.length;i++){
                if(tableData.array[i].id == getEditId){
                    tableData.array[i].userName=$('#username').val()
                    tableData.array[i].position=$('#position').val()
                    tableData.array[i].role=$('#role').val()
                    tableData.array[i].company=$('#company').val()
                    tableData.array[i].address=$('#address').val()
                }
            }
            html = template('tpl_tableContent', tableData)
            $('#tableContent').html(html)
            addModal.modal('hide')
        }
    })

    // 点击删除按钮
    $('#tableContent').on('click','.btn-delete',function () {
        var currDelId = $(this).parents().parents().attr('id')
        tableData.array = tableData.array.filter(item => (item.id != currDelId))
        html = template('tpl_tableContent', tableData)
        $('#tableContent').html(html)
    })

})
//表单验证
function formValidator(form) {
    form.bootstrapValidator({
        message: '输入值不合法',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                message: '用户名不合法',
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 3,
                        max: 30,
                        message: '请输入3到30个字符'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\. \u4e00-\u9fa5 ]+$/,
                        message: '用户名只能由字母、数字、点、下划线和汉字组成 '
                    }
                }
            }, position: {
                validators: {
                    notEmpty: {
                        message: '职位不能为空'
                    }, stringLength: {
                        min: 2,
                        max: 60,
                        message: '请输入2到60个字符'
                    }
                }
            }, role: {
                validators: {
                    notEmpty: {
                        message: '角色不能为空'
                    }, stringLength: {
                        min: 2,
                        max: 60,
                        message: '请输入2到60个字符'
                    }
                }
            }, company: {
                validators: {
                    notEmpty: {
                        message: '公司名称不能为空'
                    }, stringLength: {
                        min: 5,
                        max: 60,
                        message: '请输入5到60个字符'
                    }
                }
            }, address: {
                validators: {
                    notEmpty: {
                        message: '地址不能为空'
                    }, stringLength: {
                        min: 2,
                        max: 60,
                        message: '请输入2到60个字符'
                    }
                }
            }
        }
    });
}
//重置表单验证
function formReset(modal,form) {
    modal.on('hidden.bs.modal', function () {
        form.data('bootstrapValidator').destroy();
        form.data('bootstrapValidator', null);
        formValidator(form);
    });
}
