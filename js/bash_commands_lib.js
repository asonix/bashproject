function ChangeDir(args) {
    var dir = handleErrors(DirSearch(preparePath(args[0])));
    if (dir != false) {
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

function DirCreate(path) {
    var newpath = [];
    if (path.length > 1) {
        for (var i = 0; i < path.length-1; i++) {
            newpath.push(path[i]);
        }
        var dir = DirSearch(newpath);
        return(dir);
    }
    else {
        return(fs.currentdir);
    }
}

function removeDir(args) {
    var dir = DirSearch(preparePath(args[0]));
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
   var dir = DirSearch(preparePath(args[0]));
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
           for (var i = 0; i < dir.container.contents.length; i++) {
               dir.container.contents.splice(i,1);
           }
       }
   }
   else {
       handleErrors(dir);
   }
}

function touch(args) {

}

function move(args) {

}

function copy(args) {

}
