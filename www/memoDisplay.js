function displayMemoInfo(index){
    var len,i,name="",type="",content="",pic="",imp="";
    
    var myMemoRecord=recordSet.rows.item(index);
    varPosition=index;
    
    if(myMemoRecord.name!=null){
        name='<div class="ui-bar ui-bar-d"><h3>'+myMemoRecord.name+'</h3></div>';
    }else{
        name='<p>제목 : 정보없음</p>';
    }
    if(myMemoRecord.name!=null){
        type='<p>유형 : '+myMemoRecord.type+'</p>';
    }else{
        type='<p>유형 : 정보없음</p>';
    }
    if(myMemoRecord.content!=null){
        content='<p>내용 : '+myMemoRecord.content+'</p>';
    }else{
         content='<p>내용 : 정보없음</p>';
    }
    if(myMemoRecord.imp!=null){
       imp='<p>중요도 : '+myMemoRecord.imp+'</p>';
    }else{
        imp='<p>중요도 : 정보없음</p>';
    }
    
    $('#memoInfoArea').html(name+type+content+imp);    $.mobile.changePage("#memoInfoShowPage", "slide", false, true);
}
function getMemoPic(){
     var myName = recordSet.rows.item(varPosition).name; 
  var myPic = recordSet.rows.item(varPosition).pic;   
  $('#picName').text(myName);          
  $('#picArea').attr('src', myPic);
  $.mobile.changePage("#picShowDialog", "pop", false, true);
}