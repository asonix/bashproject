function FileSystem() {
    this.contents = [];
    this.currentdir = "none";
    this.container = this;
}

function DirSearch(path) {
    var currentdir;
    if (path[0] == "") {
        currentdir == fs;
    }
    else if (path[0] == "..") {
        currentdir = fs.currentdir.container;
    }
    else {
        currentdir = fs.currentdir;
    }
    for (var i = 0; i < currentdir.contents; i++) {
        //code
    }
}

function Dir(inpath) {
    inpath = inpath.replace(/\s+/g, '');
    this.path = inpath.split("/");
    this.contents = [];
    if (fs.currentdir == "none") {
        this.container = fs;
        fs.currentdir = this;
    }
    else {
        if (this.path.length > 1) {
            if (this.path[0] == "") {
                //code
            }
        }
    }
    this.name = path[path.length-1];
}

function File(path) {
    
}

var fs = new FileSystem();

$(document).ready(function(){
    
    
    //$('#input').keypress(function(key){ //keypress
    //    if (key.keyCode == 13) {    //is key 'enter'
    //        var formInput = $("input[name=cmd]").val(); //store input from form
    //        console.log("formInput = "+formInput);
    //        $('.active').toggle();  //hide input form
    //        $('.append').before(currentdir.directory+">"+formInput+"</br>");  //display command recieved
    //        
    //        if (formInput == "dir") { //outputs formatted directory list
    //            $('.append').before("&nbsp; Volume in drive C is OS</br>&nbsp; Volume Serial Number is 34C6-2E57</br>");
    //            $('.append').before("</br>&nbsp; Directory of "+ currentdir.directory +"</br></br>");
    //            
    //            for (var i in currentdir.folderlist) {
    //                $('.append').before("<div class='dates'>"+"8/30/13</br>"+"</div>");
    //                $('.append').before("<div class='times'>"+"3:32 PM</br>"+"</div>");
    //                $('.append').before("<div class='size'>"+"&nbsp;"+"</br></div>");
    //                $('.append').before("<div class='name'>"+currentdir.folderlist[i]+"</br></div></br>");
    //            }
    //            for (var i in currentdir.filelist) {
    //                $('.append').before("<div class='dates'>"+"8/30/13</br>"+"</div>");
    //                $('.append').before("<div class='times'>"+"3:32 PM</br>"+"</div>");
    //                $('.append').before("<div class='size'>"+"-"+"</br></div>");
    //                $('.append').before("<div class='name'>"+currentdir.filelist[i]+"</br></div></br>");
    //            }
    //
    //            $('.append').before("<div class='eleft'>"+currentdir.filelist.length+" file(s)</br></div>");
    //            $('.append').before("<div class='eright'>"+currentdir.filelist.length*2048+" bytes</br></div></br>");
    //            $('.append').before("<div class='eleft'>"+currentdir.folderlist.length+" folder(s)</br></div>");
    //            $('.append').before("<div class='eright'>&nbsp; bytes</br></div>");
    //            $('.append').before("</br></br>");
    //        }
    //        else if (formInput == "cd ..") { //code for cd ..
    //            var count = 0;
    //            while (count < folders.length) {    //loops through array 'folders'
    //                if (folders[count].directory == currentdir.inside || folders[count].directory == currentdir.inside + "\\") { //accounts for directories with and without '//'
    //                    currentdir = folders[count]; //changes current folder
    //                    count = folders.length; //sets count higher than limit
    //                    $(".append").before("</br>");
    //                }
    //                else {
    //                    count++;
    //                }
    //            }
    //        }
    //        else if (formInput.substring(0, 2) == "cd" && formInput != "cd .." && formInput.length > 2) { //check if input is 'cd' but not 'cd ..'
    //            
    //            var recognizedpath = false;
    //            var inputDir = formInput.substring(3, formInput.length);
    //            
    //            if (formInput.substring(3,5) == "C:") { //check to see in input is a path
    //                console.log("intended directory: "+formInput);
    //                var i = 0;
    //                while (i < folders.length) {
    //                    if (inputDir == folders[i].directory) {
    //                        currentdir = folders[i];
    //                        $(".append").before("</br>");
    //                        recognizedpath = true;
    //                        i = folders.length;
    //                    }
    //                    else {
    //                        i++;
    //                    }
    //                }
    //            }
    //            else { //input is folder name or unrecognized
    //                var i = 0;
    //                while (i < currentdir.folderlist.length) {
    //                    if (inputDir == currentdir.folderlist[i]) {
    //                        i = currentdir.folderlist.length;
    //                        var j = 0;
    //                        while (j < folders.length) {
    //                            if (inputDir == folders[j].folderName && (folders[j].inside == currentdir.directory || folders[j].inside + "\\" == currentdir.directory)) {
    //                                currentdir = folders[j];
    //                                $(".append").before("</br>");
    //                                console.log("currentdir=intended dir");
    //                                recognizedpath = true;
    //                                j = folders.length+1;
    //                            }
    //                            else {
    //                                j++;
    //                            }
    //                        }
    //                    }
    //                    else {
    //                        i++;
    //                    }
    //                }
    //            }
    //            if (recognizedpath == false) {
    //                $('.append').before("The system could not find the path specified.</br></br>");
    //            }
    //            else {
    //            }
    //        }
    //        else if (formInput == "cd") {
    //            $('.append').before(currentdir.directory+"</br></br>");
    //        }
    //        else if (formInput == "cls") {
    //            $('.appendhelper').html("<div class='append'></div>")
    //        }
    //        else if (formInput == "") {
    //            $('.append').before("");
    //        }
    //        else if (formInput.substring(0,2) == "m ") {
    //            $('.append').before("<marquee>"+formInput.substring(2, formInput.length)+"</marquee></br></br>");
    //        }
    //        else if (formInput.substring(0,5) == "echo ") {
    //            $('.append').before(formInput.substring(5, formInput.length)+"</br></br>");
    //        }
    //        else if (formInput.substring(0, 6) == "mkdir ") {
    //            var samename = false;
    //            var i = 0;
    //            while (i < currentdir.folderlist.length) {
    //                if (currentdir.folderlist[i] == formInput.substring(6, formInput.length)) {
    //                    samename = true;
    //                    i = currentdir.folderlist.length;
    //                }
    //                else {
    //                    i++;
    //                }
    //            }
    //            if (samename == true) {
    //                $('.append').before("There is already a folder with that name.</br></br>");
    //            }
    //            else {
    //                folders[folders.length] = new Dir(currentdir.directory, formInput.substring(6, formInput.length));
    //                currentdir.folderlist[currentdir.folderlist.length] = formInput.substring(6, formInput.length);
    //                $('.append').before("</br>");
    //            }
    //        }
    //        else {
    //            var fileopen = false;
    //            var i = 0;
    //            while (i < currentdir.filelist.length) {
    //                if (formInput == currentdir.filelist[i]) {
    //                    console.log("opening file");
    //                    i = currentdir.filelist.length;
    //                    fileopen = true;
    //                }
    //                else {
    //                    i++;
    //                }
    //            }
    //            if (fileopen == false) {
    //                $('.append').before("'"+formInput+"' is not recognized as an internal or external command,</br>operable program or batch file.</br></br>");
    //            }
    //            else {
    //            }
    //        }
    //        $('.currentdir').html(currentdir.directory+">");
    //        $("input[type=text], textarea").val("");
    //        $('.active').toggle();
    //    }
    //});
});