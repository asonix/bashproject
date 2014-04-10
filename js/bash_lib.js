function search(path,workingdirectory,type) {
    if (typeof(workingdirectory) == "undefined" || typeof(workingdirectory) == "string") {
        workingdirectory = fs.currentdir;
    }
    var newpath = [];

    for (var i = 1; i < path.length; i++) {
        newpath.push(path[i]);
    }
    var returndir;
    if (path[0] == "") {
        workingdirectory = fs;
        if (newpath.length != 0) {
            returndir = search(newpath,workingdirectory,type);
        }
        else {
            returndir = workingdirectory;
        }
        return(returndir);
    }
    else if (path[0] == "..") {
        workingdirectory = workingdirectory.container;
        if (newpath.length != 0) {
            returndir = search(newpath,workingdirectory,type);
        }
        else {
            returndir = workingdirectory;
        }
        return(returndir);
    }
    else if (path[0] == "~") {
        workingdirectory = fs.userdir;
        if (newpath.length == 0) {
            return(workingdirectory);
        }
        returndir = search(newpath,workingdirectory,type);
        return(returndir);
    }
    var cur;
    if (newpath.length != 0) {
        for (var i = 0; i < workingdirectory.contents.length; i++) {
            cur = workingdirectory.contents[i];
            if (cur.name == path[0] && (cur.type == "folder" || cur.type == "filesystem")) {
                workingdirectory = cur;
                returndir = search(newpath,workingdirectory,type);
                return(returndir);
            }
        }
    }
    else {
        for (var i = 0; i < workingdirectory.contents.length; i++) {
            cur = workingdirectory.contents[i];
            var t = type;
            var s = cur.type;
            if (cur.name == path[0] && (((s == "folder" || s == "filesystem") && t == "folder") || ((s != "folder" && s != "filesystem") && t != "folder"))) {
                return(cur);
            }
        }
    }
    return("ERROR: "+path[0]+" does not exist.");
}

function runCommand(args) {
    var command = args.splice(0,1);
    var workingdir = search(preparePath("/usr/bin"),"","folder");
    for (var i = 0; i < workingdir.contents.length; i++) {
        if (workingdir.contents[i].name == command) {
            var returned = workingdir.contents[i].command(args);
            return(returned);
        }
    }
    handleErrors("ERROR: command not found.");
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

function handleErrors(output) {
    if (typeof(output) == "string") {
        $('.append').append(output+"</br>");
        return(false);
    }
    else {
        return(output);
    }
}

