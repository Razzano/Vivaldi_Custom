@set installhooks_args=%*& set installhooks_self=%~f0& powershell -c "(gc \"%~f0\") -replace '@set installhooks_args.*','#' | Write-Host" | powershell -c -& goto :eof
$srcdir = split-path $env:installhooks_self
$vivpath = "$env:localappdata\Vivaldi\Application\"

if ($vivpath.tolower().contains("appdata")) {
  $dstdir = split-path ((Get-ChildItem -path $vivpath -recurse browser.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
} elseif ($vivpath.tolower().contains("program files")) {
  $dstdir = split-path ((Get-ChildItem -path "C:\Program Files\Vivaldi\Application\" -recurse browser.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
}

write-host "Deleting all vivaldi-custom files from Vivaldi App"
$Complete = "$dstdir\complete.js"
if (Test-Path $Complete) { del $Complete }

write-host "Writing browser.html back to prior complete mod install"
$encoding = (New-Object System.Text.UTF8Encoding($False))
$html = Get-Content (join-path $srcdir "browser.html") -encoding UTF8
[System.IO.File]::WriteAllLines( (join-path $dstdir "browser.html"), $html, $encoding)

write-host "Writing window.html back to prior complete mod install"
$encoding2 = (New-Object System.Text.UTF8Encoding($False))
$html2 = Get-Content (join-path $srcdir "window.html") -encoding UTF8
[System.IO.File]::WriteAllLines( (join-path $dstdir "window.html"), $html2, $encoding)

write-host "Replacing style\common.css file back to default"
$Common = "$dstdir\style\common.css"
del $Common
type $srcdir\common.css > $Common

write-host "Deletes and Restore Done"
write-host -NoNewLine "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
