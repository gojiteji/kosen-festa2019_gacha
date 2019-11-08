



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
    bag = [];
    try {
        current_price = price;
        fetchJSONFile('https://gojiteji.github.io/kosen-festa2019_gacha/data.json', function (data) {
            json = JSON.stringify(data);
            obj = JSON.parse(json);

            while (true) {
                id = Math.floor(Math.random() * obj.length)
                if (current_price >= obj[id].price) {
                    current_price = current_price - obj[id].price;
                    bag.push(id);
                }

                if (current_price < 50) {
                    break;
                }
            }

            text = "";
            for (i = 0; i < bag.length; i++) {
                text = text + obj[(bag[i])].group.toString() + " " + obj[(bag[i])].food.toString() + " " + obj[(bag[i])].price.toString() + "円<br>";
            }

            text = text + "総額：" + (price - current_price).toString() + "円";
            document.getElementById("menu").innerHTML = text;

        });
    }
    catch (e) {
        //alert("エラー! 入力をよく確認してくれ!");
    }
}