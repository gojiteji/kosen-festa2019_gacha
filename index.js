



function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}


function recomend() {
    price = document.getElementById("price").value;
    try {
        fetchJSONFile('./data.json', function (data) {
            alert(data);
        });

        document.getElementById("menu").innerHTML = data;
    }
    catch (e) {
        alert("エラー! 入力をよく確認してくれ!");
    }
}