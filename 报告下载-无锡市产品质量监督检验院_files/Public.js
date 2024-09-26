
//#region 参数定义
// loading
var R_Msg_1 = "数据加载中，请等待...";
//connection timeout
var R_Msg_2 = "连接超时，请退出重试";
//operation failed
var R_Msg_3 = "操作失败";
//当前页码
var CurrentPageIndex = 1;
//#endregion

//#region Js扩展

//#region 验证规则  反斜杠“\”需要写成反的双斜杠“\\”,不然new RegExp 会被转义
var GSValidate = {
    tel: "^((\\+?86)|(\\(\\+86\\)))?\\d{3,4}-\\d{7,8}(-\\d{3,4})?$",//电话格式
    mobile: "^1[0-9]{10}$",//手机格式
    fax: "^((\\+?86)|(\\(\\+86\)))?\\d{3,4}-\\d{7,8}(-\\d{3,4})?$",//传真格式
    email: "^(\\w-*\\.*)+@(\\w-?)+(\\.\\w{2,})+$",//邮箱格式
    zip: "^[1-9]\\d{5}$",//邮编格式
    idcard: "(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)",//身份证
    number: "^\\d+\\d+\\d$",//数字
    decinum: "^[+-]?\\d+(\\.\\d+)?$",//正负数包括0
    posinum: "^[+]{0,1}(\\d+)$",//必须为正数
    sortnum: "^(0|\\+?[1-9][0-9]*)$",//排序
    discount: "^([0-9](\\.[0-9]+)?|10)$",//只能输入10以内的数字、小数
    user: "^([a-zA-Z0-9_@.]{4,50})*$",//用户名为4~50位字母、数字、下划线组合
    pwd: "^(?![\\d]+$)(?![a-zA-Z]+$)(?![!@#$%^&*_]+$)[\\da-zA-Z!@#$%^&*_]{6,20}$"//密码为6~20位字母、数字、特殊字符组合
};
//#endregion


//为字符串添加去除空格的方法
String.prototype.Trim = function () {

    var result = this.replace(/(^\s*)/g, "");
    result = result.replace(/(\s*$)/g, "");
    return result;

}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//对字符串的扩展，检查是否为空
//
//
//
String.IsNullOrEmpty = function (value) {
    if (value) {
        if (typeof (value) == 'string') {
            if (value.length > 0)
                return false;
        }
        if (value != null)
            return false;
    }
    return true;
}
//
// 给字符串对象添加一个startsWith()方法
//
String.prototype.startWith = function (substring) {
    var reg = new RegExp("^" + substring);
    return reg.test(this);
};

//
// 给字符串对象添加一个endsWith()方法
//
String.prototype.endsWith = function (substring) {
    var reg = new RegExp(substring + "$");
    return reg.test(this);
};
/*
*兼容IE，从字符串创建日期对象
*
*/
function NewDate(str) {
    str = str.split('-');
    var date = new Date();
    date.setUTCFullYear(str[0], str[1] - 1, str[2]);
    date.setUTCHours(0, 0, 0, 0);
    return date;
}

//#endregion

//#region 库
var GCIMS;
if (!GCIMS) GCIMS = {};
if (!GCIMS.BIZ) GCIMS.BIZ = {};

GCIMS.Common = {
    GoToPageNew: function GoToPage(url, pars, IndexName, IndexPage, ShowObj) {
        //刷新页面时刷新当前页，现在在认证机构端收费管理列表中实现
        if (CurrentPageIndex != undefined && CurrentPageIndex != null) {
            CurrentPageIndex = IndexPage;
        }
        if (pars.length > 0) {
            if (IndexName == "")
                IndexName = "PageIndex"
            pars = pars + "&" + IndexName + "=" + IndexPage;
        }
        else {
            if (IndexName == "")
                IndexName = "PageIndex"
            pars = IndexName + "=" + IndexPage;
        }

        GCIMS.Common.ShowDataDivNew(url, encodeURI(pars), ShowObj, "")



    },
    ShowDataDivNew: function (url, pars, ObjID, PanelTitle, successCallBack) {
        if (pars == "")
            pars = "ShowDivID=" + ObjID + '&PanelTitle=' + PanelTitle;
        else
            pars = pars + "&ShowDivID=" + ObjID + '&PanelTitle=' + PanelTitle;
        GCIMS.Common.invoke(url, "", {}, {
            url: url,
            type: 'post',
            data: pars,
            async: true,
            beforeSend: function () {
                PopWindow.ShowProcessWindow(R_Msg_1);
            },
            callback: function (responseText) {
                var rtv = responseText;

                PopWindow.ClosePopWindow(3);
                if (rtv == "-1") {
                    rtv = R_Msg_2;
                }
                $("#" + ObjID).html(rtv);

                $("#" + ObjID).show();

            },
            error: function () {
                PopWindow.ShowDefaultPopWindow(R_Msg_3);
            }
        });


    },
    ShowDataDiv: function (url, pars, ObjID, PanelTitle, successCallBack) {
        if (pars == "")
            pars = "ShowDivID=" + ObjID + '&PanelTitle=' + PanelTitle;
        else
            pars = pars + "&ShowDivID=" + ObjID + '&PanelTitle=' + PanelTitle;
        $.ajax(
            {
                url: url,
                type: 'post',
                data: pars,
                beforeSend: function () {
                    PopWindow.ShowProcessWindow(R_Msg_1);
                },
                success: function (responseText) {
                    var rtv = responseText;

                    PopWindow.ClosePopWindow(3);
                    if (rtv == "-1") {
                        rtv = R_Msg_2;
                    }
                    //var objID = originalRequest.request.parameters.ShowDivID;
                    //var TitleName = originalRequest.request.parameters.PanelTitle
                    $("#" + ObjID).html(rtv);

                    $("#" + ObjID).show();

                },
                error: function () {
                    PopWindow.ShowDefaultPopWindow(R_Msg_3);
                }

            }
        );

    },
    /*删除文件,可以对多个id批量删除，根据传入的id不同分别删除annexs和appattachemt中的数据
    ssw 2013-10-17
    fileids：以逗号分隔的id
    attachmentids：以逗号分隔的id
    callback：删除成功后调用的函数
    */
    DeleteFile: function (fileids, attachmentids, callback) {
        $.jBox.confirm("是否删除?", "提示", function (v, h, f) {
            if (v == "ok") {
                var data = {};
                data.fileid = fileids;
                data.attachmentids = attachmentids;
                $.ajax({
                    url: "/public/DelFile.aspx",
                    type: "POST",
                    async: true,
                    data: data,
                    success: function (data, textStatus) {
                        if (data != null && data == "1") {
                            if (typeof (callback) == "function") {
                                callback();
                            }
                        }
                        else {
                            $.jBox.error("删除失败", "提示");
                        }
                    }
                });
            }

        });

    },
    
    /*用来获取页面元素的值
    *controlID:要获取的内容的范围
    *pre：获取内容id的前部修饰符，方便选取要获取的元素。如查询是_query_ 提交_post_
    *2013-10-28
    */
    getFormData: function (controlID, pre, splitpre) {
        var data = {};

        var splitprestring = ",";
        if (splitpre == null || splitpre == undefined || splitpre == "") {
            splitprestring = ",";
        } else {
            splitprestring = splitpre;
        }
        data.splitpre = splitprestring;
        var selector = $("#" + controlID);
        selector.find("select").each(function (i, item) {
            var id = String.IsNullOrEmpty($(this).attr('id')) ? $(this).attr('name') : $(this).attr('id');
            if (id) {
                var index = id.indexOf(pre);
                if (index >= 0) {
                    id = id.substr(index + pre.length, id.length - pre.length - index);
                    var value = $(this).val();
                    GCIMS.Common.getFormData_DealValue(data, id, value, splitprestring);;
                }
            }

        });
        selector.find("input[type='checkbox']").each(function (i, item) {
            var id = String.IsNullOrEmpty($(this).attr('id')) ? $(this).attr('name') : $(this).attr('id');
            if (id) {
                var index = id.indexOf(pre);
                if (index >= 0) {
                    id = id.substr(index + pre.length, id.length - pre.length - index);
                    var value = $(this)[0].checked;
                    GCIMS.Common.getFormData_DealValue(data, id, value, splitprestring);
                }
            }

        });
        selector.find("input[type='text']").add("#" + controlID + " input[type='password']").add("#" + controlID + " input[type='hidden']").add("#" + controlID + " textarea").add("#" + controlID + " input[type='radio']:checked").each(function (i, item) {
            var id = String.IsNullOrEmpty($(this).attr('id')) ? $(this).attr('name') : $(this).attr('id');
            if (id) {
                var index = id.indexOf(pre);
                if (index >= 0) {
                    id = id.substr(index + pre.length, id.length - pre.length - index);
                    var value = $(this).val();
                    GCIMS.Common.getFormData_DealValue(data, id, value, splitprestring);
                }
            }
        });
        return data;
    },
    getFormData_DealValue: function (data, id, value, splitpre) {
        value = encodeURI(value).replace(/'/g, "\\'"); //原来编码方式是escape,在出现德文字符时出现乱码。使用此方法测试一段时间后，再考虑是否全局替换
        var oldValue = eval("data." + id);

        var splitprestring = ",";
        if (splitpre == null || splitpre == undefined || splitpre == "") {
            splitprestring = ",";
        } else {
            splitprestring = splitpre;
        }
        if (oldValue == null || oldValue == undefined) {
            oldValue = value;
        }
        else {

            oldValue += (splitprestring + value);
        }
        eval("data." + id + "='" + oldValue + "'");
    },


    /*获取url参数，可以避免乱码 沈书文 2013-11-22
    返回的是一个数组,可以用getQueryStringByName[name]方式获取值
    */
    getQueryStringByName: function () {
        var args = new Object();
        var query = location.search.substring(1); // Get query string
        var pairs = query.split("&"); // Break at ampersand
        for (var i = 0; i < pairs.length; i++) {
            var pos = pairs[i].indexOf('='); // Look for "name=value"
            if (pos == -1) continue; // If not found, skip
            var argname = pairs[i].substring(0, pos); // Extract the name
            var value = pairs[i].substring(pos + 1); // Extract the value
            value = decodeURIComponent(value); // Decode it, if needed
            args[argname] = value; // Store as a property
        }
        return args; // Return the object
    },
    /*向后台调用数据（同步调用），后台使用新的BasePage
    *url(string)：后台处理数据页面的地址
    *method(string)：后台处理数据页面操作名称
    *[param](object)：发送到后台的数据，键值对
    *[option](object)：操作的参数
    *返回值：null 表示失败 成功则返回对应的请求数据
    */
    invoke: function (url, method, param, option) {
        var rtv = null;
        if (!param) param = {};
        param.method = method;
        var innerOption = {
            url: url,
            type: "POST",
            dataType: "json",
            async: false,
            data: param,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.jBox.closeTip();
                var msg = GCIMS.Validate.isNull(textStatus) ? errorThrown : textStatus;
                msg = "请求发生错误" + (GCIMS.Validate.isNull(msg) ? "" : "：" + msg);
                GCIMS.Page.ShowMessage(msg);
            }
        };
        innerOption = $.extend(innerOption, option);
        innerOption.success = function (data, textStatus) {
           // $.jBox.closeTip();
            if (!GCIMS.Validate.isNull(data)) {
                switch (data.Status) {
                    //                    Success = 1,                    
                    //                    NoRight = -999,                    
                    //                    NoLogIn=-998,                    
                    //                    ServerError = -997,                    
                    //                    ServerErrorHandled = -996,                    
                    //                    MethodNotFind = -995                    
                    case 1:
                        if (data.ContentType == 3) {
                            rtv = $.parseJSON(data.Content);
                        }
                        else {
                            rtv = data.Content;
                        }
                        if (typeof (this.callback) == "function") {
                            this.callback(rtv);
                        }
                        break;
                    case -998:
                        ReLogin();
                        break;
                    case -996:
                        $.jBox.info(data.Content, "提示");
                        break;
                    case -999:
                    case -997:
                    case -995:
                        GCIMS.Page.ShowMessage(data.Content);
                        break;
                }
            }
            else {
                GCIMS.Page.ShowMessage("请求发生错误：服务器未返回数据");
            }
        };
       // $.jBox.tip("请求中...", "loading" );
        $.ajax(innerOption);
        return rtv;
    },
    /*向后台调用数据（异步调用），后台使用新的BasePage
    *url(string)：后台处理数据页面的地址
    *method(string)：后台处理数据页面操作名称
    *[param](object)：发送到后台的数据，键值对
    *[callback](function)：成功后的回调函数，函数传入请求返还的值
    *返回值：null 表示失败 成功则返回对应的请求数据
    */
    invokeAsync: function (url, method, param, callback) {
        this.invoke(url, method, param, { async: true, callback: callback });
    },
    /*绑定数据
    *data:json格式的数据
    *controlID:绑定数据的范围
    *pre:要绑定的元素的修饰符，如提交元素为_post_
    */
    bindTextData: function (data, controlID, pre) {
        var selector = $("#" + controlID);
        var input = selector.find("input[type='text']").add("#" + controlID + " input[type='hidden']").add("#" + controlID + " textarea").add("#" + controlID + " select");
        input.each(function () {
            var currentid = $(this).attr('id');
            if (currentid.indexOf(pre) >= 0) {
                currentid = currentid.replace(new RegExp(pre), "");
                var value = data[currentid];
                $(this).val(value);
            }
        });
        var checkbox = selector.find("input[type='checkbox']");
        checkbox.each(function () {
            var currentid = $(this).attr('id');
            if (currentid.indexOf(pre) >= 0) {
                currentid = currentid.replace(new RegExp(pre), "");
                var value = data[currentid];
                if (value == "true" || value == "1") {
                    $(this).attr('checked', true);
                }
            }
        });
    }

}

GCIMS.Validate = {
    /*验证函数-验证是否为空
    *controlID：检查的元素
    *tipID：提示框的元素
    *tipContent：提示的内容，不通过时显示
    *isNotReturn:是否换行，在单元格较小的情况下可以不传，使其在输入框下显示
    */
    validateNotNull: function (controlID, tipID, tipContent, isNotReturn) {
        var isPass = true;
        $("#" + controlID).each(function () {
            if (GCIMS.Validate.isNull($(this).val())) {
                $(this).siblings("#" + tipID).html(GCIMS.Validate.validationTip(false, tipContent, isNotReturn));
                isPass = false;
            }
            else {
                $(this).siblings("#" + tipID).html(GCIMS.Validate.validationTip(true, "", isNotReturn));
            }
        });
        return isPass;

    },

    /*验证函数-验证checkbox,raido是否为空
    *controlName：检查的元素Name
    *tipID：提示框的元素
    *tipContent：提示的内容，不通过时显示
    *isNotReturn:是否换行，在单元格较小的情况下可以不传，使其在输入框下显示
    */
    validateCheckNotNull: function (controlName, tipID, tipContent, isNotReturn) {
        var isPass = false;
        $("[name='" + controlName + "']").each(function () {
            if ($(this).attr("checked")) {
                isPass = true;
                return false;
            }
        });
        if (isPass) {
            $("#" + tipID).html(GCIMS.Validate.validationTip(true, "", isNotReturn));
        }
        else {
            $("#" + tipID).html(GCIMS.Validate.validationTip(false, tipContent, isNotReturn));
        }
        return isPass;
    },

    /*验证函数-输入提示信息
    *isRight：显示错误或成功信息
    *tip：提示信息
    *isNotReturn：是否换行，在单元格较小的情况下可以不传，使其在输入框下显示
    *
    *返回：dom
    */
    validationTip: function (isRight, tip, isNotReturn) {
        var dom = "";
        if (isRight) {
            return "";
            isNotReturn ? dom = "<span class='tip1 tip1_right '>通过</span>" : dom = "<br/><span class='tip1 tip1_right'>通过</span>";
        }
        else {
            isNotReturn ? dom = "<span class='tip1 tip1_error '>" + tip + "</span>" : dom = "<br/><span class='tip1 tip1_error '>" + tip + "</span>";

        }
        return dom;
    },
    /*验证值是否为空
    * ##TODO:验证是否可以取代这个判断的方法String.IsNullOrEmpty
    */
    isNull: function (val) {
        if (!isNaN(val)) {
            if (val == "0") {
                return false
            }
        } if (val == undefined || val == null || val == "" || val == '' || val == "undefined" || val == "null" || val == "NULL") {
            return true
        } return false
    },
    /*验证企业组织机构代码
    */
    isValidEntpCode: function (code) {
        if (code == "11111111-1") {
            return true;
        }
        var ws = [3, 7, 9, 10, 5, 8, 4, 2];
        var str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var reg = /^([0-9A-Z]){8}-[0-9|X]$/; // /^[A-Za-z0-9]{8}-[A-Za-z0-9]{1}$/
        if (!reg.test(code)) {
            return false;
        }
        var sum = 0;
        for (var i = 0; i < 8; i++) {
            sum += str.indexOf(code.charAt(i)) * ws[i];
        }
        var c9 = 11 - (sum % 11);
        if (c9 == 11)
            c9 = "0";
        else
            c9 = c9 == 10 ? 'X' : c9
        return c9 == code.charAt(9);
    }

}

GCIMS.Right = {
    /*处理后台权限检测的返回值，在ajax回调方法中加入这个函数
    data：可能是权限检测的返回值data或者权限检测通过后方法本身的返回值
    */
    checkOperUserFunc: function (data, callback) {
        if (data != undefined || data != "") {
            var json;
            try {
                json = eval('(' + data + ')');
            }
            catch (err) { }

            if (json != undefined && json.hasOwnProperty("Status") && json.Status == -999) {
                var url = "/ErrorPage.aspx?errortype=" + json.Content;
                $.jBox("iframe:" + url, {
                    title: "错误提示",
                    top: 10,
                    width: 600,
                    height: 400,
                    buttons: { '关闭': true }
                });
            } else {
                if (typeof (callback) == "function") {
                    callback(data);
                }
            }
        }

    }

} 
GCIMS.List = {
    /*
    *表格中，第一列的checkbox全选功能
    *使用：onclick="GCIMS.List.CheckAll(this)"
    */
    CheckAll: function (elem) {       
       var input= $(elem).parentsUntil("table").last().parent().find("tbody tr td >input[type='checkbox']").not(elem);
       if($(elem).attr('checked')){
        input.attr('checked',true);        
       }
       else{
       input.attr('checked',false);   
       }
       
    },
};

GCIMS.Page = {
    /*显示信息*/
    ShowMessage: function (msg) {
        var dom = "<div><p style='margin: 10px;'>" + msg + "</p></div>";
        $.jBox.open(dom, "信息", 600, 400, { buttons: { '关闭': true }, showScrolling: true, id: 101 });
    }
}

window["isNull"] = GCIMS.Validate.isNull;

//#endregion 

//#region 帮助方法

function GoToPage(url, pars, IndexName, IndexPage, ShowObj) {
    //刷新页面时刷新当前页，现在在认证机构端收费管理列表中实现
    if (CurrentPageIndex != undefined && CurrentPageIndex != null) {
        CurrentPageIndex = IndexPage;
    }
    if (pars.length > 0) {
        if (IndexName == "")
            IndexName = "PageIndex"
        pars = pars + "&" + IndexName + "=" + IndexPage;
    }
    else {
        if (IndexName == "")
            IndexName = "PageIndex"
        pars = IndexName + "=" + IndexPage;
    }

    GCIMS.Common.ShowDataDiv(url, encodeURI(pars), ShowObj, "")



}


//适用于自定义页数
function GoToPage(url, pars, IndexName, IndexPage, ShowObj, pageSize) {
    if (pars.length > 0) {
        if (IndexName == "")
            IndexName = "PageIndex"
        pars = pars + "&" + IndexName + "=" + IndexPage + "&UserPageSize=" + pageSize;
    }
    else {
        if (IndexName == "")
            IndexName = "PageIndex"
        pars = IndexName + "=" + IndexPage + "&UserPageSize=" + pageSize;
    }

    GCIMS.Common.ShowDataDiv(url, pars, ShowObj, "")



}

//弹出消息框Div
//title标题栏提示
//messContent主题模块内容（innerHtml）（如：<div>谢谢使用，div内容</div>）
//width   显示的div 的宽度
function showMessageDivBox(ev, title, messContent, width) {
    $.jBox.open(messContent, title, width, 'auto', { buttons: { '关闭': true} });
}
function showMessageDivBox(ev, title, messContent, width, divID, backDivID) {
    $.jBox.open(messContent, title, width, 'auto', { buttons: { '关闭': true} });
}

function ReLogin() {
    var url = "/ReLogin.aspx?flag=1";
    $.jBox("iframe:" + url, {
        title: "重新登录",
        width: 450,
        height: 400,
        buttons: { '关闭': true }
    });
}

/*手机端重新登录*/
function MisLogin() {
    window.location.href = "/mis/mislogin.aspx";
}

/*文本输入框字数限制
*element:当前文本框元素，可以传入this
*
*使用时在textarea中加入onkeyup事件，并且加上maxlength属性来指定长度
*/
function dealTextareaMaxLength(element) {
    var maxLength = parseInt($(element).attr('maxlength'));
    if (maxLength > 0) {
        var sss = $(element).val().length;
        if ($(element).val().length >= maxLength) {
            $.jBox.alert('超过字数限制！', '提示');
        }
    }
}

//#endregion

//#region 子系统特有

/**
* 验证是否为中文
*/
function checkCn(string) {
    var patrn = /^[\u4e00-\u9fa5]+$/;
    if (!patrn.exec(string)) {
        return false;
    } else {
        return true;
    };
};

/**
* 返回字符串长度，中文字符算作两个
*/
function len(str) {
    return str.replace(/[^\x00-\xff]/g, "aa").length;
};

function ShowDetailSearchDiv2(showDivID, closedDivID, IsDetailValue) {

    $("#" + showDivID).show();
    $("#" + closedDivID).hide();
    TopIsDeatil = IsDetailValue;
}


//#endregion


//#region 专用于页面首页 检测方案上下页
//上一页
function GoToPagePrev(url, pars, IndexName, IndexPage, ShowObj, AnimateId) {
    //刷新页面时刷新当前页，现在在认证机构端收费管理列表中实现
    if (CurrentPageIndex != undefined && CurrentPageIndex != null) {
        CurrentPageIndex = IndexPage;
    }
    if (pars.length > 0) {
        if (IndexName == "")
            IndexName = "PageIndex"
        pars = pars + "&" + IndexName + "=" + IndexPage;
    }
    else {
        if (IndexName == "")
            IndexName = "PageIndex"
        pars = IndexName + "=" + IndexPage;
    }
    $(AnimateId).animate({ left: "978px" }, 500, function () {
        GCIMS.Common.ShowDataDiv(url, encodeURI(pars), ShowObj, "");
    });
    
}
//下一页
function GoToPageNext(url, pars, IndexName, IndexPage, ShowObj, AnimateId) {
    //刷新页面时刷新当前页，现在在认证机构端收费管理列表中实现
    if (CurrentPageIndex != undefined && CurrentPageIndex != null) {
        CurrentPageIndex = IndexPage;
    }
    if (pars.length > 0) {
        if (IndexName == "")
            IndexName = "PageIndex"
        pars = pars + "&" + IndexName + "=" + IndexPage;
    }
    else {
        if (IndexName == "")
            IndexName = "PageIndex"
        pars = IndexName + "=" + IndexPage;
    }
    $(AnimateId).animate({ right: "978px" }, 500, function () {
        GCIMS.Common.ShowDataDiv(url, encodeURI(pars), ShowObj, "");
    });
    
}
//#endregion 
