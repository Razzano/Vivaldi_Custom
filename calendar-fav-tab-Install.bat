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
  $encoding = (New-Object System.Text.UTF8Encoding($False))
  write-host "Checking browser.html"
  $html = Get-Content (join-path $dstdir "browser.html") -encoding UTF8
  $outhtml = @()
  $writeneeded = 0
  $break = 0
  write-host "Writing calendar-fav-tab.css and calendar-fav-tab.js into vivaldi browser.html file"
  $html | Where-Object { $break -Eq 0 } | ForEach-Object {
    $line = $_
    if ($line.tolower().contains('<link rel="stylesheet" href="style/calendar-fav-tab/calendar-fav-tab.css" />')) {
      $break = 1;
    } elseif ($line.tolower().contains('</head>')) {
      $writeneeded = 1
      $outhtml += '    <link rel="stylesheet" href="style/calendar-fav-tab/calendar-fav-tab.css" />'
    }
    if ($line.tolower().contains('<script src="calendar-fav-tab.js">')) {
       $break = 1;
    } elseif ($line.tolower().contains('</body>')) {
      $writeneeded = 1
      $outhtml += '    <script src="calendar-fav-tab.js"></script>'
    }
    $outhtml += $_
  }
  if ($writeneeded -eq 1) {
    [System.IO.File]::WriteAllLines( (join-path $dstdir "browser.html"), $outhtml, $encoding)
  } else {
    write-host "The vivaldi browser.html already includes references to calendar-fav-tab.css and calendar-fav-tab.js"
  }
} catch { write-host "Error: " $_ }

write-host "Copying calendar-fav-tab.js to vivaldi folder"
copy $srcdir\calendar-fav-tab.js $dstdir
write-host "Creating sub-folder under style folder"
$Path = "$dstdir\style\calendar-fav-tab"
if (!(Test-Path $Path)) { 
  New-Item -itemType Directory -Path $Path
  write-host “Folder created.” 
} else { 
  write-host "Folder already exists!" 
} 
write-host "Copying files to style\calendar-fav-tab folder"
copy $srcdir\*.css $dstdir\style\calendar-fav-tab
copy $srcdir\*.png $dstdir\style\calendar-fav-tab
write-host "Copying Done"

write-host -NoNewLine "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")