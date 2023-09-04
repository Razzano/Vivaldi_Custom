@set installhooks_args=%*& set installhooks_self=%~f0& powershell -c "(gc \"%~f0\") -replace '@set installhooks_args.*','#' | Write-Host" | powershell -c -& goto :eof
$srcdir = split-path $env:installhooks_self
$vivpath = "$env:localappdata\Vivaldi\Application\"

if ($vivpath.tolower().contains("appdata")) {
  $dstdir = split-path ((Get-ChildItem -path $vivpath -recurse browser.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
} elseif ($vivpath.tolower().contains("program files")) {
  $dstdir = split-path ((Get-ChildItem -path "C:\Program Files\Vivaldi\Application\" -recurse browser.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
}

if (Test-Path -Path $dstdir\custom-ui-mod.js) { exit }

write-host "Writing complete.js into vivaldi > browser.html file"
try {
  $outhtml1 = @()
  $writeneeded1 = 0
  $break1 = 0
  $encoding1 = (New-Object System.Text.UTF8Encoding($False))
  $html1 = Get-Content (join-path $dstdir "browser.html") -encoding UTF8
  $html1 | Where-Object { $break1 -Eq 0 } | ForEach-Object {
    $line = $_
    if ($line.tolower().contains('<script src="custom-ui-mod.js">')) {
       $break1 = 1;
    } elseif ($line.tolower().contains('</body>')) {
      $writeneeded11 = 1
      $outhtml1 += '    <script src="custom-ui-mod.js"></script>'
    }
    $outhtml1 += $_
  }
  if ($writeneeded1 -eq 1) {
    [System.IO.File]::WriteAllLines( (join-path $dstdir "browser.html"), $outhtml1, $encoding1)
  } else {
    write-host "The vivaldi window.html already includes references to custom-ui-mod.js"
  }
} catch { write-host "Error: " $_ }

try {
  $outhtml2 = @()
  $writeneeded2 = 0
  $break2 = 0
  $encoding2 = (New-Object System.Text.UTF8Encoding($False))
  $html2 = Get-Content (join-path $dstdir "window.html") -encoding UTF8
  $html2 | Where-Object { $break2 -Eq 0 } | ForEach-Object {
    $line = $_
    if ($line.tolower().contains('<script src="custom-ui-mod.js">')) {
       $break2 = 1;
    } elseif ($line.tolower().contains('</body>')) {
      $writeneeded2 = 1
      $outhtml2 += '    <script src="custom-ui-mod.js"></script>'
    }
    $outhtml2 += $_
  }
  if ($writeneeded2 -eq 1) {
    [System.IO.File]::WriteAllLines( (join-path $dstdir "window.html"), $outhtml2, $encoding2)
  } else {
    write-host "The vivaldi window.html already includes references to custom-ui-mod.js"
  }
} catch { write-host "Error: " $_ }

write-host "Copying custom-ui-mod.js to vivaldi folder"
copy $srcdir\custom-ui-mod.js $dstdir

write-host "Writing custom-ui-mod.css to vivaldi > style\common.css"
copy $dstdir\style\common.css $srcdir\common.css
type $srcdir\custom-ui-mod.css >> $dstdir\style\common.css

write-host "Done"
write-host -NoNewLine "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")