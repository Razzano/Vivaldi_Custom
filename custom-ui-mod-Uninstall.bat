@set installhooks_args=%*& set installhooks_self=%~f0& powershell -c "(gc \"%~f0\") -replace '@set installhooks_args.*','#' | Write-Host" | powershell -c -& goto :eof
$srcdir = split-path $env:installhooks_self
$vivpath1 = "$env:localappdata\Vivaldi\Application\"
$vivpath2 = "C:\Program Files\Vivaldi\Application\"
# If Vivaldi\Application install path differs from one of the above, enter path in-between the quotation marks for $vivpath3 below
$vivpath3 = "Your Vivaldi\Application install path here"

if (Test-Path $vivpath1) { 
  $installpath = $vivpath1
} elseif (Test-Path $vivpath2) {
  $installpath = $vivpath2
} elseif (Test-Path $vivpath3) {
  $installpath = $vivpath3
} else {
  write-host "Vivaldi\Application install path not listed"
  write-host "Edit this bat file on line 6 to your Vivaldi\Application install path"
  write-host -NoNewLine "Press any key to exit..."
  $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
  exit
}

$dstdir = split-path ((Get-ChildItem -path $installpath -recurse window.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)

# Exit script if Custom UI Mod is already uninstalled to prevent any conflicts
if (!(Test-Path $dstdir\custom-ui-mod.js)) {
  write-host "Custom UI Mod is already uninstalled"
  write-host -NoNewLine "Press any key to exit..."
  $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
  exit
}

write-host "Source Directory: $srcdir"
write-host "Destination Directory: $dstdir"

write-host "Restoring original Destination Directory window.html file from Source Directory window.html file"
$Window = Get-Content $srcdir\window.html
Set-Content $dstdir\window.html $Window

write-host "Deleting Destination Directory custom-ui-mod.js file"
Remove-Item -Path $dstdir\custom-ui-mod.js

write-host "Deleting Destination Directory style\icons folder"
Remove-Item -Path $dstdir\style\icons -Recurse

write-host "Deleting Destination Directory style\custom-ui-mod.css file"
Remove-Item -Path $dstdir\style\custom-ui-mod.css -Recurse

write-host "Clearing Source Directory window.html file"
Clear-Content -Path $srcdir\window.html

write-host "Done"
write-host -NoNewLine "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
