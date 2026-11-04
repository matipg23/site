# Intro storyboard (draft 2, built)

Built in `src/components/sections/Intro.tsx`. Preview at `/intro` while `npm run dev` is running.

Length: 17.5 s. Format: in-code GSAP sequence, a full-viewport overlay that resolves into the redesigned Hero.
Sources: the Figma redesign screenshots (Home, About, the Alignment Program case study and the AI infrastructure deck) and `Hero.tsx`.

What changed from draft 1: the story is now about Mati the person, not about design systems as a topic. Systems appear as one chapter of a life rather than the whole subject.

## The story in one line

Where he's from, how he got here, how he leads, what he's built, what he believes, and who he is.

| # | Time | Headline (first person) | Chapter |
|---|------|-------------------------|---------|
| 1 | 0.0 to 2.8 | HOLA. OLÁ. HELLO. | Roots |
| 2 | 2.8 to 5.6 | I CAME TO DESIGN THROUGH CODE. | Path |
| 3 | 5.6 to 8.6 | I LEAD FROM THE FRONT. | Character |
| 4 | 8.6 to 12.2 | SYSTEMS FOR FANDUEL, NEWS UK AND NUTMEG. | Work |
| 5 | 12.2 to 14.8 | SYSTEMS WORK IS PEOPLE WORK. | Belief |
| 6 | 14.8 to 17.5 | MATIAS PEINADO GRECO | Lockup (the Hero) |

Every line comes from your own About and case-study copy, shortened. Nothing is invented.

---

## Visual language (from the Figma redesign)

- Light page: white with near-black type. One dark scene (3) for rhythm.
- Display: the wide, heavy italic face from the redesign (name and section titles). **Font name needed, see the questions below.**
- Accent: the deep teal from the redesign buttons and labels, used for rules, carets and one fill.
- Mono labels: small, tracked, uppercase, like `PRODUCT DESIGN / DESIGN SYSTEMS`.
- Ghost type: huge light-grey numerals and the `MPG` monogram, as on Home and About.
- Structure: thin horizontal rules, as in the redesign.

---

## Scene 1 · 0.0 to 2.8 s · HOLA. OLÁ. HELLO.

**Visual.** White. A thin teal rule draws left to right with three ticks on it, labelled in mono `AR`, `BR`, `UK`. At each tick, a greeting lands in the wide italic: "HOLA." then "OLÁ." then "HELLO.", each replacing the last with a fast vertical slot-roll.
**Why.** You grew up across Argentina, Brazil and the UK and speak all three languages. The first thing a visitor hears from you is you, in your own three voices.
**Motion.** Rule `scaleX` over 2.2 s in three eased steps that pause on each tick. Greetings roll on `yPercent` (100 to 0 to -100, 0.35 s each) with a slight `skewX` while moving that settles to 0.
**Transition to 2.** The UK tick stops blinking and turns into the text caret for scene 2.
**Surprise.** A route line doubling as a typing caret.

## Scene 2 · 2.8 to 5.6 s · I CAME TO DESIGN THROUGH CODE.

**Visual.** The caret types a mono line: `> computer_science`, then `> art_direction`, then `> product_design`. Each line strikes through as the next appears, which is your real path. Then the final word "DESIGN" swells from mono into the wide italic display, as if code compiles into type.
**Headline.** "I CAME TO DESIGN THROUGH CODE." assembles around the swollen word.
**Motion.** Typing at roughly 28 chars/s. The font swap from mono to display is a crossfade plus a scale on one masked word (0.5 s, `expo.out`).
**Transition to 3.** The headline whips out to the left with motion blur. Its streaks remain as white horizontal lines on a black field.
**Surprise.** Mono type becoming display type is your design-engineer profile in one gesture, and it sets up the AI thread in scene 5.

## Scene 3 · 5.6 to 8.6 s · I LEAD FROM THE FRONT.

**Visual.** The single dark scene. The streak lines settle into yard lines receding in perspective, with mono yard numbers `10 20 30`. The headline lands big and italic across the field. A mono caption reads `CAPTAIN · AMERICAN FOOTBALL`.
**Why.** This comes from your About page: you captained American football teams, and that's where your leadership principle comes from. It's the most human fact you have, and no other design-systems portfolio will open with it.
**Motion.** The camera pushes forward through the yard lines (`scale` and `translateZ` on a perspective container, 2.4 s, `power2.inOut`). The headline enters with a hard horizontal slide and italic overshoot, an athletic move.
**Transition to 4.** The yard lines flatten back into horizontal rules on white. The field becomes a list.
**Surprise.** The redesign's structural device (horizontal rules) turns out to have been a football pitch.

## Scene 4 · 8.6 to 12.2 s · SYSTEMS FOR FANDUEL, NEWS UK AND NUTMEG.

**Visual.** The rules become the redesign's Case Studies list. Ghost numerals `01` to `04` roll up like a scoreboard. Each row flashes its real headline in the wide italic:
- 01 · Scaling trust, not just components (FanDuel)
- 02 · Formation: a multi-brand token system at scale (FanDuel)
- 03 · NewsKit: The Times, The Sun, Wireless Group (News UK)
- 04 · Investment experiences for 150K+ customers (Nutmeg)
**Headline.** "SYSTEMS FOR FANDUEL, NEWS UK AND NUTMEG." sits above the list, with a mono `6+ YEARS` counter ticking up from 0.
**Motion.** Rows enter with a 0.12 s stagger. Each row's headline is visible for about 0.7 s, then compresses to a single line as the next one opens, like an accordion played at speed.
**Figma slot.** A case-study frame (the deck slides you sent) can flash behind each row for 0.3 s. That needs an export of 4 frames as images.
**Transition to 5.** All four rows slide together into one rule. The word "SYSTEMS" from the headline stays, alone, centre screen.

## Scene 5 · 12.2 to 14.8 s · SYSTEMS WORK IS PEOPLE WORK.

**Visual.** Three lines build up: "SYSTEMS WORK / IS SYSTEMS / WORK." It reads as a tautology for half a second. Then a teal block wipes across the second "SYSTEMS", revealing "PEOPLE" in white: "SYSTEMS WORK / IS PEOPLE / WORK." A mono line then types underneath: `// and, increasingly, agents.`
**Why.** "Systems work is people work in disguise" is your own line from the Alignment Program case study. The disguise is shown literally. The mono aside carries your AI-native thesis without turning it into an AI cliché.
**Motion.** Mask wipe 0.6 s, `power4.inOut`. The teal accent appears as a solid fill once, behind "PEOPLE".
**Transition to 6.** The giant ghost `MPG` monogram fades up behind everything, and the scene's type drains into it.

## Scene 6 · 14.8 to 17.5 s · MATIAS PEINADO GRECO

**Visual.** The redesigned Hero itself. The mono label `PRODUCT DESIGN / DESIGN SYSTEMS` types in, the name lands in two lines in the wide italic, then the body copy and teal "View Work" button fade up. The overlay is removed and you're on the real page with no layout jump.
**Motion.** The name lands line by line with a mask reveal, 0.08 s stagger per line and a short overshoot. Body and button fade up 0.4 s after.

---

## Global rules

- **Tempo:** calm, quick, fast, quick, slow, land. Scene 5 is deliberately slower so the belief lands.
- **Skip:** `SKIP →` bottom-right in mono, visible from 0.5 s. **Reduced motion:** straight to the Hero. **Plays** once per session.
- **No sound** by default.

## What I took from Ev's reel, and what I didn't

- **Taken (principles):** first-person voice, one sentence per beat at about 2.5 to 3 s each, every scene morphing out of the last, ending on the real page.
- **Not taken (his distinctive bits):** the typed `/* Hello World */` opener, "I'm Ev", the cycling "do their ___" word, the shape-burst-into-grid, "Figma then code" and the green "Live." flood. Your opener is three real greetings, your code beat is your actual path, and your proof is your real clients.

## Not done yet

- Mounting on the home page, with once-per-session playback. This waits for the redesigned Hero to exist in code, because the intro's last frame is that Hero.
- Case-study frames flashing behind the scene 4 rows. This needs Figma access or exported images.
