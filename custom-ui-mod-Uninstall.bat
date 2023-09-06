@set installhooks_args=%*& set installhooks_self=%~f0& powershell -c "(gc \"%~f0\") -replace '@set installhooks_args.*','#' | Write-Host" | powershell -c -& goto :eof
$srcdir = split-path $env:installhooks_self
$vivpath = "$env:localappdata\Vivaldi\Application\"

if ($vivpath.tolower().contains("appdata")) {
  $dstdir = split-path ((Get-ChildItem -path $vivpath -recurse browser.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
} elseif ($vivpath.tolower().contains("program files")) {
  $dstdir = split-path ((Get-ChildItem -path "C:\Program Files\Vivaldi\Application\" -recurse browser.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
}

# Exit batch script if custom-ui-mod.js file is not installed into vivaldi folder to prevent duplication
if (!(Test-Path -Path $dstdir\custom-ui-mod.js)) { exit }

write-host "Restoring original vivaldi\(browser and window).html from custom-ui-mod files"
copy $srcdir\browser.html $dstdir\browser.html
copy $srcdir\window.html $dstdir\window.html

write-host "Deleting vivaldi\custom-ui-mod.js file"
$Custom = "$dstdir\custom-ui-mod.js"
if (Test-Path -Path $Custom) { del $Custom }

write-host "Restoring original vivaldi\style\common.css from custom-ui-mod\common.css"
$Common = "$dstdir\style\common.css"
copy $srcdir\common.css $Common

write-host "Clearing custom-ui-mod\(browser.html, window.html and common.css)"
Clear-Content -Path $srcdir\*.html
Clear-Content -Path $srcdir\common.css

write-host "Done"
write-host -NoNewLine "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
