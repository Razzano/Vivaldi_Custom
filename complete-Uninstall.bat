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
  del $dstdir\vivaldi-custom-complete.js
  write-host "Deleting all files from style\complete folder"
  del $dstdir\style\complete\*.css
  del $dstdir\style\complete\*.png
  $Path = "$dstdir\style\complete"
  if (!(Test-Path $Path)) { 
    write-host “Folder created.” 
  } else { 
    write-host "Folder already exists!" 
  } 
  write-host "Deletes Done"
  write-host "Writing browser.html back to prior complete install"
  findstr /v /r "complete\.[c-j]s" $dstdir\browser.html > $srcdir\restore.html
  $encoding = (New-Object System.Text.UTF8Encoding($False))
  $html = Get-Content (join-path $srcdir "restore.html") -encoding UTF8
  [System.IO.File]::WriteAllLines( (join-path $dstdir "browser.html"), $html, $encoding)
  write-host "Re-write Done"
} catch {
  write-host "Error: " $_
}

write-host -NoNewLine "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
