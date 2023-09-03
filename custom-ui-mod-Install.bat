@set installhooks_args=%*& set installhooks_self=%~f0& powershell -c "(gc \"%~f0\") -replace '@set installhooks_args.*','#' | Write-Host" | powershell -c -& goto :eof
$srcdir = split-path $env:installhooks_self
$vivpath = "$env:localappdata\Vivaldi\Application\"

if ($vivpath.tolower().contains("appdata")) {
  $dstdir = split-path ((Get-ChildItem -path $vivpath -recurse browser.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
} elseif ($vivpath.tolower().contains("program files")) {
  $dstdir = split-path ((Get-ChildItem -path "C:\Program Files\Vivaldi\Application\" -recurse browser.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
}

write-host "Writing complete.js into vivaldi browser.html and window.html files"
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
    write-host "The vivaldi window.html already includes references to custom-ui-mod.js"
  }
} catch { write-host "Error: " $_ }

try {
  $outhtml = @()
  $writeneeded = 0
  $break = 0
  $encoding = (New-Object System.Text.UTF8Encoding($False))
  $html = Get-Content (join-path $dstdir "window.html") -encoding UTF8
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
    [System.IO.File]::WriteAllLines( (join-path $dstdir "window.html"), $outhtml, $encoding)
  } else {
    write-host "The vivaldi window.html already includes references to custom-ui-mod.js"
  }
} catch { write-host "Error: " $_ }

write-host "Copying custom-ui-mod.js to vivaldi folder"
copy $srcdir\custom-ui-mod.js $dstdir

write-host "Writing custom-ui-mod.css to vivaldi style\common.css"
copy $dstdir\style\common.css $srcdir\common.css
copy $dstdir\style\common.css $srcdir\cssCombined.css
type $srcdir\custom-ui-mod.css >> $srcdir\cssCombined.css
copy $srcdir\cssCombined.css $dstdir\style\common.css

write-host "Done"
write-host -NoNewLine "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")