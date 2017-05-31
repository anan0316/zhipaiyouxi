// 54张牌 52张可用
// 花色：4种（hongtao,meihua,heitao,fangkuai）
// 数字：1-13

$(function(){
    let color=['hongtao','meihua','heitao','fangkuai'];
    let card=[];
    // biao={c_9:true,s_5:true}
    let biao={};
    let huase,number;

    $(document).mousedown(false);
    // 创建52张纸牌
    // 方法一：
   /* while (card.lenght<52){
        huase = color[Math.floor(Math.random() * color.length)];
        number = Math.floor(Math.random() * 13 + 1);
        // 判断biao表中是否存在huase+'_'+number，如果存在，不执行后面的代码
        // 不存在，将其状态改为true，将此块放入card数组中
        if(!biao[huase+'_'+number]){
            biao[huase+'_'+number]=true;
            card.push({huase,number});
        }
    }*/
   // 方法二：
    for(let i=0;i<52;i++){
        do {
            huase = color[Math.floor(Math.random() * color.length)];
            number = Math.floor(Math.random() * 13 + 1);
        }while(biao[huase+'_'+number]);
        biao[huase+'_'+number]=true;
        card.push({huase,number});
    }

    // 桌面上的纸牌
    // index来记录发的是哪张牌
    let index=0;
    for(let i=0;i<7;i++){
        for(let j=0;j<=i;j++){
            let poke=card[index];
            index++;
            let src="url(img/"+poke.huase+"_"+poke.number+".jpg)";
            $('<div>').addClass('card ')
                .css({'backgroundImage':src})
                .data('num',poke.number)
                .prop('id',`${i}_${j}`)
                .delay(60*index)
                .animate({top:60*i,left:300-50*i+100*j,opacity:1})
                .appendTo('.beijing');
        }
    }

    // 桌面下方需要匹配的纸牌
    let tops=530,lefts=100;
    for(;index<card.length;index++){
        let poke=card[index];
        let src="url(img/"+poke.huase+"_"+poke.number+".jpg)";
        $('<div>').addClass('card zuo')
            .data('num',poke.number)
            .css('backgroundImage',src)
            .delay(60*index)
            .animate({top:tops+=0.3,left:lefts+=0.3,opacity:1})
            .appendTo('.beijing');
    }

    // 点击哪张，就让哪张选中并抬高20px，再点击时显示未选中并降回原来的位置
    let first=null;
    let flag1=true;
    $('.card').click(function(){
        console.log(flag1+"))))");
        if(flag1){
            flag1=false;
            let a=$(this).prop('id').split('_');
            let ele=$("#"+(parseInt(a[0])+1)+'_'+a[1]);
            let ele1=$("#"+(parseInt(a[0])+1)+'_'+(parseInt(a[1])+1))
            if(ele.length==1 || ele1.length==1){
                $(this).removeClass('active');
                return ;
            }
            $(this).toggleClass('active')
            if($(this).is('.active')){
                $(this).animate({top:'-=20'},function(){
                    flag1=true;
                });
            }else {
                $(this).animate({top:'+=20'},function(){
                    flag1=true;
                });
            }
            // 点击第一次时，将this赋值给first，点击第二次时，计算2张牌的数字总和
            if(!first){
                first=this;
                let num=$(first).data('num');
                if(num==13){
                    $(this).animate({left:600,top:0},function(){
                        $(this).remove();
                        flag1=true;
                    })
                    first=null;
                }
            }else {
                let num=$(first).data('num')+$(this).data('num');
                if(num==13){
                    $('.active').animate({left:600,top:0},function(){
                        $(this).remove();
                        flag1=true;
                    });
                }else{
                    $('.active').animate({top:'+=20'},function(){
                        $(this).removeClass('active');
                        flag1=true;

                    })
                }
                first=null;
            }
        }

    })

    let flag=true;
    $('.button').delay(3500).animate({'opacity':1});
    let z=0;
    // 点击向右按钮
    $('.button:eq(1)').on('click',function(){
        let zuo=$('.zuo');
        if(zuo.last().length==0){
            return ;
        }
        if(flag){
            flag=false;
            z++;
            if(zuo.last().hasClass('active')){
                zuo.last().removeClass('active').animate({top:'+=20'});
            }
            zuo.last().removeClass('zuo')
                .addClass('you')
                .css('zIndex',z)
                .animate({left:'+=400'},function(){
                    flag=true;
                })
        }
    })
    z=0;
    $('.button:eq(0)').on('click',function() {
        if(flag){
            flag=false;
            z++;
            let you = $('.you');
            if($(you[0]).hasClass('active')){
                $(you[0]).removeClass('active').animate({top:'+=20'},function(){
                    $(this).addClass('zuo').removeClass('you')
                        .animate({left: '-=400'},function(){
                            $(this).css('zIndex',z)
                        })
                    for(let i=you.length-1;i>=0;i--){
                        if(i==0){
                            continue;
                        }
                        $(you[i]).delay(50*i).addClass('zuo').removeClass('you')
                            .animate({left: '-=400'},function(){
                                $(this).css('zIndex',z)
                            })
                    }
                })
            }else{
                for(let i=you.length-1;i>=0;i--){
                    $(you[i]).delay(50*i).addClass('zuo').removeClass('you')
                        .animate({left: '-=400'},function(){
                            $(this).css('zIndex',z)
                        })
                }
            }
            flag=true;
        }
        })
    })