function openDB1(){
    db1=window.openDatabase('loginDB','1.0','로그인DB',1024*1024);
    console.log('1_DB 생성');
}

function createTable1(){
     db1.transaction(function(tr){
      var createSQL='create table if not exists login(id integer primary key autoincrement, name varchar(20) not null unique,mobile integer,school varchar(20))';
        
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
function Login() {
    
  db1.transaction(function(tr){
        var name=$('#fullName').val();
        var mobile=$('#mobilePhone').val();
        var school=$('#school').val();
        var insertSQL='insert into login(name,mobile,school)values(?,?,?)';
        tr.executeSql(insertSQL,[name,mobile,school],function(tr,rs){
            console.log('3_회원 등록..no:'+rs.insertId);
            alert($('#fullName').val()+'님 로그인 되었습니다.');
            $.mobile.changePage('#Mainpage','slide','false','true');
            user.reset();
        },function(){
            alert($('#fullName').val()+'님 로그인 실패하였습니다.');          
        });
    });
}
function Logout(){
    $.mobile.changePage('#LOGINpage','slide','false','true');
    alert($('#fullName').val()+'님 로그아웃 하셨습니다.');     
}