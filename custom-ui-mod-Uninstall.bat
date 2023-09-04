@set installhooks_args=%*& set installhooks_self=%~f0& powershell -c "(gc \"%~f0\") -replace '@set installhooks_args.*','#' | Write-Host" | powershell -c -& goto :eof
$srcdir = split-path $env:installhooks_self
$vivpath = "$env:localappdata\Vivaldi\Application\"

if ($vivpath.tolower().contains("appdata")) {
  $dstdir = split-path ((Get-ChildItem -path $vivpath -recurse browser.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
} elseif ($vivpath.tolower().contains("program files")) {
  $dstdir = split-path ((Get-ChildItem -path "C:\Program Files\Vivaldi\Application\" -recurse browser.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
}

write-host "Deleting custom-ui-mod.js file from vivaldi folder"
$Custom = "$dstdir\custom-ui-mod.js"
if (!(Test-Path -Path $Custom)) { exit }
if (Test-Path -Path $Custom) { del $Custom }

write-host "Replacing vivaldi > style\common.css file back to default"
$Common = "$dstdir\style\common.css"
copy $srcdir\common.css $Common

write-host "Done"
write-host -NoNewLine "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
