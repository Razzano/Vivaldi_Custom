@set installhooks_args=%*& set installhooks_self=%~f0& powershell -c "(gc \"%~f0\") -replace '@set installhooks_args.*','#' | Write-Host" | powershell -c -& goto :eof
$srcdir = split-path $env:installhooks_self
$vivpath = "$env:localappdata\Vivaldi\Application\"

if ($vivpath.tolower().contains("appdata")) {
  $dstdir = split-path ((Get-ChildItem -path $vivpath -recurse browser.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
} elseif ($vivpath.tolower().contains("program files")) {
  $dstdir = split-path ((Get-ChildItem -path "C:\Program Files\Vivaldi\Application\" -recurse browser.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
}

write-host "Destination directory: $dstdir"
write-host "Deleting all vivaldi-custom files from Vivaldi App"
$Path = "$dstdir\complete.js"
if (Test-Path $Path) { del $Path }
write-host "Deleting all files from style\complete folder"
del $dstdir\style\complete\*.css
del $dstdir\style\complete\*.png
write-host "Deletes Done"
$File = "$srcdir\restore.html"
if (!(Test-Path $File)) { 
  New-Item -ItemType File -Path $File
  write-host “File created: $File”
}
write-host "Writing browser.html back to prior complete mod install"
$encoding = (New-Object System.Text.UTF8Encoding($False))
$html = Get-Content (join-path $srcdir "restore.html") -encoding UTF8
findstr /v /r "complete\.[c|j]s" $dstdir\browser.html > $srcdir\restore.html
[System.IO.File]::WriteAllLines( (join-path $dstdir "browser.html"), $html, $encoding)
write-host "Re-write Done"

write-host -NoNewLine "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
