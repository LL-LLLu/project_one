$(function(){
    getUserInfo();

})

function getUserInfo(){
    $.ajax({
        url:'/user/getUserInfo',
        type:'get',
        headers:{
            Authorization: localStorage.getItem('token') || ''
        },

        success:function(data){
            if(data.status !== 200){
               return layui.layer.msg('请先登录')
            }
            renderAvatar(data.data);
        }
    })
}

function renderAvatar(data){
    var name = user.nickname || user.username;
    $('#welcome').html(`欢迎&nbsp&nbsp${name}`);
    if(user.user_pic !== null){
       $('layui-nav-img').attr('src',user.user_pic).show();
       $('.text-avatar').hide();
    }
    else{
        $('layui-nav-img').hide();
        $('.text-avatar').text(name[0].toUpperCase()).show();
    }
    
    
}