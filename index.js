



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
        fetchJSONFile('https://gojiteji.github.io/kosen-festa2019_gacha/data.json', function (data) {
            console.log(data);
            console.log(data[0]);
            console.log(data["剣道部"]);
        });

        document.getElementById("menu").innerHTML = data;
    }
    catch (e) {
        //alert("エラー! 入力をよく確認してくれ!");
    }
}