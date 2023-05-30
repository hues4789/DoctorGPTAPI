//websocket
var socket = io.connect('http://' + document.domain + ':' + location.port);
var server_p = null;
var client_p = null;

//サーバーからのデータ受信で起動
socket.on('message', function(data) {
    //textの場合
    if (data.type === 'text') {
        //初期時p要素追加
        if (server_p === null && data.data !== '<END_OF_MESSAGE>') {
            server_p = document.createElement('p');
            document.querySelector('#chat').appendChild(server_p);
        }
        //メッセージ途中は同じp要素に文字追加
        if (data.data !== '<END_OF_MESSAGE>') {
            server_p.textContent += data.data;
        } else {
            //メッセージ終了時初期化
            server_p = null;
        }
    //画像の場合
    } else if (data.type === 'image') {
        var img = document.createElement('img');
        img.src = 'data:image/png;base64,' + data.data;
        document.querySelector('#chat').appendChild(img);
    }
});

document.querySelector('#form').addEventListener('submit', function(e) {
    e.preventDefault();
    var message = document.querySelector('#message').value;
    client_p = document.createElement('p');
    client_p.textContent = message;
    document.querySelector('#chat').appendChild(client_p);
    //サーバーと通信
    socket.emit('message', message);
    document.querySelector('#message').value = '';
});
