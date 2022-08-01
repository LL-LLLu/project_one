$(function(){
    getUserInfo();
    var layer = layui.layer;
    //logout btn
    $('#btnLogout').on('click', function(){
        console.log('logout');
        layer.confirm('Are you sure you want to logout?', {icon: 3, title:'sign'}, function(index){
        localStorage.removeItem('token');
        location.href = 'login.html';
        layer.close(index);
    })  
    });
});

function getUserInfo(){
    $.ajax({
        url:'/my/userinfo',
        method:'GET',
        success:function(data){
            if(data.status !== 0){
               return 
            }
            renderAvatar(data.data);
        },

    })
}



function renderAvatar(data){
    var name = data.nickname || data.username;
    $('#welcome').html(`欢迎&nbsp&nbsp${name}`);
    if(data.user_pic !== null){
       $('.layui-nav-img').attr('src',data.user_pic).show();
       $('.text-avatar').hide();
    }
    else{
        $('.layui-nav-img').hide();
        $('.text-avatar').text(name[0].toUpperCase()).show();
    }
}

