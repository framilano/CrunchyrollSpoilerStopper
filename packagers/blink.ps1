$compress = @{
  Path = "..\icons\", "..\blink\*"
  CompressionLevel = "Fastest"
  DestinationPath = "..\blink.zip"
}
Compress-Archive @compress