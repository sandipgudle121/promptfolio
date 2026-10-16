// Promptfolio — unified prompt catalog
// Add new prompt objects directly to this array.
// Each prompt needs: title, tag, category, and text. Add an optional `image` path for a sample image.

const PROMPT_DATA = [
  {
    title: "3D shelf figurine",
    tag: "Figurine",
    category: "3D",
    image: "assets/samples/3d-shelf-figurine.jpeg",
    seoSlug: "3d-shelf-figurine",
    badge: "Featured",
    text: "Turn the uploaded photo into a 1/7 scale collectible figurine standing on a desk. Realistic PVC material, soft studio lighting, visible sculpted details on clothing and hair. Place it on a circular acrylic base in front of its own product packaging box, the box art showing a stylized illustration of the same character. Add a computer monitor blurred in the background."
  },
  {
    title: "Studio headshot",
    tag: "Portrait",
    category: "Portrait",
    image: "assets/samples/Studio-headshot.jpeg",
    seoSlug: "studio-headshot",
    badge: "Featured",
    text: "Professional corporate headshot of the person in the reference photo. Plain light-grey seamless background, soft diffused key light from the front-left, gentle fill from the right. Sharp focus on the eyes, natural skin texture, no heavy retouching. Shot on an 85mm lens at f/4 with a shallow depth of field. Neutral, confident expression."
  },
  {
    title: "Festival portrait",
    tag: "Fashion",
    category: "Portrait",
    image: "assets/samples/Festival-portrait.jpeg",
    seoSlug: "festival-portrait",
    text: "Keep the same face and features from the reference photo. Dress the subject in an intricately embroidered traditional outfit with gold thread detailing. Golden-hour light, shallow depth of field, marigold flowers softly blurred in the background. Warm, cinematic color grade with gentle film grain."
  },
  {
    title: "City-of-the-world scene",
    tag: "Travel",
    category: "Travel",
    image: "assets/samples/City-of-the-world-scene.jpeg",
    seoSlug: "city-of-the-world-scene",
    badge: "Featured",
    text: "Place the subject from the reference photo into a rainy evening street in Tokyo's Shinjuku district, neon signs reflecting on wet pavement. Cinematic wide shot, shallow depth of field, subject holding a clear umbrella. Preserve the subject's exact face and proportions while matching the ambient neon color temperature on their skin."
  },
  {
    title: "Isometric room diorama",
    tag: "3D scene",
    category: "3D",
    image: "assets/samples/Isometric-room-diorama.jpeg",
    seoSlug: "isometric-room-diorama",
    text: "A cutaway isometric diorama of a cozy reading nook: a window seat with cushions, tall bookshelf, hanging plant, and a cat curled up asleep. Soft pastel color palette, clean vector-style shading, subtle drop shadows, presented like a miniature dollhouse cross-section on a plain background."
  },
  {
    title: "Retro film restoration",
    tag: "Restoration",
    category: "Photo Editing",
    image: "assets/samples/Retro-film-restoration.jpeg",
    seoSlug: "retro-film-restoration",
    text: "Restore and colorize this old, faded photograph. Repair scratches, dust, and creases, sharpen fine detail on the faces, and apply natural, historically accurate skin tones and clothing colors. Keep the original grain and composition; do not alter anyone's face shape or expression."
  },
  {
    title: "Infographic poster",
    tag: "Text & layout",
    category: "Graphic Design",
    image: "assets/samples/Infographic-poster.jpeg",
    seoSlug: "infographic-poster",
    badge: "Featured",
    text: "Design a clean educational poster titled 'The Water Cycle' with crisp, legible headline text. Include four labeled stages — evaporation, condensation, precipitation, collection — each with a small illustrated icon and one short caption line. Soft blue-and-white palette, generous whitespace, flat modern illustration style."
  },
  {
    title: "Hand-painted animated scene",
    tag: "Illustration",
    category: "Illustration",
    image: "assets/samples/Hand-painted-animated-scene.jpeg",
    seoSlug: "hand-painted-animated-scene",
    badge: "Featured",
    text: "Redraw this photo as a hand-painted animated film scene: soft watercolor backgrounds, warm natural light, gentle painterly linework on the characters, and a lightly hazy, nostalgic atmosphere. Keep the composition and the subject's pose exactly as in the original photo."
  },
  {
    title: "Claymation character",
    tag: "3D style",
    category: "3D",
    image: "assets/samples/Claymation-character.jpeg",
    seoSlug: "claymation-character",
    text: "Reimagine the subject as a stop-motion claymation character, with visible fingerprint texture on the clay, slightly asymmetrical hand-sculpted features, and a matte plasticine finish. Set against a miniature handcrafted set with warm tungsten lighting, like a frame from a classic clay-animation film."
  },
  {
    title: "Vintage travel poster",
    tag: "Poster",
    category: "Graphic Design",
    image: "assets/samples/Vintage-travel-poster.jpeg",
    seoSlug: "vintage-travel-poster",
    badge: "Featured",
    text: "Design a mid-century travel poster for a coastal town, in the style of 1960s tourism prints: flat bold color blocks, simplified geometric shapes for the cliffs and sailboats, a warm sunset gradient sky, and elegant condensed lettering for the destination name integrated cleanly into the composition."
  },
  {
    title: "Product mockup",
    tag: "Product",
    category: "Product",
    image: "assets/samples/Product-mockup.jpeg",
    seoSlug: "product-mockup",
    badge: "Featured",
    text: "Photorealistic studio product shot of a matte ceramic coffee mug on a marble surface, soft top-down natural light, subtle reflection, steam rising gently from the coffee. Minimal styling: one small spoon and a few coffee beans scattered nearby. Clean, neutral background suitable for an e-commerce listing."
  },
  {
    title: "Editorial comic panel",
    tag: "Comic",
    category: "Illustration",
    image: "assets/samples/Editorial-comic-panel.jpeg",
    seoSlug: "editorial-comic-panel",
    text: "A single comic-book panel drawn in a bold mid-century pulp-adventure style: dynamic diagonal composition, halftone shading, a punchy limited color palette of red, cream, and navy, and one short exclamatory caption box in the corner. Thick expressive linework around the main figure."
  },
  {
    title: "Architectural render",
    tag: "Interior",
    category: "Architecture",
    text: "Photorealistic interior render of a minimalist Japandi-style living room: light oak flooring, low-profile furniture, a single potted olive tree, linen curtains diffusing soft afternoon light. Neutral warm palette, clean symmetrical composition, magazine-quality lighting and reflections."
  },
  {
    title: "Pixel-art icon set",
    tag: "Icon design",
    category: "Graphic Design",
    text: "A set of six 32x32 pixel-art icons for a cozy farming game: a watering can, a sprouting seed, a wooden fence, a barn, a sun, and a basket of vegetables. Consistent limited color palette, crisp pixel edges, soft outer glow on each icon, arranged in a neat grid on a transparent background."
  },
  {
    title: "Print-quality document scan",
    tag: "Document restoration",
    category: "Document",
    text: "Make a soft copy of this document. Flatten the page by removing perspective distortion, shadows, and wrinkles. Make the background pure white and sharpen all printed text. Preserve every character, barcode, seal, signature, and stamp exactly. Produce a print-quality scan that looks like it came directly from a scanner."
  },
  {
    title: "Professional passport portrait",
    tag: "Passport photo",
    category: "Portrait",
    image: "assets/samples/Professional-passport-portrait.jpeg",
    seoSlug: "professional-passport-portrait",
    text: "Create an ultra-realistic, high-resolution passport-size portrait of the man from the reference image, preserving his exact face, facial structure, skin tone, proportions, eyes, nose, lips, jawline, eyebrows, and all unique facial features without any modifications. The identity must remain identical to the reference photo. He is facing directly toward the camera with a neutral, natural expression, and both eyes fully open. His head is perfectly centered with official passport-style framing, showing the shoulders and upper chest. Maintain natural skin texture with realistic pores and soft complexion—avoid excessive beauty filters or artificial smoothing. Style his hair with a neat, professional taper cut. The hair should be deep jet black, naturally styled, slightly shorter on the sides and neatly trimmed on top, suitable for a professional passport portrait. If applicable, keep neat, well-groomed facial hair (such as a clean, natural-looking five o'clock shadow). He is wearing a crisp plain white collared shirt with no patterns or logos. Use a pure white seamless studio background with soft, even lighting from both sides to eliminate harsh shadows. Ensure balanced exposure, true-to-life skin tones, sharp focus on the eyes, and high facial detail. The image should look like it was captured using a professional DSLR camera with an 85mm portrait lens, featuring realistic depth, natural color grading, studio-quality lighting, and ultra-high resolution."
  },
  {
    title: "Cinematic color grading",
    tag: "Color grading",
    category: "Photo Editing",
    image: "assets/samples/Cinematic-color-grading.jpeg",
    seoSlug: "cinematic-color-grading",
    text: "Transform the uploaded photo into a premium, ultra-realistic professional photograph. Preserve the person's identity, facial features, hairstyle, clothing, pose, and background exactly as in the original image. Apply high-end cinematic color grading with natural skin tones, rich contrast, balanced exposure, HDR, deep blacks, soft highlights, vibrant yet realistic colors, subtle warm golden highlights, cool shadows, premium teal-and-orange cinematic tones (very light), DSLR-quality dynamic range, crystal-clear sharpness, realistic skin texture, depth of field, realistic lighting, soft bloom, premium Adobe Lightroom color science, Apple iPhone 16 Pro + Sony AI camera look, 85mm f/1.4 lens, ultra-detailed, noise-free, realistic shadows, natural white balance, editorial photography style, luxury magazine quality, 8K resolution, masterpiece. Do not oversaturate, do not change the person's face, body, clothing, or background composition. Keep everything natural and photorealistic."
  },
  {
    title: "Floral birthday poster",
    tag: "Birthday poster",
    category: "Graphic Design",
    image: "assets/samples/Floral-birthday-poster.jpeg",
    seoSlug: "floral-birthday-poster",
    text: "Create a premium birthday poster featuring a young Indian woman in a pink ethnic outfit, standing in front of oversized teal 'HAPPY BIRTHDAY' typography on a soft textured white paper background. Add pastel floral illustrations, a pink hibiscus flower, blue forget-me-nots, delicate butterfly, heart doodles, and elegant curved line art. Use soft natural lighting, minimal aesthetic design, clean composition, high detail, Instagram-ready, 4:5 ratio."
  },
  {
    title: "Clear mirror photo",
    tag: "Photo cleanup",
    category: "Photo Editing",
    image: "assets/samples/Clear-mirror-photo.jpeg",
    seoSlug: "clear-mirror-photo",
    text: "Clean mirror smudges and dirt, and enhance clarity, sharpness, and lighting. Keep my face, body, features, and proportions exactly the same. Make it look like a crisp, high-quality iPhone photo that is natural and realistic—not AI-generated."
  },
  {
    title: "Premium photo enhancement",
    tag: "Photo enhancement",
    category: "Photo Editing",
    image: "assets/samples/Premium-photo-enhancement.jpeg",
    seoSlug: "premium-photo-enhancement",
    text: "Turn this image into an ultra-realistic 8K DSLR-quality photo while keeping the subject and original look natural. Improve framing and composition automatically if needed using professional photography rules. Add realistic high-end background blur with smooth creamy bokeh and natural depth of field. Enhance lighting intelligently based on the scene with cinematic soft light, realistic shadows, natural skin tones, and subtle glow. Improve sharpness, textures, colors, and details while keeping everything realistic and premium, like a photo shot on an expensive DSLR or flagship iPhone camera. Avoid overediting, fake HDR, plastic skin, or AI-looking effects."
  },
  {
    title: "Restore old photos",
    tag: "Photo restoration",
    category: "Photo Editing",
    image: "assets/samples/Restore-old-photos.jpeg",
    seoSlug: "restore-old-photos",
    text: "Create an ultra-high-resolution 4K restoration of the original image, preserving its exact composition and subject integrity. Enhance fine details to maximum clarity, including skin texture, fabric fibers, surface imperfections, micro-details, and environmental elements. Apply advanced denoising, remove compression artifacts, and eliminate grain while retaining natural texture. Restore damaged or aged areas with realistic reconstruction, including scratches, fading, blur, and motion artifacts. Improve sharpness while keeping the result natural and faithful to the original photo."
  }
];
