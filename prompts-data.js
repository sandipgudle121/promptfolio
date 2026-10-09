// Promptography — prompt catalog
// Add new prompts by pushing another object into the matching model's `prompts` array.
// Each prompt needs: title, tag (short category), text (the full prompt).

const PROMPT_DATA = [
  {
    id: "gemini",
    name: "Gemini",
    maker: "Google · Nano Banana",
    accent: "#8AB4F8",
    accent2: "#C58AF9",
    blurb: "Strong at photo edits, likeness, and turning a selfie into a whole new scene.",
    prompts: [
      {
        title: "3D shelf figurine",
        tag: "Figurine",
        text: "Turn the uploaded photo into a 1/7 scale collectible figurine standing on a desk. Realistic PVC material, soft studio lighting, visible sculpted details on clothing and hair. Place it on a circular acrylic base in front of its own product packaging box, the box art showing a stylized illustration of the same character. Add a computer monitor blurred in the background."
      },
      {
        title: "Studio headshot",
        tag: "Portrait",
        text: "Professional corporate headshot of the person in the reference photo. Plain light-grey seamless background, soft diffused key light from the front-left, gentle fill from the right. Sharp focus on the eyes, natural skin texture, no heavy retouching. Shot on an 85mm lens at f/4 with a shallow depth of field. Neutral, confident expression."
      },
      {
        title: "Festival portrait",
        tag: "Fashion",
        text: "Keep the same face and features from the reference photo. Dress the subject in an intricately embroidered traditional outfit with gold thread detailing. Golden-hour light, shallow depth of field, marigold flowers softly blurred in the background. Warm, cinematic color grade with gentle film grain."
      },
      {
        title: "City-of-the-world scene",
        tag: "Travel",
        text: "Place the subject from the reference photo into a rainy evening street in Tokyo's Shinjuku district, neon signs reflecting on wet pavement. Cinematic wide shot, shallow depth of field, subject holding a clear umbrella. Preserve the subject's exact face and proportions while matching the ambient neon color temperature on their skin."
      },
      {
        title: "Isometric room diorama",
        tag: "3D scene",
        text: "A cutaway isometric diorama of a cozy reading nook: a window seat with cushions, tall bookshelf, hanging plant, and a cat curled up asleep. Soft pastel color palette, clean vector-style shading, subtle drop shadows, presented like a miniature dollhouse cross-section on a plain background."
      },
      {
        title: "Retro film restoration",
        tag: "Restoration",
        text: "Restore and colorize this old, faded photograph. Repair scratches, dust, and creases, sharpen fine detail on the faces, and apply natural, historically accurate skin tones and clothing colors. Keep the original grain and composition; do not alter anyone's face shape or expression."
      },
      {
        title: "Infographic poster",
        tag: "Text & layout",
        text: "Design a clean educational poster titled 'The Water Cycle' with crisp, legible headline text. Include four labeled stages — evaporation, condensation, precipitation, collection — each with a small illustrated icon and one short caption line. Soft blue-and-white palette, generous whitespace, flat modern illustration style."
      }
    ]
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    maker: "OpenAI · GPT Image",
    accent: "#74AA9C",
    accent2: "#B7D9B1",
    blurb: "Great for stylized illustration, brand-safe compositions, and precise instruction-following.",
    prompts: [
      {
        title: "Studio Ghibli scene",
        tag: "Illustration",
        text: "Redraw this photo in the style of a hand-painted Studio Ghibli film still: soft watercolor backgrounds, warm natural light, gentle painterly linework on the characters, and a lightly hazy, nostalgic atmosphere. Keep the composition and the subject's pose exactly as in the original photo."
      },
      {
        title: "Claymation character",
        tag: "3D style",
        text: "Reimagine the subject as a stop-motion claymation character, with visible fingerprint texture on the clay, slightly asymmetrical hand-sculpted features, and a matte plasticine finish. Set against a miniature handcrafted set with warm tungsten lighting, like a frame from a classic clay-animation film."
      },
      {
        title: "Vintage travel poster",
        tag: "Poster",
        text: "Design a mid-century travel poster for a coastal town, in the style of 1960s tourism prints: flat bold color blocks, simplified geometric shapes for the cliffs and sailboats, a warm sunset gradient sky, and elegant condensed lettering for the destination name integrated cleanly into the composition."
      },
      {
        title: "Product mockup",
        tag: "Product",
        text: "Photorealistic studio product shot of a matte ceramic coffee mug on a marble surface, soft top-down natural light, subtle reflection, steam rising gently from the coffee. Minimal styling: one small spoon and a few coffee beans scattered nearby. Clean, neutral background suitable for an e-commerce listing."
      },
      {
        title: "Editorial comic panel",
        tag: "Comic",
        text: "A single comic-book panel drawn in a bold mid-century pulp-adventure style: dynamic diagonal composition, halftone shading, a punchy limited color palette of red, cream, and navy, and one short exclamatory caption box in the corner. Thick expressive linework around the main figure."
      },
      {
        title: "Architectural render",
        tag: "Interior",
        text: "Photorealistic interior render of a minimalist Japandi-style living room: light oak flooring, low-profile furniture, a single potted olive tree, linen curtains diffusing soft afternoon light. Neutral warm palette, clean symmetrical composition, magazine-quality lighting and reflections."
      },
      {
        title: "Pixel-art icon set",
        tag: "Icon design",
        text: "A set of six 32x32 pixel-art icons for a cozy farming game: a watering can, a sprouting seed, a wooden fence, a barn, a sun, and a basket of vegetables. Consistent limited color palette, crisp pixel edges, soft outer glow on each icon, arranged in a neat grid on a transparent background."
      }
    ]
  }
];
