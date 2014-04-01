function FileSystem() {
    this.contents = [];
    this.currentdir = this;
    this.container = this;
    this.type = "filesystem";
    this.name = "mockfs";
}

function DirCreate(path) {
    var savedir = fs.currentdir;
    var newpath = [];
    for (var i = 1; i < path.length; i++) {
        newpath.push(path[i]);
    }
    var currentdir;
    var returndir;
    if (path[0] == "") {
        fs.currentdir == fs;
        currentdir = fs.currentdir;
        returndir = DirCreate(newpath);
        return(returndir);
    }
    else if (path[0] == "..") {
        fs.currentdir = fs.currentdir.container;
        returndir = DirCreate(newpath);
        return(returndir);
    }
    else {
        currentdir = fs.currentdir;
    }
    var cur;
    var check = false;
    if (newpath.length != 0) {
        for (var i = 0; i < currentdir.contents.length; i++) {
            cur = currentdir.contents[i];
            console.log("searching for " + path[0]);
            if (cur.type == "folder" && cur.name == path[0]) {
                console.log("found " + path[0]);
                fs.currentdir = cur;
                check = true;
                returndir = DirCreate(newpath);
                fs.currentdir = savedir;
                return(returndir);
            }
        }
    }
    else {
        for (var i = 0; i < currentdir.contents.length; i++) {
            cur = currentdir.contents[i];
            console.log("searching for " + path[0]);
            if (cur.type == "folder" && cur.name == path[0]) {
                console.log("found " + path[0]);
                fs.currentdir = cur;
                check = true;
            }
        }
    }
    if (newpath.length > 0 && check == false) {
        return("ERROR: The directory "+newpath[0]+" does not exist.");
    }
    else if(newpath.length == 0 && check == false){
        return(currentdir);
    }
    else if (newpath.length == 0 && check == true) {
        return("ERROR: The directory already exists");
    }
    else {
        return("why");
    }
}

function DirSearch(path) {
    var savedir = fs.currentdir;
    var newpath = [];
    for (var i = 1; i < path.length; i++) {
        newpath.push(path[i]);
    }
    var currentdir;
    var returndir;
    if (path[0] == "") {
        fs.currentdir == fs;
        currentdir = fs.currentdir;
        returndir = DirSearch(newpath);
        return(returndir);
    }
    else if (path[0] == "..") {
        fs.currentdir = fs.currentdir.container;
        returndir = DirSearch(newpath);
        return(returndir);
    }
    else {
        currentdir = fs.currentdir;
    }
    var cur;
    var check = false;
    if (newpath.length != 0) {
        for (var i = 0; i < currentdir.contents.length; i++) {
            cur = currentdir.contents[i];
            console.log("searching for " + path[0]);
            if (cur.type == "folder" && cur.name == path[0]) {
                console.log("found " + path[0]);
                fs.currentdir = cur;
                check = true;
                returndir = DirSearch(newpath);
                fs.currentdir = savedir;
                return(returndir);
            }
        }
    }
    else {
        for (var i = 0; i < currentdir.contents.length; i++) {
            cur = currentdir.contents[i];
            console.log("searching for " + path[0]);
            if (cur.type == "folder" && cur.name == path[0]) {
                console.log("found " + path[0]);
                fs.currentdir = savedir;
                return(cur);
            }
        }
    }
    if (newpath.length > 0 && check == false) {
        return("ERROR: The directory "+newpath[0]+" does not exist.");
    }
    else if(newpath.length == 0 && check == false){
        return(currentdir);
    }
    else {
        return("why");
    }
}

function Dir(inpath) {
    this.type = "folder";
    var path = PreparePath(inpath);
    this.contents = [];
    this.container = DirCreate(path);
    this.container.contents.push(this);
    this.name = path[path.length-1];
    
    var currentdir = this;
    this.buildpath = function() {
        if (currentdir.container.type == "folder") {
            return(currentdir.container.buildpath() + "/" + currentdir.name);
        }
        else {
            return("/" + currentdir.name);
        }
    }
}

function File(path) {
    this.type = "file";
    this.name = "";
}

function ChangeDir(inpath) {
    var path = PreparePath(inpath);
    fs.currentdir = DirSearch(path);
}

function PreparePath(inpath) {
    inpath = inpath.replace(/\s+/g, '');
    return inpath.split("/");
}

function currentline() {
    var start = "~";
    var newOut = "";
    if (fs.currentdir != fs) {
        var curdir = fs.currentdir.buildpath().split("/");
        if (curdir[1] == "home" && curdir.length >= 3) {
            for (var i = 3; i < curdir.length; i++) {
                start += curdir[i];
            }
            newOut = start;
        }
        else {
            newOut = fs.currentdir.buildpath();
        }
    }
    else {
        newOut = "/";
    }
    return("riley@riley-U56E:"+newOut+"$");
}

function list() {
    var lsarray = [];
    for (var i = 0; i < fs.currentdir.contents.length; i++) {
        lsarray.push(fs.currentdir.contents[i].name);
    }
    return(lsarray.sort().join(" ")+"</br>");
}