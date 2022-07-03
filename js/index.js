window.addEventListener('load', function () {
    var left_btn = document.querySelector('.arrow-l');
    var right_btn = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var offsetWidth = focus.offsetWidth;
    focus.addEventListener('mouseenter', function () {
        right_btn.style.display = 'block';
        left_btn.style.display = 'block';
        // console.log('jhhh');
        clearInterval(timer);
        timer=null;
    })
    focus.addEventListener('mouseleave', function () {
        right_btn.style.display = 'none';
        left_btn.style.display = 'none';
        timer=setInterval(function(){
            right_btn.click();
        },2000);

    })
    // 1。动态生成小圆点(排他思想)
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');

    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        ol.appendChild(li);
        ol.children[0].className = 'current';
        li.setAttribute('index', i);
        li.addEventListener('click', function () {
            for (var i = 0; i < ul.children.length; i++) {
                this.parentNode.children[i].className = '';

            }
            this.className = 'current';
            var index = this.getAttribute('index');
            animate(ul, -index * offsetWidth);
            circle=index;

        })

    }
    // 2.左右按钮的点击事件
    // 右
    var num = 0;
    var circle=0;
    //克隆应该写在小圆点后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    right_btn.addEventListener('click', function () {
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        // console.log('jjj')
        num++;
        animate(ul, -num * offsetWidth);
        circle++;
        if(circle==ol.children.length){
            circle=0;
        }
        circleChange();
  
    })
    // 左
    left_btn.addEventListener('click', function () {
        if (num == 0) {
            ul.style.left = -(ul.children.length - 1) * offsetWidth;
            num = ul.children.length - 1;
        }
        num--;
        animate(ul, -num * offsetWidth);
        circle--;
        if(circle<0){
            circle=ol.children.length-1;
        }
        circleChange();

    })

    function circleChange(){
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
      
        ol.children[circle].className = 'current';
    }

    
})