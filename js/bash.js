function FileSystem() {
    this.contents = [];
    this.currentdir = this;
    this.container = this;
    this.type = "filesystem";
    this.name = "mockfs";
    this.userdir;
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
        fs.currentdir = fs;
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
            if (cur.type == "folder" && cur.name == path[0]) {
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
            if (cur.type == "folder" && cur.name == path[0]) {
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
    var nowdir;
    var returndir;
    
    if (path[0] == "") {
        fs.currentdir = fs;
        nowdir = fs.currentdir;
        returndir = DirSearch(newpath);
        fs.currentdir = savedir;
        return(returndir);
    }
    else if (path[0] == "..") {
        fs.currentdir = fs.currentdir.container;
        returndir = DirSearch(newpath);
        fs.currentdir = savedir;
        return(returndir);
    }
    else if (path[0] == "~") {
        if (newpath[0] == "") {
            newpath = [];
        }
        fs.currentdir = fs.userdir;
        returndir = DirSearch(newpath);
        fs.currentdir = savedir;
        return(returndir);
    }
    else {
        nowdir = fs.currentdir;
    }
    var cur;
    var check = false;
    if (newpath.length != 0) {
        for (var i = 0; i < nowdir.contents.length; i++) {
            cur = nowdir.contents[i];
            if (cur.type == "folder" && cur.name == path[0]) {
                fs.currentdir = cur;
                check = true;
                returndir = DirSearch(newpath);
                fs.currentdir = savedir;
                return(returndir);
            }
        }
    }
    else {
        for (var i = 0; i < nowdir.contents.length; i++) {
            cur = nowdir.contents[i];
            if (cur.type == "folder" && cur.name == path[0]) {
                fs.currentdir = savedir;
                return(cur);
            }
        }
    }
    if (newpath.length > 0 && check == false) {
        return("ERROR: The directory "+newpath[0]+" does not exist.");
    }
    else if(newpath.length == 0 && check == false){
        return(nowdir);
    }
    else {
        return("why");
    }
}

function Dir(inpath) {
    this.type = "folder";
    var path = preparePath(inpath);
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

function Command(name,command) {
    this.name = name;
    this.type = "command";
    var path = preparePath("/usr/bin/"+this.name);
    this.container = DirCreate(path);
    this.container.contents.push(this);
    
    var currentdir = this;
    this.buildpath = function() {
        if (currentdir.container.type == "folder") {
            return(currentdir.container.buildpath() + "/" + currentdir.name);
        }
        else {
            return("/" + currentdir.name);
        }
    }
    this.command = command;
}

function runCommand(command,args) {
    console.log("currentdir: " + fs.currentdir.name);
    var prevdir = fs.currentdir;
    fs.currentdir = DirSearch(preparePath("/usr/bin"));
    for (var i = 0; i < fs.currentdir.contents.length; i++) {
        if (fs.currentdir.contents[i].name == command) {
            var commanddir = fs.currentdir;
            fs.currentdir = prevdir;
            var returned = commanddir.contents[i].command(args);
            return(returned);
        }
    }
    return("ERROR: command not found.");
}

function ChangeDir(inpath) {
    var path = preparePath(inpath);
    fs.currentdir = DirSearch(path);
}

function preparePath(inpath) {
    inpath = inpath.replace(/\s+/g, '');
    return inpath.split("/");
}

function currentline() {
    var newOut = "";
    if (fs.currentdir != fs) {
        var curdir = fs.currentdir.buildpath().split("/");
        for (var i = 0; i < curdir.length; i++) {
            if (curdir[i] == fs.userdir.name) {
                newOut = "~";
            }
            else if (curdir[i] == "") {
                newOut += "";
            }
            else {
                newOut += "/" + curdir[i];
            }
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
