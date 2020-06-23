function ajax(obj) {
  // 注意 无论是get还是post 都有相同部分代码
  if (window.XMLHttpRequest) {
    var xhr = new XMLHttpRequest();
  } else {
    var xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  //将{username:"aaa",password:111}变成username=aaa&password=111
  var str = "";
  for (var i in obj.data) {
    str += i + "=" + obj.data[i] + "&";
  }
  //将结尾的&替换成空字符
  str = str.replace(/&$/, "");

  //在不同的地方加判断
  //toLowerCase()将字母转小写toUpperCase()将字母转大写
  if (obj.type.toLowerCase() == "get") {
    if (str == "") {
      xhr.open("get", obj.url);
    } else {
      xhr.open("get", obj.url + "?" + str);
    }
    xhr.send();
  }
  if (obj.type.toLowerCase() == "post") {
    xhr.open("post", obj.url);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(str);
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var data = xhr.responseText;
        obj.success(data);
      } else {
        if (obj.error) {
          obj.error();
        }
      }
    }
  };
}
