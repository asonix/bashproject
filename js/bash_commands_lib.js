function changeDirectory(args) {
    var dir = handleErrors(search(preparePath(args[0]),"","folder"));
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

function makeDirectory(args,type) {
    var path = args[0];
    for (var i = 0; i < path[0].length; i++) {
        if (path[0][i] == "/") {
            path = path[0].split("/");
        }
    }
    var newpath = [];
    var dir;
    var s = search(path,"",type);
    s = s.type;
    if (typeof(s) == "undefined") {
        if (path.length > 1) {
            for (var i = 0; i < path.length-1; i++) {
                newpath.push(path[i]);
            }
            dir = search(newpath,"",type);
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
    else if (search(path).type == type || (search(path).type != "folder" && type != "folder")) {
        handleErrors("ERROR: "+path[path.length-1]+" already exists;");
    }
}

function removeDir(args) {
    var dir = handleErrors(search(preparePath(args[0])));
    if (dir != false && dir.type != "folder") {
        handleErrors("ERROR: " + dir + " is not a directory.");
    }
    else if (dir != false && dir.type == "folder") {
        remove(args,"folder");
    }
    else {
        handleErrors(dir);
    }
}

function remove(args,type) {
    if (typeof(type) == "undefined") {
        type = "file";
    }
    var recursive = false;
    var dir;
    for (var i = 0; i < args.length; i++) {
        if (args[i] == "-r") {
            recursive = true;
        }
        else {
            dir = search(preparePath(args[i]),"",type);
            if (typeof(dir) == "string") {
                dir = handleErrors(search(preparePath(args[i]),"","folder"));
            }
        }
    }
    if (dir != false) {
        if (dir.type == "folder") {
            if (dir.contents.length == 0) {
                for (var i = 0; i < dir.container.contents.length; i++) {
                    if (dir == dir.container.contents[i]) {
                        dir.container.contents.splice(i,1);
                    }
                }
            }
            else if (recursive == true) {
                for (var i = 0; i < dir.contents.length; i++) {
                    remove([dir.contents[i].buildpath(),"-r"]);
                }
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
                if (dir == dir.container.contents[i]) {
                     dir.container.contents.splice(i,1);
                }
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
        if(typeof(path1) != "undefined") {
            path2 = args[i];
        }
        else {
            path1 = args[i];
        }
    }
    var p1 = search(preparePath(path1),"","file");
    if (typeof(p1) == "string") {
        p1 = handleErrors(search(preparePath(path1),"","folder"));
    }
    var path2test = [];
    if (p1 != false) {
        for (var i = 0; i < preparePath(path2).length-1; i++) {
            if (typeof(preparePath(path2)[i]) != "undefined") {
                path2test.push(preparePath(path2)[i]);
            }
        }
        if (path2test.length != 0) {
            var p2test = handleErrors(search(path2test,"","folder"));
            if (p2test != false) {
                var p2 = handleErrors(search(preparePath(path2),"","folder"));
                if (p2 != false) {
                    for (var i = 0; i < p1.container.contents.length; i++) {
                        if (p1.container.contents[i] == p1) {
                            p1.container.contents.splice(i,1);
                        }
                    }
                    p2.contents.push(p1);
                    p1.container = p2;
                }
                else {
                    handleErrors("ERROR: Directory already exists");
                }
            }
        }
        else {
            var p2 = handleErrors(search(preparePath(path2),"","folder"));
            if (p2 != false) {
                for (var i = 0; i < p1.container.contents.length; i++) {
                    if (p1.container.contents[i] == p1) {
                        p1.container.contents.splice(i,1);
                    }
                }
                p2.contents.push(p1);
                p1.container = p2;
            }
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
    var path2test = [];
    for (var i = 0; i < preparePath(path2).length-1; i++) {
            path2test.push(path2[i]);
    }
    var p1 = search(preparePath(path1),"","file");
    if (typeof(p1) == "string") {
        p1 = handleErrors(search(preparePath(path1),"","folder"));
    }
    if (p1 != false) {
        var p2 = search(preparePath(path2),"","folder");
        if (typeof(p2) == "string") {
            handleErrors(search(preparePath(path2),"","file"));
        }
        if (p2 == false) {
            var p2test = search(path2test,"","folder");
            if (typeof(p2test) == "string") {
                p2test = handleErrors(search(path2test,"","file"));
            }
            if (p2test != false) {
                makeDirectory([preparePath(path2)],p1.type);
            }
        }
        else {
            var newFolder = preparePath(path2);
            var p1path = preparePath(path1);
            newFolder.push(p1path[p1path.length-1]);
            makeDirectory([newFolder],p1.type);
        }
        if (recursive != false) {
            var path2arr = preparePath(path2);
            for (var i = 0; i < p1.contents.length; i++) {
                var path1content = preparePath(p1.contents[i].buildpath());
                path2arr.push(path1content[path1content.length-1]);
                copy([path1content,path2arr,"-r"]);
            }
        }
    }
}
