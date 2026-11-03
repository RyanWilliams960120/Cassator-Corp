Add-Type -AssemblyName System.Drawing
$paths = @(
  "C:\Users\Administrator\.cursor\projects\c-Users-Administrator-Documents-cassator\assets\tal-shahar-team.jpg",
  "C:\Users\Administrator\.cursor\projects\c-Users-Administrator-Documents-cassator\assets\maryna-shabelnykova-team.jpg",
  "C:\Users\Administrator\.cursor\projects\c-Users-Administrator-Documents-cassator\assets\roman-kotyk-team.jpg",
  "C:\Users\Administrator\.cursor\projects\c-Users-Administrator-Documents-cassator\assets\yaroslav-boichuk-team.jpg"
)
foreach ($p in $paths) {
  $img = [System.Drawing.Image]::FromFile($p)
  Write-Output ("{0} {1}x{2}" -f (Split-Path $p -Leaf), $img.Width, $img.Height)
  $img.Dispose()
}
