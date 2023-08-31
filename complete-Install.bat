@set installhooks_args=%*& set installhooks_self=%~f0& powershell -c "(gc \"%~f0\") -replace '@set installhooks_args.*','#' | Write-Host" | powershell -c -& goto :eof
$srcdir = split-path $env:installhooks_self
$vivpath = "$env:localappdata\Vivaldi\Application\"

if ($vivpath.tolower().contains("appdata")) {
  $dstdir = split-path ((Get-ChildItem -path $vivpath -recurse browser.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
} elseif ($vivpath.tolower().contains("program files")) {
  $dstdir = split-path ((Get-ChildItem -path "C:\Program Files\Vivaldi\Application\" -recurse browser.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
}

$encoding = (New-Object System.Text.UTF8Encoding($False))
$html = Get-Content (join-path $dstdir "browser.html") -encoding UTF8
findstr /v "^$" $dstdir\browser.html > $srcdir\browser.html
[System.IO.File]::WriteAllLines( (join-path $dstdir "browser.html"), $html, $encoding)

$encoding2 = (New-Object System.Text.UTF8Encoding($False))
$html2 = Get-Content (join-path $srcdir "browser.html") -encoding UTF8
findstr /v "^$" $srcdir\browser.html > $dstdir\browser.html
[System.IO.File]::WriteAllLines( (join-path $dstdir "browser.html"), $html2, $encoding2)

$encoding3 = (New-Object System.Text.UTF8Encoding($False))
$html3 = Get-Content (join-path $dstdir "window.html") -encoding UTF8
findstr /v "^$" $dstdir\window.html > $srcdir\window.html
[System.IO.File]::WriteAllLines( (join-path $dstdir "window.html"), $html3, $encoding3)

$encoding4 = (New-Object System.Text.UTF8Encoding($False))
$html4 = Get-Content (join-path $srcdir "window.html") -encoding UTF8
findstr /v "^$" $srcdir\window.html > $dstdir\window.html
[System.IO.File]::WriteAllLines( (join-path $dstdir "window.html"), $html4, $encoding4)

$encoding5 = (New-Object System.Text.UTF8Encoding($False))
$html5 = Get-Content (join-path $dstdir\style "common.css") -encoding UTF8
findstr /v "^$" $dstdir\style\common.css > $srcdir\common.css
[System.IO.File]::WriteAllLines( (join-path $dstdir\style "common.css"), $html5, $encoding5)

$encoding6 = (New-Object System.Text.UTF8Encoding($False))
$html6 = Get-Content (join-path $srcdir "common.css") -encoding UTF8
findstr /v "^$" $srcdir\common.css > $dstdir\style\common.css
[System.IO.File]::WriteAllLines( (join-path $dstdir\style "common.css"), $html6, $encoding6)

try {
  write-host "Writing complete.js into vivaldi browser.html file"
  $outhtml = @()
  $writeneeded = 0
  $break = 0
  $html | Where-Object { $break -Eq 0 } | ForEach-Object {
    $line = $_
    if ($line.tolower().contains('<script src="complete.js">')) {
       $break = 1;
    } elseif ($line.tolower().contains('</body>')) {
      $writeneeded = 1
      $outhtml += '    <script src="complete.js"></script>'
    }
    $outhtml += $_
  }
  if ($writeneeded -eq 1) {
    [System.IO.File]::WriteAllLines( (join-path $dstdir "browser.html"), $outhtml, $encoding)
  } else {
    write-host "The vivaldi browser.html already includes references to complete.js"
  }
} catch { write-host "Error: " $_ }

try {
  write-host "Writing complete.js into vivaldi window.html file"
  $outhtml = @()
  $writeneeded = 0
  $break = 0
  $encoding3 = (New-Object System.Text.UTF8Encoding($False))
  $html3 = Get-Content (join-path $dstdir "window.html") -encoding UTF8
  $html3 | Where-Object { $break -Eq 0 } | ForEach-Object {
    $line = $_
    if ($line.tolower().contains('<script src="complete.js">')) {
       $break = 1;
    } elseif ($line.tolower().contains('</body>')) {
      $writeneeded = 1
      $outhtml += '  <script src="complete.js"></script>'
    }
    $outhtml += $_
  }
  if ($writeneeded -eq 1) {
    [System.IO.File]::WriteAllLines( (join-path $dstdir "window.html"), $outhtml, $encoding3)
  } else {
    write-host "The vivaldi window.html already includes references to complete.js"
  }
} catch { write-host "Error: " $_ }

write-host "Copying complete.js to vivaldi folder"
copy $srcdir\complete.js $dstdir
write-host "Creating sub-folder complete under style folder"
$Icons = "$dstdir\style\icons"
if (!(Test-Path $Icons)) { 
  New-Item -itemType Directory -Path $Icons
  write-host “Folder created: $Icons” 
}

$Browser = "$srcdir\browser.html"
if (!(Test-Path $Browser)) { 
  New-Item -ItemType File -Path $Browser
  write-host “File created: $Browser”
}

write-host "Copying files to icons folder"
copy $srcdir\*.png $dstdir\style\icons

write-host "Writing custom css into style\common.css file"
type $srcdir\*.css > cssCombined.txt
$Common = "$dstdir\style\common.css"
if (!(Test-Path $Common)) { 
  New-Item -itemType File -Path $Common
  write-host “File created: $Common” 
}
type $srcdir\cssCombined.txt > $Common

write-host "Copying and Writing Done"
write-host -NoNewLine "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")