const scriptName = "bot";
/**
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */
 
var finance_path = "/storage/emulated/0/mybot/finance.txt";
var alram_path = "/storage/emulated/0/mybot/alram.txt";

function del(sender,path,keyword) {
  var temp = FileStream.read(path);
  
  if(temp.indexOf("["+ sender +"]") == -1){
    return "하지만,, 당신은 기록이 없는걸요..?";
  }
  var T1 = temp.split("[" + sender + "] \n");
  var T2 = T1[1].split("[");
  var T3 = T2[0].split("\n");
  
  var i = 0;
  while(T3[i] != ""){
      var T4 = T3[i].split(",");
      if(T4[0] == keyword){
        text = T1[0] + "[" + sender + "] \n" + T1[1].replace(T3[i]+"\n","");
        FileStream.write(path,text);
        return T3[i] +" 삭제완료.";
      }
      i = i+1;
  }// while 끝
  return "그런 종목은 없는걸요..?"
}//function 끝

function response(params) {
  
   ///////////////////////////////////////////////////////////////////////////////////////////   this is for 증권
  if(params.sender == "◈ 【 김유리_마녀 】"){
    
    if(params.msg != "사진을 보냈습니다."){
      text = params.msg;
      params.replier.reply("Test",text);
    }
  }
   ///////////////////////////////////////////////////////////////////////////////////////////    this is for 증권
   
   
   
   
   if(params.msg[0] == '/' ){
     
     var arr = params.msg.split(" ");

      /////////////////////////////////////////////////////////////////////////////////////////// k 
 
        if(arr[0] == "/확률"){
            text = params.sender + " 이(가) "+ arr[1] + "할 확률은 \n" + 
                (Math.random()*100).toFixed(2) + "% 입니다. ";
            params.replier.reply(text);
        }    

       /////////////////////////////////////////////////////////////////////////////////////////k

        else if(arr[0] == "/vs"){
            if( Math.random() >= 0.5 ){
                text = "제 생각엔 " + arr[1] + "이(가) 낫습니다  "; }
            else {
                text = "제 생각엔 " + arr[2] + "이(가) 낫습니다  "; }
            if( arr[1] == "국밥" | arr[2] == "국밥" ){
                text = "아니 뜨끈한 국밥을 두고 뭘고민하노 ㅋㅋㅋ"; }
            params.replier.reply(text);
        }// end VS func    
        
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////k
        else if(arr[0] == "/주가"){
          
          var name1 = Utils.getWebText("https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=" + arr[1]);
      
          if(name1.indexOf("\"stock_content\"") == -1){
            text = "그런거 없다.....";
            params.replier.reply(text);
          }
          else {
              var timer = 1;
              while(timer < 2){
            
                  var name1 = Utils.getWebText("https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=" + arr[1]);
                  
                  var name2 = name1.split("<div class=\"stock_tlt\">");    // 이름
                  var name3 = name2[1].split("<span>");
                  var name4 = name3[1].split("</span>");
                  var name5 = name4[0].split(" ");
                  
                  var day1 = name1.split("<div class=\"grp_info\"> <span class=\"time\">");    //날 자 
                  var day2 = day1[1].split("</span>");
                  var day = day2[0].replace(/(<([a-z^>]+)>)/g,"");
                  
                  var data1 = name1.split("<div class=\"stock_price\">");   // 현재가
                  var data2 = data1[1].split("</strong>");
                  var data = data2[0].replace("<strong class=\"price\">","");
                  
                  var last1 = name1.split("<span class=\"price_gap\">");   // 가격차 
                  var last2 = last1[1].split("</span>");
                  var last3 = last2[0].replace(/(<([a-z^>]+)>)/g,"");
                  var last = last3.replace("(" , "  (");
                  
                  var check1 = name1.split("<span class=\"u_hc\">");   // 등락
                  var check2 = check1[1].split("</span>");
                  var check = check2[0];
                  
                  var start1 = name1.split("<strong>시가</strong>");
                  var start2 = start1[1].split("</span>");
                  var start = start2[0].replace(/[^0-9,]/g,"");
                  
                  var high1 = name1.split("<strong>고가</strong>");
                  var high2 = high1[1].split("</span>");
                  var high = high2[0].replace(/[^0-9,]/g,"");
                  
                  var low1 = name1.split("<strong>저가</strong>");
                  var low2 = low1[1].split("</span>");
                  var low = low2[0].replace(/[^0-9,]/g,"");
                  
                  timer += 1;
            
                  text = " 요청시간 : " +  day + "\n" +
                             " 종목코드 : "+  name5[0] + " " + arr[1] + "\n" + 
                             " 시가 : " + start + " \n 고가 : " + high + " \n 저가 : " + low + "\n"  ;
                  
                  
                  if(check == "전일대비 하락"){
                    text = text + " 현재가 : " + data + " ( ▼ " + last + "  )"+ "\n       (ง˙∇˙)ว   낙담하지말기~" ; 
                  }
                  else{
                    text = text + " 현재가 : " + data + " ( ▲ " + last + "  )" + "\n       (⁰‿⁰✿)   좋겠네 ㅎ";
                  }
                  params.replier.reply(text);
                  
                  java.lang.Thread.sleep(3000);
                  
            }// end while
          }// end else 
        }// end /주가
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// k
        else if((arr[0] == "/종목등록")|(arr[0] == "/종목추가")|(arr[0] == "/종목삽입")){
          var temp = FileStream.read(finance_path);
          
          if(temp.indexOf("[" + params.sender + "]") != -1){ //해당사용자 종목 있을때
            
            var zzx = del(params.sender,finance_path,arr[1]);
            temp = FileStream.read(finance_path);
            
            var A = temp.split("[" + params.sender + "] \n");
            
            if(arr[2] != undefined){   // 2번째 인자 있을때
              
              if(arr[3] == undefined){
                arr[3] = 0;
              } // 단가입력시 기본수량은 0이되기 위함
              
              A[1] = arr[1] +"," + arr[2] + "," + arr[3] + "\n" + A[1];
              var to_print = A[1].split("\n[");
              
              params.replier.reply(params.sender + " 이(가) \n" + arr[1] + " / 단가 " + arr[2] + " / 물량 " + arr[3]+ " 추가 등록 \n\n" + " ------ 현재 종목 ------ \n" + 
                                                  (to_print[0]).replace(/,/g, "  "));
                                                  
              FileStream.write(finance_path , A[0] + "[" + params.sender + "] \n" + A[1] );   
            }else{ // 2번째 인자 없을때
                A[1] = arr[1] + "\n" + A[1];
                var to_print = A[1].split("\n[");
                params.replier.reply(params.sender + " 이(가) \n" + arr[1]  +" 추가 등록 \n\n" + " ------ 현재 종목 ------ \n" + 
                                                    (to_print[0]).replace(/,/g,"  "));
                FileStream.write(finance_path , A[0] + "[" + params.sender + "] \n" + A[1] );   
              }
          }
          else{   //해당사용자가 처음일때
            if(arr[2] != undefined){
              
               if(arr[3] == undefined){
                 arr[3] = 0;
               }
               
               params.replier.reply(params.sender + " 이(가) \n" + arr[1] +" / 단가 " + arr[2] + " / 물량 " + arr[3] + " 새로 등록 ");
               FileStream.write(finance_path , "["+params.sender +"] \n"+arr[1] +"," + arr[2] + "," + arr[3] + "\n" + temp); 
            }else{
               params.replier.reply(params.sender + " 이(가) \n" + arr[1] + " 새로 등록 ");
               FileStream.write(finance_path , "["+params.sender +"] \n"+arr[1] + "\n" + temp); 
            } // [ 유저 ] \n 종목 \n + 기존있던것.
          }
          
        }
       ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// k
        else if(arr[0] == "/종목초기화"){
          FileStream.write(finance_path,"[NULL] \nnothing,100\n");
        }
       ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// k
        else if((arr[0] == "/종목보기")|(arr[0] == "/종목조회")|(arr[0] == "/종목확인")){
          params.replier.reply((FileStream.read(finance_path)).replace(/,/g,"  ") );
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// k
        else if((arr[0] == "/종목일람")|(arr[0] == "/자산평가")|(arr[0] == "/종목알람")){
              var temp = FileStream.read(finance_path);
          
              if(temp.indexOf("[" + params.sender + "]") != -1){
            
                var T1 = temp.split("[" + params.sender + "] \n");
                var T2 = T1[1].split("[");
                var T3 = T2[0].split("\n");
            
          
                var i = 0;
                var text = "✿ " + params.sender + " 종목 ✿\n";
                var total = 0;
            
                while(T3[i] != ""){
                   var T4 = T3[i].split(",");
                   var N = Utils.getWebText("https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=" + T4[0]);
              
                  if(N.indexOf("\"stock_content\"") == -1){
                    text = text + "\n종목 : " + T4[0] + "는 없는거시에오 ";
                  }
                  else{
                     var D1 = N.split("<div class=\"stock_price\">");   // 현재가
                     var D2 = D1[1].split("</strong>");
                     var D = D2[0].replace("<strong class=\"price\">","");
                  
                     var L1 = N.split("<span class=\"price_gap\">");   // 가격차 
                     var L2 = L1[1].split("</span>");
                     var L3 = L2[0].replace(/(<([a-z^>]+)>)/g,"");
                     var L = L3.replace("(" , "  (");
               
                     if(T4[1] == undefined){
                       text = text + "\n종목 : "+ T4[0] + " / 현재가 : " + D;
                     }else{
                       text = text + "\n종목 : "+ T4[0] + " / 현재가 : " + D +
                                             "\n           단가,등락 : " + T4[1] + " ( ";
                                         
                       var num1 = D.split(",");
                       var I = 0;
                       var num2 = "";
                       while(num1[I] != undefined ){
                         num2 = num2 + num1[I];
                         I = I+1;
                        }
                       num2 *= 1;
                   
                       if(num2 > T4[1] ){
                         text = text + " ▲ " +(num2 - T4[1]) + " )" ;
                         if(T4[2] != 0){
                            text = text + "\n           종목 이득 : " + (T4[2]*(num2-T4[1])) ;
                            }
                            total = total + ( T4[2] * (num2 - T4[1]) );
                          }else{ 
                            text = text + " ▼ " + (T4[1] - num2)+ " )";
                            if(T4[2] != 0){
                               text = text + "\n           종목 손해 : " + (T4[2]*(T4[1]-num2)) ;
                            }
                            total = total - ( T4[2] * (T4[1] - num2) );
                         } // 종목별 손익 출력 끝 
                   
                     }// 종목,현재가 출력 끝
                }// 종목 출력 끝
                i = i+1;
                text = text + "\n ========================= ";
                }// while - 등록종목만큼 뽑아내기 끝
                if(total < 0){
                  text = text + "\n (｡>﹏<｡) 이런! " + (total*-1) + " 원 손해 "; 
                }
                else if(total > 0){
                  text = text + "\n (ง '0')ว 와! " + total + " 원 이득! ";
                }
                params.replier.reply(text);
            
                }// 최종 출력단 설정 끝 
                else {
                  params.replier.reply(" 님은 아직 등록한게 업는데양? ( ´ω` )");
                }
        }//  /종목평가 end
       ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// k
        else if(arr[0] == "/종목삭제"){
          if(arr[1] != undefined){
            params.replier.reply(del(params.sender,finance_path,arr[1]));
          }
          else{
            params.replier.reply("/@@삭제 제거할것 \n으로 입력해주세요");
          }
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// k
        else if((arr[0] == "/알림온")){
           var n = 0;
           while(n < (arr[1]*1) ){
              n +=1;
              var temp = FileStream.read(alram_path);
          
              if(temp.indexOf("[" + params.sender + "]") != -1){
            
                var T1 = temp.split("[" + params.sender + "] \n");
                var T2 = T1[1].split("[");
                var T3 = T2[0].split("\n");
            
          
                var i = 0;
                var text = "❤❤❤❤❤ " + params.sender + " 알림 ❤❤❤❤❤\n";
                var count = 0;
            
                while(T3[i] != ""){
                   var T4 = T3[i].split(",");
                   var N = Utils.getWebText("https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=" + T4[0]);
              
                  if(N.indexOf("\"stock_content\"") != -1){
                     var D1 = N.split("<div class=\"stock_price\">");   // 현재가
                     var D2 = D1[1].split("</strong>");
                     var D = D2[0].replace("<strong class=\"price\">","");
                     
                     if(T4[1] != undefined){
                       
                         var te1 = D.split(",");
                         var I = 0;
                         var te2 = "";
                         while(te1[I] != undefined ){
                           te2 = te2 + te1[I];
                           I = I+1;
                          }
                         te2 *= 1;
                         
                       if(te2 <= T4[1]){
                         text = text + "\n종목 : "+ T4[0] + " / 현재가 : " + D;
                         text = text + "\n ▼▼▼ 목표 저가 " + T4[1] + " 달성 ▼▼▼ ";
                         count++;
                       }
                       else if(te2 >= T4[2]){
                         text = text + "\n종목 : "+ T4[0] + " / 현재가 : " + D;
                         text = text + "\n ▲▲▲▲▲ 목표 고가 " + T4[2] + " 달성 ▲▲▲▲▲ ";
                         count++;
                       }
                     }// 종목,현재가 출력 끝
                }// 종목 출력 끝
                i = i+1;
                text = text + "\n =============================== ";
                }// while - 등록종목만큼 뽑아내기 끝
                
                if(count > 0){
                  params.replier.reply(text);
                }
                
                java.lang.Thread.sleep(1000);
                
                }// 최종 출력단 설정 끝 
                else {
                  params.replier.reply(" 님은 아직 등록한게 업는데양? ( ´ω` )");
                  return;
                }// 사용자 입력받고 정보있다/없다 출력 끝
            }// while-알람반복문 끝
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////k 
        else if((arr[0] == "/알림등록")|(arr[0] == "/알림추가")|(arr[0] == "/알림삽입")){
          var temp = FileStream.read(alram_path);
          
          var lo = 0;
          var hi = 10000000;
          
          if( arr[2] == undefined ) {
            params.replier.reply("저점/고점 둘중하나는 입력해주세요");
          }
          
          if( arr[2].indexOf("저점") != -1){
             lo = (arr[2]).replace("저점","");
          }
          else if( arr[2].indexOf("고점") != -1){
             hi = (arr[2]).replace("고점","");
           }
         
          
          if( arr[3] != undefined){
             if( arr[3].indexOf("저점") != -1){
               lo = (arr[3]).replace("저점","");
             }
             else if( arr[3].indexOf("고점") != -1){
               hi = (arr[3]).replace("고점","");
             }
          }
          
          if( (lo == 0) && (hi == 10000000)){
            params.replier.reply("/알림추가 저점@@@ 고점@@@ 형식으로 입력해주세요\n기본 저점은0, 고점은 1000만원 입니다.");
            return;
          }
          
          if(temp.indexOf("[" + params.sender + "]") != -1){
            
              var A = temp.split("[" + params.sender + "] \n");
              A[1] = arr[1] +"," + lo + "," + hi + "\n" + A[1];
              var to_print = A[1].split("[");

              params.replier.reply(params.sender + " 이(가) \n" + arr[1] + " / 저점 " + lo + " / 고점 " + hi + " 추가 등록 \n\n" + " ------ 알림종목  ------ \n" + 
                                                  (to_print[0]).replace(/,/g, "  "));
              FileStream.write(alram_path , A[0] + "[" + params.sender + "] \n" + A[1] );   
              
            }else{   //등록안되있는경우 
              params.replier.reply(params.sender + " 이(가) \n" + arr[1] +" / 저점 " + lo + " / 고점 " + hi + " 새로 등록 ");
              FileStream.write(alram_path , "["+params.sender +"] \n"+arr[1] +"," + lo + "," + hi + "\n" + temp); 
              // [ 유저 ] \n 종목 \n + 기존있던것.
          }
          
        }
       ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// k
        else if(arr[0] == "/알림초기화"){
          FileStream.write(alram_path,"[NULL] \nnothing,100,100\n");
        }
       ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// k
        else if((arr[0] == "/알림보기")|(arr[0] == "/알림조회")|(arr[0] == "/알림확인")){
          params.replier.reply((FileStream.read(alram_path)).replace(/,/g,"  ") );
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// k
        else if((arr[0] == "/알림삭제")){
          if(arr[1] != undefined){
            params.replier.reply(del(params.sender,alram_path,arr[1]));
          }
          else{
            params.replier.reply("/@@삭제 제거할것 \n으로 입력해주세요");
          }
        }
        
        
        // new func 
    
    } // /로시작 하는거 찾기 끝
} // response 끝



//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState, activity) {
  var textView = new android.widget.TextView(activity);
  textView.setText("Hello, World!");
  textView.setTextColor(android.graphics.Color.DKGRAY);
  activity.setContentView(textView);
}

function onStart(activity) {}

function onResume(activity) {}

function onPause(activity) {}

function onStop(activity) {}