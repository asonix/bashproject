//REQUIRED
var fs = new FileSystem();
new Dir("home");
new Dir("usr");
new Dir("usr/bin");

fs.userdir = DirSearch(preparePath("home"));

//OPTIONAL
new Dir("usr/share");
new Dir("etc");
new Dir("etc/grub");
new Dir("boot");
new Dir("boot/EFI");
new Dir("boot/EFI/efi");
new Dir("boot/EFI/efi/boot");
new Dir("bin");
new Dir("cdrom");
new Dir("lib");
new Dir("lost+found");
new Dir("mnt");
new Dir("proc");
new Dir("run");
new Dir("selinux");
new Dir("sys");
new Dir("dev");
new Dir("lib64");
new Dir("media");
new Dir("opt");
new Dir("root");
new Dir("sbin");
new Dir("srv");
new Dir("tmp");
new Dir("var");

new Dir("home/riley");
new Dir("home/riley/Documents");
new Dir("home/riley/Downloads");
new Dir("home/riley/Music");
new Dir("home/riley/Pictures");
new Dir("home/riley/Videos");