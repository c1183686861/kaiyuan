// JScript 文件
//页面遮罩

var PopWindow = {
    PopWindosString: [],
    GetDefaultPopWindosString: function (msg, PopWindowID, title) {
        var DefaultPopWindosString = "";
        if (typeof (title) == "undefined") title = "";

        switch (PopWindowID) {
            case "1":

                DefaultPopWindosString += "<table border=\"1\" width=\"90%\" cellspacing=\"0\" cellpadding=\"4\" style=\"border-collapse: collapse\" bgcolor=\"#FFFFEC\" onClick=\"HPopWindow.ClosePopWindow(1)\">\
	            <td height=\"106\" align=center style=\"font-size:12px;line-height:200%; height:106;\"><span id=\"PopMessage\" style=\"filter: revealTrans(Transition=20, Duration=2);\">" + msg + "</span>\
	            </td></tr>\
	            </table>";
                break;
            case "2":
                DefaultPopWindosString += "<table border=\"1\" width=\"90%\" cellspacing=\"0\" cellpadding=\"4\" style=\"border-collapse: collapse\" bgcolor=\"#FFFFEC\" onClick=\"HPopWindow.ClosePopWindow(2)\">\
	            <td height=\"106\" align=center style=\"font-size:12px;line-height:200%; height:106;\"><span id=\"PopMessage\">\
	            <object   width=\"800\" height=\"600\" classid=\"clsid:A89DCED0-2E6E-47F0-8D90-558DC6DD7CCB\" codebase=\"/activex/ATRObjs.ocx#version=1,0,0,1\" id=\"ShowFabObj\" onClick=\"HPopWindow.ClosePopWindow(2)\">\
	            <param name=\"FabricURL\" value=\"" + msg + "\"></param>\
                </object></span>\
	            </td></tr>\
	            </table>";
                break;
            case "3": //滚动条样式
                DefaultPopWindosString += "<table border=\"1\" width=\"90%\" cellspacing=\"0\" cellpadding=\"4\" style=\"border-collapse: collapse\" bgcolor=\"white\">\
                <tr><td id=\"PopWindowMoveFlag3\" height=\"24\" align=\"right\" bgcolor=\"#99CCFF\" style=\"font-size:12px;color:#000;cursor:move; height:24\"></td></tr>\
                <tr><td height=\"106\" align=center style=\"font-size:12px;line-height:200%; height:106;\" ><span id=\"PopMessage\">" + msg + "</span><br><img src=\"/images/ajax-loader.gif\"></td></tr>\
                </table>";
                break;
            case "4":
                DefaultPopWindosString += "<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\
                  <tr id=\"PopWindowMoveFlag4\" style=\"cursor:move;\">\
                    <td width=\"9\"><img src=\"/images/pop/t_1.gif\" alt=\"\"/></td>\
                    <td background=\"/images/pop/t_3.gif\"><table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\
                      <tr>\
                        <td class=\"p_title\">" + title + "</td>\
                        <td align=\"right\"><img style=\"cursor:pointer;\" src=\"/images/pop/t_10.gif\" alt=\"close\" border=\"0\" onClick=\"HPopWindow.ClosePopWindow(4)\" /></td>\
                      </tr>\
                    </table></td>\
                    <td width=\"9\"><img src=\"/images/pop/t_2.gif\" alt=\"\" /></td>\
                  </tr>\
                  <tr>\
                    <td background=\"/images/pop/t_4.gif\">&nbsp;</td>\
                    <td bgcolor=\"#FFFFFF\" id=\"Div_PopString\"><br/>" + msg + "</td>\
                    <td width=\"9\" background=\"/images/pop/t_5.gif\">&nbsp;</td>\
                  </tr>\
                  <tr>\
                    <td width=\"9\"><img src=\"/images/pop/t_6.gif\" alt=\"\" /></td>\
                    <td background=\"/images/pop/t_8.gif\"></td>\
                    <td width=\"9\"><img src=\"/images/pop/t_7.gif\" alt=\"\" /></td>\
                  </tr>\
                </table>";
                break;
            case "0":

                DefaultPopWindosString += "<table border=\"1\" bordercolor=\"#828282\" width=\"245\" cellspacing=\"0\" cellpadding=\"0\" style=\"border-collapse: collapse\" bgcolor=\"white\">\
                <tr><td background=\"/images/bar_sub_bg.jpg\" height=\"25\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tr id=\"PopWindowMoveFlag0\"><TD align=\"left\" style=\"font-size:12px;color:#ffffff;cursor:move; height:24\">" + title + "</TD><td height=\"24\" align=\"right\" style=\"font-size:12px;color:#ffffff; height:24\">&nbsp;&nbsp;<u><span style=\"cursor:hand\" onClick=\"HPopWindow.ClosePopWindow(0)\">Close</span></u></td></tr>\
                </table></td></tr><tr><td height=\"106\" bgcolor=\"#f2fddb\" align=center style=\"font-size:12px;line-height:200%; height:106;\" ><span id=\"PopMessage\">" + msg + "</span></td></tr>\
                </table>";
                break;

            default:
                DefaultPopWindosString += "<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\
                  <tr id=\"PopWindowMoveFlag" + PopWindowID + "\" style=\"cursor:move;\">\
                    <td width=\"9\"><img src=\"/images/pop/t_1.gif\" alt=\"\"/></td>\
                    <td background=\"/images/pop/t_3.gif\"><table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\
                      <tr>\
                        <td class=\"p_title\">" + title + "</td>\
                        <td align=\"right\"><img style=\"cursor:pointer;\" src=\"/images/pop/t_10.gif\" alt=\"close\" border=\"0\" onClick=\"HPopWindow.ClosePopWindow('" + PopWindowID + "')\" /></td>\
                      </tr>\
                    </table></td>\
                    <td width=\"9\"><img src=\"/images/pop/t_2.gif\" alt=\"\" /></td>\
                  </tr>\
                  <tr>\
                    <td background=\"/images/pop/t_4.gif\">&nbsp;</td>\
                    <td bgcolor=\"#FFFFFF\" id=\"Div_PopString\"><br/>" + msg + "</td>\
                    <td width=\"9\" background=\"/images/pop/t_5.gif\">&nbsp;</td>\
                  </tr>\
                  <tr>\
                    <td width=\"9\"><img src=\"/images/pop/t_6.gif\" alt=\"\" /></td>\
                    <td background=\"/images/pop/t_8.gif\"></td>\
                    <td width=\"9\"><img src=\"/images/pop/t_7.gif\" alt=\"\" /></td>\
                  </tr>\
                </table>";
                break;
        }


        return DefaultPopWindosString;
    },
    AddPopWindosString: function (str) {
        return PopWindosString.push(str);

    },
    //是否ie
    isIE: function () { return (document.all && window.ActiveXObject && !window.opera) ? true : false; },
    //获取窗体大小
    GetBodySize: function () {
        var bodySize = [];
        with (document.documentElement) {
            bodySize[0] = (scrollWidth > clientWidth) ? scrollWidth : clientWidth;
            bodySize[1] = (scrollHeight > clientHeight) ? scrollHeight : clientHeight;
        }
        return bodySize;
    },
    //显示遮罩
    ShowCoverDiv: function () {
        if ($("#cover_div")) {

            var bodySize = getPageSize();
            var mHeight = document.documentElement.scrollHeight > bodySize[1] ? document.documentElement.scrollHeight : bodySize[1];
            css = { width: mHeight + 'px', display: '' };
            $("#cover_div").css(css);

        }
        else {
            var coverDiv = document.createElement('div');
            document.body.appendChild(coverDiv);
            coverDiv.id = 'cover_div';
            var bodySize = getPageSize();
            var mHeight = document.documentElement.scrollHeight > bodySize[1] ? document.documentElement.scrollHeight : bodySize[1];
            css = { position: "position", background: "#CCCCCC", left: "0px", top: "0px", width: "100%", height: mHeight + 'px',
                float: "left", zIndex: "698"
            }
            GetOpacity(css);
            coverDiv.css(css);
        }
    },
    //设置透明式样
    GetOpacity: function (css) {
        if (window.navigator.userAgent.indexOf('MSIE') >= 1) {
            css.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=30)';
        }
        else {
            css.opacity = '0.3';
        }
    },
    //取消遮罩显示
    CancelCoverDiv: function () {
        if ($("#cover_div"))
            $("#cover_div").css({ display: "none" });
        body.css({ overflow: "" });
    },
    //显示弹出窗口
    ShowPopWindow: function (HTML_Message, IsCoverDiv, PopWindowID, P_width, P_height, P_left, P_top, IsDrag, title) {

        var _zIndex = 700;
        if (PopWindowID.length > 2) {
            _zIndex = 710;
        }
        else {
            if (PopWindowID == "3")
                _zIndex = 720;
        }
        if ($('#Div_PopWindow_' + PopWindowID).length==0) {
            var TempElement = document.createElement("div");
            document.body.appendChild(TempElement);
            TempElement.id = "Div_PopWindow_" + PopWindowID;
            
        }
        var bodySize = getPageSize();
        if (P_left < 0) { P_left = (bodySize[0] - P_width) / 2 + document.documentElement.scrollLeft }
        //this.style.left = (getWindowSize()[0] - 489) / 2 + document.documentElement.scrollLeft + "px";
        //if(P_top<0){P_top = (bodySize[1] - P_height) / 2 + document.documentElement.scrollTop }
        if (P_top < 0) { P_top = document.documentElement.scrollTop + (window.screen.availHeight - P_height) / 2 }
        $('#Div_PopWindow_' + PopWindowID).css({
            position: "absolute",
            width: P_width + 'px',
            height: P_height + 'px',
            left: P_left + 'px',
            top: P_top + 'px',
            zIndex: _zIndex
        });
        //document.oncontextmenu=DoNothing;

        var myHtml = this.GetDefaultPopWindosString(HTML_Message, PopWindowID, title);
        $('#Div_PopWindow_' + PopWindowID).html(myHtml);

        $('#Div_PopWindow_').show();
        //Effect.toggle('Div_PopWindow','appear');

        //if (IsCoverDiv) { this.ShowCoverDiv(); }
        //if(IsDrag){new Draggable('Div_PopWindow_'+PopWindowID,{scroll:window,handle:'PopWindowMoveFlag'+PopWindowID,revert:false});}

    },
    //关闭弹出窗口
    ClosePopWindow: function (flag) {

        $('#Div_PopWindow_' + flag).innerHTML = "";

        $('#Div_PopWindow_' + flag).hide();
        //Effect.toggle('Div_PopWindow','appear');
        //$('Div_PopWindow').style.display="none";//hide();
        try { this.CancelCoverDiv(); } catch (e) { }

    },
    //默认弹出窗口
    ShowDefaultPopWindow: function (HTML_Message) {
        this.ShowPopWindow(HTML_Message, 1, "0", 300, 150, -1, -1, true);
    },
    //弹出指定窗口，根据PopWindowID来指定不同的窗口样式
    ShowMyPopWindow: function (HTML_Message, PopWindowID, P_width, P_height, title) {

        this.ShowPopWindow(HTML_Message, 1, PopWindowID, P_width, P_height, -1, -1, true, title);
    },
    //显示文件上传的进度窗口
    ShowUpFileProcessWindow: function (HTML_Message, PopWindowID, P_width, P_height) {
        this.ShowPopWindow(HTML_Message, 1, PopWindowID, P_width, P_height, -1, -1, true);
    },
    //通用滚动条
    ShowProcessWindow: function (HTML_Message) {
        this.ShowPopWindow(HTML_Message, 1, "3", 300, 150, -1, -1, true);

    }

}
function DoNothing()//什么都不做,并且把时间冒泡都取消
{
    event.cancelBubble = true;
    return false;
}

//-------------------------------------------------------------------------------------------


function getPageScroll() {
    var yScroll;
    if (self.pageYOffset) {
        yScroll = self.pageYOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict 
        yScroll = document.documentElement.scrollTop;
    } else if (document.body) {// all other Explorers 
        yScroll = document.body.scrollTop;
    }
    arrayPageScroll = new Array('', yScroll)
    return arrayPageScroll;
}
function getPageSize() {
    var xScroll, yScroll;
    if (window.innerHeight && window.scrollMaxY) {
        xScroll = document.body.scrollWidth;
        yScroll = window.innerHeight + window.scrollMaxY;
    } else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac 
        xScroll = document.body.scrollWidth;
        yScroll = document.body.scrollHeight;
    } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari 
        xScroll = document.body.offsetWidth;
        yScroll = document.body.offsetHeight;
    }
    var windowWidth, windowHeight;
    if (self.innerHeight) { // all except Explorer 
        windowWidth = self.innerWidth;
        windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode 
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers 
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
    }
    // for small pages with total height less then height of the viewport 
    if (yScroll < windowHeight) {
        pageHeight = windowHeight;
    } else {
        pageHeight = yScroll;
    }
    if (xScroll < windowWidth) {
        pageWidth = windowWidth;
    } else {
        pageWidth = xScroll;
    }
    arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight)
    return arrayPageSize;
}

//-----------------------------------------------------------------------------------