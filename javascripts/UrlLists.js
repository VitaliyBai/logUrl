$(function(){    
    var reg = /^(?:([a-z]+):(?:([a-z]*):)?\/\/)?(?:([^:@]*)(?::([^:@]*))?@)?((?:[a-z0-9_-]+\.)+[a-z]{2,}|localhost|(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])\.){3}(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])))(?::(\d+))?(?:([^:\?\#]+))?(?:\?([^\#]+))?(?:\#([^\s]+))?$/i;
    var lastUrl ='';
    //$('div#urlAdd input').on("focus", function(){
        // тут будет функция обрабатывающая сcылку
       //   
       // if (this.value.match(reg))
       // $("div#urlKit :button").removeClass('disabled');
       // return false;
    //});

    $("div#urlKit button").on("click", function(){ 
      var URL = document.getElementsByName("urlInput")[0].value;

        if ( reg.test(URL) && lastUrl !== URL )    {
           lastUrl = URL;
           $('div#descriptionUrlField, div#collectUrlField').addClass('disabled');
           $("div#urlKit :button").addClass('disabled'); 
     
           addUrl(URL);           
         }  else  { 
        return false;
      }
    });
    function addUrl(URL){
      var newUrl, newUrlLabel, newUrlInput, newUrlA, newTitle, newDescription, newUrlAText, UrlDescription ;
         // var input =  $('div#urlAdd :input#urlInput');
      
      //if (URL == '') return false; // игнорировать пустой submit
     // тут будет функция обрабатывающая сcылку  - спарсить название и описание сайта
     // и вставить  в соответствующие поля в value
      $("div#addUrlField").show('500' //, function(value) {}
            
      );       
      document.getElementById('saveUrl').onclick = function(){
      // $('div#addUrlField a#saveUrl').on('click', function(){
        newUrl = document.createElement('li')
        newUrlLabel = document.createElement("label");
        newUrlInput =  document.createElement("input");
        newUrlA = document.createElement('a');
        newUrlA.href = URL;
        newTitle = document.getElementById("Title").value;
        newDescription = document.getElementsByName('description')[0].value;
      
        newUrlAText = newTitle ? document.createTextNode(newTitle) :  document.createTextNode(document.getElementById("Title").placeholder);;
        UrlDescription = newDescription ? newDescription :  document.getElementsByName('description')[0].placeholder;;
       
        newUrlInput.value = 'true';
        newUrlInput.type = 'checkbox';
        newUrlInput.checked = '';
        newUrlA.appendChild(newUrlAText);
        newUrlLabel.appendChild(newUrlInput);
        newUrlLabel.appendChild(newUrlA);
        newUrl.appendChild(newUrlLabel);        
      
        $('div#urlCatList>div>ol').append(newUrl);          
        //$('div#urlAdd :input#urlInput').val('');
        document.getElementsByName("urlInput")[0].value = null;
        document.getElementsByName('description')[0].value = null;       
        document.getElementById("Title").value = null; 

        $("div#urlKit :button").removeClass('disabled');
        $("div#addUrlField").hide("500");
       // return false;
         //пополнение списка урлов новым
      };
      //});
 
    };
});


$(function(){ //select all
    $('div#Urls :input.selectAll').on('change', function(event){     
      var inputs = $(this).siblings('div.checkbox').find(':input');
      if ($(this).prop("checked")) {
          for (var i = 0; i<inputs.length; i++)
          inputs[i].setAttribute('checked', 'checked');
       } else { 
        for (var i = 0; i<inputs.length; i++)
          inputs[i].removeAttribute('checked', 'checked');
       }
    })
});  