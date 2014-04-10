new Command("cd", function(args) {
    changeDirectory(args);
});
new Command("cd..", function() {
    changeDirectory("..");
});
new Command("mkdir", function(args) {
    makeDirectory([args],"folder");
});
new Command("ls", function() {
    $('.append').append(list());
});
new Command("clear", function() {
    $('.append').html("");
});
new Command("rmdir", function(args) {
    removeDir(args);
});
new Command("rm", function(args) {
    remove(args);
});
new Command("touch", function(args) {
    makeDirectory([args],"file")
});
new Command("mv", function(args) {
    move(args);
});
new Command("cp", function(args) {
    copy(args);
});
