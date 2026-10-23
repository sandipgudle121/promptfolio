// Promptfolio — unified prompt catalog
// Add new prompt objects directly to this array.
// Each prompt needs: title, tag, category, and text. Add an optional `image` path for a sample image.

const PROMPT_DATA = [
  {
    title: "3D shelf figurine",
    tag: "Figurine",
    category: "3D",
    image: "assets/samples/3d-shelf-figurine.jpeg",
    badge: "Featured",
    text: "Turn the uploaded photo into a 1/7 scale collectible figurine standing on a desk. Realistic PVC material, soft studio lighting, visible sculpted details on clothing and hair. Place it on a circular acrylic base in front of its own product packaging box, the box art showing a stylized illustration of the same character. Add a computer monitor blurred in the background."
  },
  {
    title: "Studio headshot",
    tag: "Portrait",
    category: "Portrait",
    image: "assets/samples/Studio-headshot.jpeg",
    badge: "Featured",
    text: "Professional corporate headshot of the person in the reference photo. Plain light-grey seamless background, soft diffused key light from the front-left, gentle fill from the right. Sharp focus on the eyes, natural skin texture, no heavy retouching. Shot on an 85mm lens at f/4 with a shallow depth of field. Neutral, confident expression."
  },
  {
    title: "Festival portrait",
    tag: "Fashion",
    category: "Portrait",
    image: "assets/samples/Festival-portrait.jpeg",
    text: "Keep the same face and features from the reference photo. Dress the subject in an intricately embroidered traditional outfit with gold thread detailing. Golden-hour light, shallow depth of field, marigold flowers softly blurred in the background. Warm, cinematic color grade with gentle film grain."
  },
  {
    title: "City-of-the-world scene",
    tag: "Travel",
    category: "Travel",
    image: "assets/samples/City-of-the-world-scene.jpeg",
    badge: "Featured",
    text: "Place the subject from the reference photo into a rainy evening street in Tokyo's Shinjuku district, neon signs reflecting on wet pavement. Cinematic wide shot, shallow depth of field, subject holding a clear umbrella. Preserve the subject's exact face and proportions while matching the ambient neon color temperature on their skin."
  },
  {
    title: "Isometric room diorama",
    tag: "3D scene",
    category: "3D",
    image: "assets/samples/Isometric-room-diorama.jpeg",
    text: "A cutaway isometric diorama of a cozy reading nook: a window seat with cushions, tall bookshelf, hanging plant, and a cat curled up asleep. Soft pastel color palette, clean vector-style shading, subtle drop shadows, presented like a miniature dollhouse cross-section on a plain background."
  },
  {
    title: "Retro film restoration",
    tag: "Restoration",
    category: "Photo Editing",
    image: "assets/samples/Retro-film-restoration.jpeg",
    text: "Restore and colorize this old, faded photograph. Repair scratches, dust, and creases, sharpen fine detail on the faces, and apply natural, historically accurate skin tones and clothing colors. Keep the original grain and composition; do not alter anyone's face shape or expression."
  },
  {
    title: "Infographic poster",
    tag: "Text & layout",
    category: "Graphic Design",
    image: "assets/samples/Infographic-poster.jpeg",
    badge: "Featured",
    text: "Design a clean educational poster titled 'The Water Cycle' with crisp, legible headline text. Include four labeled stages — evaporation, condensation, precipitation, collection — each with a small illustrated icon and one short caption line. Soft blue-and-white palette, generous whitespace, flat modern illustration style."
  },
  {
    title: "Hand-painted animated scene",
    tag: "Illustration",
    category: "Illustration",
    image: "assets/samples/Hand-painted-animated-scene.jpeg",
    badge: "Featured",
    text: "Redraw this photo as a hand-painted animated film scene: soft watercolor backgrounds, warm natural light, gentle painterly linework on the characters, and a lightly hazy, nostalgic atmosphere. Keep the composition and the subject's pose exactly as in the original photo."
  },
  {
    title: "Claymation character",
    tag: "3D style",
    category: "3D",
    image: "assets/samples/Claymation-character.jpeg",
    text: "Reimagine the subject as a stop-motion claymation character, with visible fingerprint texture on the clay, slightly asymmetrical hand-sculpted features, and a matte plasticine finish. Set against a miniature handcrafted set with warm tungsten lighting, like a frame from a classic clay-animation film."
  },
  {
    title: "Vintage travel poster",
    tag: "Poster",
    category: "Graphic Design",
    image: "assets/samples/Vintage-travel-poster.jpeg",
    badge: "Featured",
    text: "Design a mid-century travel poster for a coastal town, in the style of 1960s tourism prints: flat bold color blocks, simplified geometric shapes for the cliffs and sailboats, a warm sunset gradient sky, and elegant condensed lettering for the destination name integrated cleanly into the composition."
  },
  {
    title: "Product mockup",
    tag: "Product",
    category: "Product",
    image: "assets/samples/Product-mockup.jpeg",
    badge: "Featured",
    text: "Photorealistic studio product shot of a matte ceramic coffee mug on a marble surface, soft top-down natural light, subtle reflection, steam rising gently from the coffee. Minimal styling: one small spoon and a few coffee beans scattered nearby. Clean, neutral background suitable for an e-commerce listing."
  },
  {
    title: "Editorial comic panel",
    tag: "Comic",
    category: "Illustration",
    image: "assets/samples/Editorial-comic-panel.jpeg",
    text: "A single comic-book panel drawn in a bold mid-century pulp-adventure style: dynamic diagonal composition, halftone shading, a punchy limited color palette of red, cream, and navy, and one short exclamatory caption box in the corner. Thick expressive linework around the main figure."
  },
  {
    title: "Architectural render",
    tag: "Interior",
    category: "Architecture",
    image: "assets/samples/Architectural-render.jpeg",
    text: "Photorealistic interior render of a minimalist Japandi-style living room: light oak flooring, low-profile furniture, a single potted olive tree, linen curtains diffusing soft afternoon light. Neutral warm palette, clean symmetrical composition, magazine-quality lighting and reflections."
  },
  {
    title: "Pixel-art icon set",
    tag: "Icon design",
    category: "Graphic Design",
    image: "assets/samples/Pixel-art-icon-set.jpeg",
    text: "A set of six 32x32 pixel-art icons for a cozy farming game: a watering can, a sprouting seed, a wooden fence, a barn, a sun, and a basket of vegetables. Consistent limited color palette, crisp pixel edges, soft outer glow on each icon, arranged in a neat grid on a transparent background."
  },
  {
    title: "Print-quality document scan",
    tag: "Document restoration",
    category: "Document",
    image: "assets/samples/Print-quality-document-scan.jpeg",
    text: "Make a soft copy of this document. Flatten the page by removing perspective distortion, shadows, and wrinkles. Make the background pure white and sharpen all printed text. Preserve every character, barcode, seal, signature, and stamp exactly. Produce a print-quality scan that looks like it came directly from a scanner."
  },
  {
    title: "Professional passport portrait",
    tag: "Passport photo",
    category: "Portrait",
    image: "assets/samples/Professional-passport-portrait.jpeg",
    text: "Create an ultra-realistic, high-resolution passport-size portrait of the man from the reference image, preserving his exact face, facial structure, skin tone, proportions, eyes, nose, lips, jawline, eyebrows, and all unique facial features without any modifications. The identity must remain identical to the reference photo. He is facing directly toward the camera with a neutral, natural expression, and both eyes fully open. His head is perfectly centered with official passport-style framing, showing the shoulders and upper chest. Maintain natural skin texture with realistic pores and soft complexion—avoid excessive beauty filters or artificial smoothing. Style his hair with a neat, professional taper cut. The hair should be deep jet black, naturally styled, slightly shorter on the sides and neatly trimmed on top, suitable for a professional passport portrait. If applicable, keep neat, well-groomed facial hair (such as a clean, natural-looking five o'clock shadow). He is wearing a crisp plain white collared shirt with no patterns or logos. Use a pure white seamless studio background with soft, even lighting from both sides to eliminate harsh shadows. Ensure balanced exposure, true-to-life skin tones, sharp focus on the eyes, and high facial detail. The image should look like it was captured using a professional DSLR camera with an 85mm portrait lens, featuring realistic depth, natural color grading, studio-quality lighting, and ultra-high resolution."
  },
  {
    title: "Cinematic color grading",
    tag: "Color grading",
    category: "Photo Editing",
    image: "assets/samples/Cinematic-color-grading.jpeg",
    text: "Transform the uploaded photo into a premium, ultra-realistic professional photograph. Preserve the person's identity, facial features, hairstyle, clothing, pose, and background exactly as in the original image. Apply high-end cinematic color grading with natural skin tones, rich contrast, balanced exposure, HDR, deep blacks, soft highlights, vibrant yet realistic colors, subtle warm golden highlights, cool shadows, premium teal-and-orange cinematic tones (very light), DSLR-quality dynamic range, crystal-clear sharpness, realistic skin texture, depth of field, realistic lighting, soft bloom, premium Adobe Lightroom color science, Apple iPhone 16 Pro + Sony AI camera look, 85mm f/1.4 lens, ultra-detailed, noise-free, realistic shadows, natural white balance, editorial photography style, luxury magazine quality, 8K resolution, masterpiece. Do not oversaturate, do not change the person's face, body, clothing, or background composition. Keep everything natural and photorealistic."
  },
  {
    title: "Floral birthday poster",
    tag: "Birthday poster",
    category: "Graphic Design",
    image: "assets/samples/Floral-birthday-poster.jpeg",
    text: "Create a premium birthday poster featuring a young Indian woman in a pink ethnic outfit, standing in front of oversized teal 'HAPPY BIRTHDAY' typography on a soft textured white paper background. Add pastel floral illustrations, a pink hibiscus flower, blue forget-me-nots, delicate butterfly, heart doodles, and elegant curved line art. Use soft natural lighting, minimal aesthetic design, clean composition, high detail, Instagram-ready, 4:5 ratio."
  },
  {
    title: "Clear mirror photo",
    tag: "Photo cleanup",
    category: "Photo Editing",
    image: "assets/samples/Clear-mirror-photo.jpeg",
    text: "Clean mirror smudges and dirt, and enhance clarity, sharpness, and lighting. Keep my face, body, features, and proportions exactly the same. Make it look like a crisp, high-quality iPhone photo that is natural and realistic—not AI-generated."
  },
  {
    title: "Premium photo enhancement",
    tag: "Photo enhancement",
    category: "Photo Editing",
    image: "assets/samples/Premium-photo-enhancement.jpeg",
    text: "Turn this image into an ultra-realistic 8K DSLR-quality photo while keeping the subject and original look natural. Improve framing and composition automatically if needed using professional photography rules. Add realistic high-end background blur with smooth creamy bokeh and natural depth of field. Enhance lighting intelligently based on the scene with cinematic soft light, realistic shadows, natural skin tones, and subtle glow. Improve sharpness, textures, colors, and details while keeping everything realistic and premium, like a photo shot on an expensive DSLR or flagship iPhone camera. Avoid overediting, fake HDR, plastic skin, or AI-looking effects."
  },
  {
    title: "Restore old photos",
    tag: "Photo restoration",
    category: "Photo Editing",
    image: "assets/samples/Restore-old-photos.jpeg",
    text: "Create an ultra-high-resolution 4K restoration of the original image, preserving its exact composition and subject integrity. Enhance fine details to maximum clarity, including skin texture, fabric fibers, surface imperfections, micro-details, and environmental elements. Apply advanced denoising, remove compression artifacts, and eliminate grain while retaining natural texture. Restore damaged or aged areas with realistic reconstruction, including scratches, fading, blur, and motion artifacts. Improve sharpness while keeping the result natural and faithful to the original photo."
  },
  {
    title: "Editorial photo poster",
    tag: "Editorial poster",
    category: "Graphic Design",
    image: "assets/samples/Editorial-photo-poster.jpeg",
    text: "Each uploaded photo must become a separate, independent premium editorial poster; never combine multiple photos. Use a strict 3:4 vertical canvas, split horizontally at the exact center into two equally wide and equally high halves, each occupying 50% of the canvas height without changing proportions.\n\nUse the original photo directly in the upper half; do not regenerate it. Preserve the main subject's identity, human body or architectural structure, proportions, perspective, spatial relationships, texture, natural light and shadow, color, and environment. Permit only slight cropping and restrained premium color grading. Do not redraw the main subject or add fictional light or content, HDR, excessive saturation, or plastic texture. To adapt the frame, extend only environmental areas such as sky, water, ground, walls, plants, or background.\n\nIn the lower half, extract and reconstruct the photo's narrative core: a primary subject or related group of elements that conveys the photo's identity, scale, action, or story. Preserve realistic, recognizable appearance, proportion, internal structure, texture, and relative positions. Do not remove important related elements or use rectangular photo cutouts. The subject should occupy about 55%-80% of the lower half's width, extend naturally along the photo's primary direction, and retain plausible ground, water lines, shadows, or softly dissipated edges so it integrates with the background instead of looking like a sticker or floating.\n\nPlace one narrow, low-saturation geometric color field behind or through the subject as a critical window between reality and editorial abstraction. Extract its color from the original photo and choose a horizontal, vertical, or diagonal orientation to suit the narrative. The subject must actively pass through the window, partly inside the color field and partly in open negative space, crossing its boundary to create occlusion, penetration, and depth. The window is not a frame or card and must not enclose the subject. Do not use multiple color blocks, thick borders, rounded corners, strong gradients, or drop shadows.\n\nUse a white, cool-white, very light gray, or near-white lower-half background coordinated with the photo. Use restrained asymmetry and abundant negative space to create a three-tier hierarchy: reconstructed subject or narrative composition; low-saturation geometric window; open negative space and near-white background."
  },
  {
    title: "Travel editorial collage",
    tag: "Travel collage",
    category: "Graphic Design",
    image: "assets/samples/Travel-editorial-collage.jpeg",
    text: "Transform the uploaded photograph into a premium minimalist editorial collage inspired by luxury travel magazines, contemporary fashion editorials, and artistic outdoor photography. Create a strict 3:4 vertical canvas with a warm ivory or off-white background, subtle paper texture, and generous negative space. Place a large, clean-edged vertical crop of the original photograph in the center, slightly above the middle, keeping the original scenery recognizable inside it. Let the main subject naturally overlap and extend beyond the crop's bottom edge into the ivory space. Where natural, allow foreground flowers, grass, foliage, or rocks to extend beyond the frame as realistic photographic cutouts. Keep the layout asymmetrical but balanced, with the subject as the focal point.\n\nUse the uploaded photo as the source. Keep the subject as faithful to the original as possible: preserve identity, face, expression, hair, clothing, pose, proportions, colors, and distinctive details. Do not beautify, redesign, or stylize the subject. Preserve the original landscape, lighting, textures, and atmosphere. Do not crop off important parts of the subject.\n\nUse a photorealistic premium travel-editorial style with minimalist Swiss-inspired art direction, warm ivory paper, muted earthy colors, natural greens, dusty blues, subtle film grain, realistic edges, and soft, believable shadows.\n\nDo not add text, typography, logos, watermarks, extra subjects, or unrelated objects. Avoid illustration, cartoon effects, HDR, oversaturation, artificial glow, plastic textures, exaggerated shadows, and distorted proportions. If preserving the original subject conflicts with the layout, prioritize the subject. The final result should be a refined, photorealistic editorial collage with a vertical rectangular photo and the original subject or natural foreground breaking the frame into the surrounding ivory negative space."
  },
  {
    title: "4K photo upscaling with background blur",
    tag: "4K upscaling",
    category: "Photo Editing",
    image: "assets/samples/4K-photo-upscaling-with-background-blur.jpeg",
    text: "Upscale the reference image to ultra-high-resolution 4K with absolute fidelity to the original facial anatomy, proportions, and identity. Maintain the original expression, gaze, pose, camera angle, framing, and perspective without distortion. Keep clothing, hair, skin, and all image elements unchanged in structure, placement, and design. Restore fine detail with natural realism, including pores, fine lines, hair strands, eyelashes, fabric weaves, seams, and material edges, without stylization or invented details. Preserve the original color science, white balance, and tonal relationships. Match the source lighting direction, intensity, contrast, and shadows; do not relight or reshape. Remove noise and compression artifacts, and apply controlled sharpening to reconstruct high-frequency detail while retaining authentic texture. Avoid smoothing, plastic skin, artificial shine, facial shifts, anatomy changes, hand changes, perspective shifts, text, graphics, and stylized rendering. Keep facial features consistent with coherent anatomy and clean, stable edges.\n\nAdd natural DSLR- or mirrorless-style depth-of-field blur to the background, keeping the main subject sharp and unchanged. If foreground elements are present, blur them as well. The final image should remain photorealistic and match the reference in every other respect, only clearer, sharper, higher-resolution, and with the requested foreground and background blur."
  },
  {
    title: "Watercolor and ink photo illustration",
    tag: "Watercolor illustration",
    category: "Illustration",
    image: "assets/samples/Watercolor-and-ink-photo-illustration.jpeg",
    text: "Transform the uploaded photo into a minimalist, hand-painted watercolor and ink illustration on warm, textured off-white paper. Preserve the original subject, pose, clothing, proportions, and recognizable details. Use delicate hand-drawn lines, loose watercolor washes, subtle brush marks, and no more than four dominant colors drawn from the original photo. Keep the illustration small and centered in the lower-middle area, with generous empty paper space above. Simplify the background into a few expressive shapes. Create a quiet, poetic, premium art-book-cover aesthetic with natural paper grain, organic edges, and handmade imperfections. Use a vertical 3:4 composition.\n\nAvoid photorealism, excessive detail, busy backgrounds, and unnecessary text."
  },
  {
    title: "Dreamy golden-olive portrait",
    tag: "Cinematic portrait",
    category: "Portrait",
    image: "assets/samples/Dreamy-golden-olive-portrait.jpeg",
    text: "Create a dreamy, cinematic DSLR-style portrait with an 85mm lens and an f/1.4 shallow-depth-of-field aesthetic. Keep the subject sharp and photorealistic, with strong background separation, soft halo-like blur, and creamy circular bokeh. Use warm golden-olive color grading with muted forest greens, yellow-green highlights, and deep charcoal shadows. Add soft golden sunlight, atmospheric haze, subtle vintage film grain, soft contrast, and gently lifted shadows while keeping skin tones natural and balanced.\n\nKeep the overall image high-resolution and realistic, not artificial or AI-looking. Avoid an all-over yellow cast, HDR, oversaturation, and distortion."
  }
];
