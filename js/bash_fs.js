function FileSystem() {
    this.contents = [];
    this.currentdir = this;
    this.container = this;
    this.type = "filesystem";
    this.name = "mockfs";
    this.userdir;
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
