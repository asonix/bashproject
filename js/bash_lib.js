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
