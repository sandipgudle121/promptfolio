$ErrorActionPreference = "Stop"

$repositoryRoot = Split-Path -Parent $PSScriptRoot
$siteBase = "https://sandipgudle121.github.io/promptfolio/"
$dataPath = Join-Path $repositoryRoot "prompts-data.js"
$sitemapPath = Join-Path $repositoryRoot "sitemap.xml"
$robotsPath = Join-Path $repositoryRoot "robots.txt"
$promptsDirectory = Join-Path $repositoryRoot "prompts"

$data = Get-Content -Raw -Encoding UTF8 $dataPath
$slugMatches = [regex]::Matches($data, '(?m)^\s*seoSlug:\s*"([^"]+)"\s*,?\s*$')
$slugs = @($slugMatches | ForEach-Object { $_.Groups[1].Value })

$promptEntries = $data -split '(?m)^\s*\},?\s*$'
foreach ($entry in $promptEntries) {
    $titleMatch = [regex]::Match($entry, '(?m)^\s*title:\s*"([^"]+)"')
    if ($titleMatch.Success -and $entry -match '(?m)^\s*image:\s*"' -and $entry -notmatch '(?m)^\s*seoSlug:\s*"') {
        throw "Prompt '$($titleMatch.Groups[1].Value)' has a sample image but no seoSlug."
    }
}

if (@($slugs | Select-Object -Unique).Count -ne $slugs.Count) {
    throw "Duplicate seoSlug values found in prompts-data.js."
}

[xml]$sitemap = Get-Content -Raw -Encoding UTF8 $sitemapPath
$sitemapUrls = @($sitemap.SelectNodes("//*[local-name()='loc']") | ForEach-Object { $_.InnerText.Trim() })
if (@($sitemapUrls | Select-Object -Unique).Count -ne $sitemapUrls.Count) {
    throw "Duplicate URLs found in sitemap.xml."
}

if ($sitemapUrls -notcontains $siteBase) {
    throw "The homepage URL is missing from sitemap.xml."
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

$pageFiles = @(Get-ChildItem -Path $promptsDirectory -Filter "*.html" -File)
if ($pageFiles.Count -ne $slugs.Count) {
    throw "Found $($slugs.Count) SEO slugs but $($pageFiles.Count) prompt detail pages."
}

$socialImages = @()
foreach ($slug in $slugs) {
    if ($slug -notmatch '^[a-z0-9]+(?:-[a-z0-9]+)*$') {
        throw "Invalid seoSlug '$slug'; use lowercase letters, numbers, and hyphens."
    }

    $relativePage = "prompts/$slug.html"
    $pagePath = Join-Path $repositoryRoot ($relativePage -replace '/', [IO.Path]::DirectorySeparatorChar)
    if (-not (Test-Path -LiteralPath $pagePath -PathType Leaf)) {
        throw "seoSlug '$slug' has no page at $relativePage."
    }

    $canonicalUrl = "${siteBase}${relativePage}"
    if ($sitemapUrls -notcontains $canonicalUrl) {
        throw "$canonicalUrl is missing from sitemap.xml."
    }

    $html = Get-Content -Raw -Encoding UTF8 $pagePath
    if ($html -notmatch [regex]::Escape("href=`"$canonicalUrl`"")) {
        throw "$relativePage does not declare its expected canonical URL."
    }
    if ($html -notmatch [regex]::Escape("property=`"og:url`" content=`"$canonicalUrl`"")) {
        throw "$relativePage does not declare the matching Open Graph URL."
    }

    foreach ($property in @("og:title", "og:description", "og:image")) {
        if ($html -notmatch [regex]::Escape("property=`"$property`"")) {
            throw "$relativePage is missing $property metadata."
        }
    }
    if ($html -notmatch [regex]::Escape("property=`"og:image:type`" content=`"image/jpeg`"")) {
        throw "$relativePage Open Graph image must declare its JPEG media type."
    }

    foreach ($name in @("twitter:card", "twitter:title", "twitter:description", "twitter:image")) {
        if ($html -notmatch [regex]::Escape("name=`"$name`"")) {
            throw "$relativePage is missing $name metadata."
        }
    }

    $ogImageMatch = [regex]::Match($html, '<meta\s+property="og:image"\s+content="([^"]+)"')
    $twitterImageMatch = [regex]::Match($html, '<meta\s+name="twitter:image"\s+content="([^"]+)"')
    if (-not $ogImageMatch.Success -or -not $twitterImageMatch.Success) {
        throw "$relativePage has malformed social image metadata."
    }

    $ogImageUrl = $ogImageMatch.Groups[1].Value
    if ($ogImageUrl -ne $twitterImageMatch.Groups[1].Value) {
        throw "$relativePage Open Graph and Twitter images do not match."
    }
    if (-not $ogImageUrl.StartsWith($siteBase, [StringComparison]::OrdinalIgnoreCase)) {
        throw "$relativePage social image URL must be absolute and hosted on the site."
    }
    $socialImages += $ogImageUrl

    $socialImagePath = Join-Path $repositoryRoot ($ogImageUrl.Substring($siteBase.Length) -replace '/', [IO.Path]::DirectorySeparatorChar)
    if (-not (Test-Path -LiteralPath $socialImagePath -PathType Leaf)) {
        throw "$relativePage social image file does not exist: $socialImagePath."
    }
    if ([IO.Path]::GetExtension($socialImagePath) -notin @(".jpg", ".jpeg")) {
        throw "$relativePage social image must be a JPEG."
    }
}

if (@($socialImages | Select-Object -Unique).Count -ne $socialImages.Count) {
    throw "Prompt detail pages must use unique page-specific social image URLs."
}

foreach ($page in $pageFiles) {
    $relativePage = "prompts/$($page.Name)"
    $expectedUrl = "${siteBase}${relativePage}"
    if ($sitemapUrls -notcontains $expectedUrl) {
        throw "$expectedUrl is missing from sitemap.xml."
    }
}

$expectedUrls = @($siteBase) + @($pageFiles | ForEach-Object { "${siteBase}prompts/$($_.Name)" })
if ($sitemapUrls.Count -ne $expectedUrls.Count) {
    throw "sitemap.xml contains $($sitemapUrls.Count) URLs; expected exactly $($expectedUrls.Count) homepage and prompt-page URLs."
}

Write-Output "SEO check passed: $($slugs.Count) unique prompt pages have matching canonicals, social metadata, image files, and sitemap URLs."
