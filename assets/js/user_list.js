$(function(){

    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage


    template.defaults.imports.dataFormat = function(date){
        const dt = new Date(date);
        const year = dt.getFullYear();
        const month = padzero(dt.getMonth() + 1);
        const day = padzero(dt.getDate());
        const hour = padzero(dt.getHours());
        const minute = padzero(dt.getMinutes());
        const second = padzero(dt.getSeconds());
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }

    function padzero(n){
        return n > 9 ? n : '0' + n;
    }


    var data = {
        pagenum:1, 
        pagesize: 2,
        cate_id: "",
        state:"",
    }

    initTable()
    initCate()


    function initTable(){
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: data,
            success: function(res){
                console.log(res)
                if(res.status !== 0){
                    return layer.msg('获取文章列表失败！')
                }
                var html = template('tpl-table', res)
                $('tbody').html(html)
                renderPage(res.total)

            }

        })
    }
    

    function initCate(){
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res){
                console.log(res)
                if(res.status !== 0){
                    return layer.msg('get article cat error')
                }
                var html = template('tpl-cate', res)
                $('[name=cate_id]').html(html)
                form.render()

            }
        })
    }


    $('#form-search').on('submit', function(e){
        e.preventDefault()
         data.cate_id = $('[name=cate_id]').val()
         data.state = $('[name=state]').val()
        initTable()

    })


    function renderPage(total){
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: data.pagesize,
            curr: data.pagenum,
            layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
            limits:[2,3,5,10],
            jump: function(obj, first){
                data.pagenum = obj.curr;
                data.pagesize = obj.limit;
                if(!first){
                    initTable()
                }
            }
        })
    }

    $('tbody').on('click', '.btn-delete', function(){
        var len = $('.btn-delete').length

        var id = $(this).attr('data-id')
        layer.confirm('确定删除该文章吗？', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res){
                    if(res.status !== 0){
                        return layer.msg('删除文章失败！')
                    }
                    layer.msg('删除文章成功！')
                    if(len === 1){
                        data.pagenum  = data.pagenum === 1 ? 1 : data.pagenum - 1
                    }
                    initTable()
                }
            })
            layer.close(index)
        })

    })



    
})


