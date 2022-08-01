$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    options.headers = {
        Authorization: localStorage.getItem('token') || ''
    }
    
    options.complete = function(data){
        //use the data.responseJSON.data to get the user info
        if(data.responseJSON.status === 1 || data.responseJSON.message === '身份认证失败！'){
            layui.layer.msg('请先登录')
            localStorage.removeItem('token');
            location.href = 'login.html';
        }
    }
}
);

