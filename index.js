


printed = false;
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
    printed = true;
    price = document.getElementById("price").value;
    price=price.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
    menu=""
    bag = [];
    if (!isNaN(price)) {
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



                text = "<h4>";
                for (i = 0; i < bag.length; i++) {
                    if(i<4){
                    menu=menu+obj[(bag[i])].food.toString();
                    }
                    if(i<(bag.length-1)&&i<3){
                        menu=menu+", "
                    }
                    
                    text = text + "<div class=\"ui card \" id= \"" + i + "\"><div class=\"content\"><div class=\"header\">"
                        + obj[(bag[i])].food.toString() + "<\/div><div class=\"meta\">" + obj[(bag[i])].group.toString() + "<\/div><div class=\"description\">"
                        + obj[(bag[i])].price.toString() + "円" + "</div></div></div>";
                }
                if(bag.length>3){
                    menu=menu+"など"
                }
                tweet="location.href='https://twitter.com/share?url=https://gojiteji.github.io/kosen-festa2019_gacha/&text="+menu+"を食べるよ😋\\n"+"&hashtags=KOSENFESTA'"
                document.getElementById("twb").onclick=new Function(tweet);
                text = text + "</h4><h2>総額：" + (price - current_price).toString() + "円</h2>";
                document.getElementById("menu").innerHTML = text;

            });

           
            
        }
        catch (e) {
            //alert("エラー! 入力をよく確認してくれ!");
        }

    }else{
        document.getElementById("price").value=""
        document.getElementById("price").placeholder="数字だけを入力してね!"
    }
}



