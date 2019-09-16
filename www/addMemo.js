function openDB(){
    db=window.openDatabase('memoDB','1.0','메모DB',1024*1024);
    console.log('1_DB 생성');
}

function createTable(){
    db.transaction(function(tr){
        var createSQL='create table if not exists memo(id integer primary key autoincrement, type varchar(20),name varchar(20) not null unique,content varchar(200),pic varchar(50),imp integer)';
        
        tr.executeSql(createSQL,[],function(){
            console.log('2_1_테이블생성_sql 실행 성공...');
        },function(){
            console.log('2_1_테이블생성_sql 실행 실패...');
        });
    },function(){
        console.log('2_2_테이블 생성 트랜잭션 실패..롤백은 자동');
    },function(){
        console.log('2_2_테이블 생성 트랜잭션 성공...');
    
    });
}

function insertMemo(){
    db.transaction(function(tr){
        var type=$('#memoType1').val();
        var name=$('#memoName1').val();
        var content=$('#memoContent1').val();
        var pic=$('#memoPic1').val();
        var imp=$('#Imfortant1').val();
        var insertSQL='insert into memo(type,name,content,pic,imp)values(?,?,?,?,?)';
        tr.executeSql(insertSQL,[type,name,content,pic,imp],function(tr,rs){
            console.log('3_메모 등록..no:'+rs.insertId);
            alert('메모 제목 '+$('#memoName1').val()+'이(가) 입력되었습니다.');
        
        $('#memoType1').val('미정').attr('selected','selected');    
        $('#memoType1').selectmenu('refresh');
       $('#Imfortant1').val('0').slider('refresh');
            form1.reset();
        },function(){
            alert('메모 제목'+$('#memoName1').val()+'이(가) 입력 실패하였습니다.');          
        });
    });
}

function selectMemo(){
    db.transaction(function(tr){
        var i,count,tagList='';
        var sType=$('#memoType2').val();
        var selectSQL='select type,name,content,pic,imp from memo where type like? ';
        tr.executeSql(selectSQL,[sType],function(tr,rs){
            console.log('메모 조회...'+rs.rows.length+'건');
            recordSet=rs;
            count=rs.rows.length;
            if(count>0){
                tagList='<li data-role="list-divider">메모 목록'+'<span style="float:right">'+count+'건'+'</span></li>';
                for(i=0;i<count;i+=1){
                    tagList+='<li><a onclick="displayMemoInfo(' + i + ');">'
					tagList += '<img class="my_listview_img" src="' + rs.rows.item(i).pic + '">';              					
					tagList += '<span class="ui-li-count">중요도 : ' + rs.rows.item(i).imp + '</span>';
					tagList += '<h2>' + rs.rows.item(i).name + '</h2>';
					tagList += '<p>' + rs.rows.item(i).type + '</p>';	
					tagList += '<p>' + rs.rows.item(i).content + '</p></a></li>';	
                }
                $('#memoListArea').html(tagList);
                $('#memoListArea').listview('refresh');
            } else {
			  	navigator.notification.alert('조회 결과 없음', null, '메모 조회 실패');
			}
            
        });
    });
}

function deleteMemo(){
    db.transaction(function(tr){
        var name =varMemoName;
        var deleteSQL='delete from memo where name=?';
        tr.executeSql(deleteSQL,[name],function(tr,rs){
            console.log('6_메모 삭제');
            alert('메모 제목'+varMemoName+'이(가) 삭제되었습니다.');
             $('#memoType3').val('미정').attr('selected','selected');    
        $('#memoType3').selectmenu('refresh');
       $('#Imfortant2').val('0').slider('refresh');
            form2.reset();
        },function(){
            alert('메모 제목 '+$('#memoName1').val()+'이(가) 삭제 실패하였습니다.');
        });
    });
}

function selectMemoDelete(name){
    db.transaction(function(tr){
        var selectSQL='select type,name,content,pic,imp from memo where name like?';
    tr.executeSql(selectSQL,[name],function(tr,rs){
        $('#sMemoName2').val(rs.rows.item(0).name);     $('#memoType3').val(rs.rows.item(0).type).attr('selected', 'selected');     
        $('#memoType3').selectmenu('refresh');           
        $('#memoContent2').val(rs.rows.item(0).content);        
         $('#memoPic2').val(rs.rows.item(0).pic);   $('#Imfortant2').val(rs.rows.item(0).imp).slider('refresh');   
        varMemoName = rs.rows.item(0).name;   
    })
    })
}
 function updateMemo(){
    db.transaction(function(tr){
        var new_name = $('#sMemoName2').val();
        var new_type = $('#memoType3').val();
        var new_content = $('#memoContent2').val();
        var new_pic = $('#memoPic2').val(); 
        var new_imp = $('#Important2').val();
        var old_name = varMemoName;      
        var updateSQL = 'update memo set name = ?, type = ?, content = ?, pic = ?, imp = ? where name=?';          
        tr.executeSql(updateSQL, [new_name, new_type, new_content, new_pic,new_imp, old_name], function(tr, rs){    
             console.log('5_메모 수정.... ') ;
             alert('메모 제목 ' + varMemoName + ' 수정되었습니다');                      
              $('#memoType3').val('미정').attr('selected','selected');    
        $('#memoType3').selectmenu('refresh');
       $('#Imfortant2').val('0').slider('refresh');
            form2.reset();         
        }, function(){
            alert('메모 제목 ' + $('#memoName1').val() + ' 수정 실패하였습니다');                  	 
        });
    });       
 }
 
