//REQUIRED
var fs = new FileSystem();
makeDirectory([["home"]],"folder");
makeDirectory([["usr"]],"folder");
makeDirectory([["usr","bin"]],"folder");

fs.userdir = search(preparePath("home"));

//OPTIONAL
makeDirectory([["usr","share"]],"folder");
makeDirectory([["etc"]],"folder");
makeDirectory([["etc","grub"]],"folder");
makeDirectory([["boot"]],"folder");
makeDirectory([["boot","EFI"]],"folder");
makeDirectory([["boot","EFI","efi"]],"folder");
makeDirectory([["boot","EFI","efi","boot"]],"folder");
makeDirectory([["bin"]],"folder");
makeDirectory([["cdrom"]],"folder");
makeDirectory([["lib"]],"folder");
makeDirectory([["lost+found"]],"folder");
makeDirectory([["mnt"]],"folder");
makeDirectory([["proc"]],"folder");
makeDirectory([["run"]],"folder");
makeDirectory([["selinux"]],"folder");
makeDirectory([["sys"]],"folder");
makeDirectory([["dev"]],"folder");
makeDirectory([["lib64"]],"folder");
makeDirectory([["media"]],"folder");
makeDirectory([["opt"]],"folder");
makeDirectory([["root"]],"folder");
makeDirectory([["sbin"]],"folder");
makeDirectory([["srv"]],"folder");
makeDirectory([["tmp"]],"folder");
makeDirectory([["var"]],"folder");

makeDirectory([["home","riley"]],"folder");
makeDirectory([["home","riley","Documents"]],"folder");
makeDirectory([["home","riley","Downloads"]],"folder");
makeDirectory([["home","riley","Music"]],"folder");
makeDirectory([["home","riley","Pictures"]],"folder");
makeDirectory([["home","riley","Videos"]],"folder");
