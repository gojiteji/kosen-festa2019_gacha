
/*

<!---

　(´･ω･`)      < ...
＿(__つ/￣￣￣/
　　＼/　　 /
　　　 ￣￣￣　
  (´･ω･`)   <　JS何もわからん
＿(　つ　ミ　　ﾊﾞﾀﾝｯ
　　＼￣￣￣＼ミ
　　　 ￣￣￣￣　

　(´･ω･`)      < ...
＿(__つ/￣￣￣/
　　＼/　　 /  ｼｭｯ
　　　 ￣￣￣　
--->




*/
num = 0;
bagage = 0;
printed = false;
price = 0;
bag = [];
cardnum=0;

function count_same_value(value) {
    counter = 0;
    for (j = 0; j < bag.length; j++) {
        if (bag[j] == value)
            counter++;
    }
    return counter;
}

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
function toArray(arg) {
    var arr = [];
    for (var i = arg.length >>> 0; i--;) {
        arr[i] = arg[i];
    }
    return arr;
}


function change_color(id_) {
    object = document.getElementById(id_.toString())
    if (((toArray(object.classList))).indexOf("dark") >= 1) {
        object.classList.remove("dark");
        num = num - 1;
    } else {
        object.classList.add("dark");
        num = num + 1;
    }
    if (!(price == 0)) {
        if (num == cardnum) {
            $('.card').css({
                background: "-webkit-gradient(linear, right top, left bottom, from(#38C0D4), to(#E49aF4))"
            })
            document.getElementById("bottom_title").innerHTML = "COMPLETED!";
            tweet = "location.href='https://twitter.com/share?url=https://eq.gojiteji.com/&text=" + menu + "を食べたよ!🤩" + "&hashtags=KOSENFESTA'"
            document.getElementById("twb").onclick = new Function(tweet);
        }
    }
}

function recomend() {
    num = 0;
    bagage = 0;
    bag = [];
    document.getElementById("bottom_title").innerHTML = "食べたものはタップしよう!";
    printed = true;
    price = document.getElementById("price").value;
    price = price.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
    menu = ""
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


                bag = bag.sort();
                text = "<h4>";
                bagage = bag.length;
                i=0;
                while(true) {
                    foodname=obj[(bag[i])].food.toString()
                    groupname=obj[(bag[i])].group.toString() 
                    priceshow=obj[(bag[i])].price.toString() 
                   bag_num=count_same_value(bag[i]);
                    if(bag_num>1)
                    foodname=foodname+"×"+bag_num
                    if (i < 5) {
                        menu = menu + foodname
                    }
                    if (i < (bag.length - 1) && i < 4) {
                        menu = menu + ", "
                    }
                    if( i==0 || !(obj[(bag[i-1])]==obj[(bag[i])]) ){
                    text = text + "<div  class=\"ui card \"  id= \"" + i + "\"><div class=\"content\" onclick=\"change_color(" + i + ")\" ><div class=\"header\">"
                        + foodname+ "<\/div><div class=\"meta\">" + groupname + "<\/div><div class=\"description\">"
                        + priceshow+ "円" + "</div></div></div>";
                    }
                        i++;
                    if(i>=bagage){
                        break;
                        }
                    }
                if (bag.length > 3) {
                    menu = menu + "など"
                }
                tweet = "location.href='https://twitter.com/share?url=https://eq.gojiteji.com/&text=" + menu + "を食べるよ😋" + "&hashtags=KOSENFESTA'"
                document.getElementById("twb").onclick = new Function(tweet);
                text = text + "</h4><h2>総額：" + (price - current_price).toString() + "円</h2>";
                document.getElementById("menu").innerHTML = text;
                cardnum= document.getElementsByClassName('card').length;
                console.log(cardnum);
            });



        }
        catch (e) {
            //alert("エラー! 入力をよく確認してくれ!");
        }

    } else {
        document.getElementById("price").value = "";
        document.getElementById("price").placeholder = "数字だけを入力してね!";
    }
}

