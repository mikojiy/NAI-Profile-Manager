# 📝 NovelAI Profile Manager

This Tampermonkey script is built for **NovelAI image users who want smarter, faster prompt workflows** — without losing control over their exact wording. It **never translates or alters your prompt terms** (like `twintail`, `masterpiece`, or `school uniform`). Everything stays exactly as you write it.

Below is a clear, practical breakdown of every feature — based directly on how the script works.

---

## 🎯 Prompt Profiles

Save full prompt setups as named profiles. Each profile stores:
- ✅ **Positive prompt** (what you *want*)
- ❌ **Negative prompt** (what you *don’t want*)

You can create as many as you like: `anime girl`, `cyberpunk city`, `miku concert`, etc. Switch between them instantly, rename, delete, or reorder by number.

> 💡 **Pro tip**: Use `Ctrl+1` to `Ctrl+9` to apply profile #1–#9 instantly. `Ctrl+0` = profile #10. No clicking needed!

---

## 🌐 Global Variables (`{name}`)

Reuse common prompt chunks without copy-pasting.

**How it works**:  
Define a variable like: miku = twintail, blue hair, aqua eyes

Then in any prompt, just write: masterpiece, {miku}, looking at viewer


When you apply the prompt, `{miku}` expands to its full value. You manage all variables in one place via the **🔤 Global Variables** button.

> ⚠️ Variables **don’t auto-expand** until you click **Override** or **Append** — and even then, you get a chance to review or change them first.

---

## 🎲 Wildcards (`[name]`)

Insert **random choices** from a list for variety or batch generation.

**Example**:  
Define:  character = miku, teto, luka

Use in prompt:  [character], solo, portrait


When applied, a popup lets you **pick one option** (or leave it blank to skip). Perfect for generating multiple versions without editing prompts manually.

---

## 🔍 Danbooru Integration (`{DB}`)

Pull **real, clean tags** from Danbooru posts directly into your prompt.

1. Type `{DB}` anywhere in your prompt (e.g., `masterpiece, {DB}, solo`).
2. When you click **Override** or **Append**, a dialog asks for a **Danbooru post ID** (e.g., `789532`).
3. The script fetches character, copyright, and general tags — then **removes blacklisted terms** (like `text`, `watermark`, `white background`).
4. Inserts clean, usable tags in place of `{DB}`.

> ✅ Tags are automatically converted (`blue_eyes` → `blue eyes`) and deduplicated.  
> You can also use the **🔍 Danbooru** button to fetch tags **without a profile**.

---

## 🛑 Tag Blacklist

Don’t want certain tags from Danbooru? Add them to the **blacklist** (via **⚙️ Settings & Blacklist**).

Example:  white background, text, watermark, simple background, upper body


These tags are **automatically stripped** every time you fetch from Danbooru.

---

## ➕ Override vs. Append

- **🔄 Override**: Replaces the entire content of both editors (positive + negative).
- **➕ Append**: Adds your profile’s prompt to the end of what’s already there (with a comma).

Both work on **positive and negative fields at the same time**, and respect your cursor position.

---

## 💾 Full Backup & Restore

Export **everything** — profiles, variables, wildcards, blacklist, UI settings, last-used profile, icon position — as a single `.json` file.

- **📦 Full Backup**: Saves all data.
- **🔁 Full Restore**: Loads everything back exactly as it was.

> 🔒 Your data never leaves your browser unless you choose to back it up.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|--------|--------|
| `Ctrl+1` → `Ctrl+0` | Apply profile #1 to #10 |
| `Ctrl+Q` | Open quick-search: type a **name** or **number** to jump to a profile |

Works even when the panel is closed!

---

## 🌗 Dark Mode & Draggable Icon

- Toggle dark/light mode with the **🌙/☀️** button.
- Drag the 📝 icon anywhere on screen — it remembers its position across sessions.

---

## 🔄 Auto-Update Checker

The script checks for new versions on load. If an update is available, a **non-intrusive banner** appears in the top-right with a one-click install link.

---

## ❓ “Fill-on-Apply” Dialog

Whenever your prompt contains:
- `{variables}`
- `[wildcards]`
- `{DB}`

…a temporary dialog appears **before anything is pasted**. This lets you:
- Fill in missing variable values
- Pick from wildcard options
- Enter a Danbooru ID

**Your original profile stays untouched** — this is just for that one-time use.

---

## 💖 Support the Project

This script is **free, open-source, and ad-free** — but if it saves you time or sparks joy, consider buying me a coffee! ☕

→ [https://ko-fi.com/mikojiy](https://ko-fi.com/mikojiy)

Every donation helps keep this tool alive and updated.

---

Made with ❤️ for NovelAI users who believe **prompt crafting should be fast, flexible, and fun** — without magic, without translation, and without compromise.
