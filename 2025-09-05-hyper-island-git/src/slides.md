---
theme: apple-basic
lineNumbers: true

layout: intro
---

# Intro to Git and Github

Hyper Island - FED27

<div class="absolute bottom-10">
  <span class="font-700">
    Per Enström – 2025-09-05
  </span>
</div>

---
layout: two-cols-header
---

# Agenda

::left:: 

* Who am I?
* Terminal / Command prompt / Powershell
  * ***Exercise: Installing Git***
  * ***Exercise: Terminal***
* Git & github
* Git 1 - Basics
  * ***Exercise: Git 1 - Init and committing***
* Git 2 - Branches and merging
  * ***Exercise: Git 2 - Branching and merging***
* Git 3 - Rebasing
  * ***Exercise: Git 3 - Rebasing***

::right::

* Git 4 - Conflict management
  * ***Exercise: Git 4 - Conflict management***
* Git 5 - Remotes etc.
* Github 1 - Basics
  * ***Exercise: Github 1 - Creating your profile***
* Github 2 - Github Pages and more
  * ***Exercise: Github 2 - Adding your personal website to github***
* Git GUI clients
* Browser debugging

---

# Who am I?

Frontend developer

* Cancerfonden
* Volvo Cars
* Swish
* Important Looking Pirates VFX

---

# Terminal

* Used to navigate and control your computer via text
* Mac: Terminal
* Windows: Command Prompt, Powershell (or third party programs)
* Always has a context of the folder it's running in

---

# Terminal

## Paths

_How to know where you are, and where to go_

Paths are defined in a similar way as a web page, an address separated by slashes

`/Users/perenstrom/desktop` <ri-apple-fill />, or `C:\Users\perenstrom` <ri-windows-fill />

---

# Terminal

## Paths

### Absolute path

* Starts at your hard drive
* Begins with `/` <ri-apple-fill /> or `C:\` <ri-windows-fill />
* `/Users/perenstrom/desktop` will always mean the `desktop` folder inside your user folder, no matter where you are

### Relative path

* Starts at your current position
* If you're in your user folder, `desktop/images` means the folder named `images` inside the folder named `desktop` inside your user folder
* If you're in a folder called `myfolder`, `desktop/images` means the folder named `images` inside the folder named `desktop` inside the folder `myfolder`

---

# Terminal

## Paths

### Special folder names

* `.` (period) means the current folder, so `./desktop/images` is the same as `desktop/images`
  * sometimes needed to explicitly specify
* `..` means the parent folder, so if you're in your user folder `..` means the `Users` folder
  * If you're in your desktop folder `../downloads` means the `downloads` folder inside your user folder (one step up, and then into Downloads)

---

# Terminal

## Navigating, creating folders, and listing content

* To move around in your terminal, you use the `cd` command
  * If you're in your user folder, `cd desktop` means to enter the desktop folder
  * Likewise, using absolute paths, `cd /Users/perenstrom/desktop`

> If you wonder where you are, just type `pwd` and the terminal will print the current folder

<div class="p-2" />

* To list the contents of the folder you're in, use `ls` <ri-apple-fill /> or `dir` <ri-windows-fill />
  * Some commands have options, or flags, a dash and a letter, to change the behavior
  * For example, the `ls` command has a flag `-l` to give a more detailed list of the folder contents
  * To use this, type the command `ls -l` instead

---

# Terminal

## Navigating, creating folders, and listing content

* To create a folder inside the current folder, use the command `mkdir`
  * This command (and many others) take an input, written after the command. In this case the name of the folder to create
  * To create a folder called `my-folder`, type `mkdir my-folder`

---

# Terminal

## Good to know

* Use <kbd>tab</kbd> to autocomplete commands and folders
  * If you start to type `cd /Users/per` and press <kbd>tab</kbd> the terminal will autocomplete to `cd /Users/perenstrom/`
* Use <kbd>up arrow</kbd> to step back through your history of commands, which can be handy if you don't want to type a command again and recently used it

---
layout: section
---

# Exercise - Installing Git
# Exercise - Terminal

---