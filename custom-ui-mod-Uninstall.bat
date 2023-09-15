@set installhooks_args=%*& set installhooks_self=%~f0& powershell -c "(gc \"%~f0\") -replace '@set installhooks_args.*','#' | Write-Host" | powershell -c -& goto :eof
$srcdir = split-path $env:installhooks_self
$vivpath = "$env:localappdata\Vivaldi\Application\"

if ($vivpath.tolower().contains("appdata")) {
  $dstdir = split-path ((Get-ChildItem -path $vivpath -recurse browser.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
} elseif ($vivpath.tolower().contains("program files")) {
  $dstdir = split-path ((Get-ChildItem -path "C:\Program Files\Vivaldi\Application\" -recurse browser.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
}

# Exit script if custom-ui-mod.js file is not installed into vivaldi folder to prevent conflict
if (!(Test-Path -Path $dstdir\custom-ui-mod.js)) { exit }

write-host "Restoring original vivaldi\browser.html file from custom-ui-mod\browser.html file"
$Browser = Get-Content $srcdir\browser.html
Set-Content $dstdir\browser.html $Browser

write-host "Restoring original vivaldi\window.html file from custom-ui-mod\window.html file"
$Window = Get-Content $srcdir\window.html
Set-Content $dstdir\window.html $Window

write-host "Restoring original vivaldi\style\common.css file from custom-ui-mod\common.css file"
$Common = Get-Content $srcdir\common.css
Set-Content $dstdir\style\common.css $Common

write-host "Deleting vivaldi\custom-ui-mod.js file"
Remove-Item -Path $dstdir\custom-ui-mod.js

write-host "Deleting vivaldi\style\icons folder"
Remove-Item -Path $dstdir\style\icons -Recurse

write-host "Clearing custom-ui-mod\*.html files"
Clear-Content -Path $srcdir\*.html

write-host "Clearing custom-ui-mod\common.css file"
Clear-Content -Path $srcdir\common.css

write-host "Done"
write-host -NoNewLine "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
