function setFormsButtons(){


    var urlCategories = document.getElementById("Categories");
    var allLis = urlCategories.getElementsByTagName("li");
    for (var i = 0 ; i < allLis.length; i++) {
        var li = allLis[i];
        var allUls = li.getElementsByTagName("ul");
            if (allUls.length > 0) {   
                    for (var j=0; j<allUls.length; j++){ //расставляем  невидимость вложенным спискам
                      allUls[j].classList.add("expandable");} ;        
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

    //ставим онклик на кнопку создания категорий
    document.getElementById('categoryButton').onclick = function(){
     
        var formCreate = document.createElement("DIV");
        formCreate.innerHTML += '<form class="form-container" > <h2>Create category</h2>  \
        <input class="form-control" type="text" name="text" placeholder ="enter category name" /><br />\
         <div class="submit-container">\
        <input class=" btn btn-danger " type="button" value="cancel"  name="cancel"/>\
        <input class=" btn btn-success " type="button" value="create" id="createCategoryButton" />\
        </div>\
        </form>';
        document.body.appendChild(formCreate);
        var formContainer = document.getElementsByClassName("form-container")[0];
        formCreate.appendChild(formContainer);
        formCreate.style.position = "absolute";
        formContainer.style.display = 'block'; 
        var computedStyle = getComputedStyle(formContainer, '');
        //centering form
        formCreate.style.left = document.documentElement.clientWidth/2 - formContainer.offsetWidth/2 + "px"; 
        formCreate.style.top = document.documentElement.clientHeight/2 - formContainer.offsetHeight/2 + "px"; 
        formCreate.classList.add("prompt-form-container");
           
        
        //mini-validating
        showCover(); 
        var form = document.getElementsByClassName("form-container")[0];
        form.elements.text.value = '';
      
     
        //заменил onsubmit на onclick... костыль?
        form.elements.createCategoryButton.onclick =  function(event) {
            event = event || window.event;
            var target = event.target || event.srcElement;
            var value = form.elements.text.value;
            if (value == '' || value == false) return false; // игнорировать пустой submit
            if (value.length >15) {
                alert("сcategory name is too long")
                 return false;
            } //чисто символически
            makeCategory(value); //Добавить функцию создающую новую категорию в списке категорий
            
            // if (event.preventDefault) {
            //     event.preventDefault();
            //     event.stopPropagation();
            // } else { 
            //     event.cancelBubble = true;
            //     event.returnValue = false;
            // };

            complete();
                return  false;
            };

        form.elements.cancel.onclick = function() {
            complete();
         };

        document.body.onkeydown = function(e) {
             e = e || window.event;
            if (e.keyCode == 27) { // escape
                complete();
            }
        };
   
        form.elements.text.focus(); 

        function complete() {
            document.body.removeChild(document.getElementById('cover-div'));           
            document.onkeydown = null;
            document.body.removeChild(formCreate);
        }

        function showCover() { //cover page under  form
             var coverDiv = document.createElement('div');
             coverDiv.id = 'cover-div';
             document.body.appendChild(coverDiv);
        }

        function makeCategory(value){
           // создание длинным путем (не через innerHTML)
           // var urlCategories = document.getElementById("Categories");
            var listBody  = document.getElementById("urlTree");
            var newCategory = document.createElement("LI");
            var a = document.createElement("A");
            a.href = "#";
            var categoryName = document.createTextNode(value);
            a.appendChild(categoryName);
            newCategory.appendChild(a);
            listBody.appendChild(newCategory);
           


        }

        
    }

     
}

 

window.onload = setFormsButtons;

function aClick(e){
             e = e || window.event;
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

