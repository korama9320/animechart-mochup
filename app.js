//////////////////////////////form fun////////////////////////////////////
function match() {
  var inp = document.getElementsByTagName("input");

  if (inp[2].value !== inp[3].value) {
    inp[3].style.boxShadow = "0px 0px 5px 5px #fd1212";
    inp[3].value = "";
    inp[3].placeholder =
      "     password and confirm password should be the same";
  } else {
    inp[3].style.boxShadow = "";
    inp[3].placeholder = "     Confirm Password";
  }
}

function user() {
  var inp = document.getElementsByTagName("input");
  if (inp[1].value.length < 3) {
    inp[1].style.boxShadow = "0px 0px 5px 5px #fd1212";
    inp[1].value = "";
    inp[1].placeholder = "     invalid name";
  } else {
    inp[1].style.boxShadow = "";
  }
}

///////////////////////////////signup////////////////////////////////////
var arr = [];
function signUp() {
  var search;
  if (location.search != "") {
    search = location.search.split(/[? & = +]/);
    var obj = {
      Username: search[4],
      Email: decodeURIComponent(search[2]),
      Password: search[6],
      fav: [],
    };

    if (!localStorage.getItem("Korama")) {
      arr.push(obj);
      localStorage.setItem("Korama", JSON.stringify(arr));
      localStorage.setItem("Username", JSON.stringify(search[4]));
      localStorage.setItem("i", JSON.stringify(arr.length - 1));
    } else {
      arr = JSON.parse(localStorage.getItem("Korama"));

      for (i in arr) {
        if (arr[i].Email == obj.Email && arr[i].Password == obj.Password) {
        } else {
          arr.push(obj);
          localStorage.setItem("Korama", JSON.stringify(arr));
        }
      }
      localStorage.setItem("Username", JSON.stringify(search[4]));
      localStorage.setItem("i", JSON.stringify(arr.length - 1));
    }
    var exp = new Date();
    exp.setDate(exp.getDate() + 17);
    document.cookie = `Username=${search[4]}; Password=${
      search[6]
    }; expires=${exp.toDateString()}`;
  }
}
//////////////////////////////////////////login/////////////////////////////////

function login() {
  var arr = JSON.parse(localStorage.getItem("Korama"));
  var em = document.getElementById("em").value;
  var pas = document.getElementById("pas").value;
  for (i in arr) {
    if (arr[i].Email == em && arr[i].Password == pas) {
      localStorage.setItem("Username", JSON.stringify(arr[i].Username));
      localStorage.setItem("i", JSON.stringify(i));
      location.assign("E:iti/html,CSS/anime chart/index.html");
    }
  }
}

// //////////////////////////////////api///////////////////////////////////////////
// "https://mocki.io/v1/c88e148a-c29f-4a23-a6de-5599dc630332";
//https://mocki.io/v1/d33387b2-7f75-469f-8b98-9ec92ca76617
//https://mocki.io/v1/e6cf4b91-f905-4d83-9113-7d3c7e9871a3

var apiArr;
function index() {
  var anime = new XMLHttpRequest();
  anime.open("get", "https://mocki.io/v1/d33387b2-7f75-469f-8b98-9ec92ca76617");
  anime.onreadystatechange = function () {
    if (anime.readyState == 4 && anime.status == 200) {
      var s = anime.responseText;
      s = JSON.parse(s);
      var arr = s;
      apiArr = arr[0];
      for (let j in arr)
        for (i of arr[j]) {
          document.getElementsByClassName("bottom")[
            j
          ].innerHTML += `<div class="card">
          <div class="img">
            <img src=${i.image} alt="" />
            <div>
              <a href="">${i.name}</a>
              <a href="" style="color:${i.color[0]};">${i.studio}</a>
            </div>
          </div>
          <div class="textbox">
            <div class="st">
              <div class="shown">
              <div>
                <div>Airing in</div>
                <h1>${i.date}</h1>
                <div>${i.source}</div>
              </div>
              <div>
                <i class="fa-regular fa-heart" style="color: #ef5d5d"></i
                ><span>#${i.pop}</span>
              </div></div>
              <div class="hidden" >

              <div>
                <a href="">#${i.flip}</a><br>
                <i class="fa-brands fa-square-twitter" style="color:#3DB4F2 ;width:15px;"></i>
              </div>
              <div>                <iframe width="80" height="40" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
            </div>
            </div>

            <div class="nd">
              ${i.story}
            </div>
              <div class="rd">
                <div style="background-color:${i.color[0]}; color:${i.color[1]};">${i.genra[0]}</div>
                <div style="background-color:${i.color[0]}; color:${i.color[1]};">${i.genra[1]}</div>
                <p>
                  <i class="fa-solid fa-circle-plus" onclick="favo(this)"></i>
                </p>
              </div>
            </div>
          </div>`;
        }
    }
  };
  anime.send();
}
/////////////////////////////////////////sort//////////////////////////////////////
function list() {
  var obj = document.getElementsByClassName("list")[0];
  if (obj.style.display == "none") {
    obj.style.display = "block";
  } else {
    obj.style.display = "none ";
  }
}
function sort(obj) {
  var id = obj.id;
  apiArr.sort(function (a, b) {
    if (a[id] < b[id]) {
      return -1;
    } else if (a[id] > b[id]) {
      return 1;
    } else {
      return 0;
    }
  });
  document.getElementsByClassName("bottom")[0].innerHTML = "";

  // location.replace("file:///E:/iti/html,CSS/anime%20chart/index.html");

  for (i of apiArr) {
    document.getElementsByClassName(
      "bottom"
    )[0].innerHTML += `<div class="card">
          <div class="img">
            <img src=${i.image} alt="" />
            <div>
              <a href="">${i.name}</a>
              <a href="" style="  color:${i.color[0]};">${i.studio}</a>
            </div>
          </div>
          <div class="textbox">
            <div class="st">
              <div class="shown">
              <div>
                <div>Airing in</div>
                <h1>${i.date}</h1>
                <div>${i.source}</div>
              </div>
              <div>
                <i class="fa-regular fa-heart" style="color: #ef5d5d"></i
                ><span>#${i.pop}</span>
              </div></div>
              <div class="hidden" >

              <div>
                <a href="">#${i.flip}</a><br>
                <i class="fa-brands fa-square-twitter" style="color:#3DB4F2 ;width:15px;"></i>
              </div>
              <div>                <iframe width="80" height="40" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
            </div>
            </div>

            <div class="nd">
              ${i.story}
            </div>
              <div class="rd">
                <div style="background-color:${i.color[0]}"; color:${i.color[1]};>${i.genra[0]}</div>
                <div style="background-color:${i.color[0]}"; color:${i.color[1]};>${i.genra[1]}</div>
                <p>
                  <i class="fa-solid fa-circle-plus" onclick="favo(this)"></i>
                </p>
              </div>
            </div>
          </div>`;
  }
}
function sortNum(obj) {
  var id = obj.id;
  apiArr.sort(function (a, b) {
    if ((a[id] != "" && parseInt(a[id]) < parseInt(b[id])) || b[id] == "") {
      return -1;
    } else if (
      (b[id] != "" && parseInt(a[id]) > parseInt(b[id])) ||
      a[id] == ""
    ) {
      return 1;
    } else if (parseInt(a[id]) == parseInt(b[id])) {
      return 0;
    }
  });
  document.getElementsByClassName("bottom")[0].innerHTML = "";

  // location.replace("file:///E:/iti/html,CSS/anime%20chart/index.html");

  for (i of apiArr) {
    document.getElementsByClassName(
      "bottom"
    )[0].innerHTML += `<div class="card">
          <div class="img">
            <img src=${i.image} alt="" />
            <div>
              <a href="">${i.name}</a>
              <a href="" style="  color:${i.color[0]};">${i.studio}</a>
            </div>
          </div>
          <div class="textbox">
            <div class="st">
              <div class="shown">
              <div>
                <div>Airing in</div>
                <h1>${i.date}</h1>
                <div>${i.source}</div>
              </div>
              <div>
                <i class="fa-regular fa-heart" style="color: #ef5d5d"></i
                ><span>#${i.pop}</span>
              </div></div>
              <div class="hidden" >

              <div>
                <a href="">#${i.flip}</a><br>
                <i class="fa-brands fa-square-twitter" style="color:#3DB4F2 ;width:15px;"></i>
              </div>
              <div>                <iframe width="80" height="40" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
            </div>
            </div>

            <div class="nd">
              ${i.story}
            </div>
              <div class="rd">
                <div style="background-color:${i.color[0]}; color:${i.color[1]};">${i.genra[0]}</div>
                <div style="background-color:${i.color[0]}; color:${i.color[1]};">${i.genra[1]}</div>
                <p>
                  <i class="fa-solid fa-circle-plus" onclick="favo(this)"></i>
                </p>
              </div>
            </div>
          </div>`;
  }
}
////////////////////////////////////search/////////////////////////////////////
function search() {
  if (document.getElementById("search").style.display == "inline") {
    var sea = document.getElementById("search").value;
    console.log(sea);
    var reg = new RegExp(sea.toLowerCase());
    console.log(reg);
    var array = [];
    for (let i in apiArr) {
      if (
        reg.test(apiArr[i].name.toLowerCase()) ||
        reg.test(apiArr[i].studio.toLowerCase())
      ) {
        array.push(apiArr[i]);
      }
    }

    document.getElementsByClassName("bottom")[0].innerHTML = "";

    // location.replace("file:///E:/iti/html,CSS/anime%20chart/index.html");
    for (i of array) {
      document.getElementsByClassName(
        "bottom"
      )[0].innerHTML += `<div class="card">
          <div class="img">
            <img src=${i.image} alt="" />
            <div>
              <a href="">${i.name}</a>
              <a href="" style="  color:${i.color[0]};">${i.studio}</a>
            </div>
          </div>
          <div class="textbox">
            <div class="st">
              <div class="shown">
              <div>
                <div>Airing in</div>
                <h1>${i.date}</h1>
                <div>${i.source}</div>
              </div>
              <div>
                <i class="fa-regular fa-heart" style="color: #ef5d5d"></i
                ><span>#${i.pop}</span>
              </div></div>
              <div class="hidden" >

              <div>
                <a href="">#${i.flip}</a><br>
                <i class="fa-brands fa-square-twitter" style="color:#3DB4F2 ;width:15px;"></i>
              </div>
              <div>                <iframe width="80" height="40" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
            </div>
            </div>

            <div class="nd">
              ${i.story}
            </div>
              <div class="rd">
                <div style="background-color:${i.color[0]} ; color:${i.color[1]};">${i.genra[0]}</div>
                <div style="background-color:${i.color[0]} ; color:${i.color[1]};">${i.genra[1]}</div>
                <p>
                  <i class="fa-solid fa-circle-plus" onclick="favo(this)"></i>
                </p>
              </div>
            </div>
          </div>`;
    }
    document.getElementById("search").style.display = "none";
  } else {
    document.getElementById("search").style.display = "inline";
  }
}
//////////////////////////////////////add to favourate/////////////////////////////////////
function favo(obj) {
  var sto = obj.parentElement.parentElement.previousElementSibling.innerText;
  var arr = JSON.parse(localStorage.getItem("Korama"));
  var ii = JSON.parse(localStorage.getItem("i"));
  console.log(sto);
  if (/fav/.test(location.href)) {
    for (i in arr[ii].fav) {
      console.log(i + "s");

      if (sto == arr[ii].fav[i].story) {
        console.log(i);
        arr[ii].fav.splice(i, 1);
        localStorage.setItem("Korama", JSON.stringify(arr));
        location.reload("E:itihtml,CSSanime chart\fav.html");
      }
    }
  }

  for (let i in apiArr) {
    if (sto == apiArr[i].story) {
      console.log("first");
      arr[ii].fav.push(apiArr[i]);
      localStorage.setItem("Korama", JSON.stringify(arr));
    }
  }
}
function loadfav() {
  var arr = JSON.parse(localStorage.getItem("Korama"));
  var k = JSON.parse(localStorage.getItem("i"));
  var arrr = arr[k].fav;
  console.log(arrr);
  for (i of arrr) {
    document.getElementsByClassName(
      "bottom"
    )[0].innerHTML += `<div class="card">
          <div class="img">
            <img src=${i.image} alt="" />
            <div>
              <a href="">${i.name}</a>
              <a href="" style="  color:${i.color[0]};">${i.studio}</a>
            </div>
          </div>
          <div class="textbox">
            <div class="st">
              <div class="shown">
              <div>
                <div>Airing in</div>
                <h1>${i.date}</h1>
                <div>${i.source}</div>
              </div>
              <div>
                <i class="fa-regular fa-heart" style="color: #ef5d5d"></i
                ><span>#${i.pop}</span>
              </div></div>
              <div class="hidden" >

              <div>
                <a href="">#${i.flip}</a><br>
                <i class="fa-brands fa-square-twitter" style="color:#3DB4F2 ;width:15px;"></i>
              </div>
              <div>                <iframe width="80" height="40" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
            </div>
            </div>

            <div class="nd">
              ${i.story}
            </div>
              <div class="rd">
                <div style="background-color:${i.color[0]}; color:${i.color[1]};">${i.genra[0]}</div>
                <div style="background-color:${i.color[0]}; color:${i.color[1]};">${i.genra[1]}</div>
                <p>
                  <i class="fa-solid fa-circle-plus" onclick="favo(this)"></i>
                </p>
              </div>
            </div>
          </div>`;
  }
}
