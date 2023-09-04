@set installhooks_args=%*& set installhooks_self=%~f0& powershell -c "(gc \"%~f0\") -replace '@set installhooks_args.*','#' | Write-Host" | powershell -c -& goto :eof
$srcdir = split-path $env:installhooks_self
$vivpath = "$env:localappdata\Vivaldi\Application\"

if ($vivpath.tolower().contains("appdata")) {
  $dstdir = split-path ((Get-ChildItem -path $vivpath -recurse browser.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
} elseif ($vivpath.tolower().contains("program files")) {
  $dstdir = split-path ((Get-ChildItem -path "C:\Program Files\Vivaldi\Application\" -recurse browser.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
}

if (Test-Path -Path $dstdir\custom-ui-mod.js) { exit }

$outhtml = @()
$writeneeded = 0
$break = 0
$encoding = (New-Object System.Text.UTF8Encoding($False))

write-host "Writing complete.js into vivaldi > browser.html file"
$Browser = Get-Content (join-path $dstdir "browser.html") -encoding UTF8
$Browser | Where-Object { $break -Eq 0 } | ForEach-Object {
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

write-host "Writing complete.js into vivaldi > window.html file"
$Window = Get-Content (join-path $dstdir "window.html") -encoding UTF8
$Window | Where-Object { $break -Eq 0 } | ForEach-Object {
  $line = $_
  if ($line.tolower().contains('<script src="custom-ui-mod.js">')) {
    $break = 1;
  } elseif ($line.tolower().contains('</body>')) {
    $writeneeded = 1
    $outhtml += '  <script src="custom-ui-mod.js"></script>'
  }
  $outhtml += $_
}
if ($writeneeded -eq 1) {
  [System.IO.File]::WriteAllLines( (join-path $dstdir "window.html"), $outhtml, $encoding)
} else {
  write-host "The vivaldi window.html already includes references to custom-ui-mod.js"
}

write-host "Copying custom-ui-mod.js to vivaldi folder"
copy $srcdir\custom-ui-mod.js $dstdir

write-host "Writing custom-ui-mod.css to vivaldi > style\common.css"
copy $dstdir\style\common.css $srcdir\common.css
type $srcdir\custom-ui-mod.css >> $dstdir\style\common.css

write-host "Done"
write-host -NoNewLine "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")