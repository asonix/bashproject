new Command("cd", function(path) {
    ChangeDir(path);
});
new Command("cd..", function() {
    ChangeDir("..");
});
new Command("mkdir", function(path) {
    new Dir(path);
});
new Command("ls", function() {
    $('.append').append(list());
});
new Command("clear", function() {
    $('.append').html("");
});
new Command("rmdir", function(path) {
    removeDir(path);
});
