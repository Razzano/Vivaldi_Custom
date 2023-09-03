@set installhooks_args=%*& set installhooks_self=%~f0& powershell -c "(gc \"%~f0\") -replace '@set installhooks_args.*','#' | Write-Host" | powershell -c -& goto :eof
$srcdir = split-path $env:installhooks_self
$vivpath = "$env:localappdata\Vivaldi\Application\"

if ($vivpath.tolower().contains("appdata")) {
  $dstdir = split-path ((Get-ChildItem -path $vivpath -recurse browser.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
} elseif ($vivpath.tolower().contains("program files")) {
  $dstdir = split-path ((Get-ChildItem -path "C:\Program Files\Vivaldi\Application\" -recurse browser.html | Sort-Object -property CreationTime -descending | Select-Object -first 1).FullName)
}

write-host "Deleting all vivaldi-custom files from Vivaldi App"
$JSMod = "$dstdir\custom-ui-mod.js"
if (Test-Path $JSMod) { del $JSMod }

write-host "Replacing style\common.css file back to default"
$Common = "$dstdir\style\common.css"
copy $srcdir\common.css $Common

write-host "Resetting cssCombined file"
$Combined = "$srcdir\cssCombined.css"
del $Combined
if (!(Test-Path $Combined)) { 
  New-Item -ItemType File -Path $Combined
  write-host “File created: $Combined”
}

write-host "Done"
write-host -NoNewLine "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
