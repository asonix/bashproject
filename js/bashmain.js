var fs = new FileSystem();
new Dir("home");
new Dir("home/riley");
new Dir("home/riley/Documents");
new Dir("home/riley/Downloads");
new Dir("home/riley/Music");
new Dir("home/riley/Pictures");
new Dir("home/riley/Videos");
new Dir("usr");
new Dir("usr/bin");
new Dir("usr/share");
new Dir("etc");
new Dir("etc/grub");
new Dir("boot");
new Dir("boot/EFI");
new Dir("boot/EFI/efi");
new Dir("boot/EFI/efi/boot");

$(document).ready(function(){
    $('.currentdir').html(currentline());
    $("input[type=text], textarea").val("");
    $('#input').keypress(function(key){
        if (key.keyCode == 13) {    //'enter'
            var formInput = $("input[name=cmd]").val();
            var parsing = formInput.split(" ");
            $('.active').toggle();
            $('.append').append(currentline()+" "+formInput+"</br>");
            
            if (parsing[0] == "cd") {
                ChangeDir(parsing[1]);
            }
            else if (parsing[0] == "cd..") {
                ChangeDir("..")
            }
            else if (parsing[0] == "mkdir") {
                new Dir(parsing[1]);
            }
            else if (parsing[0] == "ls") {
                $('.append').append(list());
            }
            
            $('.currentdir').html(currentline());
            $("input[type=text], textarea").val("");
            $('.active').toggle();
        }
    });
});