$ErrorActionPreference = "Stop"

$repositoryRoot = Split-Path -Parent $PSScriptRoot
$siteBase = "https://sandipgudle121.github.io/promptfolio/"
$dataPath = Join-Path $repositoryRoot "js/prompts-data.js"
$sitemapPath = Join-Path $repositoryRoot "sitemap.xml"
$robotsPath = Join-Path $repositoryRoot "robots.txt"
$data = Get-Content -Raw -Encoding UTF8 $dataPath

[xml]$sitemap = Get-Content -Raw -Encoding UTF8 $sitemapPath
$sitemapUrls = @($sitemap.SelectNodes("//*[local-name()='loc']") | ForEach-Object { $_.InnerText.Trim() })
if (@($sitemapUrls | Select-Object -Unique).Count -ne $sitemapUrls.Count) {
    throw "Duplicate URLs found in sitemap.xml."
}

if ($sitemapUrls -notcontains $siteBase) {
    throw "The homepage URL is missing from sitemap.xml."
}
if ($sitemapUrls.Count -ne 1) {
    throw "sitemap.xml should contain only the single-page homepage URL."
}

$robots = Get-Content -Raw -Encoding UTF8 $robotsPath
if ($robots -notmatch [regex]::Escape("${siteBase}sitemap.xml")) {
    throw "robots.txt does not point to the sitemap."
}

$homepagePath = Join-Path $repositoryRoot "index.html"
$homepage = Get-Content -Raw -Encoding UTF8 $homepagePath
$homepageCanonical = "<link rel=`"canonical`" href=`"$siteBase`">"
if ($homepage -notmatch [regex]::Escape($homepageCanonical)) {
    throw "index.html does not declare its expected canonical URL."
}
if ($homepage -notmatch [regex]::Escape("property=`"og:url`" content=`"$siteBase`"")) {
    throw "index.html does not declare its matching Open Graph URL."
}
$homepageSocialImage = [regex]::Match($homepage, '<meta\s+property="og:image"\s+content="([^"]+)"')
if (-not $homepageSocialImage.Success) {
    throw "index.html is missing its Open Graph image."
}
if (-not $homepageSocialImage.Groups[1].Value.StartsWith($siteBase, [StringComparison]::OrdinalIgnoreCase)) {
    throw "The homepage social image URL must be absolute and hosted on the site."
}
$homepageTwitterImage = [regex]::Match($homepage, '<meta\s+name="twitter:image"\s+content="([^"]+)"')
if (-not $homepageTwitterImage.Success -or $homepageSocialImage.Groups[1].Value -ne $homepageTwitterImage.Groups[1].Value) {
    throw "The homepage Open Graph and Twitter images must match."
}
foreach ($property in @("og:title", "og:description")) {
    if ($homepage -notmatch [regex]::Escape("property=`"$property`"")) {
        throw "index.html is missing $property metadata."
    }
}
if ($homepage -notmatch [regex]::Escape("property=`"og:image:type`" content=`"image/jpeg`"")) {
    throw "The homepage Open Graph image must declare its JPEG media type."
}
foreach ($name in @("twitter:card", "twitter:title", "twitter:description")) {
    if ($homepage -notmatch [regex]::Escape("name=`"$name`"")) {
        throw "index.html is missing $name metadata."
    }
}
$homepageImagePath = Join-Path $repositoryRoot ($homepageSocialImage.Groups[1].Value.Substring($siteBase.Length) -replace '/', [IO.Path]::DirectorySeparatorChar)
if (-not (Test-Path -LiteralPath $homepageImagePath -PathType Leaf)) {
    throw "The homepage social image file does not exist: $homepageImagePath."
}
if ([IO.Path]::GetExtension($homepageImagePath) -notin @(".jpg", ".jpeg")) {
    throw "The homepage social image must be a JPEG."
}

$fallbackMatch = [regex]::Match($homepage, '(?s)<noscript>(.*?)</noscript>')
if (-not $fallbackMatch.Success) {
    throw "index.html is missing its no-JavaScript prompt summary."
}
$promptTitles = @([regex]::Matches($data, '(?m)^\s*title:\s*"([^"]+)"') | ForEach-Object { $_.Groups[1].Value })
foreach ($title in $promptTitles) {
    if (-not $fallbackMatch.Groups[1].Value.Contains($title)) {
        throw "The no-JavaScript prompt summary is missing '$title'."
    }
}

Write-Output "SEO check passed: the homepage is the sole catalog URL and has valid canonical and social metadata."
