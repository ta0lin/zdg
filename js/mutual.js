//新闻列表
function ajax(params) {
    var result;
    $.ajax({
        url: 'http://doc.zhiduogang.com' + params.url,
        data: params.data,
        type: params.type,
        timeout: 3000,
        contentType: params.contentType,
        async: params.async,     //异步请求
        dataType: 'json',
        // crossDomain: true,
        // xhrFields: {
        //     withCredentials: false
        // },
    }).done(function (response) {
        if (response.code == 1) {
            if (params.callback) {
                params.callback(response.object);
            } else {
                result = response.object;
            }
        } else {
            cocoMessage.error("网络异常！", 2000);
        }
    }).fail(function (jqXHR, textStatus, err) {
        cocoMessage.error("网络异常！", 2000);
    });
    if (!params.callback) {
        return result;
    }
}

function selectZC(data) {
    $('.zccount').text(data.totalCount)
    $("#policttable").text('')
    re = new RegExp("<em>", "g");
    re1 = new RegExp("</em>", "g");
    var str = '';
    for (var i = 0; i < data.list.length; i++) {
        str += '<tr>' +
            '                    <td>' + (i + 1) + '</td>' +
            '                    <td><a href="detail.html?id=' + data.list[i].policyId + '">' + data.list[i].peName.replace(re, "").replace(re1, "") + '</a></td>' +
            '                    <td>' + data.list[i].deptFullName + '</td>' +
            '                    <td>' + data.list[i].province + data.list[i].city + data.list[i].area + '</td>' +
            '                    <td>' + data.list[i].seTime + '</td>' +
            '                    <td>' + data.list[i].peNameText + '</td>' +
            '                </tr>'
    }
    new Pagination({
        element: '.zxf_pagediv',
        type: 2,
        pageIndex: data.currPage,
        pageSize: data.pageSize,
        pageCount: 9,
        total: data.totalCount,
        jumper: true,
        singlePageHide: false,
        disabled: true,
        currentChange: function (index) {
            var params = {
                url: '/zhengce/list',
                data: {
                    'pageNo': index,
                    'pageSize': 10,
                    'keyword': $("#search").val() == '' ? decodeURIComponent(GetQueryString("search")) == '' ? '高企' : decodeURIComponent(GetQueryString("search")) : $("#search").val(),
                    'condition': '{"searchScope":7}'
                },
                type: 'get',
                contentType: 'application/json;charset=utf-8',
                callback: selectZC,
                async: true
            }
            ajax(params);
        }
    });
    $("#policttable").append(str)
}

function selectQY(data) {
    $(".contents").text('');
    var str = '';
    re = new RegExp("<em>", "g");
    re1 = new RegExp("</em>", "g");
    data.list.forEach(function (item) {
        str += ' <div class="qiye-item">' +
            '                <div class="info-left">' +
            '                    <a href="detail2.html?id=' + item.id + '&up=' + item.up + '&gaoxin=' + item.gaoxin + '">' +
            '                    <img src="images/productDetail/zc.png" alt="" class="pic01">' +
            '                    </a>' +
            // '                    <img src="images/detail/super.png" alt="" class="pic02">' +
            // '                    <div class="info-left-text">超级认证</div>' +
            // '                    <div class="left-ll">' +
            // '                        浏览量：2万+' +
            // '                    </div>' +
            '                </div>' +
            '                <div class="info-right">' +
            '                    <div class="info-top">' +
            '                        <div class="info-title">' +
            '                            <div class="titles">' +
            '                               <a href="detail2.html?id=' + item.id + '&up=' + item.up + '&gaoxin=' + item.gaoxin + '">' +
            '                                ' + item.entName.replace(re, "").replace(re1, "") + '' +
            '                                </a>' +
            '                            </div>';
        if (item.gaoxin || item.up) {
            str += '                            <div class="other-info">';
        }
        if (item.gaoxin) {
            str += '                                <span>高新技术企业 <img src="images/detail/down01.png" alt=""></span>';
        }
        if (item.up) {
            str += '<span>上市 <img' +
                '                                    src="images/detail/down02.png" alt=""></span>';
        }
        if (item.gaoxin || item.up) {
            str += '                            </div>';
        }
        str += '                        </div>' +
            '                        <div class="down">' +
            '                            <a href="http://www.zhiduogang.com/pdf/qy.pdf"><button>' +
            '                                <img src="images/detail/down.png" alt="">' +
            '                                下载企业报告' +
            '                            </button></a>' +
            '                        </div>' +
            '                    </div>' +
            '                    <div class="info-bottom">' +
            '                        <div class="text">' +
            '                            <span>法定代表人：</span><span>' + item.faRen + '</span><span>注册资本：</span><span>' + item.regMoney + item.regMoneyUnit + '</span>' +
            '                        </div>' +
            '                        <div class="text">' +
            '                            <span>联系电话：</span><span>' + item.tel + '</span>' +
            // '                           <span>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱：</span><span>chenchongwei@xiaomi.com</span>' +
            // '                            <span style="margin-left: 70px;width:60px;">网址：</span><span> www.mi.com</span>' +
            '                        </div>' +
            '                        <div class="text">' +
            '                            <span>企业地址：</span><span style="width:760px">' + item.address + '</span>' +
            '                            <label for="">' +
            '                    <a href="detail2.html?id=' + item.id + '&up=' + item.up + '&gaoxin=' + item.gaoxin + '">' +
            '                                更多' +
            '</a>' +
            '                            </label>' +
            '                        </div>' +
            '                    </div>' +
            '                </div>' +
            '            </div>'

    })
    $(".contents").prepend(str)
    $("#count").text(data.totalCount)
    new Pagination({
        element: '.zxf_pagediv',
        type: 2,
        pageIndex: data.currPage,
        pageSize: data.pageSize,
        pageCount: 9,
        total: data.totalCount,
        jumper: true,
        singlePageHide: false,
        disabled: true,
        currentChange: function (index) {
            var params = {
                url: '/qiye/list',
                data: {
                    'pageNo': index,
                    'pageSize': 10,
                    'keyword': $("#selectbar").val() == '' ? decodeURIComponent(GetQueryString("search")) == '' ? '公司' : decodeURIComponent(GetQueryString("search")) : $("#selectbar").val(),
                    'condition': '{"searchScope":1}'
                },
                type: 'get',
                contentType: 'application/json;charset=utf-8',
                callback: selectQY,
                async: true
            }
            ajax(params);
        }
    });
}

function selectQYDetail(data) {
    var gx = GetQueryString("gaoxin");
    var up = GetQueryString("up");
    console.log(gx);
    console.log(up);
    $(".titles").text(data.entName)
    $(".fr").text(data.faRen)
    $(".zczb").text(data.regMoney + data.regMoneyUnit)
    $(".t").text(data.tel)
    $(".address").text(data.address)
    if (gx == false && up == false) {
        $(".other-info").hide()
    } else {
        if (gx == 'true') {
            $("#gx").show()
        } else {
            $("#gx").hide()
        }
        if (up == 'true') {
            $("#ss").show()
        } else {
            $("#ss").hide()
        }
    }
    $(".fr").text(data.faRen)
    $(".zczb").text('注册资本：' + data.regMoney + data.regMoneyUnit)
    $(".zcsj").text('注册时间：' + data.regDate)
    $(".ggzt").text('公司状态：' + data.entStatus)
    $(".zch").text()
    $(".jgdm").text()
    $(".xydm").text()
    $(".t").text(data.entType)
    $(".nsh").text()
    $(".hy").text(data.industry)
    $(".yyqx").text(data.businessTerm)
    $(".hzrq").text(data.checkDate)
    $(".djjg").text(data.registAuthority)
    $(".engn").text(data.entNameEn == null || data.entNameEn == undefined ? '' : data.entNameEn)
    $(".zcdz").text(data.address)

}

function selectQYzz(data) {
    $(".zz").text(data.totalCount + '项')
    var str = '';
    for (var i = 0; i < data.list.length; i++) {
        str += '<tr>' +
            '                        <td>' + data.list[i].certificateName + '</td>' +
            '                        <td>' + data.list[i].certificateNo + '</td>' +
            '                        <td>' + data.list[i].endDate + '</td>' +
            '                        <td>' + data.list[i].issueDate + '</td>' +
            // '                        <td>...</td>' +
            '                    </tr>'
    }
    if (data.totalCount > 10) {
        new Pagination({
            element: '.zxf_pagediv',
            type: 2,
            pageIndex: data.currPage,
            pageSize: data.pageSize,
            pageCount: 9,
            total: data.totalCount,
            jumper: true,
            singlePageHide: false,
            disabled: true,
            currentChange: function (index) {
                var p = {
                    url: '/qiye/qualifications',
                    data: {
                        'entId': GetQueryString("id"),
                        'pageNo': index,
                        'pageSize': 10
                    },
                    type: 'get',
                    contentType: 'application/json;charset=utf-8',
                    callback: selectQYzz,
                    async: true
                }
                ajax(p);
            }
        });
    }
    $("#zztable").append(str)
}

function selectQYsb(data) {
    $("#sbtable").text('')
    $(".sbcount").text(data.totalCount + '项')
    var str = '';
    for (var i = 0; i < data.list.length; i++) {
        str += '                    <tr>' +
            '                        <td>' + data.list[i].applyDate + '</td>' +
            '                        <td>' +
            '                            <img src="' + data.list[i].brandImag + '" alt="">' +
            '                        </td>' +
            '                        <td>' + data.list[i].brandName + '</td>' +
            '                        <td>' + data.list[i].regCode + '</td>' +
            '                        <td>' + data.list[i].brandType + '</td>' +
            '                        <td>' + data.list[i].brandStatus + '</td>' +
            '                    </tr>'
    }
    if (data.totalCount > 10) {
        new Pagination({
            element: '.zxf_pagediv2',
            type: 2,
            pageIndex: data.currPage,
            pageSize: data.pageSize,
            pageCount: 9,
            total: data.totalCount,
            jumper: true,
            singlePageHide: false,
            disabled: true,
            currentChange: function (index) {
                var params = {
                    url: '/qiye/brand',
                    data: {
                        'pageNo': index,
                        'pageSize': 10,
                        'entId': GetQueryString("id")
                    },
                    type: 'get',
                    contentType: 'application/json;charset=utf-8',
                    callback: selectQYsb,
                    async: true
                }
                ajax(params);
            }
        });
    }
    $("#sbtable").append(str)
}

function selectQYzl(data) {
    $("#zltable").text('')
    $(".zlcount").text(data.totalCount + '项')
    var str = ''
    for (var i = 0; i < data.list.length; i++) {
        str += ' <tr>' +
            '                        <td>' + data.list[i].openDate + '</td>' +
            '                        <td>' + data.list[i].patentName + '</td>' +
            '                        <td>' + data.list[i].patentId + '</td>' +
            '                        <td>' + data.list[i].openNo + '</td>' +
            '                    </tr>'
    }
    if (data.totalCount > 10) {
        new Pagination({
            element: '.zxf_pagediv3',
            type: 2,
            pageIndex: data.currPage,
            pageSize: data.pageSize,
            pageCount: 9,
            total: data.totalCount,
            jumper: true,
            singlePageHide: false,
            disabled: true,
            currentChange: function (index) {
                var params = {
                    url: '/qiye/patent',
                    data: {
                        'pageNo': index,
                        'pageSize': 10,
                        'entId': GetQueryString("id")
                    },
                    type: 'get',
                    contentType: 'application/json;charset=utf-8',
                    callback: selectQYzl,
                    async: true
                }
                ajax(params);
            }
        });
    }
    $("#zltable").append(str)

}

function selectQYrj(data) {
    $("#softtable").text('')
    $(".softcount").text(data.totalCount + '项')
    var str = '';
    for (var i = 0; i < data.list.length; i++) {
        str += '<tr>' +
            '                        <td>' + data.list[i].noticeDate + '</td>' +
            '                        <td>' + data.list[i].softName + '</td>' +
            '                        <td>' + data.list[i].regNo + '</td>' +
            '                        <td>' + data.list[i].regDate + '</td>' +
            '                        <td>' + data.list[i].softEdition + '</td>' +
            '                    </tr>'
    }
    if (data.totalCount > 10) {

        new Pagination({
            element: '.zxf_pagediv4',
            type: 2,
            pageIndex: data.currPage,
            pageSize: data.pageSize,
            pageCount: 9,
            total: data.totalCount,
            jumper: true,
            singlePageHide: false,
            disabled: true,
            currentChange: function (index) {
                var params = {
                    url: '/qiye/softCopyRight',
                    data: {
                        'pageNo': index,
                        'pageSize': 10,
                        'entId': GetQueryString("id")
                    },
                    type: 'get',
                    contentType: 'application/json;charset=utf-8',
                    callback: selectQYrj,
                    async: true
                }
                ajax(params);
            }
        });
    }
    $("#softtable").append(str)
}

function selectproduct(data) {
    $("#producttable").text('')
    $(".pcount").text(data.totalCount + '项')
    var str = '';
    for (var i = 0; i < data.list.length; i++) {
        str += '<tr>' +
            '                        <td>' + data.list[i].createDate + '</td>' +
            '                        <td>' + data.list[i].productName + '</td>' +
            '                        <td>' + data.list[i].regDate + '</td>' +
            '                        <td>' + data.list[i].regNo + '</td>' +
            '                        <td>' + data.list[i].productType + '</td>' +
            '                    </tr>'
    }
    if (data.totalCount > 10) {
        new Pagination({
            element: '.zxf_pagediv5',
            type: 2,
            pageIndex: data.currPage,
            pageSize: data.pageSize,
            pageCount: 9,
            total: data.totalCount,
            jumper: true,
            singlePageHide: false,
            disabled: true,
            currentChange: function (index) {
                var params = {
                    url: '/qiye/productCopyRight',
                    data: {
                        'pageNo': index,
                        'pageSize': 10,
                        'entId': GetQueryString("id")
                    },
                    type: 'get',
                    contentType: 'application/json;charset=utf-8',
                    callback: selectproduct,
                    async: true
                }
                ajax(params);
            }
        });
    }
    $("#producttable").append(str)
}

function investment(data) {
    $("#tztable").text('')
    $(".tzcount").text(data.totalCount + '项')
    var str = '';
    for (var i = 0; i < data.list.length; i++) {
        str += '<tr>' +
            '                        <td>' + data.list[i].investedName + '</td>' +
            '                        <td>' + data.list[i].legalPerson + '</td>' +
            '                        <td>' + data.list[i].investmentAmount + '</td>' +
            '                        <td>' + data.list[i].investmentProportion + '</td>' +
            '                    </tr>'
    }
    if (data.totalCount > 10) {
        new Pagination({
            element: '.zxf_pagediv6',
            type: 2,
            pageIndex: data.currPage,
            pageSize: data.pageSize,
            pageCount: 9,
            total: data.totalCount,
            jumper: true,
            singlePageHide: false,
            disabled: true,
            currentChange: function (index) {
                var params = {
                    url: '/qiye/investment',
                    data: {
                        'pageNo': index,
                        'pageSize': 10,
                        'entId': GetQueryString("id")
                    },
                    type: 'get',
                    contentType: 'application/json;charset=utf-8',
                    callback: investment,
                    async: true
                }
                ajax(params);
            }
        });
    }
    $("#tztable").append(str)
}

function financing(data) {
    $("#rztable").text('')
    $(".rzcount").text(data.totalCount + '项')
    var str = '';
    for (var i = 0; i < data.list.length; i++) {
        str += '<tr>' +
            '                        <td>' + data.list[i].financDate + '</td>' +
            '                        <td>' + data.list[i].entName + '</td>' +
            '                        <td>' + data.list[i].financRounds + '</td>' +
            '                        <td>' + data.list[i].financAmount + '</td>' +
            '                        <td>' + data.list[i].investor + '</td>' +
            '                    </tr>'
    }
    if (data.totalCount > 10) {
        new Pagination({
            element: '.zxf_pagediv7',
            type: 2,
            pageIndex: data.currPage,
            pageSize: data.pageSize,
            pageCount: 9,
            total: data.totalCount,
            jumper: true,
            singlePageHide: false,
            disabled: true,
            currentChange: function (index) {
                var params = {
                    url: '/qiye/financing',
                    data: {
                        'pageNo': e.current,
                        'pageSize': 10,
                        'entId': GetQueryString("id")
                    },
                    type: 'get',
                    contentType: 'application/json;charset=utf-8',
                    callback: financing,
                    async: true
                }
                ajax(params);
            }
        });
    }
    $("#rztable").append(str)
}

function selectSB(data) {
    $(".contents").text('');
    var str = '';
    data.list.forEach(function (item) {
        str += '            <div class="content-item">' +
            '                <div class="info-left">' +
            '                    <a href="detail1.html?ftmid=' + item.ftmid + '">' +
            '                        <img src="images/productDetail/zc.png" alt="" class="pic01"></a>' +
            '' +
            '                </div>' +
            '                <div class="info-right">' +
            '                    <div class="info-top">' +
            '                        <div class="info-title">' +
            '                            <div class="titles">' +
            '                                <a href="detail1.html?ftmid=' + item.ftmid + '">' +
            '                                    商标名称：' + item.fdlzz + '' +
            '                                </a>' +
            '                            </div>' +
            '                        </div>' +
            '                    </div>' +
            '                    <div class="info-bottom">' +
            '                        <div class="text">' +
            '                            <span>商标类别：</span><span>' + item.ftype + '</span><span>注册号：</span><span>' + item.id + '</span>' +
            '                            <span>申请日期：</span><span>' + item.fsqdate + '</span>' +
            '                        </div>' +
            '                        <div class="text">' +
            '                            <span >申请人：</span><span class="apply">' + item.fsqr1 + '</span>' +
            '                        </div>' +
            '                        <div class="text">' +
            '                            <span>当前状态：</span><span>' + item.fbguserID + '</span>' +
            '                            <span>初审公告期号：</span><span>' + item.fggq + '</span>' +
            '                        </div>' +
            '                    </div>' +
            '                </div>' +
            '            </div>'
    })
    $(".contents").prepend(str)
    $("#count").text(data.totalCount)
    new Pagination({
        element: '.zxf_pagediv',
        type: 2,
        pageIndex: data.currPage,
        pageSize: data.pageSize,
        pageCount: 9,
        total: data.totalCount,
        jumper: true,
        singlePageHide: false,
        disabled: true,
        currentChange: function (index) {
            var params = {
                url: '/shangbiao/list',
                data: {
                    'pageNo': index,
                    'pageSize': 10,
                    'keyword': $("#selectbar").val() == '' ? decodeURIComponent(GetQueryString("search")) == '' ? '公司' : decodeURIComponent(GetQueryString("search")) : $("#selectbar").val(),
                },
                type: 'get',
                contentType: 'application/json;charset=utf-8',
                callback: selectSB,
                async: true
            }
            ajax(params);
        }
    });
}

function selectList(data) {
    if (data.list.length == 0) {
        $('.nodata').show();
    } else {
        $(".plist").text('')
        $('.nodata').hide();
        var str = '';
        for (var i = 0; i < data.list.length; i++) {
            str += '<li>';
            if (sessionStorage.getItem('li') == 1) {
                str += '<a href="productDetail.html?id=' + data.list[i].id + '">';
                str += '                    <img class="head" src="images/productList/01.png" alt="">'
            } else if (sessionStorage.getItem('li') == 2) {
                str += '<a href="zhuanliDetail.html?id=' + data.list[i].id + '">';
                str += '                    <img class="head" src="images/productList/02.png" alt="">'
            } else {
                str += '<a href="banquanDetail.html?id=' + data.list[i].id + '">';
                str += '                    <img class="head" src="images/productList/03.png" alt="">'
            }
            str+=    '                    </a>' +
                '                    <div class="txt-wrap">';
            if (sessionStorage.getItem('li') == 1) {
                str += '<p class="ellipsis"><a href="productDetail.html?id=' + data.list[i].id + '">' + data.list[i].name + '</a></p>';
            } else if (sessionStorage.getItem('li') == 2) {
                str += '<p class="ellipsis"><a href="zhuanliDetail.html?id=' + data.list[i].id + '">' + data.list[i].name + '</a></p>';
            } else {
                str += '<p class="ellipsis"><a href="banquanDetail.html?id=' + data.list[i].id + '">' + data.list[i].name + '</a></p>';
            }
            str += '                        <p><span>￥</span>' + data.list[i].price + '<span>元起</span></p>' +
                '                        <p><span>￥</span>' + data.list[i].sale + '<span>元起</span>' +
                '                        <hr class="line">' +
                '                        <a href="javascript:void(0)" class="a">' +
                '                            <img src="images/productDetail/zxButton.png" alt="">' +
                '                        </a>' +
                '                    </div>' +
                '                </li>'
        }
        $(".plist").append(str)
        new Pagination({
            element: '.zxf_pagediv',
            type: 2,
            pageIndex: data.currPage,
            pageSize: data.pageSize,
            pageCount: 9,
            total: data.totalCount,
            jumper: true,
            singlePageHide: false,
            disabled: true,
            currentChange: function (index) {
                var params = {
                    url: '/product/goods',
                    data: {
                        'parentId': sessionStorage.getItem("li"),
                        'pageNo': index,
                        'pageSize': data.pageSize
                    },
                    type: 'get',
                    contentType: 'application/json;charset=utf-8',
                    callback: selectList,
                    async: true
                }
                ajax(params);
            }
        });
    }

}

function pdetail(data) {
    $(".right-title-block h3").text(data.name)
    $(".old-price").text(data.price + '元起')
    $(".new-p").text(data.sale + '元')
    console.log(data);
}

function selectZCDetail(data) {
    $(".detail-title").text(data.peName)
    $(".detail-state span").text(data.poStatus)
    $(".policylevel").text(data.policyLevel)
    $(".province").text(data.city)
    $(".senddate").text(data.seTime)
    $(".date").text(data.seStartTime)
    var str = '';
    for (var i = 0; i < data.technical.length; i++) {
        str += '' + data.technical[i] + '、'
    }
    $(".tec").text(str.slice(0, str.length - 1))
    $(".sqaddress").text(data.fAddr)
    $("#tjc").text(data.declareConditions)
    $("#ldc").text(data.support)
    $("#clc").text(data.filingMaterials)
    $("#clc").text(data.filingMaterials)
    var str1 = '';
    for (var a = 0; a < data.projectSources.length; a++) {
        str1 += ' <h5>' +
            '       <a href="' + data.projectSources[a].url + '" target="_blank">' + data.projectSources[a].title + '</a>' +
            '   </h5>'
    }
    $("#zcc").append(str1)
}

function searchMenu(data) {
    var str = '';
    for (var i = 0; i < data.length; i++) {
        if (i == 0) {
            str += ' <li class="active" data-id="' + data[i].id + '">' + data[i].name + '</li>'
        } else {
            str += ' <li data-id="' + data[i].id + '">' + data[i].name + '</li>'
        }
    }
    $(".nav-li").append(str)
    var params = {
        url: '/product/goods',
        data: {
            'parentId': data[0].id,
            'pageNo': 1,
            'pageSize': 10
        },
        type: 'get',
        contentType: 'application/json;charset=utf-8',
        callback: selectList,
        async: true
    }
    ajax(params);
}

function selectSBDetail(data) {
    $(".sqnum").text(data.id)
    $(".sqdate").text(data.fSQDATE)
    $(".zcgq").text(data.fBGQ)
    $(".csgg").text(data.fGGQ)
    $(".types").text(data.fTYPE)
    $(".sqrc").text(data.fSQR1)
    // $(".sqre").text(data.)
    // $(".yxq").text(data.)
    // $(".hq").text(data.)
    // $(".gj").text(data.)
    // $(".zy").text(data.)
    // $(".dlr").text(data.)
    // $(".sb").text(data.)

    console.log(data);
}

function selectZGTZC(data) {
    $("#policttable").text("");
    re = new RegExp("<em>", "g");
    re1 = new RegExp("</em>", "g");
    var str = '';
    for (var i = 0; i < data.list.length; i++) {
        str += '<tr>' +
            // '                    <td>' + (i + 1) + '</td>' +
            '                    <td>' + data.list[i].peName.replace(re, "").replace(re1, "") + '</td>' +
            '                    <td>' + data.list[i].deptFullName + '</td>' +
            '                    <td>' + data.list[i].province + data.list[i].city + data.list[i].area + '</td>' +
            '                    <td>' + data.list[i].seTime + '</td>' +
            '                    <td>' + data.list[i].peNameText + '</td>' +
            '                </tr>'
    }
    new Pagination({
        element: '.zxf_pagediv',
        type: 2,
        pageIndex: data.currPage,
        pageSize: data.pageSize,
        pageCount: 9,
        total: data.totalCount,
        jumper: true,
        singlePageHide: false,
        disabled: true,
        currentChange: function (index) {
            var params = {
                url: '/zhengce/list',
                data: {
                    'pageNo': index,
                    'pageSize': 10,
                    'keyword': $(".search").val() == '' ? '高企' : $(".search").val(),
                    'condition': '{"searchScope":7}'
                },
                type: 'get',
                contentType: 'application/json;charset=utf-8',
                callback: selectZGTZC,
                async: true
            }
            ajax(params);
        }
    });
    $("#policttable").append(str)
}

function selectzgtQY(data) {
    $("#policttable").text("");
    var re = new RegExp("<em>", "g");
    var re1 = new RegExp("</em>", "g");
    var str = '';
    for (var i = 0; i < data.list.length; i++) {
        str += '<tr>' +
            '                    <td>' + data.list[i].entName.replace(re, "").replace(re1, "") + '</td>' +
            '                    <td>' + data.list[i].regDate + '</td>' +
            '                    <td>' + data.list[i].entName.replace(re, "").replace(re1, "") + '</td>' +
            '                    <td>' + data.list[i].address + '</td>' +
            '                    <td>' + data.list[i].entName + '</td>' +
            '                    <td>' + data.list[i].entName + '</td>' +
            '                    <td>' + data.list[i].entName + '</td>' +
            '                </tr>'
    }
    new Pagination({
        element: '.zxf_pagediv',
        type: 2,
        pageIndex: data.currPage,
        pageSize: data.pageSize,
        pageCount: 9,
        total: data.totalCount,
        jumper: true,
        singlePageHide: false,
        disabled: true,
        currentChange: function (index) {
            var params = {
                url: '/qiye/list',
                data: {
                    'pageNo': index,
                    'pageSize': 10,
                    'keyword': $("#search").val() == '' ? '公司' : $("#search").val(),
                    'condition': '{"searchScope":1}'
                },
                type: 'get',
                contentType: 'application/json;charset=utf-8',
                callback: selectzgtQY,
                async: true
            }
            ajax(params);
        }
    });
    $("#policttable").append(str)
}

function selectListindex(data) {
    $(".item-block").text("")
    var newdata = []
    if (data.list.length > 6) {
        newdata = data.list.slice(0, 6)
    } else {
        newdata = data.list
    }
    console.log(newdata);
    var str = '';
    for (var i = 0; i < newdata.length; i++) {
        str += '<div class="service-item">' +
            '                        <div class="item-title">' +
            '                            <span>' + newdata[i].name + '</span>' +
            '                            <span>...</span>' +
            '                            <img src="images/index/icon-hot.png" alt=" " class="hot">' +
            '                        </div>' +
            '                        <div class="item-intro">' +
            '                            ' + newdata[i].description + '' +
            '                        </div>' +
            '                        <div class="item-price">' +
            '                            <div class="price-star">' +
            '                                <img src="images/index/icon-star.png" alt="">' +
            '                                <img src="images/index/icon-star.png" alt="">' +
            '                                <img src="images/index/icon-star.png" alt="">' +
            '                                <img src="images/index/icon-star.png" alt="">' +
            '                                <img src="images/index/icon-star.png" alt="">' +
            '                                <span>(231人)</span>' +
            '                            </div>' +
            '                            <div class="price">' +
            '                                <span>¥:</span><span>' + newdata[i].price + '元</span>' +
            '                            </div>' +
            '                        </div>' +
            '                    </div>'
    }
    $('.item-block').append(str)
}

function selectZCindex(data) {
    $(".top-content ul").text("")
    if (data.list.length > 0) {
        var re = new RegExp("<em>", "g");
        var re1 = new RegExp("</em>", "g");
        var str = '';
        if (data.list.length > 5) {
            var newdata = data.list.slice(0, 5)
        }
        for (var i = 0; i < newdata.length; i++) {
            str += ' <li>' +
                ' <img src="images/index/icon-rw.png" alt="">' +
                ' <span><a href="detail.html?id=' + newdata[i].policyId + '">' + newdata[i].peName.replace(re, "").replace(re1, "") + '</a></span>' +
                '  </li>'
        }
    } else {

    }
    $(".top-content ul").append(str)
}
