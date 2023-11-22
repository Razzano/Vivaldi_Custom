@set installhooks_args=%*& set installhooks_self=%~f0& powershell -c "(gc \"%~f0\") -replace '@set installhooks_args.*','#' | Write-Host" | powershell -c -& goto :eof
$srcdir = split-path $env:installhooks_self
$vivpath = "$env:localappdata\Vivaldi\Application\"

if ($vivpath.tolower().contains("appdata")) {
  $dstdir = split-path ((Get-ChildItem -path $vivpath -recurse window.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
} elseif ($vivpath.tolower().contains("program files")) {
  $dstdir = split-path ((Get-ChildItem -path "C:\Program Files\Vivaldi\Application\" -recurse window.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
}

# Exit script if custom-ui-mod.js file is already installed into vivaldi folder to prevent conflict
if (Test-Path -Path $dstdir\custom-ui-mod.js) { exit }

write-host "Creating custom-ui-mod\window.html file if not exist"
$File2 = "$srcdir\window.html"
if (!(Test-Path $File2)) { 
  New-Item -ItemType File -Path $File2
  write-host “File created: $File2”
}

write-host "Creating style\icons folder if not exist"
$File4 = "$dstdir\style\icons"
if (!(Test-Path $File4)) { 
  New-Item -Path $File4 -ItemType Directory
  write-host “Folder created: $File4”
}

write-host "Copying original vivaldi\window.html file into custom-ui-mod\window.html file"
$Window = Get-Content $dstdir\window.html
Set-Content $srcdir\window.html $Window

write-host "Copying custom-ui-mod\*.png files to vivaldi\style\icons folder"
Copy-Item $srcdir\*.png $dstdir\style\icons

write-host "Copying custom-ui-mod\custom-ui-mod.js file into vivaldi folder"
Copy-Item $srcdir\custom-ui-mod.js $dstdir\custom-ui-mod.js

write-host "Copying custom-ui-mod.css into vivaldi\style folder"
Copy-Item $srcdir\custom-ui-mod.css $dstdir\style

write-host "Writing custom-ui-mod.css line into vivaldi\window.html file"
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
    write-host "The vivaldi window.html already includes references to custom-ui-mod.css"
  }
} catch { write-host "Error: " $_ }

write-host "Writing custom-ui-mod.js line into vivaldi\window.html file"
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
    write-host "The vivaldi window.html already includes references to custom-ui-mod.js"
  }
} catch { write-host "Error: " $_ }

write-host "Done"
write-host -NoNewLine "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")