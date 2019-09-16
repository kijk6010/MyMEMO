function capturePhoto() {
  // 카메라 장치를 이용하여 사진 촬영후 base64-encoded 이미지 문자열 임시 파일 경로를 반환
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI });
}
        // getPicture() 성공 콜백 함수
        function onPhotoDataSuccess(imageURI) { 
          $('#imgArea').attr('src', imageURI);      
          movePic(imageURI);
        }
        // getPicture() 실패 콜백 함수
        function onFail(message) {
          alert('Failed because: ' + message);
        }

// 이미지 문자열 임시 파일을 이동
function movePic(fileuri){ 
  window.resolveLocalFileSystemURI(fileuri, resolveOnSuccess, OnError); 
}

// resolveLocalFileSystemURI() 성공 콜백 함수
function resolveOnSuccess(fileentry){ 
    // 
    if (flag == 'enrol'){
        var newfilename = $('#memoPic1').val() + '.jpg';		// ②
    } else if (flag == 'modify') {
        var newfilename = $('#memoPic2').val() + '.jpg';
    }
    // 이동할 저장 폴더 설정 
    var newfoldername = "MYMEMO_App"; 		// ①

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
        function(filesysobj) {      
            //폴더가 존재하지 않으면 생성됨
            filesysobj.root.getDirectory( newfoldername, {create:true, exclusive: false},
                function(directoryentry) {
                    fileentry.moveTo(directoryentry, newfilename,  successMove, OnError);
                },
                OnError);
        },
        OnError);
}
// fileentry.moveTo() 성공 콜백 함수
function successMove(fileentry) {
   //이동된 이미지 파일 전체 경로명 표시
   console.log(fileentry.fullPath);
   if (flag == 'enrol'){
       $('#memoPic1').val(fileentry.fullPath);
   } else if (flag == 'modify') {
       $('#memoPic2').val(fileentry.fullPath);
   }   
}    
// fileentry.moveTo() 실패 콜백 함수
function OnError(error) {
   alert(error.code);
}
 