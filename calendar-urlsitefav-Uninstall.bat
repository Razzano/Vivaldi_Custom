@set installhooks_args=%*& set installhooks_self=%~f0& powershell -c "(gc \"%~f0\") -replace '@set installhooks_args.*','#' | Write-Host" | powershell -c -& goto :eof
$srcdir = split-path $env:installhooks_self
$vivpath = "$env:localappdata\Vivaldi\Application\"

if ($vivpath.tolower().contains("appdata")) {
  $dstdir = split-path ((Get-ChildItem -path $vivpath -recurse browser.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
} elseif ($vivpath.tolower().contains("program files")) {
  $dstdir = split-path ((Get-ChildItem -path "C:\Program Files\Vivaldi\Application\" -recurse browser.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
}

try {
  write-host "Destination directory: $dstdir"
  write-host "Deleting all vivaldi-custom files from Vivaldi App"
  del $dstdir\calendar-urlsitefav.js
  write-host "Deleting all files from style\calendar-urlsitefav folder"
  del $dstdir\style\calendar-urlsitefav\*.css
  del $dstdir\style\calendar-urlsitefav\*.png
  write-host "Deletes Done"
  write-host "Writing browser.html back to prior restart install"
  findstr /v /r "calendar-urlsitefav\.[c-j]s" $dstdir\browser.html > $srcdir\restore.html
  $encoding = (New-Object System.Text.UTF8Encoding($False))
  $html = Get-Content (join-path $srcdir "restore.html") -encoding UTF8
  [System.IO.File]::WriteAllLines( (join-path $dstdir "browser.html"), $html, $encoding)
  write-host "Re-write Done"
} catch {
  write-host "Error: " $_
}

write-host -NoNewLine "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")