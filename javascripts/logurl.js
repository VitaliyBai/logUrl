function setFormsButtons(){


    var urlCategories = document.getElementById("categories");
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

    //ставим онклики на кнопки
    document.getElementById('newcategoryButton').onclick = function(){ createNewkiCat('Category', "cat")};
    document.getElementById('newKitButton').onclick = function(){ createNewkiCat('Kit', "kit")};
    document.getElementById("kiCatNav").onclick = function(event){    
        event = event || window.event;
        var target = event.target || event.srcElement;
        while (target !== this) {
            if (target.tagName == "LI"){
              var curDataId = target.getAttribute('data-toggle');  
              var curBlock = document.getElementById(curDataId);
                if (target.className == "аctive") return;
                else {
                     var activeData =  document.querySelector('#kiCatNav .active'); 
                     var activeBlockId =  activeData.getAttribute("data-toggle");
                     var activeBlock = document.getElementById(activeBlockId);

                     activeData.className = "";       //меняем класс местами             
                     target.className = "active";

                     activeBlock.classList.toggle("displayNone");  //меняем местами видимый и невидимый элементы              
                     curBlock.classList.toggle("displayNone");
                }
                break;
            }
         target = target.parentNode;  
        };
    }

    function createNewkiCat(name, kitOrCat){     
        var formCreate = document.createElement("DIV");
        formCreate.innerHTML += '<form class="form-container" > <h2>Create new '+name+'</h2>  \
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
        form.elements.createCategoryButton.onclick = function(){ return creatingKitCat(event);}


        function creatingKitCat() {
            event = event || window.event;
            var target = event.target || event.srcElement;
            var value = form.elements.text.value;
            if (value == '' || value == false) return false; // игнорировать пустой submit
            if (value.length >15) { //чисто символически. либо убрать либо заменить на что-то красивое
                alert("name is too long")
                 return false;
            } 
            if (kitOrCat == "cat")
            makeNewKitCat(value, 'categories', 'urlTree'); //Добавить функцию создающую новую категорию в списке категорий
            if (kitOrCat == "kit")
            makeNewKitCat(value, 'Kits', 'kitsList', ["btn", "btn-primary"]);
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
                return  false;
            }
            if (e.keyCode == 13) { // enter
                creatingKitCat();
                return  false;               
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

    // Разделил на две фукции, принимающие необходимые аргументы
    //     function makeNewKitCat(values){
    //         var refreshLis = urlCategories.getElementsByTagName("li");
    //         var listBody  = document.getElementById("urlTree"); 
    //         var n = 0;
    //         for (var i=0; i<refreshLis.length; i++){ //проверка на наличие категорий с одинаковым названием
    //             if (refreshLis[i].firstChild.innerHTML == values) { //проще просто запретить.                  
    //                 if ( n == 0) {
    //                     n++;
    //                     values += "(1)";
    //                 } else {                        
    //                     values = values.replace("("+n+")","("+(++n)+")");   //костылец                   
    //                 };

    //             }
                
    //         } 
        
    //     var newCategory = document.createElement("LI");
    //     var a = document.createElement("A");
    //     //a.href = "#"; //оно тут не к месту
    //     var categoryName = document.createTextNode(values);
    //     a.appendChild(categoryName);
    //     newCategory.appendChild(a);
    //     listBody.appendChild(newCategory);   
    //     }     

    // }

    function compareKitCat(values, colId ){
        var colId = document.getElementById(colId);
        var refreshLis = colId.getElementsByTagName("li");        
        var n = 0;
        for (var i=0; i<refreshLis.length; i++){ //проверка на наличие категорий с одинаковым названием
            if (refreshLis[i].firstChild.innerHTML == values) { //проще просто запретить.                  
                if ( n == 0) {
                    n++;
                    values += "(1)";
                } else {                        
                    values = values.replace("("+n+")","("+(++n)+")");   //костылец                   
                };
            }
        } 
       return values;
    }     

    function makeNewKitCat(values, colId, ulId, classes){
        values = compareKitCat(values, colId)
        var listBody  = document.getElementById(ulId); 
        var newKitCat = document.createElement("LI");
        var a = document.createElement("A");
            if(classes) {
                for ( var i in classes)
                a.classList.add(classes[i])};
        //a.href = "#"; //оно тут не к месту
        var kitCatName = document.createTextNode(values);
        a.appendChild(kitCatName);
        newKitCat.appendChild(a);
        listBody.appendChild(newKitCat);   
    }


   }

    function aClick(e){
         e = e || window.event;
         var target = e.target || e.srcElement; //  a по которому кликнули.
         var   li  = target.parentNode; //его родитель
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

    
}






window.onload = setFormsButtons;



