function setIconsButtons(){


var urlCategories = document.getElementById("Categories");
var allLis = urlCategories.getElementsByTagName("li");
for (var i = 0 ; i < allLis.length; i++) {
    var li = allLis[i];
    var allUls = li.getElementsByTagName("ul");
        if (allUls.length > 0) {            
                li.style.listStyleImage = "url('./images/plus16.png')";

                // создаем бадж с кол-вом вложенных папок  
                var UlsLi = allUls[0].children; //находим всех детей Ul'a ( кол-во подкатегорий)
                if (UlsLi.length > 0) { //выводи их в бадж
                    var badge = document.createElement('SPAN');
                    badge.classList.add("badge");
                    badge.innerHTML = UlsLi.length
                   li.insertBefore(badge, allUls[0]); //ставим спан с баджем сразу после ссылки
                }
        }        
    }
var allA = document.getElementsByTagName("a");  
    for (var i = 0 ; i < allA.length; i++) {
        allA[i].addEventListener("click", aClick);
    };
 urlCategories.onmousedown = urlCategories.onselectstart = function() {
    return false;
    } // убираем возможность выделения ссылок

//ставим онклик на кнопку сщздания категорий
    document.getElementById('categoryButton').onclick = function(){
    var formCreate = document.createElement("DIV");
    formCreate.innerHTML += '<form class="form-container">\
  <div class="form-title">\
    <h2>Create category</h2>\
    </div>\
    <input class="form-field" type="text" name="categoryname" placeholder ="enter category name" /><br />\
  <div class="submit-container">\
    <input class="submit-button" type="submit" value="create" />\
  </div>\
</form>';
    document.body.appendChild(formCreate);
    var formContainer = document.getElementsByClassName("form-container")[0];
    formCreate.appendChild(formContainer);
    formCreate.style.position = "absolute"; 
    formCreate.style.width = "400px"
    formCreate.style.height = "200px"
     var computedStyle = getComputedStyle(formCreate);


    formCreate.style.left = document.documentElement.clientWidth/2 - computedStyle.width/2 + "px"; 
    formCreate.style.top = document.documentElement.clientHeight/2 - computedStyle.height/2 + "px"; 
    formContainer.style.display = 'block';
    return function(){ return false;};

}


}

window.onload = setIconsButtons;

function aClick(e){
             e = e || event;
             var objA = e.target || e.srcElement; //  a по которому кликнули.
             var   li  = objA.parentNode; //его родитель
             var   uls = li.getElementsByTagName("ul") ;
             var badge = li.getElementsByTagName('span')[0]; // бадж созданный функцией setPlusIcon
              
             if (uls.length == 0) return true;
             if (uls[0].style.display == ""){
                 uls[0].style.display = 'block';
                 li.style.listStyleImage = "url('./images/minus16.png')";
                 badge.style.display = 'none';
            }else{ 
                uls[0].style.display = '';
                li.style.listStyleImage = "url('./images/plus16.png')";
                badge.style.display = '';
            }

             e.preventDefault();
}

