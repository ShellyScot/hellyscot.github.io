var time = 55;
var leftTime = 60;
var WebInfull = {
	 //防止请求过快参数
	 requestFlag : false,
	 selectShop : 0,
	 infullType : 0,
	 payUrl:"",
	 centerInfullType : 0,
	 
	 init : function() {
		 $(".itemSmsList li").click(function() {
		    $(this).siblings('li').removeClass('active'); 
            $(this).addClass('active');                            
		 })
			
		 $(".itemLaList li").click(function(){
		    $(this).siblings('li').removeClass('active'); 
            $(this).addClass('active');                            

		 })
		 WebInfull.noSorll();
	
	 },
	
     showTips : function(msg) {
    	 $("#thickTipDiv").show();
    	 $("#tipMsg").text(msg);
    	 $("#tipDiv").show();
     },
	 hideTips : function() {
		 $("#thickTipDiv").hide();
		 $("#tipMsg").text("");
		 $("#tipDiv").hide();
	 }, 
	 
	 hideRechargeModeDiv() {
		 $("#thickdiv").hide(); 
    	 $("#rechargeMode").hide();
	 },
	 hideSureDiv() {
		 $("#thickdiv2").hide(); 
    	 $("#sureDiv").hide();
	 },
	 
	 showPayResultDiv() {
		 $("#thickdiv2").show(); 
    	 $("#payResultDiv").show();
	 },
	 hidePayResultDiv() {
		 $("#thickdiv2").hide(); 
    	 $("#payResultDiv").hide();
	 },
	 showWaitDiv() {
		 $("#thickdiv2").show(); 
    	 $("#waitDiv").show();
	 },
	 hideWaitDiv() {
		 $("#thickdiv2").hide(); 
    	 $("#waitDiv").hide(); 
	 },
	 
	 showFailDiv() {
		 $("#thickdiv2").show(); 
    	 $("#failDiv").show();
	 },
	 hideFailDiv() {
		 $("#thickdiv2").hide(); 
    	 $("#failDiv").hide(); 
	 },
	 
	 showSuccessDiv() {
		 $("#thickdiv2").show(); 
    	 $("#successDiv").show();
	 },
	 hideSuccessDiv() {
		 $("#thickdiv2").hide(); 
    	 $("#successDiv").hide();
    	 window.location.reload();
	 },
	 
	 showViewDiv() {
		 $("#thickdiv").show(); 
    	 $("#viewDiv").show();
	 },
	 
	 hideViewDiv() {
		 $("#thickdiv").hide(); 
    	 $("#viewDiv").hide();
	 },
	 
     noSorll : function() {
    	 document.getElementById('rechargeMode').addEventListener('touchmove', function (event) { 
             event.preventDefault(); 
         });
     },
     showRechargeModeDiv : function(type) {
    	 var infullId = $("#infullId").val();
    	 if (infullId == null || infullId == "") {
    		 WebInfull.showTips("Format ID Salah!");
    		 return;
    	 }
    	 WebInfull.chooseSupportInfull(type);
    	 WebInfull.selectShop = type;
    	 $("#thickdiv").show(); 
    	 $("#rechargeMode").show();
    	 
     },
     
     chooseSupportInfull : function(type) {
    	 $("li").each(function() {
    		 $(this).show();
    	 });
    	 
    	 $("#ewallet li").each(function() {
    		 $(this).addClass("discount");
    	 });
    	 if (type == 1 || type == 11) {
    		 $("#infullType6").hide();
    		 $("#infullType7").hide();
    		 $("#infullType9").hide();
    		 $("#infullType11").hide();
    		 $("#infullType13").hide();
    	 } else if (type == 2 || type == 12) {
    		 $("#infullType6").hide();
    		 $("#infullType7").hide();
    		 $("#infullType11").hide();
    	 } else if (type == 3 || type == 9 || type == 13) {
    		 $("#infullType6").hide();
    		 $("#infullType7").hide();
    		 $("#infullType9").hide();
    		 $("#infullType11").hide();
    	 } else if (type == 4 || type == 5 || type == 10 || type == 14 || type == 15) {
    		 $("#infullType9").hide();
    	 } else if (type == 6 || type == 7 || type == 8 || type == 16) {
    	 }
    	 
//    	 if (type == 1) {
//    		 $("#ewallet li").each(function() {
//        		 $(this).removeClass("discount");
//        	 });
//    	 }
    	 
     },
     
     showSureDiv : function(infullType) {
    	 var userId = $("#infullId").val();
    	 if (WebInfull.requestFlag) {
    		 return;
    	 }
    	 WebInfull.requestFlag = true;
    	 var costKey = WebInfull.getWebCostKey();
    	 $.ajax({
             url : "../web/infullRequest.do",
             type: 'post',
             cache: false,
             dataType: 'json',
             data:{
            	 "userId" : userId,
                 "costKey" : costKey,
                 "infullType" : infullType,
                 "version" : $("#version").val()
             },
             success:function(data) {
            	 if (data.code == 0) {
            		 WebInfull.writeMessage(infullType, data.message.nickName, userId);
            		 $("#thickdiv2").show(); 
                	 $("#sureDiv").show();
                	 WebInfull.infullType = infullType;
                	 WebInfull.payUrl = data.message.infullUrl;
                	 WebInfull.centerInfullType = data.message.centerInfullType;
                	 WebInfull.requestFlag = false;
                	 
            	 } else {
            		 WebInfull.showTips(data.message.errorMsg);
            		 WebInfull.requestFlag = false;
            	 }
             },
             error:function(){
            	 WebInfull.showTips("Kesalahan sistem, harap beroperasi kembali.");
            	 WebInfull.requestFlag = false;
             }
         });
    	 
     },
     
     writeMessage : function (infullType, nickName, userId) {
    	 var goldNum = "";
    	 var payMoney = "";
    	 if (WebInfull.selectShop == 1) {
    		 goldNum = "30M + 1.5M";
    		 payMoney = "5K";
    	 } else if (WebInfull.selectShop == 2) {
    		 goldNum = "60M + 3M";
    		 payMoney = "10K";
    	 } else if (WebInfull.selectShop == 3) {
    		 goldNum = "200M + 10M";
    		 payMoney = "30K";
//    		 if (WebInfull.isEwallet(infullType)) {
// 	 			goldNum = "200M + 10M";
//     		 }
    	 } else if (WebInfull.selectShop == 4) {
    		 goldNum = "400M + 20M";
    		 payMoney = "60K";
    	 } else if (WebInfull.selectShop == 5) {
    		 goldNum = "2B + 100M";
    		 payMoney = "250K";
    	 } else if (WebInfull.selectShop == 6) {
    		 goldNum = "4B + 200M";
    		 payMoney = "500K";
    	 } else if (WebInfull.selectShop == 7) {
    		 goldNum = "120M";
    		 payMoney = "10K";
    	 } else if (WebInfull.selectShop == 8) {
    		 goldNum = "40M+600Koin";
    		 payMoney = "10K";
    	 } else if (WebInfull.selectShop == 9) {
    		 goldNum = "120M+2000Koin";
    		 payMoney = "30K";
    	 } else if (WebInfull.selectShop == 10) {
    		 goldNum = "2.7B + 135M";
    		 payMoney = "325K";
    	 } else if (WebInfull.selectShop == 11) {
    		 goldNum = "500 + 25";
    		 payMoney = "5K";
    	 } else if (WebInfull.selectShop == 12) {
    		 goldNum = "1000 + 50";
    		 payMoney = "10K";
    	 } else if (WebInfull.selectShop == 13) {
    		 goldNum = "3300 + 165";
    		 payMoney = "30K";
    	 } else if (WebInfull.selectShop == 14) {
    		 goldNum = "6600 + 330";
    		 payMoney = "60K";
    	 } else if (WebInfull.selectShop == 15) {
    		 goldNum = "30000 + 1500";
    		 payMoney = "250K";
    	 } else if (WebInfull.selectShop == 16) {
    		 goldNum = "60000 + 3000";
    		 payMoney = "500K";
    	 } 
    	 
    	 $("#userId").text(userId);
    	 $("#nickName").text(nickName);
    	 $("#goldNum").text(goldNum);
    	 $("#payMoney").text(payMoney);
    	 
     },
     
     isEwallet : function(infullType) {
    	 if (infullType == 8 || infullType == 10 || infullType == 13 || infullType == 14) {
    		 return true
    	 }
    	 return false;
     },
     
     commitOrder : function() {
    	 WebInfull.hideSureDiv();
    	 if (WebInfull.centerInfullType == 'UPOINT') {
    		 upoint.pay(WebInfull.payUrl);
    	 } else {
    		 window.open(WebInfull.payUrl);
    	 }
    	 
		 WebInfull.showPayResultDiv();
     },
     
     checkReult : function () {
    	 WebInfull.hidePayResultDiv();
    	 WebInfull.showWaitDiv();
    	 if (WebInfull.requestFlag) {
    		 return;
    	 }
    	 WebInfull.requestFlag = true;
    	 leftTime = 60;
		 time = 55;
		 $("#queryTime").text(leftTime);
    	 var t2 =  setInterval(function() {
    		 leftTime = leftTime - 1;
    		 if (leftTime <= 0) {
    			 clearInterval(t2);
    		 }
    		 $("#queryTime").text(leftTime);
    	 }, 1000);
    	 
    	 var t = setInterval(function() {
    		 time = time - 5;
    		 if (time < 0) {
    			 clearInterval(t);
    			 clearInterval(t2);
    			 WebInfull.requestFlag = false;
    			 WebInfull.hideWaitDiv();
    			 WebInfull.showFailDiv();
    		 }
    		 $.ajax({
                 url : "../web/checkResult.do",
                 type: 'post',
                 cache: false,
                 dataType: 'json',
                 data:{
                     "userId" : $("#infullId").val()
                 },
                 success:function(data) {
                	 if (data.code == 0) {
                		 clearInterval(t);
                		 clearInterval(t2);
                    	 WebInfull.requestFlag = false;
                    	 WebInfull.hideWaitDiv();
            			 WebInfull.showSuccessDiv();
            			 WebInfull.hideRechargeModeDiv();
                	 }
                 },
                 error:function(){
                	 WebInfull.showTips("Kesalahan sistem, harap beroperasi kembali.");
                	 clearInterval(t);
                	 WebInfull.requestFlag = false;
                 }
             });
    		}, 5000);

    	 
     },
     
     getWebCostKey : function() {
    	 if (WebInfull.selectShop == 1) {
    		return "com.neptune.domino.coincard0035";
    	 }
    	 if (WebInfull.selectShop == 2) {
     		return "com.neptune.domino.coincard0066";
     	 }
    	 if (WebInfull.selectShop == 3) {
     		return "com.neptune.domino.coincard0199";
     	 }
    	 if (WebInfull.selectShop == 4) {
     		return "com.neptune.domino.coincard0399";
     	 }
    	 if (WebInfull.selectShop == 5) {
     		return "com.neptune.domino.coincard1666";
     	 }
    	 if (WebInfull.selectShop == 6) {
     		return "com.neptune.domino.coincard3333";
     	 }
    	 if (WebInfull.selectShop == 7) {
    		 return "com.neptune.domino.sc.coincard00099";
    	 }
    	 if (WebInfull.selectShop == 8) {
    		 return "com.neptune.domino.jr.coincard0066";
    	 }
    	 if (WebInfull.selectShop == 9) {
    		 return "com.neptune.domino.jr.coincard0199";
    	 }
    	 if (WebInfull.selectShop == 10) {
    		 return "com.neptune.domino.coincard2166";
    	 }
    	 if (WebInfull.selectShop == 11) {
    		 return "com.neptune.domino.berliancard0035";
    	 }
    	 if (WebInfull.selectShop == 12) {
    		 return "com.neptune.domino.berliancard0066";
    	 }
    	 if (WebInfull.selectShop == 13) {
    		 return "com.neptune.domino.berliancard0199";
    	 }
    	 if (WebInfull.selectShop == 14) {
    		 return "com.neptune.domino.berliancard0399";
    	 }
    	 if (WebInfull.selectShop == 15) {
    		 return "com.neptune.domino.berliancard1666";
    	 }
    	 if (WebInfull.selectShop == 16) {
    		 return "com.neptune.domino.berliancard3333";
    	 }
     }
     
	
};

WebInfull.init();

