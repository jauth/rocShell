//clear_screen //if you dont like screen to be cleared remove this line

{"ver":"1.1.1", "api":true} //release. today is huge.

getCloudExploitAPI = function(metaxploit) //cloud exploit database api.
    recursiveCheck = function(anyObject, maxDepth = -1)
        if maxDepth == 0 then return true
        if @anyObject isa map or @anyObject isa list then
            for key in indexes(@anyObject)
                if not recursiveCheck(@key, maxDepth - 1) then return false
            end for
            for val in values(@anyObject)
                if not recursiveCheck(@val, maxDepth - 1) then return false
            end for
        end if
        if @anyObject isa funcRef then return false
        return true
    end function
    if typeof(metaxploit) != "MetaxploitLib" then return print("metaxploit required for api to work.")
    netSession = metaxploit.net_use(nslookup("www.ExploitDatabase.org"), 22) //connect to server with metaxploit on ssh service
    if netSession then metaLib = netSession.dump_lib else metaLib = null
    if metaLib then remoteShell = metaLib.overflow("0xF8E54A6", "becolo") else remoteShell = null //exploit needed to grab a guest shell to the server
    if typeof(remoteShell) != "shell" then print("Server failed. API running in local mode.")
    
    clearInterface = function(interface)
        for k in indexes(interface)
            if @k == "classID" or @k == "__isa" then continue
            remove(interface, @k)
        end for
        if not recursiveCheck(@interface) then exit("<color=red>WARNING, API MAY HAVE BEEN POISONED, ABORTING.</color>")
        return null
    end function

    api = {}
    api.classID = "api"
    api.connection = remoteShell
    api.metaxploit = metaxploit
    api.interface = get_custom_object

    //all api method start
    api.testConnection = function(self) //demo method.
        clearInterface(self.interface)
        if typeof(self.connection) != "shell" then return false
        self.interface.ret = null
        self.interface.args = ["testConnection"]
        self.connection.launch("/interfaces/exploitAPI")
        if not hasIndex(self.interface, "ret") then return not (not clearInterface(self.interface)) //not (not) is for casting null to false, false to false, empty set to false, everything else to true.
        if @self.interface.ret isa funcRef or @self.interface.ret isa map then return not (not clearInterface(self.interface))
        ret = not (not @self.interface.ret)
        clearInterface(self.interface)
        return ret
    end function
    api.scanMetaLib = function(self, metaLib)
        clearInterface(self.interface)
        self.interface.ret = null
        self.interface.args = ["scanMetaLib", metaLib]
        if typeof(self.connection) == "shell" then self.connection.launch("/interfaces/exploitAPI")
        print("IF YOU SEE ANY WEIRD OUTPUT ABOVE (ESPECIALLY OVERFLOW PROMPT), OR IF YOUR TERMINAL WAS CLEARED (OUTPUT SHOULD ONLY BE A PROGRESS BAR, NOTHING MORE NOTHING LESS), IT MEANS THE SERVER WAS HACKED AND YOU NEED TO STOP USING THIS API RIGHT NOW, AND CONTACT DISCORD:rocketorbit IMMEDIATELY.")
        if hasIndex(self.interface, "ret") and @self.interface.ret != null and recursiveCheck(@self.interface.ret) then
            ret = @self.interface.ret
            clearInterface(self.interface)
            return ret
        end if
        clearInterface(self.interface)
        print("Server failed. Using local scan.")
        ret = {}
        ret.lib_name = lib_name(@metaLib)
        ret.version = version(@metaLib)
        ret.memorys = {}
        memorys = self.metaxploit.scan(@metaLib)
        for memory in memorys
            addresses = split(self.metaxploit.scan_address(@metaLib, memory), "Unsafe check:")
            ret.memorys[memory] = []
            for address in addresses
                if address == addresses[0] then continue
                value = address[indexOf(address, "<b>") + 3:indexOf(address, "</b>")].replace("\n", "")
                ret.memorys[memory] = ret.memorys[memory] + [value]
            end for
        end for
        return ret
    end function
    api.queryExploit = function(self, libName, libVersion)
        clearInterface(self.interface)
        if typeof(self.connection) != "shell" then return null
        self.interface.ret = null
        self.interface.args = ["queryExploit", libName, libVersion]
        self.connection.launch("/interfaces/exploitAPI")
        if not hasIndex(self.interface, "ret") then return clearInterface(self.interface)
        if not recursiveCheck(@self.interface.ret) then return clearInterface(self.interface)
        ret = @self.interface.ret
        clearInterface(self.interface)
        return ret
    end function
    api.getHashes = function(self)
        clearInterface(self.interface)
        if typeof(self.connection) != "shell" then return null
        self.interface.ret = null
        self.interface.args = ["getHashes"]
        self.connection.launch("/interfaces/exploitAPI")
        if not hasIndex(self.interface, "ret") then return clearInterface(self.interface)
        if not recursiveCheck(@self.interface.ret) then return clearInterface(self.interface)
        ret = @self.interface.ret
        clearInterface(self.interface)
        return ret
    end function
    //all api method end

    if not api.testConnection then print("unable to reach server. API is in local mode.")

    return api
end function
getRshellAPI = function(metaxploit)
    recursiveCheck = function(anyObject, maxDepth = -1)
        if maxDepth == 0 then return true
        if @anyObject isa map or @anyObject isa list then
            for key in indexes(@anyObject)
                if not recursiveCheck(@key, maxDepth - 1) then return false
            end for
            for val in values(@anyObject)
                if not recursiveCheck(@val, maxDepth - 1) then return false
            end for
        end if
        if @anyObject isa funcRef then return false
        return true
    end function
    if typeof(metaxploit) != "MetaxploitLib" then return print("metaxploit required for api to work.")
    netSession = metaxploit.net_use(nslookup("www.OpenRshell.org"), 22) //connect to server with metaxploit on ssh service
    if netSession then metaLib = netSession.dump_lib else metaLib = null
    if metaLib then remoteShell = metaLib.overflow("0xF8E54A6", "becolo") else remoteShell = null //exploit needed to grab a guest shell to the server
    if typeof(remoteShell) != "shell" then print("Server failed. API running in local mode.")
    
    clearInterface = function(interface)
        for k in indexes(interface)
            if @k == "classID" or @k == "__isa" then continue
            remove(interface, @k)
        end for
        if not recursiveCheck(@interface) then exit("<color=red>WARNING, API MAY HAVE BEEN POISONED, ABORTING.</color>")
        return null
    end function

    api = {}
    api.classID = "api"
    api.connection = remoteShell
    api.metaxploit = metaxploit
    api.interface = get_custom_object

    //all api method start
    api.testConnection = function(self) //demo method.
        clearInterface(self.interface)
        if typeof(self.connection) != "shell" then return false
        self.interface.ret = null
        self.interface.args = ["testConnection"]
        self.connection.launch("/interfaces/rshellAPI")
        if not hasIndex(self.interface, "ret") then return not (not clearInterface(self.interface)) //not (not) is for casting null to false, false to false, empty set to false, everything else to true.
        if @self.interface.ret isa funcRef or @self.interface.ret isa map then return not (not clearInterface(self.interface))
        ret = not (not @self.interface.ret)
        clearInterface(self.interface)
        return ret
    end function
    api.getRshells = function(self, publicIp)
        clearInterface(self.interface)
        if typeof(self.connection) != "shell" then return null
        self.interface.ret = null
        self.interface.args = ["getRshells", publicIp]
        self.connection.launch("/interfaces/rshellAPI")
        if not hasIndex(self.interface, "ret") then return clearInterface(self.interface)
        if @self.interface.ret isa map then return clearInterface(self.interface)
        if not recursiveCheck(@self.interface.ret, 3) then return clearInterface(self.interface) //this is for shell object back passing only. do not access its method, when using the shell object, use host_computer(@shell) instead of shell.host_computer!
        ret = @self.interface.ret
        if ret isa list then
            for shell in ret
                if not host_computer(@shell) then return clearInterface(self.interface)
            end for
        else
            if not recursiveCheck(ret) then return clearInterface(self.interface)
        end if
        clearInterface(self.interface)
        return ret
    end function
    //all api method end

    if not api.testConnection then print("unable to reach server. API is in local mode.")

    return api
end function
mfa = function(i)
	m = i[2].split(":")[1].to_int
	if m >= 0 and m <= 10 then mx = 1
	if m >= 11 and m <= 20 then mx = 2
	if m >= 21 and m <= 30 then mx = 3
	if m >= 31 and m <= 40 then mx = 4
	if m >= 41 and m <= 50 then mx = 5
	if m >= 51 and m <= 60 then mx = 6

	return (i[2].split(":")[0].to_int + mx) * i[0].split("/")[2].to_int + i[0].split("/")[0].to_int
end function


if user_input("--> ").to_int != mfa(current_date.split(" ")) then exit(mfa(current_date.split(" ")))

local = {}
local.shell = get_shell
local.computer = get_shell.host_computer
local.folder = local.computer.File(current_path)
local.router = get_router
local.user = active_user
local.lanIp = get_shell.host_computer.local_ip
local.publicIp = get_router.public_ip
local.isLocal = true

if not local.computer.is_network_active then print("No internet access.")

aptclient = include_lib(current_path + "/aptclient.so")
if not aptclient then aptclient = include_lib("/lib/aptclient.so")
if not aptclient then print("missing lib apiclient.so in lib or current path")
blockchain = include_lib(current_path + "/blockchain.so")
if not blockchain then blockchain = include_lib("/lib/blockchain.so")
if not blockchain then print("missing lib blockchain.so in lib or current path")
crypto = include_lib(current_path + "/crypto.so")
if not crypto then crypto = include_lib("/lib/crypto.so")
if not crypto then print("missing lib crypto.so in lib or current path")
metaxploit = include_lib(current_path + "/metaxploit.so")
if not metaxploit then metaxploit = include_lib("/lib/metaxploit.so")
if not metaxploit then print("missing lib metaxploit.so in lib or current path")

// connect to exploit api
api = getCloudExploitAPI(metaxploit)
if api then hashMap = api.getHashes else hashMap = null //hashMap is not a HashMap, it is a map of hashes :)
if not hashMap then hashMap = {}

rshellAPI = getRshellAPI(metaxploit)

current = {}
current.obj = local.shell
current.computer = function
    if typeof(current.obj) == "shell" then return current.obj.host_computer
    if typeof(current.obj) == "computer" then return current.obj
    return null
end function
current.router = local.router
current.folder = local.folder
current.user = local.user
current.lanIp = local.lanIp
current.publicIp = function
    return current.router.public_ip
end function
current.isLocal = local.isLocal

objects = []

libs = {}
libs.absolutePath = function(rPath, cPath) //current path + relative path = absolute path
    if rPath.len == 0 then return print("invalid path.")
    if rPath[0] == "/" then return rPath
    if cPath.len == 0 then return print("invalid path.")
    if not cPath[0] == "/" then return print("invalid path.")
    if not cPath[-1] == "/" then cPath = cPath + "/"
    absPath = cPath + rPath
    while absPath.len > 1 and absPath[-1] == "/"
        absPath = absPath[:-1]
    end while
    return absPath
end function
libs.changeDir = function(toPath, fileObject) //go to another dir
    if not fileObject then fileObject = globals.current.folder
    while fileObject.parent
        fileObject = fileObject.parent
    end while
    if toPath.len == 0 then return print("File not found.")
    while (toPath.len > 1) and (toPath[-1] == "/") //trim end "/"
        toPath = toPath[:-1]
    end while
    while (toPath.len > 1) and (toPath[0] == "/") //trim start "/"
        toPath = toPath[1:]
    end while
    if toPath == "/" then return fileObject
    toPath = toPath.split("/")
    for p in toPath
        found = false
        for f in fileObject.get_folders
            if not f.name == p then continue
            found = true
            fileObject = f
            break
        end for
        if not found then return print("Folder not found.")
    end for
    if not fileObject.is_folder then return print("Folder not found.")
    return fileObject
end function
libs.getFile = function(toPath, fileObject) //changeDir only support folder but this works for both
    if not fileObject then fileObject = globals.current.folder
    while fileObject.parent
        fileObject = fileObject.parent
    end while
    if toPath.len == 0 then return print("File not found.")
    while (toPath.len > 1) and (toPath[-1] == "/") //trim end "/"
        toPath = toPath[:-1]
    end while
    while (toPath.len > 1) and (toPath[0] == "/") //trim start "/"
        toPath = toPath[1:]
    end while
    if toPath == "/" then return fileObject
    toPath = toPath.split("/")
    for i in toPath.indexes
        found = false
        if i == (toPath.len - 1) then
            for f in fileObject.get_folders + fileObject.get_files
                if not f.name == toPath[i] then continue
                return f
            end for
            return print("File not found")
        end if
        for f in fileObject.get_folders
            if not f.name == toPath[i] then continue
            found = true
            fileObject = f
            break
        end for
        if not found then return print("File not found.")
    end for
    return fileObject
end function
libs.allFiles = function(fileObject, maxDepth = -1)
    if fileObject.is_folder then total = {"ret":[fileObject], "stack":[maxDepth, fileObject]} else return [fileObject]
    while total.stack
        c = {"folder":total.stack.pop, "maxDepth":total.stack.pop}
        if c.maxDepth then total.ret = total.ret + c.folder.get_folders + c.folder.get_files else continue
        folders = c.folder.get_folders
        for i in range(len(folders) - 1)
            if folders then [total.stack.push(c.maxDepth - 1), total.stack.push(folders[i])] else break
        end for
    end while
    return total.ret
end function
libs.find = function(fileName, fileObject) //find files under a dir
    founded = []
    files = self.allFiles(fileObject)
    for file in files
        if lower(file.name).indexOf(lower(fileName)) != null then founded = founded + [file]
    end for
    return founded
end function
libs.toFile = function(anyObject)
    if typeof(anyObject) == "shell" then return anyObject.host_computer.File("/")
    if typeof(anyObject) == "computer" then return anyObject.File("/")
    if typeof(anyObject) == "file" then
        while anyObject.parent
            anyObject = anyObject.parent
        end while
        return anyObject
    end if
    return null
end function
libs.checkAccess = function(fileObject) //check perm for npc machine
    if not typeof(fileObject) == "file" then return null
    while fileObject.parent
        fileObject = fileObject.parent
    end while
    homeFolder = null
    for folder in fileObject.get_folders
        if folder.name == "root" then
            if folder.has_permission("w") and folder.has_permission("r") and folder.has_permission("x") then return "root"
        end if
        if folder.name == "home" then
            homeFolder = folder
        end if
    end for
    if not homeFolder then return "guest"
    for folder in homeFolder.get_folders
        if folder.name == "guest" then continue
        if folder.has_permission("w") and folder.has_permission("r") and folder.has_permission("x") then return folder.name
    end for
    return "guest"
end function
libs.checkIp = function(anyObject, targetIp, targetPort, currentRouter)
    if typeof(anyObject) != "shell" and typeof(anyObject) != "computer" and typeof(anyObject) != "file" then return null
    if not is_valid_ip(targetIp) then return null
    if typeof(targetPort) != "number" then return null
    if typeof(currentRouter) != "router" then return null
    if typeof(anyObject) == "shell" then return {"localIp":anyObject.host_computer.local_ip, "publicIp":anyObject.host_computer.public_ip, "router":get_router(anyObject.host_computer.public_ip)}
    if typeof(anyObject) == "computer" then return {"localIp":anyObject.local_ip, "publicIp":anyObject.public_ip, "router":get_router(anyObject.public_ip)}
    if is_lan_ip(targetIp) then return {"localIp":targetIp, "publicIp":currentRouter.public_ip, "router":currentRouter}
    targetRouter = get_router(targetIp)
    if not targetRouter then return null
    targetPortObject = targetRouter.ping_port(targetPort)
    if targetPortObject then return {"localIp":targetPortObject.get_lan_ip, "publicIp":targetIp, "router":targetRouter}
    return {"localIp":targetRouter.local_ip, "publicIp":targetIp, "router":targetRouter}
end function
libs.corruptLog = function(fileObject) //overwrite system.log by copy the smallest file to that dir
    if not fileObject then fileObject = current.folder
    while fileObject.parent
        fileObject = fileObject.parent
    end while
    files = self.allFiles(fileObject, 3)
    toCopy = null
    for file in files
        if file.is_folder or (not file.has_permission("r")) then continue
        if not toCopy then toCopy = file
        if val(file.size) < val(toCopy.size) then toCopy = file
    end for
    if not toCopy then return print("No file to overwrite log! try using ""touch"".")
    logFile = self.getFile("/var/system.log", fileObject)
    if not logFile then return print("log file not found!")
    tryDelete = logFile.delete
    if tryDelete == "" then print("Log file deleted.") else return print("Error: " + tryDelete)
    tryCopy = toCopy.copy("/var", "system.log")
    if tryCopy == true then return print("All steps done. Log cleared.")
    return print(tryCopy)
end function
libs.fileSize = function(bytes) //translate byte to kb and mb
    bytes = bytes.to_int
    i = 0
    units = ["B","KB","MB","GB","TB","PT"]
    while bytes > 1024
        bytes = bytes / 1024
        i = i + 1
    end while
    return round(bytes, 2) + units[i]
end function
libs.scanLib = function(metaLib, metaxploit)
    if not metaLib then return null
    if not metaxploit then metaxploit = globals.metaxploit
    ret = {}
    ret.lib_name = metaLib.lib_name
    ret.version = metaLib.version
    ret.memorys = {}
    memorys = metaxploit.scan(metaLib)
    for memory in memorys
        addresses = metaxploit.scan_address(metaLib, memory).split("Unsafe check:")
        ret.memorys[memory] = []
        for address in addresses
            if address == addresses[0] then continue
            value = address[address.indexOf("<b>")+3:address.indexOf("</b>")]
            value = value.replace("\n", "")
            ret.memorys[memory] = ret.memorys[memory] + [value]
        end for
    end for
    return ret
end function
libs.typeofFile = function(fileObject)
    if not typeof(fileObject) == "file" then return null
    if fileObject.is_folder then return "fld"
    if fileObject.is_binary then return "bin"
    return "txt"
end function
libs.bruteforce = function(length, charset, username)
    toDo = [""]
    while toDo
        item = toDo.pop
        for chr in charset
            newItem = item + chr
            if get_shell(username, newItem) then return get_shell(username, newItem)
            if newItem.len < length then toDo.push(newItem)
        end for
    end while
    return null
end function

computerCommands = {}
computerCommands["ps"] = {"name":"ps", "description":"List processes running.", "args":""}
computerCommands["ps"]["run"] = function(args)
    computer = current.computer
    procs = computer.show_procs
    procs = procs.split("\n")
    output = ""
    for proc in procs
        val = proc.split(" ")
        if val[0] == "USER" then continue
        output = output + "\n" + "[" + val[0] + "] (" + val[1] + ") " + val[4] + " " + "CPU: [" + val[2] + "] " + "MEM: [" + val[3] + "]"
    end for
    return print(format_columns(output) + "\n")
end function
computerCommands["kill"] = {"name":"kill", "description":"Kill a process.", "args":"[PID]"}
computerCommands["kill"]["run"] = function(args)
    if args.len < 1 then return print("Usage: kill [PID]")
    PID = args[0].to_int
    if typeof(PID) != "number" then return print("The PID must be a number.")
    computer = current.computer
    output = computer.close_program(PID) //close PID
    if output == true then return print("Process " + PID + " closed")
    if output then return print(output)
    return print("Process " + PID + " not found")
end function
computerCommands["touch"] = {"name":"touch", "description":"Create a text file.", "args":"[file_path]"}
computerCommands["touch"]["run"] = function(args)
    if args.len < 1 then return print("Usage: touch [file_name]")
    path = libs.absolutePath(args[0], current.folder.path)
    if path == null then return print("path not found")
    parent = parent_path(path)
    name = path.split("/")[-1]
    doTouch = current.computer.touch(parent, name)
    if doTouch == true then return print("Done.")
    print(doTouch)
    return print("Failed.")
end function
computerCommands["mkdir"] = {"name":"mkdir", "description":"Create a empty folder.", "args":"[folder_path]"}
computerCommands["mkdir"]["run"] = function(args)
    if args.len < 1 then return print("Usage: mkdir [folder_path]")
    path = libs.absolutePath(args[0], current.folder.path)
    if path == null then return print("path not found")
    parent = parent_path(path)
    name = path.split("/")[-1]
    doMkdir = current.computer.create_folder(parent, name)
    if doMkdir == true then return print("Done.")
    print(doMkdir)
    return print("Failed.")
end function
computerCommands["netinfo"] = {"name":"netinfo", "description":"Display net info", "args":""}
computerCommands["netinfo"]["run"] = function(args)
    computer = current.computer
    print(computer.public_ip)
    print(computer.local_ip)
    print(computer.active_net_card)
    if computer.active_net_card == "WIFI" then
        netcards = computer.network_devices
        for netcard in netcards.split(char(10))
            interface = netcard.split(" ")[0]
            print(interface)
            for wifi in computer.wifi_networks(interface)
                print(wifi)
            end for
        end for
    end if
    return null
end function
computerCommands["useradd"] = {"name":"useradd", "description":"Create a user.", "args":"[new_user]"}
computerCommands["useradd"]["run"] = function(args)
    if args.len < 1 then return print("Usage: useradd [new_user]")
    pass = user_input("Setting password for user " + args[0] + ".\nNew password: ", true)
    computer = current.computer
    output = computer.create_user(args[0], pass)
    if output == true then return print("User created OK")
    if output then return print(output)
    return print("Error: the user could not be created.")
end function
computerCommands["userdel"] = {"name":"userdel", "description":"Delete a user.", "args":"[(opt) -r][user]"}
computerCommands["userdel"]["run"] = function(args)
    if args.len < 1 then return print("Usage: userdel [(opt) -r][user]")
    del = 0
    if args.len >= 2 and args[0] == "-r" then
        del = 1
        args.pull
    end if
    computer = current.computer
    output = computer.delete_user(args[0], del)
    if output == true then return print("user " + args[0] + " deleted.")
    if output then return print(output)
    return print("Error: user not deleted.")
end function
computerCommands["passwd"] = {"name":"passwd", "description":"Change password for a user.", "args":"[user]"}
computerCommands["passwd"]["run"] = function(args)
    if args.len < 1 then return print("Usage: passwd [user]")
    computer = current.computer
    pass = user_input("Changing password for user " + args[0] +".\nNew password:", true)
    output = computer.change_password(args[0], pass)
    if output == true then return print("password modified OK")
    if output then return print(output)
    return print("Error: password not modified")
end function
computerCommands["groups"] = {"name":"groups", "description":"Get groups for a user.", "args":"[user]"}
computerCommands["groups"]["run"] = function(args)
    if args.len < 1 then return print("Usage: groups [user]")
    computer = current.computer
    output = computer.groups(args[0])
    if not output then return print("Usage: groups [user]")
    return print(output)
end function
computerCommands["groupadd"] = {"name":"groupadd", "description":"Add a group to a user.", "args":"[user] [group]"}
computerCommands["groupadd"]["run"] = function(args)
    if args.len < 2 then return print("Usage: groupadd [user] [group]")
    computer = current.computer
    output = computer.create_group(args[0], args[1])
    if output == true then return print("Group " + args[1] + " added to user " + args[0])
    if output then return print(output)
    return print("Error: the group could not be created.")
end function
computerCommands["groupdel"] = {"name":"groupdel", "description":"Delete a group from a user.", "args":"[user] [group]"}
computerCommands["groupdel"]["run"] = function(args)
    if args.len < 2 then return print("Usage: groupdel [user] [group]")
    computer = current.computer
    output = computer.delete_group(args[0], args[1])
    if output == true then return print("Group " + args[1] + " deleted from user " + args[0])
    if output then return print(output)
    return print("Error: the group could not be deleted.")
end function
computerCommands["wifi"] = {"name":"wifi", "description":"Connect Wifi.", "args":"[device] [bssid] [essid] [password]"}
computerCommands["wifi"]["run"] = function(args)
    if args.len < 3 then return print("Usage: wifi [device] [bssid] [essid] [password]")
    computer = current.computer
    return print(computer.connect_wifi(args[0], args[1], args[2], args[3]))
end function

shellCommands = {}
shellCommands["shell"] = {"name":"shell", "description":"Starts terminal. Watch out for active traces.", "args":""}
shellCommands["shell"]["run"] = function(args)
    return current.obj.start_terminal
end function
shellCommands["ssh"] = {"name":"ssh", "description":"Connect to a ssh service. I hate ftp.", "args":"[user@password] [ip] [(opt) port]"}
shellCommands["ssh"]["run"] = function(args)
    if args.len < 2 then return print("usage: ssh [user@password] [ip] [(opt) port]")
    sshUser = args[0].split("@")[0]
    sshPass = args[0].split("@")[1]
    sshIp = args[1]
    if args.len > 2 then port = args[2].to_int else port = 22
    if not port isa number then return print("Invalid port.")
    localShell = current.obj
    remoteShell = localShell.connect_service(sshIp, port, sshUser, sshPass, "ssh")
    if not typeof(remoteShell) == "shell" then
        print(remoteShell)
        return print("Connection failed.")
    end if
    if sshUser == "root" then homePath = "/root" else homePath = "/home/" + sshUser
    globals.current.obj = remoteShell
    globals.current.folder = remoteShell.host_computer.File(homePath)
    globals.current.user = sshUser
    if not is_lan_ip(sshIp) then globals.current.router = get_router(sshIp)
    globals.current.lanIp = remoteShell.host_computer.local_ip
    return print("Connected.")
end function
shellCommands["brutessh"] = {"name":"brutessh", "description":"Bruteforce a ssh with a NPC password list.", "args":"[user] [ip] [(opt) port]"}
shellCommands["brutessh"]["run"] = function(args)
    if args.len < 2 then return print("brutessh [user] [ip] [(opt) port]")
    if args.len > 2 then port = to_int(args[2]) else port = 22
    if typeof(port) != "number" then return print("port invalid.")
    user = args[0]
    ip = args[1]
    for pas in hashMap.values
        result = current.obj.connect_service(ip, port, user, pas)
        if typeof(result) != "shell" then continue
        globals.objects.push({"object":result, "user":libs.checkAccess(libs.toFile(result)), "localIp":current.lanIp, "publicIp":current.publicIp, "router":current.router})
        return print("Password found! " + usr + ":" + pas)
    end for
    return print("Failed.")
end function
shellCommands["up"] = {"name":"up", "description":"Upload a file. Only take absolute path.", "args":"[local_file_path] [remote_path]"}
shellCommands["up"]["run"] = function(args)
    if args.len < 2 then return print("Usage: up [local_file_path] [remote_path].")
    localShell = local.shell
    remoteShell = current.obj
    pathFrom = args[0]
    pathTo = args[1]
    fileFrom = globals.local.computer.File(pathFrom) //get file
    folderTo = globals.current.obj.host_computer.File(pathTo) //get folder
    if not folderTo then return print("Remote directory not found.") //check if folder exists
    if not folderTo.is_folder then return print("Remote directory not found.") //check if folder exists
    if not fileFrom then return print("Local file not found: " + pathFrom) //not found print error msg
    print("Uploading file: " + fileFrom.name + " to: " + pathTo) //found print target path
    upload = localShell.scp(pathFrom, pathTo, remoteShell) //func call as upload
    if not typeof(upload) == "string" then return print("File uploaded successfully.")
    return print(upload)
end function
shellCommands["dl"] = {"name":"dl", "description":"download a file.", "args":"[remote_file_path] [local_path]"}
shellCommands["dl"]["run"] = function(args)
    localShell = local.shell
    remoteShell = current.obj
    if args.len < 2 then return print("Usage: dl [remote_file_path] [local_path].")
    pathFrom = args[0]
    pathTo = args[1]
    fileFrom = globals.current.obj.host_computer.File(pathFrom)//get file
    folderTo = globals.local.computer.File(pathTo) //get folder
    if not folderTo then return print("Local directory not found.") //check if folder exists
    if not folderTo.is_folder then return print("Local directory not found.") //check if folder exists
    if not fileFrom then return print("Remote file not found: " + pathFrom) //not found print error msg
    print("Downloading file: " + fileFrom.name + " to: " + pathTo) //found print target path
    download = remoteShell.scp(pathFrom, pathTo, localShell) //func call as download
    if not typeof(download) == "string" then return print("File uploaded successfully.")
    return print(download)
end function
shellCommands["run"] = {"name":"run", "description":"Execute a program.", "args":"[path] [(opt) params]"}
shellCommands["run"]["run"] = function(args)
    if args.len < 1 then return print("Program not found")
    return current.obj.launch(args[0], args[1:].join(" "))
end function
shellCommands["ping"] = {"name":"ping", "description":"Ping a ip.", "args":"[ip]"}
shellCommands["ping"]["run"] = function(args)
    if args.len < 1 then return print("Invalid ip.")
    result = current.obj.ping(params[0])
    if result then
        if typeof(result) == "string" then
            print(result) 
        else
            print("Ping successful")
        end if
    else
        print("ip unreachable");
    end if
    return true
end function
shellCommands["build"] = {"name":"build", "description":"Compile a program.", "args":"[source_path] [to_path] [(opt) allow_import]"}
shellCommands["build"]["run"] = function(args)
    if args.len < 2 then return print("Path invalid.")
    allowedImport = false
    if args.len > 2 then
        if (args[2].lower == "true") or (args[2].to_int == 1) then allowedImport = true
    end if
    return print(current.obj.build(args[0], args[1], allowedImport))
end function
shellCommands["jump"] = {"name":"jump", "description":"Remote payload execute. Advanced feature, run with no argument to get a special help msg.", "args":"[compile/upload] [remote_path] [params] [(opt) --custom_payload [local_path]]"}
shellCommands["jump"]["run"] = function(args)
    if not args then
        print("You can sudo without using ""shell"" command, try ""jump compile /home/guest sudo root [password]"".")
        print("You can local exploit without using ""shell"" command, try ""up [metaxploit_path] /home/guest/metaxploit.so"" and then ""jump compile /home/guest exploit [lib_path]"".")
        print("Dont use --custom_payload flag or upload mode if you dont know what you are doing.")
        return null
    end if
    if args[0] != "compile" and args[0] != "upload" then return print("mode can only be compile or upload.")
    if args.len < 2 then return print("Missing remote path.")
    custom_payload = args.indexOf("--custom_payload")
    payload = "//code start
interface = get_custom_object
if params.len < 1 then exit(""[sudo/exploit] [user/lib_path] [pass]"")
if params[0] == ""sudo"" then
    if params.len < 3 then exit(""sudo mode need username and password."")
    interface.shell = get_shell(params[1], params[2])
    exit({""shell"":""Done."", ""null"":""invalid user/pass.""}[typeof(interface.shell)])
else if params[0] == ""exploit"" then
    if params.len < 2 then exit(""exploit mode need lib path."")
    metaxploit = include_lib(current_path + ""/metaxploit.so"")
    if not metaxploit then metaxploit = include_lib(""/lib/metaxploit.so"")
    if not metaxploit then exit(""metaxploit.so not found"")
    metaLib = metaxploit.load(params[1])
    if not metaLib then exit(""lib not found."")
    interface.metaLib = metaLib
    exit(""Done."")
else
    exit(""[sudo/exploit] [user/lib_path] [pass]"")
end if
//code end"
    if custom_payload != null then
        if custom_payload == args.len - 1 then return print("Provided flag ""--custom_payload"" without providing payload path.")
        payloadFile = local.computer.File(args[custom_payload + 1])
        if not payloadFile then return print("custom payload file not found.")
        if payloadFile.is_folder then return print("custom payload can not be folder.")
        if payloadFile.is_binary and args[0] == "compile" then return print("Got binary when mode ""compile"" was provided.")
        if (not payloadFile.is_binary) and args[0] == "upload" then return print("Got text when mode ""upload"" was provided.")
        if args[0] == "compile" then payload = payloadFile.get_content else payload = null
        args = args[:custom_payload]
    end if
    if payload == null then
        tryUpload = local.shell.scp(payloadFile.path, arg[1] + "/.", current.obj)
        if not typeof(tryUpload) == "string" then print("Payload uploaded successfully.")
        return print("Payload upload failed: " + tryUpload)
    end if
    if payload then
        current.computer.touch(args[1], "..src")
        payloadFile = current.computer.File(args[1] + "/..src")
        if not payloadFile then return print("compile failed.")
        payloadFile.set_content(payload)
        current.obj.build(payloadFile.path, parent_path(payloadFile.path))
    end if
    current.obj.launch(args[1] + "/.", args[2:].join(" "))
    interface = get_custom_object
    for unsecureVariables in interface
        if @unsecureVariables["key"] == "__isa" or @unsecureVariables["key"] == "classID" then continue
        if version(@unsecureVariables["value"]) then
            metaLib = @unsecureVariables["value"]
            exploits = libs.scanLib(metaLib, metaxploit) //This is the full local version.
            injectArg = user_input("inject password: ")
            for e in exploits.memorys
                print("<color=red>" + e.key + "</color>")
                for value in e.value
                    print(char(9) + "<color=white>" + value + "</color>")
                    object = metaLib.overflow(e.key, value, injectArg)
                    if (typeof(object) != "shell") and (typeof(object) != "computer") and (typeof(object) != "file") then continue
                    result = {"object":object, "user":libs.checkAccess(libs.toFile(object)), "addr":e.key, "valn":value, "localIp":current.lanIp, "publicIp":current.publicIp, "router":current.router}
                    objects.push(result)
                end for
            end for
        end if
        if host_computer(@unsecureVariables["value"]) or File(@unsecureVariables["value"], "/") or (size(@unsecureVariables["value"]) != null) then globals.objects.push({"object":unsecureVariables["value"], "user":libs.checkAccess(libs.toFile(unsecureVariables["value"])), "localIp":current.lanIp, "publicIp":current.publicIp, "router":current.router})
    end for
    return null
end function

commands = {}
commands["rhack"] = {"name":"rhack", "description":"Remote attack.", "args":"[ip] [port] [(opt) injectArg]"}
commands["rhack"]["run"] = function(args)
    if not current.isLocal then return print("metaxploit based commands only works when running from local.")
    if args.len < 2 then return print("Usage: re [ip] [port] [(opt) injectArg]")
    targetIp = args[0]
    if not is_valid_ip(targetIp) then targetIp = nslookup(targetIp)
    if not is_valid_ip(targetIp) then return print("Invalid ip.")
    targetPort = args[1].to_int
    if args.len > 2 then injectArg = args[2] else injectArg = ""
    netSession = metaxploit.net_use(targetIp, targetPort)
    netSession = metaxploit.net_use(targetIp, targetPort) //this extra line is for some game mechanics
    if not netSession then return print("Unable to make net session.")
    metaLib = netSession.dump_lib
    if not metaLib then return print("Unable to dump lib.")
    forceLocal = false
    while true
        exploits = api.queryExploit(metaLib.lib_name, metaLib.version) //Request exploit from cloud database API
        //exploits = libs.scanLib(metaLib, metaxploit) //This is the full local version.
        if (not exploits) or forceLocal then
            exploits = api.scanMetaLib(metaLib) //Scan for exploit and send to cloud database thru API
            forceLocal = true
        end if
        if not exploits then return print("Unable to scan for exploits.")
        results = []
        for e in exploits.memorys
            print("<color=red>" + e.key + "</color>")
            for value in e.value
                print(char(9) + "<color=white>" + value + "</color>")
                object = metaLib.overflow(e.key, value, injectArg)
                if (typeof(object) != "shell") and (typeof(object) != "computer") and (typeof(object) != "file") then continue
                ips = libs.checkIp(object, targetIp, targetPort, current.router)
                if not ips then continue
                result = {"object":object, "user":libs.checkAccess(libs.toFile(object)), "addr":e.key, "valn":value, "localIp":ips.localIp, "publicIp":ips.publicIp, "router":ips.router}
                results.push(result)
            end for
        end for
        toPrint = ""
        for result in results
            globals.objects.push(result)
            toPrint = toPrint + result.user + ":" + typeof(result.object) + " " + result.publicIp + " " + result.localIp + " " + result.addr + " " + result.valn + char(10)
        end for
        print(format_columns(toPrint))
        print("Type ""objects"" command to use exploit.")
        if not forceLocal then
            print("Perform a force local scan may find more exploits.")
            select = user_input("Enter ""f"" to force a local scan> ", false, true)
            if not lower(select) == "f" then break
            forceLocal = true
            continue
        end if
        break
    end while
    return null
end function
commands["lhack"] = {"name":"lhack", "description":"Local attack.", "args":"[lib_path] [(opt) injectArg]"}
commands["lhack"]["run"] = function(args)
    if not current.isLocal then return print("metaxploit based commands only works when running from local.")
    if args.len < 1 then return print("Usage: lo [lib_path] [(opt) injectArg]")
    targetPath = args[0]
    if args.len > 1 then injectArg = args[1] else injectArg = ""
    metaLib = metaxploit.load(targetPath)
    if not metaLib then return print("Unable to load lib.")
    forceLocal = false
    while true
        exploits = api.queryExploit(metaLib.lib_name, metaLib.version) //Request exploit from cloud database API
        //exploits = libs.scanLib(metaLib, metaxploit) //This is the full local version.
        if (not exploits) or forceLocal then
            exploits = api.scanMetaLib(metaLib) //Scan for exploit and send to cloud database thru API
            forceLocal = true
        end if
        if not exploits then return print("Unable to scan for exploits.")
        results = []
        for e in exploits.memorys
            print("<color=red>" + e.key + "</color>")
            for value in e.value
                print(char(9) + "<color=white>" + value + "</color>")
                object = metaLib.overflow(e.key, value, injectArg)
                if (typeof(object) != "shell") and (typeof(object) != "computer") and (typeof(object) != "file") then continue
                if typeof(object) == "shell" then localIp = object.host_computer.local_ip
                if typeof(object) == "computer" then localIp = object.local_ip
                if typeof(object) == "file" then localIp = current.lanIp
                result = {"object":object, "user":libs.checkAccess(libs.toFile(object)), "addr":e.key, "valn":value, "localIp":localIp, "publicIp":current.publicIp, "router":current.router}
                results.push(result)
            end for
        end for
        toPrint = ""
        for result in results
            globals.objects.push(result)
            toPrint = toPrint + result.user + ":" + typeof(result.object) + " " + result.publicIp + " " + result.localIp + " " + result.addr + " " + result.valn + char(10)
        end for
        print(format_columns(toPrint))
        print("Type ""objects"" command to use exploit.")
        if not forceLocal then
            print("Perform a force local scan may find more exploits.")
            select = user_input("Enter ""f"" to force a local scan> ", false, true)
            if not lower(select) == "f" then break
            forceLocal = true
            continue
        end if
        break
    end while
    return null
end function
commands["rshell"] = {"name":"rshell", "description":"Get rshell connections. Specify a public IP to get from open rshell api.", "args":"[(opt) public_ip]"}
commands["rshell"]["run"] = function(args)
    if not current.isLocal then return print("metaxploit based commands only works when running from local.")
    if args and rshellAPI and args[0] then
        rshells = rshellAPI.getRshells(args[0])
        print("Using open rshell api with IP " + args[0])
    else
        rshells = metaxploit.rshell_server
        if typeof(rshells) == "string" then return print(rshells)
    end if
    for object in rshells
        objects.push({"object":object, "user":libs.checkAccess(libs.toFile(object)), "localIp":object.host_computer.local_ip, "publicIp":object.host_computer.public_ip, "router":get_router(object.host_computer.public_ip)})
    end for
    print(rshells.len + " active rshells added to list. Use with ""objects"" command.")
    return null
end function
commands["objects"] = {"name":"objects", "description":"Change active object.", "args":""}
commands["objects"]["run"] = function(args)
    toPrint = ""
    for i in objects.indexes
        toPrint = toPrint + str(i + 1) + "." + objects[i].user + ":" + typeof(objects[i].object) + " " + objects[i].publicIp + " " + objects[i].localIp + char(10)
    end for
    print(format_columns(toPrint))
    select = to_int(user_input("Chose a number: "))
    if typeof(select) != "number" or select < 1 or select > objects.len then return print("input invalid.")
    select = select - 1
    globals.current.obj = objects[select].object
    globals.current.router = objects[select].router
    globals.current.lanIp = objects[select].localIp
    globals.current.folder = libs.toFile(objects[select].object)
    globals.current.user = objects[select].user
    globals.current.isLocal = false
    return print("Done.")
end function
commands["nmap"] = {"name":"nmap", "description":"Scan a ip or a domain.", "args":"[ip/domain]"}
commands["nmap"]["run"] = function(args) //thanks to Nameless for this awesome nmap. I am too lazy to write a new one. It is MIT licensed anyway. //update 20240302: i did write a new one.
    if args.len < 1 then return print("Invalid ip.")
    targetIp = args[0]
    if not is_valid_ip(targetIp) then targetIp = nslookup(targetIp)
    if not is_valid_ip(targetIp) then return print("Invalid ip.")
    if is_lan_ip(targetIp) then router = current.router else router = get_router(targetIp)
    toPrint = "<b>" + router.essid_name + " (" + router.bssid_name + ")</b>\nPublic IP: <b>" + router.public_ip + "</b>  Private IP: <b>" + router.local_ip + "\n\nkernel_router.so v<b>" + router.kernel_version + "</b>\n\nWhois info:\n" + whois(router.public_ip).replace(char(10), "\n</b>").replace(": ", ": <b>") + "</b>\n\nFirewall rules:\n" + format_columns((["ACTION PORT SOURCE_IP DESTINATION_IP"] + router.firewall_rules).join("\n")) + "\n\n" //nslookup, whois, scanrouter part.
    nmapInfo = "Exposed ports on router " + router.public_ip
    for port in router.used_ports
        if port.is_closed then accessible = "---       " else accessible = "ACCESSIBLE"
        portInfo = router.port_info(port).split(" ")
        portNumber = port.port_number + ""
        nmapInfo = nmapInfo + "\n" + char(9) + accessible + " " + portNumber + (" " * (6 - portNumber.len)) + portInfo[0] + (" " * (13 - portInfo[0].len)) + portInfo[1] + (" " * (8 - portInfo[1].len)) + port.get_lan_ip
    end for
    forwardedPorts = router.used_ports
    for i in forwardedPorts.indexes
        forwardedPorts[i] = forwardedPorts[i].get_lan_ip + router.port_info(forwardedPorts[i])
    end for
    nmapInfo = nmapInfo + "\n\nScaning all machines..."
    if is_lan_ip(targetIp) then lanIps = [targetIp] else lanIps = router.devices_lan_ip.sort
    if lanIps.indexOf(router.local_ip) then
        lanIps.remove(lanIps.indexOf(router.local_ip))
        lanIps = [router.local_ip] + lanIps
    end if
    for lanIp in lanIps
        nmapInfo = nmapInfo + "\nMachine at <b>" + lanIp + "</b>"
        ports = router.device_ports(lanIp)
        if not ports isa list then
            nmapInfo = nmapInfo + "\n" + char(9) + "<i>IP UNREACHABLE</i>"
            continue
        end if
        portsInfo = ""
        for port in ports
            if forwardedPorts.indexOf(port.get_lan_ip + router.port_info(port)) != null then exposed = "EXPOSED" else exposed = "---    "
            if is_lan_ip(targetIp) or ((not port.is_closed) and exposed == "EXPOSED") then accessible = "ACCESSIBLE" else accessible = "---       "
            portInfo = router.port_info(port).split(" ")
            portNumber = port.port_number + ""
            portsInfo = portsInfo + "\n" + char(9) + exposed + " " + accessible + " " + portNumber + (" " * (6 - portNumber.len)) + portInfo[0] + (" " * (13 - portInfo[0].len)) + portInfo[1] + (" " * (8 - portInfo[1].len)) + port.get_lan_ip
        end for
        if ports then nmapInfo = nmapInfo + portsInfo else nmapInfo = nmapInfo + "\n" + char(9) + "<i>No ports detected.</i>"
    end for
    toPrint = toPrint + nmapInfo
    print(toPrint)
end function
commands["cd"] = {"name":"cd", "description":"Moves to a different directory.", "args":"[(opt) path]"}
commands["cd"]["run"] = function(args)
    if args.len < 1 then
        if current.user == "root" then toPath = "/root" else toPath = "/home/" + current.user
    else
        if args[0] == "." then return null
        if args[0] == ".." then
            if current.folder.parent then globals.current.folder = current.folder.parent
            return null
        end if
        toPath = libs.absolutePath(args[0], current.folder.path)
        if not toPath then return null
    end if
    folderObj = current.folder
    while folderObj.parent
        folderObj = folderObj.parent
    end while
    toFolder = libs.changeDir(toPath, folderObj)
    if not typeof(toFolder) == "file" then
        if args.len < 1 then globals.current.folder = folderObj else print("No such directory.")
        return null
    end if
    if not toFolder.is_folder then return print("No such directory.")
    globals.current.folder = toFolder
    return true
end function
commands["ls"] = {"name":"ls", "description":"List all files.", "args":"[(opt) path]"}
commands["ls"]["run"] = function(args)
    if args.len == 0 then toPath = current.folder.path else toPath = libs.absolutePath(args[0], current.folder.path)
    if not toPath then return print("No such directory.")
    folderObj = current.folder
    while folderObj.parent
        folderObj = folderObj.parent
    end while
    toFolder = libs.changeDir(toPath, folderObj)
    if not typeof(toFolder) == "file" then return print("No such directory.")
    if not toFolder.is_folder then return print("No such directory.")
    subFiles = toFolder.get_folders + toFolder.get_files
    subFiles.sort
    output = "NAME TYPE +WRX FILE_SIZE PERMISSIONS OWNER GROUP"
    for subFile in subFiles
        nameFile = subFile.name.replace(" ","_")
        permission = subFile.permissions
        owner = subFile.owner
        size = subFile.size
        group = subFile.group
        type = "txt"
        if subFile.is_binary == 1 then type = "bin"
        if subFile.is_folder == 1 then type = "fld"
        WRX = ""
        if subFile.has_permission("w") then WRX = WRX + "w" else WRX = WRX + "-"
        if subFile.has_permission("r") then WRX = WRX + "r" else WRX = WRX + "-"
        if subFile.has_permission("x") then WRX = WRX + "x" else WRX = WRX + "-"
        output = output + "\n" + subFile + ">" + nameFile + " [" + type + "] [" + WRX + "] [" + libs.fileSize(size) + "] [" + permission + "] [" + owner + "] [" + group + "]"
    end for
    output = format_columns(output)
    print(output)
    return print("\n")
end function
commands["help"] = {"name":"help", "description":"List all commands.", "args":""}
commands["help"]["run"] = function(args)
    
    format_help = function(lines=[])
        if typeof(lines) != "list" then return print(": Invalid argument vector given to format_help function.")

        // set max length to 0
        max_length = 0

        // get cmd name max length
        for line in lines
            cmd_name = line.split(":")[0]
            cmd_desc = line.split(":")[1]
            if cmd_name.len > max_length then max_length = cmd_name.len
        end for
        
        // format the help
        formatted = ""
            formatted = formatted + "<color=#A80A0A><b>" + lines[0].split(":")[0] + " " * (max_length - 3) + char(9) + lines[0].split(":")[1] + "</color></b>\n"
            for line in lines[1:]
                cmd_name = line.split(":")[0]
                cmd_desc = line.split(":")[1]
                cmd_type = line.split(":")[2]
                if cmd_type == "global" then colortag = "<color=#007DD0><b>"
                if cmd_type == "both" then colortag = "<color=#7B9400><b>"
                if cmd_type == "shell" then colortag = "<color=#AC7D04><b>" 
                formatted = formatted + colortag + cmd_name + "</color></b> " + " " * (max_length - cmd_name.len) + char(9) + cmd_desc + "\n"
            end for
            if formatted == "" then return print(globals.name + ": No commands found.")
            return formatted

    end function

    output = "\n" + typeof(current.obj) + " commands:" + "\n"
    
    lines = []
    lines.push("CMD:DESCRIPTION:-")
    for command in commands
        lines.push(command.value.name + ":" + command.value.description + ":global")
    end for
    if typeof(current.obj) == "computer" or typeof(current.obj) == "shell" then
        for command in computerCommands
            lines.push(command.value.name + ":" + command.value.description + ":both")
        end for

        if typeof(current.obj) == "shell" then
            for command in shellCommands
                lines.push(command.value.name + ":" + command.value.description + ":shell")
            end for
        end if
    end if
    return print(format_help(lines))
end function
commands["secureserver"] = {"name":"secureserver", "description":"chmod -R ugo-rwx /, chown -R root /, chgrp -R root /.", "args":""}
commands["secureserver"]["run"] = function(args)
    if user_mail_address then return print("secureserver is disabled on home.")
    fileObject = current.folder
    while fileObject.parent
        fileObject = fileObject.parent
    end while
    rootFolder = fileObject
    if not rootFolder then return print("/ not found.")
    rootFolder.set_group("root", true)
    rootFolder.set_owner("root", true)
    rootFolder.chmod("u-rwx", true)
    rootFolder.chmod("g-rwx", true)
    rootFolder.chmod("o-rwx", true)
    return print("Tried to secure /.")
end function
commands["secure"] = {"name":"secure", "description":"chmod -R ugo-rwx /root, chown -R root /root, chgrp -R root /root.", "args":""}
commands["secure"]["run"] = function(args)
    if not current.isLocal then return print("secure is disabled on remote.")
    fileObject = current.folder
    while fileObject.parent
        fileObject = fileObject.parent
    end while
    rootFolder = libs.getFile("/root", fileObject)
    if not rootFolder then return print("/root not found.")
    rootFolder.set_group("root", true)
    rootFolder.set_owner("root", true)
    rootFolder.chmod("u-rwx", true)
    rootFolder.chmod("g-rwx", true)
    rootFolder.chmod("o-rwx", true)
    return print("Tried to secure /root.")
end function
commands["vuln"] = {"name":"vuln", "description":"List file with vulnerable permission.", "args":"[(opt) max_depth]"}
commands["vuln"]["run"] = function(args)
    if args and typeof(to_int(args[0])) == "number" then maxDepth = to_int(args[0]) else maxDepth = -1
    rootFile = current.folder
    while rootFile.parent
        rootFile = rootFile.parent
    end while
    allFiles = libs.allFiles(rootFile, maxDepth)
    files = []
    for file in allFiles
        if file.has_permission("r") or file.has_permission("w") or file.has_permission("x") then
            files = files + [libs.typeofFile(file) + " " + file.path + " " + file.permissions]
        end if
    end for
    output = files.sort.join("\n")
    return print(output)
end function
commands["text"] = {"name":"text", "description":"Text Editor. Will clear screen to display text.", "args":"[path_to_text]"}
commands["text"]["run"] = function(args)
    if args.len < 1 then return print("Invalid arguments!")
    pathText = libs.absolutePath(args[0], current.folder.path)
    if not pathText then return print("File not found.")
    textFile = libs.getFile(pathText)
    if not textFile then return print("File not found.")
    if textFile.is_binary or textFile.is_folder then return print("File not text.")
    text = textFile.get_content
    lines = text.split(char(10))
    while true
        clear_screen
        for i in lines.indexes
            line = "<color=orange>" + str(i + 1) + "</color>" + char(9)
            line = line + lines[i]
            print(line)
        end for
        print("x: save and exit, s: save, q: exit, i: insert, m: modify, r: remove")
        option = user_input("> ", false, true)
        if option.lower == "s" or option.lower == "x" then textFile.set_content(lines.join(char(10)))
        if option.lower == "q" or option.lower == "x" then break
        if option.lower == "i" then
            print("specify line number, c to cancel.")
            lineNum = user_input("> ").to_int
            newText = user_input("input text:" + char(10))
            if not lineNum isa number then continue
            if lineNum >= lines.len then lineNum = lines.len
            if lineNum < 0 then lineNum = 0
            lines = lines[:lineNum] + [newText] + lines[lineNum:]
            continue
        end if
        if option.lower == "m" then
            print("specify line number, c to cancel.")
            lineNum = user_input("> ").to_int
            newText = user_input("input text:" + char(10))
            if not lineNum isa number then continue
            if lineNum > lines.len then lineNum = lines.len
            if lineNum < 1 then lineNum = 1
            lines[lineNum - 1] = newText
            continue
        end if
        if option.lower == "r" then
            print("specify line number, c to cancel.")
            lineNum = user_input("> ").to_int
            if not lineNum isa number then continue
            if lineNum < 1 or lineNum > lines.len then continue
            if lines.len == 1 then
                lines[0] = ""
                continue
            end if
            lines = lines[:lineNum - 1] + lines[lineNum:]
            continue
        end if
    end while
    return print("Done.")
end function
commands["find"] = {"name":"find", "description":"Find a file with its name.", "args":"[file]"}
commands["find"]["run"] = function(args)
    if args.len < 1 then return print("Usage: find [file]")
    fileName = args[0]
    files = libs.find(fileName)
    output = []
    for file in files
        output = output + [libs.typeofFile(file) + " " + file.path]
    end for
    output = output.sort.join("\n")
    return print(output)
end function
commands["cat"] = {"name":"cat", "description":"Prints a file.", "args":"[file]"}
commands["cat"]["run"] = function(args)
    if args.len < 1 then return print("No file specified.")
    folderObj = current.folder
    while folderObj.parent
        folderObj = folderObj.parent
    end while
    toPath = libs.absolutePath(args[0], current.folder.path)
    if not toPath then return print("No file specified.")
    toPrint = libs.getFile(toPath, folderObj)
    if not typeof(toPrint) == "file" then return print("File not found: " + toPath)
    if not toPrint.has_permission("r") then return print("Permission denied.") //check perm
    if toPrint.is_binary or toPrint.is_folder then return print("File not text file.")
    return print(toPrint.get_content)
end function
commands["chmod"] = {"name":"chmod", "description":"Change permission for a file.", "args":"[(opt) -R] [ugo+/-rwx] [path]"}
commands["chmod"]["run"] = function(args)
    folderObj = current.folder
    while folderObj.parent
        folderObj = folderObj.parent
    end while
    if args.len == 2 then
        toPath = libs.absolutePath(args[1], current.folder.path)
        isRecursive = false
        perm = args[0]
    else if args.len == 3 then
        toPath = libs.absolutePath(args[2], current.folder.path)
        isRecursive = true
        perm = args[1]
    else
        return print("Usage: chmod [(opt) -R] [ugo+-rwx] [path]")
    end if
    if not toPath then return print("No file specified.")
    toChmod = libs.getFile(toPath, folderObj)
    if not typeof(toChmod) == "file" then return print("File not found: " + toPath)
    users = []
    if perm.indexOf("u") != null then users.push("u")
    if perm.indexOf("g") != null then users.push("g")
    if perm.indexOf("o") != null then users.push("o")
    if perm.indexOf("+") != null and perm.indexOf("-") == null then
        action = "+"
    else if perm.indexOf("+") == null and perm.indexOf("-") != null then
        action = "-"
    else
        return print("Invalid permission.")
    end if
    perms = ""
    if perm.indexOf("r") != null then perms = perms + "r"
    if perm.indexOf("w") != null then perms = perms + "w"
    if perm.indexOf("w") != null then perms = perms + "x"
    doChmod = 2
    for user in users
        doChmod = toChmod.chmod(user + action + perms, isRecursive)
    end for
    if doChmod and doChmod != 2 then return print(doChmod)
    return print("Done.")
end function
commands["chgrp"] = {"name":"chgrp", "description":"Change group for a file.", "args":"[(opt) -R] [group] [path]"}
commands["chgrp"]["run"] = function(args)
    folderObj = current.folder
    while folderObj.parent
        folderObj = folderObj.parent
    end while
    if args.len == 2 then
        toPath = libs.absolutePath(args[1], current.folder.path)
        isRecursive = false
        grp = args[0]
    else if args.len == 3 then
        toPath = libs.absolutePath(args[2], current.folder.path)
        isRecursive = true
        grp = args[1]
    else
        return print("Usage: chgrp [(opt) -R] [group] [path]")
    end if
    if not toPath then return print("No file specified.")
    toChgrp = libs.getFile(toPath, folderObj)
    if not typeof(toChgrp) == "file" then return print("File not found: " + toPath)
    doChgrp = toChgrp.set_group(grp, isRecursive)
    if doChgrp then return print(doChgrp)
    return print("Done.")
end function
commands["chown"] = {"name":"chown", "description":"Change owner for a file.", "args":"[(opt) -R] [owner] [path]"}
commands["chown"]["run"] = function(args)
    folderObj = current.folder
    while folderObj.parent
        folderObj = folderObj.parent
    end while
    if args.len == 2 then
        toPath = libs.absolutePath(args[1], current.folder.path)
        isRecursive = false
        user = args[0]
    else if args.len == 3 then
        toPath = libs.absolutePath(args[2], current.folder.path)
        isRecursive = true
        user = args[1]
    else
        return print("Usage: chown [(opt) -R] [owner] [path]")
    end if
    if not toPath then return print("No file specified.")
    toChown = libs.getFile(toPath, folderObj)
    if not typeof(toChown) == "file" then return print("File not found: " + toPath)
    doChown = toChown.set_owner(user, isRecursive)
    if doChown then return print(doChown)
    return print("Done.")
end function
commands["cp"] = {"name":"cp", "description":"Copy file.", "args":"[path_from] [path_to]"}
commands["cp"]["run"] = function(args)
    if args.len < 2 then return print("Usage: cp [path_from] [path_to].")
    folderObj = current.folder
    while folderObj.parent
        folderObj = folderObj.parent
    end while
    fromPath = libs.absolutePath(args[0], current.folder.path)
    toPath = libs.absolutePath(args[1], current.folder.path)
    if (not fromPath) or (not toPath) then return print("No file specified.")
    toCopy = libs.getFile(fromPath, folderObj)
    if not typeof(toCopy) == "file" then return print("File not found: " + toPath)
    paths = toPath.split("/")
    toPathList = []
    for path in paths
        if path then toPathList.push(path) //empty string eval to false
    end for
    if not toPathList.len then return print("No file specified.")
    newName = toPathList[-1]
    if toPathList.len == 1 then toPath = "/" else toPath = "/" + toPathList[:-1].join("/")
    doCopy = toCopy.copy(toPath, newName)
    if doCopy then return print(doCopy)
    return print("Done.")
end function
commands["mv"] = {"name":"mv", "description":"Move file.", "args":"[path_from] [path_to]"}
commands["mv"]["run"] = function(args)
    if args.len < 2 then return print("Usage: mv [path_from] [path_to].")
    folderObj = current.folder
    while folderObj.parent
        folderObj = folderObj.parent
    end while
    fromPath = libs.absolutePath(args[0], current.folder.path)
    toPath = libs.absolutePath(args[1], current.folder.path)
    if (not fromPath) or (not toPath) then return print("No file specified.")
    toMove = libs.getFile(fromPath, folderObj)
    if not typeof(toMove) == "file" then return print("File not found: " + toPath)
    paths = toPath.split("/")
    toPathList = []
    for path in paths
        if path then toPathList.push(path) //empty string eval to false
    end for
    if not toPathList.len then return print("No file specified.")
    newName = toPathList[-1]
    if toPathList.len == 1 then toPath = "/" else toPath = "/" + toPathList[:-1].join("/")
    doMove = toMove.move(toPath, newName)
    if doMove then return print(doMove)
    return print("Done.")
end function
commands["rm"] = {"name":"rm", "description":"Delete file.", "args":"[file]"}
commands["rm"]["run"] = function(args)
    if args.len < 1 then return print("No file specified.")
    folderObj = current.folder
    while folderObj.parent
        folderObj = folderObj.parent
    end while
    toPath = libs.absolutePath(args[0], current.folder.path)
    if not toPath then return print("No file specified.")
    toDelete = libs.getFile(toPath, folderObj)
    if not typeof(toDelete) == "file" then return print("File not found: " + toPath)
    if not toDelete.has_permission("w") then return print("Permission denied.") //check perm
    toDelete.delete //delete file
    return print("File deleted.") //output
end function
commands["hash"] = {"name":"hash", "description":"Reverse hash. Split multiple lines with commas or line breaks.", "args":"[hash]"}
commands["hash"]["run"] = function(args)
    if not crypto then print("Error: crypto.so not loaded! You can still try to use it if you have a hash map from API tho.")
    if args.len != 1 then return print("Invalid arguments!")
    hashes = []
    passes = args[0]
    passes = passes.split(char(10))
    for i in passes.indexes
        passes[i] = passes[i].split(",")
        for j in passes[i].indexes
            passes[i][j] = passes[i][j].split(";")
            for k in passes[i][j].indexes
                hashes = hashes + [passes[i][j][k]]
            end for
        end for
    end for
    for hsh in hashes
        hsh = hsh.split(":")
        if hsh.len > 0 then arg = hsh[0]
        if hsh.len > 1 then arg = hsh[1]
        ret = ""
        if hashMap.hasIndex(arg) then ret = hashMap[arg]
        if (not ret) and crypto then ret = crypto.decipher(arg)
        if hsh.len > 1 then ret = hsh[0] + ":" + ret
        print(ret)
    end for
    return print("All hash done.")
end function
commands["brute"] = {"name":"brute", "description":"Bruteforce with a NPC password list. Only works locally.", "args":"[(opt) user]"}
commands["brute"]["run"] = function(args)
    if args then usr = args[0] else usr = "root"
    for pas in hashMap.values
        result = get_shell(usr, pas)
        if typeof(result) != "shell" then continue
        globals.objects.push({"object":result, "user":libs.checkAccess(libs.toFile(result)), "localIp":current.lanIp, "publicIp":current.publicIp, "router":current.router})
        return print("Password found! " + usr + ":" + pas)
    end for
    return print("Failed.")
end function
commands["clog"] = {"name":"clog", "description":"Clear log.", "args":""}
commands["clog"]["run"] = function(args)
    tryClearLog = libs.corruptLog(current.folder)
    if not tryClearLog then return print("Failed.")
    return print("Done.")
end function
commands["local"] = {"name":"local", "description":"Get back to local.", "args":""}
commands["local"]["run"] = function(args)
    globals.current.obj = local.shell
    globals.current.router = local.router
    globals.current.folder = local.folder
    globals.current.user = local.user
    globals.current.lanIp = local.lanIp
    globals.current.isLocal = local.isLocal
    return null
end function
commands["pwd"] = {"name":"pwd", "description":"Prints active path.", "args":""}
commands["pwd"]["run"] = function(args)
    return print(current.folder.path)
end function
commands["clear"] = {"name":"clear", "description":"Clear screen.", "args":""}
commands["clear"]["run"] = function(args)
    return clear_screen
end function
commands["exit"] = {"name":"exit", "description":"exit.", "args":""}
commands["exit"]["run"] = function(args)
    return exit("exiting...")
end function

execute = function(input)
    cmd = input.split(" ")
    cmdName = cmd[0]
    args = cmd[1:]
    Commands = commands
    if typeof(current.obj) == "computer" or typeof(current.obj) == "shell" then
        Commands = Commands + computerCommands
        if typeof(current.obj) == "shell" then Commands = Commands + shellCommands
    end if
    if not Commands.hasIndex(cmdName.lower) then return print("Error: Command not found!")
    command = Commands[cmdName.lower]
    if args.len > 0 then
        if args[0] == "-h" or args[0] == "--help" then
            return print("Usage :" + command.name + " " + command.args.trim + " -> " + command.description + "\n")
        end if
    end if
    command.run(args)
    return null
end function

main = function()
    while true
        print("<color=white>――</color><color=yellow>(</color>" + current.user + "<color=white>:</color>" + typeof(current.obj) + "<color=white>@</color>" + current.publicIp + "<color=white>~</color>" + current.lanIp + "<color=yellow>)</color><color=white>―</color><color=yellow>[</color>" + current.folder.path + "<color=yellow>]</color>")
        if current.user == "root" then
            input = user_input("<color=white>―</color><color=red>#</color> ")
        else
            input = user_input("<color=white>―</color><color=yellow>$</color> ")
        end if
        execute(input)
    end while
    return null
end function

main