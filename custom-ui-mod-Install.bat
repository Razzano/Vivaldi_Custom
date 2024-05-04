@set installhooks_args=%*& set installhooks_self=%~f0& powershell -c "(gc \"%~f0\") -replace '@set installhooks_args.*','#' | Write-Host" | powershell -c -& goto :eof
$srcdir = split-path $env:installhooks_self
$vivpath1 = "$env:localappdata\Vivaldi\Application\"
$vivpath2 = "C:\Program Files\Vivaldi\Application\"
# If Vivaldi\Application install path differs from one of the above, enter path in-between the quotation marks for $vivpath3 below
$vivpath3 = "Your Vivaldi\Application install path here"

if (Test-Path $vivpath1) { 
  $installpath = $vivpath1
} elseif (Test-Path $vivpath2) {
  $installpath = $vivpath2
} elseif (Test-Path $vivpath3) {
  $installpath = $vivpath3
} else {
  write-host "Vivaldi\Application install path not listed"
  write-host "Edit this bat file on line 6 to your Vivaldi\Application install path"
  write-host -NoNewLine "Press any key to exit..."
  $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
  exit
}

$dstdir = split-path ((Get-ChildItem -path $installpath -recurse window.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
write-host $dstdir
write-host $srcdir

# Create Vivaldi UI Mod shortcut lnk on Desktop
$string = "$srcdir.lnk" -ireplace "^.*:\\", ""
$shell1 = New-Object -comObject WScript.Shell
$Lnk1 = "$Home\OneDrive\Desktop\$string"
$shortcut1 = $shell1.CreateShortcut($Lnk1)
if (!(Test-Path $Lnk1)) {
  write-host “Shortcut created: $Lnk1”
  New-Item -ItemType File -Path $Lnk1
  $shortcut1.TargetPath = $srcdir
  $shortcut1.Save()
}

# Create vivaldi folder shortcut lnk on Desktop
$shell2 = New-Object -comObject WScript.Shell
$Lnk2 = "$Home\OneDrive\Desktop\vivaldi folder.lnk"
$shortcut2 = $shell2.CreateShortcut($Lnk2)
if (!(Test-Path $Lnk2)) { 
  New-Item -ItemType File -Path $Lnk2
  write-host “Shortcut created: $Lnk2”
  $shortcut2.TargetPath = $dstdir
  $shortcut2.Save()
}

# Exit script if Custom UI Mod is already installed to prevent any conflicts
if (Test-Path $dstdir\custom-ui-mod.js) {
  write-host "Custom UI Mod is already installed"
  write-host -NoNewLine "Press any key to exit..."
  $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
  exit
}

write-host "Source Directory: $srcdir"
write-host "Destination Directory: $dstdir"

write-host "Creating window.html file in Source Directory if not exist"
$File1 = "$srcdir\window.html"
if (!(Test-Path $File1)) { 
  New-Item -ItemType File -Path $File1
  write-host “File created: $File1 in Source Directory”
}

write-host "Creating style\icons folder in Destination Directory if not exist"
$File2 = "$dstdir\style\icons"
if (!(Test-Path $File2)) { 
  New-Item -Path $File2 -ItemType Directory
  write-host “Folder created: $File2 in Destination Directory”
}

write-host "Copying original Destination Directory window.html file into Source Directory window.html file"
$Window = Get-Content $dstdir\window.html
Set-Content $srcdir\window.html $Window

write-host "Copying Source Directory *.png files to Destination Directory style\icons folder"
Copy-Item $srcdir\*.png $dstdir\style\icons

write-host "Copying Source Directory custom-ui-mod.js file into Destination Directory folder"
Copy-Item $srcdir\custom-ui-mod.js $dstdir\custom-ui-mod.js

write-host "Copying Source Directory css file into Destination Directory style folder"
Copy-Item $srcdir\custom-ui-mod.css $dstdir\style

write-host "Writing custom-ui-mod.css line into Destination Directory window.html file"
try {
  $outhtml3 = @()
  $writeneeded3 = 0
  $break3 = 0
  $encoding3 = (New-Object System.Text.UTF8Encoding($False))
  $html3 = Get-Content (join-path $dstdir "window.html") -encoding UTF8
  $html3 | Where-Object { $break3 -Eq 0 } | ForEach-Object {
    $line3 = $_
    if ($line3.tolower().contains('<link rel="stylesheet" href="style/custom-ui-mod.css" />')) {
       $break3 = 1;
    } elseif ($line3.tolower().contains('</head>')) {
      $writeneeded3 = 1
      $outhtml3 += '  <link rel="stylesheet" href="style/custom-ui-mod.css" />'
    }
    $outhtml3 += $_
  }
  if ($writeneeded3 -eq 1) {
    [System.IO.File]::WriteAllLines( (join-path $dstdir "window.html"), $outhtml3, $encoding3)
  } else {
    write-host "The vivaldi window.html file already includes reference to custom-ui-mod.css"
  }
} catch { write-host "Error: " $_ }

write-host "Writing custom-ui-mod.js line into Destination Directory window.html file"
try {
  $outhtml4 = @()
  $writeneeded4 = 0
  $break4 = 0
  $encoding4 = (New-Object System.Text.UTF8Encoding($False))
  $html4 = Get-Content (join-path $dstdir "window.html") -encoding UTF8
  $html4 | Where-Object { $break4 -Eq 0 } | ForEach-Object {
    $line4 = $_
    if ($line4.tolower().contains('<script src="custom-ui-mod.js">')) {
       $break4 = 1;
    } elseif ($line4.tolower().contains('</body>')) {
      $writeneeded4 = 1
      $outhtml4 += '  <script src="custom-ui-mod.js"></script>'
    }
    $outhtml4 += $_
  }
  if ($writeneeded4 -eq 1) {
    [System.IO.File]::WriteAllLines( (join-path $dstdir "window.html"), $outhtml4, $encoding4)
  } else {
    write-host "The vivaldi window.html file already includes reference to custom-ui-mod.js"
  }
} catch { write-host "Error: " $_ }

write-host "Done"
write-host -NoNewLine "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")