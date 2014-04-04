//REQUIRED
var fs = new FileSystem();
DirCreate([["home"]],"folder");
DirCreate([["usr"]],"folder");
DirCreate([["usr","bin"]],"folder");

fs.userdir = DirSearch(preparePath("home"));

//OPTIONAL
DirCreate([["usr","share"]],"folder");
DirCreate([["etc"]],"folder");
DirCreate([["etc","grub"]],"folder");
DirCreate([["boot"]],"folder");
DirCreate([["boot","EFI"]],"folder");
DirCreate([["boot","EFI","efi"]],"folder");
DirCreate([["boot","EFI","efi","boot"]],"folder");
DirCreate([["bin"]],"folder");
DirCreate([["cdrom"]],"folder");
DirCreate([["lib"]],"folder");
DirCreate([["lost+found"]],"folder");
DirCreate([["mnt"]],"folder");
DirCreate([["proc"]],"folder");
DirCreate([["run"]],"folder");
DirCreate([["selinux"]],"folder");
DirCreate([["sys"]],"folder");
DirCreate([["dev"]],"folder");
DirCreate([["lib64"]],"folder");
DirCreate([["media"]],"folder");
DirCreate([["opt"]],"folder");
DirCreate([["root"]],"folder");
DirCreate([["sbin"]],"folder");
DirCreate([["srv"]],"folder");
DirCreate([["tmp"]],"folder");
DirCreate([["var"]],"folder");

DirCreate([["home","riley"]],"folder");
DirCreate([["home","riley","Documents"]],"folder");
DirCreate([["home","riley","Downloads"]],"folder");
DirCreate([["home","riley","Music"]],"folder");
DirCreate([["home","riley","Pictures"]],"folder");
DirCreate([["home","riley","Videos"]],"folder");
