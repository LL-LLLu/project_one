$(function(){

    var form = layui.form
    var layer = layui.layer

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            let pwd = $('.layui-form [name=oldPwd]').val()
            if (pwd == value) {
                return 'new password is not equal to old password'
            }},
        samepwd: function(value) {
            let pwd = $('.layui-form [name=newPwd]').val()
            if (pwd !== value) {
                return 'new password is not equal to new password'
            }
        }
    })

    $('.show_p').on('click', function() {
        $('.layui-form [name=renew_p]').attr('type', 'text')
        $('.layui-form [name=newPwd]').attr('type', 'text')
    })




    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
       
        $.ajax({
            url: '/my/updatepwd',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('change failed')
                }
                layer.msg('change password success')
                $(".layui-form")[0].reset()
                
            }
    })
})
})