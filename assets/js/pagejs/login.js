$(function () {
    var form = $('#form');
    form.bootstrapValidator({
        message: '输入值不合法',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            loginname: {
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
            }
            , password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    }, stringLength: {
                        min: 6,
                        max: 12,
                        message: '请输入6到12个字符'
                    },regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '密码只能由字母、数字、点、下划线组成 '
                    }
                }
            }
        }
    });

    $('.login').click(function () {
        var bv = form.data('bootstrapValidator');
        bv.validate();
        if(bv.isValid()){
            window.location.href = 'index.html'
        }
    })


})
