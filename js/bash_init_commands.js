new Command("cd", function(args) {
    ChangeDir(args);
});
new Command("cd..", function() {
    ChangeDir("..");
});
new Command("mkdir", function(args) {
    new Dir(args);
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
