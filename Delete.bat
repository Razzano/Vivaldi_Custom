@set installhooks_args=%*& set installhooks_self=%~f0& powershell -c "(gc \"%~f0\") -replace '@set installhooks_args.*','#' | Write-Host" | powershell -c -& goto :eof
$srcdir = split-path $env:installhooks_self
$vivpath = "$env:localappdata\Vivaldi\Application\"

if ($vivpath.tolower().contains("appdata")) {
  $dstdir = split-path ((Get-ChildItem -path $vivpath -recurse browser.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
} elseif ($vivpath.tolower().contains("program files")) {
  $dstdir = split-path ((Get-ChildItem -path "C:\Program Files\Vivaldi\Application\" -recurse browser.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
}

Try {
  write-host "Destination directory: $dstdir"
  write-host "Deleting vivaldi-custom.js file from vivaldi folder"
  del $dstdir\vivaldi-custom.js
  write-host "Deleting vivaldi-custom.css, png, and txt files from style folder"
  del $dstdir\browser.html
  del $dstdir\style\*.png
  del $dstdir\style\*.txt
  del $dstdir\style\vivaldi-custom.css
  Copy $srcdir\browser.html $dstdir
  write-host "Done"
} Catch {
  write-host "Error: " $_
}

Write-Host -NoNewLine "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
