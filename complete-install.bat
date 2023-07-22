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
  write-host "Writing _complete_.css and _complete_.js into vivaldi browser.html file"
  $html | Where-Object { $break -Eq 0 } | ForEach-Object {
    $line = $_
    if ($line.tolower().contains('<link rel="stylesheet" href="style/_complete_.css" />')) {
      $break = 1;
    } elseif ($line.tolower().contains('</head>')) {
      $writeneeded = 1
      $outhtml += '    <link rel="stylesheet" href="style/_complete_.css" />'
    }
    if ($line.tolower().contains('<script src="_complete_.js">')) {
       $break = 1;
    } elseif ($line.tolower().contains('</body>')) {
      $writeneeded = 1
      $outhtml += '    <script src="_complete_.js"></script>'
    }
    $outhtml += $_
  }
  if ($writeneeded -eq 1) {
    [System.IO.File]::WriteAllLines( (join-path $dstdir "browser.html"), $outhtml, $encoding)
  } else {
    write-host "The vivaldi browser.html already includes references to _complete_.css and _complete_.js"
  }
  write-host "Copying _complete_.js to vivaldi folder"
  copy $srcdir\_complete_.js $dstdir
  write-host "Copying _complete_.css, _*_.png files into style folder"
  copy $srcdir\_*_.css $dstdir\style
  copy $srcdir\_*_.png $dstdir\style
  write-host "Copying Done"
} catch {
  write-host "Error: " $_
}

write-host -NoNewLine "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
