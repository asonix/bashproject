function ChangeDir(inpath) {
    var path = preparePath(inpath);
    fs.currentdir = DirSearch(path);
}

function list() {
    var lsarray = [];
    for (var i = 0; i < fs.currentdir.contents.length; i++) {
        lsarray.push(fs.currentdir.contents[i].name);
    }
    return(lsarray.sort().join(" ")+"</br>");
}

function DirCreate(path) {
    var savedir = fs.currentdir;
    var newpath = [];
    if (path.length > 1) {
        for (var i = 0; i < path.length-1; i++) {
            newpath.push(path[i]);
        }
        return(DirSearch(newpath));
    }
    else {
        return(fs.currentdir);
    }
}
