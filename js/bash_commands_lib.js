function ChangeDir(inpath) {
    var dir = handleErrors(DirSearch(preparePath(inpath)));
    if (dir != false) {
        fs.currentdir = dir;
    }
}

function list() {
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

function removeDir(path) {
    var dir = DirSearch(preparePath(path));
    if (dir != false && dir.type == "folder") {
        workingdir = dir;
        if (workingdir.contents.length == 0) {
            for (var i = 0; i < workingdir.container.contents.length; i++) {
                if (workingdir.container.contents[i] == workingdir) {
                    workingdir.container.contents.splice(i, 1);
                }
            }
        }
        else {
            handleErrors("ERROR: Directory not empty.");
        }
    }
}

function remove(args) {
    
}

function touch(args) {

}

function move(args) {

}

function copy(args) {

}
