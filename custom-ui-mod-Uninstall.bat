@set installhooks_args=%*& set installhooks_self=%~f0& powershell -c "(gc \"%~f0\") -replace '@set installhooks_args.*','#' | Write-Host" | powershell -c -& goto :eof
$srcdir = split-path $env:installhooks_self
$vivpath1 = "$env:localappdata\Vivaldi\Application\"
$vivpath2 = "C:\Program Files\Vivaldi\Application\"
# If Vivaldi\Application install path differs from one of the above, enter path in-between the quotation marks below
$vivpath3 = ""

if (Test-Path $vivpath1) { 
  $installpath = $vivpath1
} elseif (Test-Path $vivpath2) {
  $installpath = $vivpath2
} elseif (Test-Path $vivpath3) {
  $installpath = $vivpath3
}

$dstdir = split-path ((Get-ChildItem -path $installpath -recurse window.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)

# Exit script if custom-ui-mod.js file is not installed into vivaldi folder to prevent conflict
if (!(Test-Path $dstdir\custom-ui-mod.js)) {
  exit
}

write-host "Restoring original vivaldi\window.html file from custom-ui-mod\window.html file"
$Window = Get-Content $srcdir\window.html
Set-Content $dstdir\window.html $Window

write-host "Deleting vivaldi\custom-ui-mod.js file"
Remove-Item -Path $dstdir\custom-ui-mod.js

write-host "Deleting vivaldi\style\icons folder"
Remove-Item -Path $dstdir\style\icons -Recurse

write-host "Deleting vivaldi\style\custom-ui-mod.css"
Remove-Item -Path $dstdir\style\custom-ui-mod.css -Recurse

write-host "Clearing custom-ui-mod\window.html files"
Clear-Content -Path $srcdir\window.html

write-host "Done"
write-host -NoNewLine "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
