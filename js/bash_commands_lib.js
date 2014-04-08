function ChangeDir(args) {
    var dir = handleErrors(DirSearch(preparePath(args[0])));
    if (dir != false && (dir.type == "folder" || dir.type == "filesystem")) {
        fs.currentdir = dir;
    }
}

function list(args) {
    var lsarray = [];
    for (var i = 0; i < fs.currentdir.contents.length; i++) {
        lsarray.push(fs.currentdir.contents[i].name);
    }
    return(lsarray.sort().join(" ")+"</br>");
}

function DirCreate(args,type) {
    var path = args[0];
    var newpath = [];
    var dir;
    if (path.length > 1) {
        for (var i = 0; i < path.length-1; i++) {
            newpath.push(path[i]);
        }
        dir = DirSearch(newpath);
    }
    else {
        dir = fs.currentdir;
    }
    if (type == "folder") {
        new Dir(path[path.length-1],dir);
    }
    else {
        new File(path[path.length-1],dir);
    }
}

function removeDir(args) {
    var dir = handleErrors(DirSearch(preparePath(args[0])));
    if (dir != false && dir.type != "folder") {
        handleErrors("ERROR: " + dir + " is not a directory.");
    }
    else if (dir != false && dir.type == "folder") {
        remove(args);
    }
    else {
        handleErrors(dir);
    }
}

function remove(args) {
   var dir = handleErrors(DirSearch(preparePath(args[0])));
   if (dir != false) {
       if (dir.type == "folder") {
           if (dir.contents.length == 0) {
               for (var i = 0; i < dir.container.contents.length; i++) {
                    if (dir == dir.container.contents[i]) {
                       dir.container.contents.splice(i,1);
                   }
               }
           }
           else {
               handleErrors("ERROR: Directory not empty.");
           }
       }
       else {
           console.log(dir);
           for (var i = 0; i < dir.container.contents.length; i++) {
               dir.container.contents.splice(i,1);
           }
       }
   }
   else {
       handleErrors(dir);
   }
}

function move(args) {
    var path1;
    var path2;
    var recursive = false;
    for (var i = 0; i < args.length; i++) {
        if (args[i] == "-r") {
            recursive = true;
        }
        else if(typeof(path1) != "undefined") {
            path2 = args[i];
        }
        else {
            path1 = args[i];
        }
    }
    if (recursive == true) {
        var p1 = handleErrors(DirSearch(preparePath(path1)));
        var path2test = [];
        if (p1 != false) {
            for (var i = 0; i < preparePath(path2).length-1; i++) {
                path2test.push(preparePath(path2)[i]);
            }
            console.log(path2test);
            var p2test = handleErrors(DirSearch(path2test));
            if (p2test != false) {
                var p2 = handleErrors(DirSearch(preparePath(path2)));
                if (p2 == false) {
                    for (var i = 0; i < p1.container.contents.length; i++) {
                        if (p1.container.contents[i] == p1) {
                            p1.container.contents.splice(i,1);
                        }
                    }
                    p2test.contents.push(p1);
                    p1.container = p2;
                }
                else {
                    handleErrors("ERROR: Directory already exists");
                }
            }
        }
    }
    else {
        var p1 = handleErrors(DirSearch(preparePath(path1)));
        var path2test;
        if (p1 != false && p1.contents.length == 0) {
            for (var i = 0; i < path2.length-1; i++) {
                path2test.push(path2[i]);
            }
            var p2test = handleErrors(DirSearch(preparePath(path2test)));
            if (p2test != false) {
                var p2 = handleErrors(DirSearch(preparePath(path2)));
                if (p2 == false) {
                    for (var i = 0; i < p1.container.contents.length; i++) {
                        if (p1.container.contents[i] == p1) {
                            p1.container.contents.splice(i,1);
                        }
                    }
                    p2test.contents.push(p1);
                    p1.container = p2;
                }
                else {
                    handleErrors("ERROR: Directory already exists");
                }
            }
        }
        else {
            handleErrors("ERROR: Directory not empty");
        }
    }
}

function copy(args) {
    var path1;
    var path2;
    var recursive = false;
    for (var i = 0; i < args.length; i++) {
        if (args[i] == "-r") {
            recursive = true;
        }
        else if (typeof(path1) != "undefined") {
            path2 = args[i];
        }
        else {
            path1 = args[i];
        }
    }
    
    var path2test;
    for (var i = 0; i < path2.length-1; i++) {
            path2test.push(path2[i]);
    }

    var p1 = handleErrors(DirSearch(preparePath(path1)));
    if (p1 != false) {
        var p2 = handleErrors(DirSearch(preparePath(path2)));
        var p2test = handleErrors(DirSearch(preparePath(path2test)));
        if (p2test != false) {
            if (p2 == false) {
                DirCreate(p2,p1.type);
                p2 = handleErrors(DirSearch(preparePath(path2)));
            }
            else {
                p2.push(p1[p1.length-1]);
                DirCreate(p2,p1.type);
            }
            
            if (recursive == false) {
                if (p1 != false && p2 != false && p1.type != "folder") {
                    p2.name = p1.name;
                    p2.contents = p1.contents;
                }
                else if (p1 != false && p2 != false) {
                    p2.name = p1.name;
                }
            }
            else {
                for (var i = 0; i < path1.contents.length; i++) {
                    var p1temp = path1+"/"+path1.contents[i].name;
                    var p2temp = path2+"/"+path1.contents[i].name;
                    copy([p1temp,path2,"-r"]);
                }
            }
        }
    }
}
