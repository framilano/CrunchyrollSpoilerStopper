$compress = @{
  Path = "..\icons\", "..\gecko\*"
  CompressionLevel = "Fastest"
  DestinationPath = "..\gecko.zip"
}
Compress-Archive @compress