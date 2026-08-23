# Minecraft Mod Website Design Benchmark
### A design-research audit for the Hempdustry 2 landing page project

---

## Executive Summary

The single biggest finding of this audit isn't a color or a font — it's that **most popular Minecraft mods have no bespoke website at all.** Of the 25 mods/packs sampled (the brief's starter list plus a few judgment additions), only 7 — Applied Energistics 2, Botania, Quark, Iris Shaders, Cobblemon, Vault Hunters, and Feed The Beast — have a genuine standalone site with its own design. Everything else, including some of the highest-download mods in the entire ecosystem (Create, Tinkers' Construct, Sodium, JEI, Immersive Engineering, Distant Horizons), lives entirely inside a CurseForge or Modrinth listing template, sometimes backstopped by a plain community wiki. **Terralith** — one of the most-installed world-generation mods that exists (70M+ downloads) — is the starkest example: its own domain, `terralith.com`, has lapsed and now redirects to a HugeDomains parking page. Its most "official" web presence today is an unstyled stock MediaWiki instance on Miraheze.

That reframes the brief's premise usefully: the dominant convention in this space is not really "dark theme + neon glow," it's **no custom design decision-making whatsoever** — just inheriting whatever the marketplace platform (Modrinth or CurseForge) already renders. Where mods *do* invest in a real site, dark UI is indeed the majority pattern (7 of 10 sites inspected with hard color data), but the specific "neon purple/cyan gradient glow" stereotype is only partly true — the accent hues actually observed cluster around **one saturated brand color per site** (Modrinth's spring green `#1bd96a`, CurseForge's orange `#eb622b`, FTB's green, Vault Hunters' gold/amber), not a multi-hue neon-purple-cyan gradient. Two sites in the sample (Botania, and Cobblemon's hero) are light-themed, directly contradicting a "dark mode is mandatory" assumption.

On typography, the hypothesis holds almost completely: every site with hard computed-style data used **Inter, Roboto, Lato, Montserrat, Lexend, or the bare OS `system-ui` stack** — interchangeable off-the-shelf geometric/humanist grotesques, several sites literally not bothering to load a webfont at all. Not one sampled site used a serif, a slab, a monospace-for-display, a true Swiss grotesque (Akzidenz-Grotesk/Univers/Helvetica-proper — only ever present as an unused fallback name at the tail of a font stack), or any custom lettering system. Hierarchy is handled almost entirely through size/weight jumps and a single recolored keyword, rarely through actual typographic craft (tracking, small caps, mixed widths). This is the cheapest, clearest point of differentiation available, and this audit's "avoid list" (Section 7) is built around exactly this gap.

**Standouts worth studying:** Iris Shaders (irisshaders.dev) for editorial restraint, Applied Energistics 2 (appliedenergistics.org) for treating the mod like hardware rather than a game, and Cobblemon (cobblemon.com) for being the only sampled site that reads as a finished, confident consumer brand.

---

## Sample Coverage

**Visually inspected via rendered screenshots (browser tool):** Modrinth homepage + project page (Create, Sodium), CurseForge homepage/Discover feed + two project pages (Create, SevTech: Ages), Botania (botaniamod.net), Quark (quark.vazkii.net), Applied Energistics 2 (appliedenergistics.org), Iris Shaders (irisshaders.dev), Cobblemon (cobblemon.com), Feed The Beast (feed-the-beast.com), Vault Hunters (vaulthunters.gg), the Terralith/Stardust Labs wiki (stardustlabs.miraheze.org), and createmod.com (the unofficial Create fan hub) — 14 rendered pages across 12 distinct sites, exceeding the requested 8–10 minimum. Font stacks, background colors, and accent colors below are **computed CSS values pulled directly from the live DOM**, not visual estimates, except where noted.

**Triaged via search/text for presence-or-absence of a dedicated site (no screenshot needed to establish this):**

| Mod / Pack | Category | Dedicated site? | Actual web home |
|---|---|---|---|
| Create | Tech/Automation | **No** (official) | CurseForge/Modrinth/GitHub; closest thing is the *unofficial*, ad-heavy fan hub createmod.com |
| Applied Energistics 2 | Tech/Automation | **Yes** | appliedenergistics.org |
| Mekanism | Tech/Automation | No | CurseForge/Modrinth + community wiki (wiki.aidancbrady.com) |
| Immersive Engineering | Tech/Automation | No | CurseForge/Modrinth/GitHub only |
| Tinkers' Construct | Tech/Automation | No | CurseForge/Modrinth/GitHub/Fandom wiki |
| Chisel & Bits | Tech/Building | No | CurseForge/Modrinth only |
| Botania | Magic | **Yes** | botaniamod.net |
| Quark | Magic/QoL | **Yes** | quark.vazkii.net |
| Waystones | QoL | Partial | dev's portfolio site (mods.twelveiterations.com), not Waystones-specific |
| JEI | QoL/Utility | No | CurseForge/Modrinth only |
| REI | QoL/Utility | No | GitHub/CurseForge/Modrinth |
| Farmer's Delight | Content/QoL | No | CurseForge/Modrinth only |
| Origins | Gameplay | No | CurseForge + GitHub wiki |
| Twilight Forest | Exploration | No | CurseForge + benimatic.com/tfwiki |
| Terralith | Exploration/Worldgen | **Lapsed** | domain now parked at HugeDomains; real home is a bare Miraheze wiki |
| BiomesOPlenty | Exploration/Worldgen | No | CurseForge + Fandom wiki |
| Blue Skies | Exploration | No | CurseForge + Fandom wiki |
| Ad Astra | Exploration/Tech | No | CurseForge only |
| Cobblemon | Exploration/Creatures | **Yes** | cobblemon.com |
| Iris Shaders | Performance/Shaders | **Yes** | irisshaders.dev |
| Sodium | Performance | No | GitHub + a CaffeineMC donate page only |
| Distant Horizons | Performance | No | CurseForge + Discord only |
| Feed The Beast | Modpack publisher | **Yes** | feed-the-beast.com |
| SevTech: Ages | Modpack | No | CurseForge + Fandom wiki |
| Vault Hunters | Modpack | **Yes** | vaulthunters.gg |

---

## 1. Typography

**The hypothesis is confirmed, almost without exception.** Every site where I could read computed styles used one of a tiny handful of interchangeable off-the-shelf sans families, or nothing at all:

- **Modrinth** — `Inter` (confirmed via computed style on both the homepage and project pages)
- **CurseForge** — `latoLocalFont` (Lato) for body copy, `montserratLocalFont` (Montserrat) for buttons/UI — two different generic Google Fonts stitched together, not one considered system
- **Iris Shaders** — `Inter`
- **Botania** — `Roboto` (the site literally footers "Powered by Bootstrap Material Design," i.e., it's an unmodified Google Material template)
- **Cobblemon** — `Lexend` — the one case of a slightly less-default choice, but Lexend is still a general-purpose Google Fonts variable grotesque from the same "friendly modern SaaS" family as Inter, not a considered display face
- **Vault Hunters** — `Inter` for body text, `Funnel Sans` (another Google Font) for the bevelled/embossed display logotype
- **Applied Energistics 2** — no webfont at all: `system-ui, -apple-system, "Segoe UI", Roboto, ...` (whatever font the visitor's OS ships)
- **Feed The Beast** — no webfont at all: `ui-sans-serif, system-ui, sans-serif, ...` — this is literally Tailwind CSS's un-customized default font stack, meaning FTB's whole site runs on stock Tailwind typography
- **Quark** — the region I could inspect resolved to the literal generic fallback `sans-serif`, i.e., no font decision was made at all
- **createmod.com** (unofficial Create hub) — `Inter Var, Inter`

Zero serifs. Zero slabs. Zero monospace used for display purposes (relevant for an "old internet" reference point — nobody is using a typewriter/terminal face even ironically). Zero true Swiss-lineage grotesques — `Helvetica Neue`/`Arial`/`Helvetica` only ever appear as unused tail-end fallback names inside a stack that resolves to Inter or Roboto first. Nobody uses custom lettering or a drawn wordmark as a *typographic* system — the two closest exceptions (Cobblemon's Poké Ball-integrated logotype, Vault Hunters' bevelled fantasy logo) are one-off logo graphics, not a typeface choice that extends through the page.

**Hierarchy** is handled almost entirely through blunt instruments: a size jump from body text to H1, a weight jump (usually 400→700/800), and — most commonly — recoloring exactly one word or phrase inside the headline with the brand accent (Modrinth's hero reads "The place for Minecraft **data packs**" with only "data packs" in gradient green; CurseForge's carousel slides render mod titles in bold condensed caps with no further refinement). Very few sites use actual typographic craft — tracked-out small caps, mixed weights within one line, deliberate rag or measure control. The one exception worth studying: **Iris Shaders** sets its hero subhead as a small, letter-spaced, all-caps line ("AN OPEN-SOURCE SHADER MOD FOR MINECRAFT: JAVA EDITION") sitting quietly under a huge, low-opacity watermark wordmark — the only sampled instance of type being used with any real intentionality rather than just "make it bigger."

**Implication for Hempdustry 2:** because literally every competitor is running Inter/Roboto/Lato/Lexend/system-ui, choosing *any* typeface with actual grotesque character (Akzidenz-Grotesk-alikes such as Suisse Int'l, Founders Grotesk, Neue Haas Grotesk, or even a well-chosen open alternative like Archivo or Space Grotesk used with real Swiss discipline — tight tracking, a strict size scale, mixed-weight pairing) will read as immediately, structurally different from the rest of the category, with no other effort required.

---

## 2. Color

**Partially confirmed, partially wrong.** Dark backgrounds do dominate the sites that bothered to design at all (7 of 10 with hard data), but the specific "neon green/purple/cyan gradient-glow" cliché is narrower than the stereotype suggests — what's actually there is **one saturated brand hue laid over near-black**, and greens and oranges outnumber purples and cyans in this sample entirely. I did not encounter a single purple-accented mod site in this survey.

Confirmed background/accent values (computed, not estimated):

| Site | Background | Accent | Notes |
|---|---|---|---|
| Modrinth | `#16181c` (near-black navy) | `#1bd96a` bright spring green | subtle repeating maze/labyrinth line pattern behind hero |
| CurseForge | `#0d0d0d` (near-pure black) | `#eb622b` saturated orange | plus a yellow/black hazard-stripe promo banner at page top |
| Botania | `#eeeeee` light gray | forest/leaf green (nav), pink-magenta (in-content flower art) | **light theme** — directly contradicts the dark-mode-only assumption |
| Cobblemon | light sky-blue-to-white gradient in the hero photo | red (Poké Ball mark, used sparingly) | **light/bright theme** — a second contradiction of the dark-mode assumption |
| Quark | flat dark charcoal (~`#2b2b2b` visually) | a single muted teal-green on the wordmark only | no gradients, no glow anywhere |
| Applied Energistics 2 | near-black/blue-black | none really — white text on black, gray-bordered buttons | the ME network's in-game blue glow (from the screenshot itself) does the job an "accent color" would elsewhere |
| Iris Shaders | `#0b0e13` (near-black navy) | **none** | no neon accent hue at all; the only color on the page comes from the actual cinematic shader screenshot |
| Feed The Beast | `#171b1c` (near-black) | green (CTA button + promo strip) | |
| Vault Hunters | `#000000` pure black | orange/gold, rendered as a bevelled, embossed, drop-shadowed logotype | the most "neon gamer" color treatment in the whole sample |
| createmod.com (unofficial) | `#1f2121` dark gray | orange-red | plus a 1,202-vendor IAB ad-consent overlay on load |

Takeaways to state plainly:
- **Near-black (not navy-black, actually black or `#0d0d0d`–`#1a1a1a`) dominates**, more than any specific "neon" hue.
- **Exactly one accent hue per brand** is the norm — nobody is running a green-to-purple-to-cyan gradient across a whole page; the gradient/glow effect, where it exists, is applied narrowly (a two-stop text gradient on one headline word at Modrinth, a bevel/emboss on one logotype at Vault Hunters), not as a wash across the UI.
- **Purple and cyan, specifically, did not appear** anywhere in this sample of mod sites. (They're more a convention of *adjacent* Minecraft-commerce sites — server hosts, launchers — which is worth knowing is a separate visual territory to also avoid resembling.)
- **Light themes exist and work** (Botania, Cobblemon's hero) — the "must be dark" assumption is not a hard rule of the category, just a majority habit.
- Glow/bevel/drop-shadow treatments correlate directly with how "gamer-coded" a site wants to feel — Vault Hunters (loudest) and CurseForge's carousel slides use them; the more restrained standouts (Iris, AE2) use none at all.

---

## 3. Layout & Grid

**One hero formula repeats almost everywhere**, regardless of which platform or dedicated site: a full-bleed or large background image (gameplay screenshot, carousel, or illustrated key art) with a centered or left-aligned headline and a single high-contrast pill/rounded-rect CTA button on top. CurseForge's project-gallery carousel, Botania's Bootstrap carousel, Vault Hunters' blurred action-shot background, Cobblemon's illustrated scene, Iris's cinematic still, and FTB's isometric diorama are all the same underlying template with different content dropped into the image slot.

**Card grids** are the default browse/discovery pattern on both marketplaces. Modrinth's homepage is a literal endless grid of icon-left/text-right cards, each with a title, one-line tagline, and a stat-badge row — scraping the live homepage returned the *same 24 mod cards twice in a row* due to how the feed paginates, which is itself a small, telling artifact of how generic/interchangeable this card format is at scale.

**Project/listing pages are structurally near-identical across the two competing platforms**, despite their different skins: Modrinth's Create page and CurseForge's Create page both use icon-title-tagline at the top, a row of stat/tag pills immediately below, a tab bar (Description/Changelog/Versions on Modrinth; Description/Files/Gallery/Relations/Issues on CurseForge), and a **sticky right-hand rail** containing the Download button plus compatibility/version metadata that stays visible regardless of scroll position. Two "competing" platforms converging on identical information architecture is strong evidence this is now simply "the template" for the category, not a deliberate design choice either platform is making.

**Dedicated sites skew single-page.** Iris, Cobblemon, AE2, Botania, and Quark are all effectively one long scroll with anchor sections, and — notably — most of them don't even host the download themselves; they link out to Modrinth/CurseForge or a separate installer. FTB is the one genuine exception with real multi-page IA (dropdown nav for Our App / Our Content / Servers / Community / Support), because FTB is operating as a company/publisher, not marketing a single mod.

**Download CTA conventions:**
- Marketplace listings put Download in a **persistent sidebar**, always visible — a genuinely smart, worth-borrowing convention regardless of visual style.
- Dedicated sites mostly use a single accent-colored pill labeled literally "Download" or "Download [ModName]" (Botania: "DOWNLOAD BOTANIA," Quark: "Download Quark" — a consistent verb+object caps pattern).
- Vault Hunters gamifies the label itself: "PLAY NOW."
- AE2 is the outlier: it presents **Guide / Download / Join Discord as three visually equal buttons** in a row, rather than one dominant CTA — a flatter, less funnel-driven hierarchy than anyone else in the sample.

**What's structurally absent everywhere:** an actual visible grid system. Nothing in this sample shows deliberate column structure, asymmetric compositional tension, or math-driven proportion — every layout is the conventional "SaaS landing page" scaffold (full-width hero → stacked feature/card sections → footer), just re-skinned. This is the single biggest opportunity for a Müller-Brockmann-style grid to look genuinely foreign in this category, because literally nobody else is doing it.

---

## 4. Imagery Treatment

Two clearly distinct approaches showed up, and they map directly onto "generic template" vs. "actually art-directed":

**Raw, uncurated gameplay screenshots** are the default, especially on marketplaces. CurseForge's homepage carousel is literally whatever screenshot a mod's own page has, bold-caps title overlaid directly on top, arrow-navigated, no consistent crop ratio or color treatment between slides. Botania uses the same idea in a dated Bootstrap-carousel-with-dot-indicators format, with a dark scrim behind white drop-shadowed text for legibility — a pattern that reads as distinctly ~2014–2018-era template design. Badge rows (loader-icon chips for Forge/Fabric/NeoForge, Minecraft-version pills, download counts, follower counts) are genuinely universal on both Modrinth and CurseForge project sidebars — this part of the brief's hypothesis is fully confirmed.

**Curated/staged single hero assets** are what distinguish the standout sites, and none of them are "in-game screenshot, unedited":
- **Iris Shaders** uses exactly one carefully chosen, moody, moonlit shader screenshot as a full-bleed hero, with a small, unobtrusive photo-credit caption ("Packs used in image: Bliss Shaders and SPBR") in the corner — a photography/film-portfolio convention, not a gamer-site convention.
- **Applied Energistics 2** replaces screenshots entirely with a **custom-staged isometric 3D render** of its own storage-network blocks and glowing cables, lit and composited against pure black under a "Key Features" label — closer to an Apple hardware product page than a mod page.
- **Cobblemon**'s hero is posed key art — a Pokémon standing in a lit, composed sky-and-water scene — clearly built for the website rather than pulled from a random player's world.

Nobody in the sample used particle-effect CSS/canvas backgrounds (floating embers, animated starfields, etc.) — that specific "gamer template" cliché didn't actually appear, though it's common enough in the broader Minecraft-adjacent server-hosting space to still be worth naming as something to avoid by association.

---

## 5. Navigation / IA

Platform chrome (Modrinth, CurseForge) uses **store/SaaS navigation** — "Discover content," "Host a server," "Get the App" on Modrinth; "Browse," "Create," "Studios" on CurseForge — because it's navigating a whole marketplace, not one product.

Dedicated single-mod sites converge on a **short, flat, 4–6-item top nav** with almost the same vocabulary every time:
- Iris: Home / Develop / Download / Support
- Cobblemon: Download / Guides / Discord / Wiki / Servers
- Quark: Home / Features / Download / Old Site
- Botania: Home / Downloads / Changelog / Credits / License / Lexicon / FAQ / (link back to vazkii.net)
- Vault Hunters: Gear / Armory / Servers / How to Play / More, plus utility links for Twitch Companions / Patch Notes / Login
- AE2: no traditional nav bar at all — just the three buttons (Guide / Download / Discord)

**Discord is treated as a first-class nav item everywhere** — appearing with equal visual weight to Download on nearly every dedicated site sampled. That's a distinctly small-open-source-community IA convention you would not see on a general consumer product site, where a community-chat link would never sit next to the primary purchase/install action. FTB is the only site with real nested/dropdown navigation, because it functions as a publisher's corporate site rather than a mod's homepage.

---

## 6. Standouts

**Iris Shaders — irisshaders.dev.** The most genuinely art-directed site in the sample. One cinematic, carefully chosen shader screenshot fills the viewport; a huge wordmark sits translucent and low-contrast *within* the photo rather than fighting it; the only caption is a small, quiet photo-credit line in the corner. No carousel arrows, no badge row, no gradient glow, no bevel — the confidence to leave the page almost empty is exactly the kind of restraint a Swiss-influenced identity should be studying, even though the typeface (Inter) and color (near-black) are otherwise unremarkable.

**Applied Energistics 2 — appliedenergistics.org.** The only sampled site that breaks the "hero photo + CTA" formula outright. Instead of a gameplay screenshot, it uses a staged, lit, isometric render of the mod's own machines as if it were a hardware spec sheet, and treats Guide/Download/Discord as three co-equal utility actions instead of manufacturing one dominant CTA. It's plain almost to a fault (system-ui type, no color system to speak of), but the plainness reads as deliberate restraint — closer to good technical documentation than to a stereotypical mod-hype page.

**Cobblemon — cobblemon.com.** The most finished *brand* of everything sampled. It's the only site with posed, composed key art instead of a screenshot; the only site with a genuinely bespoke logotype (a Poké Ball mark fused with the wordmark, consistent with the source property's identity); and the only case of a typeface choice (Lexend) that at least reads as deliberate rather than default. It's still squarely inside "friendly modern SaaS" territory, not Swiss-grid territory — but it's the clearest proof point in this whole survey that a mod can be treated as a real consumer brand rather than a marketplace listing.

**Quark — quark.vazkii.net.** Worth a mention for the opposite reason: what rendered was just a wordmark, a one-line tagline, a thin hairline rule, and two small screenshot thumbnails on a flat charcoal ground — no hero photography, no carousel, no badge soup. Whether that's an intentional minimalist choice or an underbuilt page, the *effect* is closer to a plain personal homepage than a product page, which is closer in spirit to "old internet" austerity than anything else in the sample.

**Cautionary/negative standout — Terralith.** Worth naming precisely because of its scale: a world-generation mod with 70M+ downloads, arguably category-defining, whose own domain has lapsed into a domain-squatter parking page, leaving a bare, unstyled Miraheze wiki as its most official web presence. This is the strongest single piece of evidence in the entire audit that *investing in a real, owned, designed website is itself already a differentiator* in this space — most mods this popular don't bother, or let it lapse even after they did.

---

## 7. Avoid List — recurring clichés to deliberately not repeat

1. **The frosted-glass hero.** Full-bleed gameplay screenshot, darkened/blurred, dark scrim, centered semi-transparent card on top. CurseForge's project pages and Vault Hunters' homepage both do this — it is the single fastest way to read as "generic modpack launcher."
2. **Bevelled/embossed fantasy-game logotype.** Vault Hunters' drop-shadowed, gold-bevelled "VAULT HUNTERS" wordmark is the textbook MMO-box-art treatment. It is the visual opposite of Swiss flatness and restraint — avoid any 3D bevel, outer glow, or drop-shadow on display type.
3. **The Bootstrap-carousel hero.** Dot-indicator carousel, drop-shadowed white headline over a photo, rounded pill CTA — Botania and CurseForge's gallery both use this ~2014–2018-era pattern. It reads as templated the instant it appears, regardless of what image is in it.
4. **Badge/pill soup as a visual language.** Stacking loader-icon chips, version pills, download counts, and follower counts in a sidebar is fine as *marketplace UI* (Modrinth/CurseForge both do it because they need to) but is exactly the noisy, undifferentiated texture a bespoke single-mod site shouldn't imitate.
5. **One brand hue over generic dark gray as the entire identity.** Modrinth green, CurseForge orange, FTB green, Vault Hunters gold — in every case, the accent color is the *only* variable; the type (Inter/Roboto/Lato/Lexend), the layout (hero+cards+footer), and the background (`#0d0d0d`–`#1a1a1a`) are otherwise interchangeable across "competitors." Picking a nice accent color alone will not read as distinctive in this category — everyone already did that.
6. **Off-the-shelf variable grotesques, undifferentiated.** Inter, Roboto, Lato, Montserrat, Lexend, or bare `system-ui` account for effectively 100% of the sample. A real grotesque with personality (Akzidenz-Grotesk lineage, Univers, Suisse Int'l, Founders Grotesk) set with actual tracking/weight discipline is an immediate, low-cost way to look like nobody else in the category.
7. **Discord given equal visual weight to Download.** Appropriate in spirit for a community mod, but visually flattening the primary install action against a community-chat link (as AE2's three-way button row and most dedicated sites' flat nav both do) works against the kind of deliberate, ranked hierarchy a grid-driven identity should be enforcing on purpose.
8. **Gradient-glow text as a substitute for layout work.** Modrinth's green-gradient keyword inside an otherwise plain headline, CurseForge's drop-shadowed carousel titles — surface "gamer-ify it" polish applied on top of an unchanged generic template, rather than solving hierarchy structurally.
9. **Ad-tech chrome as the de facto face of the category.** Both CurseForge and the top unofficial Create fan hub surface the identical 1,202-vendor IAB consent-management overlay on load. A clean, single-owner, ad-free static site is already, by contrast, a meaningful point of difference before a single design decision is made.
10. **Reusing raw, uncomposed screenshots as the only imagery.** Most of the sample (CurseForge's carousel above all) just embeds whatever gameplay capture existed, at whatever crop and lighting it came in. The sites that actually stand out (Iris, Cobblemon, AE2) all curated, staged, or custom-rendered exactly one hero asset specifically for the website — worth the extra effort precisely because almost nobody else bothers.

---

### One-line summary for the design brief

This category's "default" is either *no design at all* (a CurseForge/Modrinth template) or a dark-gray page in Inter/Roboto with one bright accent color and a screenshot carousel. A Swiss-grid, old-internet-refreshed identity for Hempdustry 2 doesn't need to fight loud maximalism to stand out here — it mostly just needs to be the first site in the category that visibly made any typographic or grid decisions at all.
