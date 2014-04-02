$(document).ready(function(){
    $('.currentdir').html(currentline());
    $("input[type=text], textarea").val("");
    
    $('#input').keypress(function(key){
        if (key.keyCode == 13) {    //'enter'
            var formInput = $("input[name=cmd]").val();
            var parsing = formInput.split(" ");
            
            $('.active').toggle();
            $('.append').append(currentline()+" "+formInput+"</br>");
            
            runCommand(parsing[0],parsing[1]);
            
            $('.currentdir').html(currentline());
            $("input[type=text], textarea").val("");
            $('.active').toggle();
        }
    });
});
