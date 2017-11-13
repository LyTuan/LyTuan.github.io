// const socket = io('https://stream3005.herokuapp.com/');
//
// $('#div-chat').hide();
//
// let customConfig;
//
// $.ajax({
//   url: "https://service.xirsys.com/ice",
//   data: {
//     ident: "vanpho",
//     secret: "2b1c2dfe-4374-11e7-bd72-5a790223a9ce",
//     domain: "vanpho93.github.io",
//     application: "default",
//     room: "default",
//     secure: 1
//   },
//   success: function (data, status) {
//     // data.d is where the iceServers object lives
//     customConfig = data.d;
//     console.log(customConfig);
//   },
//   async: false
// });
//
// socket.on('DANH_SACH_ONLINE', arrUserInfo => {
//     $('#div-chat').show();
//     $('#div-dang-ky').hide();
//
//     arrUserInfo.forEach(user => {
//         const { ten, peerId } = user;
//         $('#ulUser').append(`<li id="${peerId}">${ten}</li>`);
//     });
//
//     socket.on('CO_NGUOI_DUNG_MOI', user => {
//         const { ten, peerId } = user;
//         $('#ulUser').append(`<li id="${peerId}">${ten}</li>`);
//     });
//
//     socket.on('AI_DO_NGAT_KET_NOI', peerId => {
//         $(`#${peerId}`).remove();
//     });
// });
//
// socket.on('DANG_KY_THAT_BAT', () => alert('Vui long chon username khac!'));
//
//
// function openStream() {
//     const config = { audio: false, video: true };
//     return navigator.mediaDevices.getUserMedia(config);
// }
//
// function playStream(idVideoTag, stream) {
//     const video = document.getElementById(idVideoTag);
//     video.srcObject = stream;
//     video.play();
// }
//
// // openStream()
// // .then(stream => playStream('localStream', stream));
//
// const peer = new Peer({
//     key: 'peerjs',
//     host: 'mypeer3005.herokuapp.com',
//     secure: true,
//     port: 443,
//     config: customConfig
// });
//
// peer.on('open', id => {
//     $('#my-peer').append(id);
//     $('#btnSignUp').click(() => {
//         const username = $('#txtUsername').val();
//         socket.emit('NGUOI_DUNG_DANG_KY', { ten: username, peerId: id });
//     });
// });
//
// //Caller
// $('#btnCall').click(() => {
//     const id = $('#remoteId').val();
//     openStream()
//     .then(stream => {
//         playStream('localStream', stream);
//         const call = peer.call(id, stream);
//         call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
//     });
// });
//
// //Callee
// peer.on('call', call => {
//     openStream()
//     .then(stream => {
//         call.answer(stream);
//         playStream('localStream', stream);
//         call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
//     });
// });
//
// $('#ulUser').on('click', 'li', function() {
//     const id = $(this).attr('id');
//     console.log(id);
//     openStream()
//     .then(stream => {
//         playStream('localStream', stream);
//         const call = peer.call(id, stream);
//         call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
//     });
// });
const socket = io('https://uet-video-call.herokuapp.com/');

$('#div-chat').hide();
socket.on('DANH_SACH_ONLINE', arrUserInfo =>{
  $('#div-chat').show();
  $('#div-dang-ky').hide();
  console.log(arrUserInfo);
  arrUserInfo.forEach(user => {
    const {ten, peerId} = user;
    $('#ulUser').append(`<li id="${peerId}">${ten}</li>`);
  });
  socket.on('CO_NGUOI_DUNG_MOI', user =>{
    const {ten, peerId} = user;
    $('#ulUser').append(`<li id="${peerId}">${ten}</li>`);
  });
  socket.on('AI_DO_NGAT_KET_NOI', peerId =>{
    $(`#${peerId}`).remove();
  });
  openStream().then(stream =>playStream('localStream',stream));
});
socket.on('DANG_KY_THAT_BAI', () => alert('Vuil long chọn username khac'));

function openStream(){
  const config = { audio: false, video: true};
  return navigator.mediaDevices.getUserMedia(config);
}

function playStream(idVideoTag, stream){
    const video = document.getElementById(idVideoTag);
    video.srcObject = stream;
    video.play();

}


const peer = new Peer({key: 'bz2n370oiy919k9'});
peer.on('open', id =>{
   $('#my-peer').append(id)
   $('#btnSignUp').click(() => {
     const username = $('#txtUsername').val();
     socket.emit('NGUOI_DUNG_DANG_KY',{ten: username, peerId: id});
   });
 });
// openStream().then(stream =>playStream('localStream',stream));


//Nguoi goi di
$('#btnCall').click(()=> {
    const id = $('#remoteId').val(); // Lay ra Id nguoi duoc goi
    openStream().then(stream => {
    playStream('localStream', stream);
      const call = peer.call(id, stream);
      call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
  });
});
 // Nguoi nhan

 peer.on('call', call => {
     openStream().then( stream => {
     call.answer(stream); // Tra loi bang cach tra lai stream dang call
     playStream('localStream', stream);
     call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
   });
 });


$('#ulUser').on('click','li',function(){
   const id = $(this).attr('id');
   openStream().then(stream => {
   playStream('localStream', stream);
     const call = peer.call(id, stream);
     call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
   });
});
