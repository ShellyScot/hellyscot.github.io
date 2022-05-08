var DominoUi = function () {
    this.yesfunction = null;
    this.nofunction = null;
}
//公共方法
DominoUi.prototype.findBody = function () {
    return document.getElementsByTagName("body")[0];
}

DominoUi.prototype.hideDiv = function () {
    let div = document.getElementById("tipDiv");
    if (div) {
        this.findBody().removeChild(div);
    }
	let thickDiv = document.getElementById("uiThickDiv");
	if (thickDiv) {
		this.findBody().removeChild(thickDiv);
	}
}
DominoUi.prototype.hideConfirm = function () {
    let confirm = document.getElementById("confirmDiv");
    if (confirm) {
        this.findBody().removeChild(confirm);
    }
	let thickDiv = document.getElementById("uiThickDiv");
	if (thickDiv) {
		this.findBody().removeChild(thickDiv);
	}
}


//显示提示
DominoUi.prototype.findDiv = function () {
    if (document.getElementById('tipDiv')) {
        return document.getElementById('tipDiv');
    } else {
        let div = document.createElement('div');
        div.setAttribute('id', 'tipDiv');
        div.setAttribute('style', 'position: fixed; top: 50%; left: 50%; margin: -1.44rem 0 0 -2.6rem; width: 5.2rem; height: 2.98rem; background: url(../img/bg_tips.png) no-repeat; background-size: 100% 100%;z-index: 102;');
        return div;
    }
}

//显示提示
DominoUi.prototype.findThickDiv = function () {
    if (document.getElementById('uiThickDiv')) {
        return document.getElementById('uiThickDiv');
    } else {
        let div = document.createElement('div');
        div.setAttribute('id', 'uiThickDiv');
        div.setAttribute('style', ' position: fixed; top: 0; left: 0; width: 100%;  height: 100%; background:#000000; border: 0 none; opacity: 0.5; filter:alpha(opacity=50); z-index:101;');
        return div;
    }
}

DominoUi.prototype.showMsg = function (msg) {
    let div = this.findDiv();
    div.innerHTML = '<p style="align-items: center;color: #efcb80;font-size: 0.3rem;height: 1.2rem;justify-content: center;justify-self: center;margin: 0.2rem 0.2rem 0.3rem;text-align: center;display: flex;word-break: break-word;">' + msg + '</p>' +
        '<a style="display: block; margin: 0 auto; width: 2.28rem; height: .79rem; background: url(../img/btn_binding_tips.png) no-repeat; background-size: 100% 100%;" onclick="dominoUi.hideDiv()"></a>'
	let thickDiv = this.findThickDiv();
    this.findBody().append(thickDiv);
	this.findBody().append(div)
}

//确认选择框
DominoUi.prototype.findConfirm = function () {
    if (document.getElementById('confirmDiv')) {
        return document.getElementById('confirmDiv');
    } else {
        let div = document.createElement('div');
        div.setAttribute('id', 'confirmDiv');
        div.setAttribute('style', 'position: fixed; top: 50%; left: 50%; margin: -1.79rem 0 0 -3.14rem; display: flex; display: -webkit-flex; width: 6.28rem; height: 3.59rem;background: url(../img/bg_note.png) no-repeat; align-items: center; flex-flow: column; justify-content: center; background-size: 100% 100%; z-index: 102;')
        return div;
    }
}

DominoUi.prototype.byes = function() {
    this.call(this.yesfunction)
}
DominoUi.prototype.bno = function() {
    this.call(this.nofunction)
}
DominoUi.prototype.call = function(fun) {
    if (fun) {
        fun();
    }
    this.hideConfirm();
    this.yesfunction = null;
    this.nofunction = null;
}


DominoUi.prototype.showConfirm = function (msg, yfun, nfun) {
    let div =this.findConfirm();
    this.nofunction = nfun;
    this.yesfunction = yfun;
    div.innerHTML = '<p style="width: 5.5rem; font-size: .26rem; color: #efcb80;margin: 0;text-align: center;word-wrap:break-word;">' + msg + '</p>' +
        '<p style="margin: 0"><a style="display: inline-block; margin-top: .5rem; width: 1.96rem; height: .74rem; background-repeat: no-repeat; background-size: cover;background-image: url(../img/btn_cannel.png);"  onclick="dominoUi.bno()"></a>' +
        '<a style="display: inline-block; margin-top: .5rem; width: 1.96rem; height: .74rem; background-repeat: no-repeat; background-size: cover;margin-left: .5rem; background-image: url(../img/btn_binding.png);"  onclick="dominoUi.byes()"></a></p>'
	let thickDiv = this.findThickDiv();
    this.findBody().append(thickDiv);
	this.findBody().append(div)	   
}
var dominoUi = new DominoUi();

