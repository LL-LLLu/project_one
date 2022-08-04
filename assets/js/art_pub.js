$(function(){

    var layer = layui.layer;
    var form = layui.form

    initEditor()
    initCat()

    function initCat(){
        $.ajax(
        {
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                }
                // 调用模板引擎渲染分类的可选项
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                // 通过 layui 重新渲染表单区域的UI结构
                form.render()
            }

        })
    }

     // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)

  // 为选择封面的按钮，绑定点击事件处理函数
  $('#btnChooseImage').on('click', function() {
    $('#coverFile').click()
  })

  $('#coverFile').on('change', function(e){

    var files = e.target.files
    if(files.length == 0){
        return
    }

    var newImgUrl = URL.createObjectURL(files[0])
    $image.cropper('destroy').attr('src', newImgUrl).cropper(options)

    
  })


  var art_state = 'publish'

  $('#btnSave2').on('click', function(){
    art_state = 'draft'
  })

  $('#form-pub').on('submit', function(e){
    e.preventDefault()
    var fd = new FormData($(this)[0])
    fd.append('state', art_state)
    
    $image.cropper('getCroppedCanvas', {
        width: 400,
        height: 280
    }).toBlob(function(blob){
        fd.append('cover_img', blob)
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')
                // 发布文章成功后，跳转到文章列表页面
                location.href = './user_list.html'
            }
        })
    })
  })



})