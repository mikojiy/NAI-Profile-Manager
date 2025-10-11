# 📝 NovelAI Profile Manager
A full-featured Tampermonkey script that turns prompt writing on NovelAI Image from a chore into something fast, fun, and repeatable.

No more:

Copy-pasting prompts from Discord or Notepad
Losing your favorite settings after a browser refresh
Typing the same long tags over and over
This is your personal prompt vault — right inside the page, ready when you are.

![ss](https://raw.githubusercontent.com/mikojiy/NAI-Profile-Manager/main/Screenshot.png)

> **A Tampermonkey script for NovelAI Image Generator**  
> Full support for **Negative Prompts**, **Global Variables**, **Wildcards**, **Danbooru import**, **Profile management**, and more — with **auto language detection** (English / Bahasa Indonesia / 日本語).

[![Donate via Ko-fi](https://img.shields.io/badge/☕_Buy_me_a_coffee-ff5f5f?style=flat&logo=ko-fi&logoColor=white)](https://ko-fi.com/mikojiy)

## 🌍 Need the full guide in your language?

- 🇺🇸 **English**: [README-en.md](./README-en.md)  
- 🇮🇩 **Bahasa Indonesia**: [README-id.md](./README-id.md)  
- 🇯🇵 **日本語**: [README-ja.md](./README-ja.md)

---

## 📥 How to Install
[VIDEO TUTORIAL](https://www.youtube.com/watch?v=SLr24q8o4C8)

1. **Install Tampermonkey**  
   → [tampermonkey.net](https://www.tampermonkey.net/) (works on Chrome, Firefox, Edge)

2. **Click this link:**  
   → [Install Script](https://raw.githubusercontent.com/mikojiy/NAI-Profile-Manager/main/NAIPM.user.js)  
   *(Tampermonkey will pop up and ask if you want to add it)*

3. Click “Install”, then go to:  
   → [https://novelai.net/image](https://novelai.net/image)

4. For Mobile, use Firefox Browser then install tampermonkey: https://addons.mozilla.org/en-US/android/addon/tampermonkey/

You’ll see a small 📝 icon in the corner. That’s your control center.
If you dont see the icon, go to **Extensions > Manage Extensions > Enable Developer Mode > then click Details on Tampermonkey > and Enable Allow User Scripts**

---

## Features & Functions

| Feature | Description |
|---------|-------------|
| **Profile Management** | Create, save, rename, and organize multiple prompt profiles with different settings for various art styles or characters. |
| **Character System** | Build and manage character profiles with specific prompts that can be applied to your generations. |
| **Character Database** | Save and manage a reusable collection of characters that can be quickly added to any profile without re-entering prompts. |
| **Global Variables** | Define reusable variables using `{variable_name}` syntax that can be inserted across multiple prompts. |
| **Wildcards** | Create randomized options using `[wildcard_name]` syntax to add variety to your generations. |
| **Danbooru Integration** | Import prompts directly from Danbooru by entering post IDs, with automatic tag filtering. |
| **Image Settings** | Control generation parameters like steps and guidance scale on a per-profile basis. |
| **Backup & Restore** | Save all your profiles, settings, and characters to a JSON file and restore them when needed. |
| **Multi-language Support** | Switch between English, Indonesian, and Japanese interfaces. |
| **Image Zoom** | Enhanced image viewing with zoom, pan, and reset functionality for generated images. |
| **Mobile Optimization** | Responsive design that works on both desktop and mobile devices. |
| **Search Functionality** | Quickly find profiles by name or content with the built-in search feature. |
| **Tag Blacklist** | Filter out unwanted tags when importing from Danbooru. |
| **Quick Shortcuts** | Use keyboard shortcuts (Ctrl+Q to toggle search, Ctrl+1-9 for profiles) for faster workflow. |
| **Update Notifications** | Get notified when a new version of the script is available. |

### Basic Usage

| Action | How to Do It |
|--------|--------------|
| **Open the script** | Click the 📝 icon that appears on the page (you can drag it to reposition) |
| **Create a new profile** | Click the "📁 Profile" button → "🆕 New" → Enter a name |
| **Save a profile** | Fill in your prompts → Click "📁 Profile" → "💾 Save" |
| **Apply a profile** | Select a profile from the dropdown → Click "🔄 Override" to replace current prompts or "➕ Append" to add to them |
| **Add characters** | Go to the "Character" tab → Click "Add Character" → Fill in name and prompt, then it will apply to the character box. 1 box = 1 character, max 10 |
| **Manage character database** | Go to "Character" tab → Use the "Character Database" section to add, edit, or organize saved characters |
| **Use variables** | Define variables in Settings → Use `{variable_name}` in your prompts |
| **Use wildcards** | Define wildcards in Settings → Use `[wildcard_name]` in your prompts |
| **Import from Danbooru** | Go to "Utility" tab → Click "🔍 Danbooru" → Enter a post ID |
| **Backup your data** | Go to "Utility" tab → Click "📦 Full Backup" |
| **Restore data** | Go to "Utility" tab → Click "🔁 Full Restore" → Select your backup file |

### Advanced Features

| Feature | How to Use |
|---------|------------|
| **Profile-specific settings** | Each profile can have its own steps and guidance values that will be applied when selected |
| **Character database management** | Go to "Character" tab → Click "Organize" to edit, rename, or delete saved characters from your database |
| **Adding database characters to profiles** | In "Character" tab → Select character from database dropdown → Click "Add Selected" |
| **Profile reordering** | Right-click on a profile → Select "Swap Position" → Enter the position number |
| **Keyboard shortcuts** | Press Ctrl+Q to toggle search, Ctrl+1-9 to quickly switch between profiles |
| **Image zoom** | Click on any generated image to open it in zoom mode, then use mouse wheel or buttons to zoom |

## Tips & Tricks

- Use variables for frequently used elements like `{blue_eyes}` or `{masterpiece}`
- Create wildcards for randomization like `[pose]` with options like "standing, sitting, laying down"
- Build your character database with commonly used characters for quick access across all profiles
- Organize your profiles by art style, character, or theme for easier navigation
- Regularly backup your profiles to avoid losing your work
- Use the blacklist feature to filter out unwanted tags when importing from Danbooru

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Script not loading** | Make sure Tampermonkey is enabled and the script is updated to the latest version |
| **Can't find the icon** | The 📝 icon might be in a different position - try refreshing the page |
| **Profile not applying** | Check that your prompts contain valid text and try using the "Override" button instead of "Append" |
| **Mobile issues** | Try refreshing the page and ensure you're using a supported mobile browser |
| **Character database not saving** | Make sure you're clicking "Add to DB" after entering character details |

## Support

For issues, feature requests, or questions, please visit the [GitHub repository](https://github.com/mikojiy/NAI-Profile-Manager/issues).

---

## 📜 License

This script is released under the **MIT License** — free to use, modify, and share.
MIT License

Copyright (c) 2025 mikojiy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 💖 Support the Project

Enjoying the script?  
Consider buying me a coffee! ☕  
→ [**https://ko-fi.com/mikojiy**](https://ko-fi.com/mikojiy)

Your support helps keep this project alive and updated!

---
