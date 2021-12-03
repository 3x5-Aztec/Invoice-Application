var inputValue = [document.getElementById('testCondition1'), document.getElementById('testCondition2')];
var label1 = document.getElementById('label1');
var label2 = document.getElementById('label2');

var credentials = {
    'gaurav.tiwari@diacto.com' : 'catsforever',
    'om.maurya@diacto.com' : 'customercomesfirst',
    'ajeet.mahajan@diacto.com' : 'fivelayersofwhy'
};

function userAuthorization(value){
    console.log(inputValue[0].value);

    if(inputValue[0].value === Object.keys(credentials).find(function(key){ return credentials[key] === value;}) && inputValue[1].value == credentials[Object.keys(credentials).find(function(key){ return credentials[key] === value;})])
    {   
        localStorage.setItem('Email', inputValue[0].value);
        return true;
    }
}


function disableOptions(){
    var list = document.querySelectorAll('li');
    
    for(var i = 1; i < list.length; i++){
        list[i].style.filter = 'blur(2px)';
        list[i].style.pointerEvents = 'none';
    }
}
disableOptions();

inputValue[0].addEventListener('focus', function(){
    
    label1.style.transform = 'translateY(-26px)';
    label1.style.transition = 'transform 0.2s ease-in-out';
    labelTransition(this, label1);
});

inputValue[0].addEventListener('focusout', function(){
    if(inputValue.value == ''){
        // label.style.color = '#70c1ff';
        label.style.transition = 'transform 0.2s ease-in-out';
        label.style.transform = 'translateY(0px)';
    }
});

inputValue[1].addEventListener('focus', function(){
    
    label2.style.transition = 'transform 0.2s ease-in-out';
    label2.style.transform = 'translateY(-26px)';
    labelTransition(this, label2);
});

inputValue[1].addEventListener('focusout', function(){
    if(inputValue.value == ''){
        label.style.color = '#70c1ff';
        label.style.transition = 'transform 0.2s ease-in-out';
        label.style.transform = 'translateY(0px)';
    }
});

function labelTransition(inputValue, label){
    
        inputValue.addEventListener('keyup', function(){           

            if(userAuthorization(this.value)){
                testInput(true);
            }else{
                testInput(false);
            }

            label.style.transform = 'translateY(-26px)';
            
            if(inputValue.value != ''){
                label.style.color = '#70c1ff';
                label.style.transition = 'transform 0.2s ease-in-out';
                label.style.transform = 'translateY(-26px)';
            }else{
                label.style.transform = 'translateY(0px)';
            }

            inputValue.addEventListener('focusout', function(){
                if(inputValue.value == ''){
                    label.style.color = '#70c1ff';
                    label.style.transition = 'transform 0.2s ease-in-out';
                    label.style.transform = 'translateY(0px)';
                }
            });
            
        });
}

function testInput(element){
    
        if(element){
            var list = document.querySelectorAll('li');

            for(var i = 1; i < list.length; i++){
                list[i].style.filter = 'blur(0px)';
                list[i].style.pointerEvents = '';
                
            }

        }else{
            disableOptions();
        }
    
}


