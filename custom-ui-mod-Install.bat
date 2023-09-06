@set installhooks_args=%*& set installhooks_self=%~f0& powershell -c "(gc \"%~f0\") -replace '@set installhooks_args.*','#' | Write-Host" | powershell -c -& goto :eof
$srcdir = split-path $env:installhooks_self
$vivpath = "$env:localappdata\Vivaldi\Application\"

if ($vivpath.tolower().contains("appdata")) {
  $dstdir = split-path ((Get-ChildItem -path $vivpath -recurse browser.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
} elseif ($vivpath.tolower().contains("program files")) {
  $dstdir = split-path ((Get-ChildItem -path "C:\Program Files\Vivaldi\Application\" -recurse browser.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
}

# Exit batch script if custom-ui-mod.js file is already installed into vivaldi folder to prevent duplication
if (Test-Path -Path $dstdir\custom-ui-mod.js) { exit }

write-host "Creating custom-ui-mod\browser.html file if not exist"
$File1 = "$srcdir\browser.html"
if (!(Test-Path $File1)) { 
  New-Item -ItemType File -Path $File1
  write-host “File created: $File1”
}

write-host "Creating custom-ui-mod\window.html file if not exist"
$File2 = "$srcdir\window.html"
if (!(Test-Path $File2)) { 
  New-Item -ItemType File -Path $File2
  write-host “File created: $File2”
}

write-host "Creating custom-ui-mod\common.css file if not exist"
$File3 = "$srcdir\common.css"
if (!(Test-Path $File3)) { 
  New-Item -ItemType File -Path $File3
  write-host “File created: $File3”
}

write-host "Copying original vivaldi\browser.html file into custom-ui-mod\browser.html file"
$Browser = Get-Content $dstdir\browser.html
Set-Content $srcdir\browser.html $Browser

write-host "Copying original vivaldi\window.html file into custom-ui-mod\window.html file"
$Window = Get-Content $dstdir\window.html
Set-Content $srcdir\window.html $Window

write-host "Copying original vivaldi\style\common.css file into custom-ui-mod\common.css file"
$Common = Get-Content $dstdir\style\common.css
Set-Content $srcdir\common.css $Common

write-host "Writing custom-ui-mod.js line into vivaldi\browser.html file"
try {
  $outhtml = @()
  $writeneeded = 0
  $break = 0
  $encoding = (New-Object System.Text.UTF8Encoding($False))
  $html = Get-Content (join-path $dstdir "browser.html") -encoding UTF8
  $html | Where-Object { $break -Eq 0 } | ForEach-Object {
    $line = $_
    if ($line.tolower().contains('<script src="custom-ui-mod.js">')) {
       $break = 1;
    } elseif ($line.tolower().contains('</body>')) {
      $writeneeded = 1
      $outhtml += '    <script src="custom-ui-mod.js"></script>'
    }
    $outhtml += $_
  }
  if ($writeneeded -eq 1) {
    [System.IO.File]::WriteAllLines( (join-path $dstdir "browser.html"), $outhtml, $encoding)
  } else {
    write-host "The vivaldi browser.html already includes references to custom-ui-mod.js"
  }
} catch { write-host "Error: " $_ }

write-host "Writing custom-ui-mod.js line into vivaldi\window.html file"
try {
  $outhtml2 = @()
  $writeneeded2 = 0
  $break2 = 0
  $encoding2 = (New-Object System.Text.UTF8Encoding($False))
  $html2 = Get-Content (join-path $dstdir "window.html") -encoding UTF8
  $html2 | Where-Object { $break2 -Eq 0 } | ForEach-Object {
    $line2 = $_
    if ($line2.tolower().contains('<script src="custom-ui-mod.js">')) {
       $break2 = 1;
    } elseif ($line2.tolower().contains('</body>')) {
      $writeneeded2 = 1
      $outhtml2 += '  <script src="custom-ui-mod.js"></script>'
    }
    $outhtml2 += $_
  }
  if ($writeneeded2 -eq 1) {
    [System.IO.File]::WriteAllLines( (join-path $dstdir "window.html"), $outhtml2, $encoding2)
  } else {
    write-host "The vivaldi window.html already includes references to custom-ui-mod.js"
  }
} catch { write-host "Error: " $_ }

write-host "Copying custom-ui-mod\custom-ui-mod.js file into vivaldi folder"
Copy-Item $srcdir\custom-ui-mod.js $dstdir\custom-ui-mod.js

write-host "Appending custom-ui-mod.css into vivaldi\style\common.css"
$Custom = Get-Content $srcdir\custom-ui-mod.css
Add-Content $dstdir\style\common.css $Custom

write-host "Done"
write-host -NoNewLine "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")