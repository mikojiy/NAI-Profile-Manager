// ==UserScript==
// @name         NovelAI Prompt Profiles
// @namespace    http://tampermonkey.net/
// @author       Mikojiy
// @updateURL    https://raw.githubusercontent.com/mikojiy/NAI-Profile-Manager/main/NAIPM.user.js
// @downloadURL  https://raw.githubusercontent.com/mikojiy/NAI-Profile-Manager/main/NAIPM.user.js
// @version      2.0.1
// @description  Prompt profiles made easy for NovelAI.
// @match        https://novelai.net/image
// @grant        none
// ==/UserScript==
// ── Script Info ─────────────────────────────
// Repository: https://github.com/mikojiy/NAI-Profile-Manager
// ────────────────────────────────────────────
(function () {
    'use strict';
    // === LANGUAGE SUPPORT ===
    const LANGUAGES = {
        'id': 'Bahasa Indonesia',
        'en': 'English',
        'ja': '日本語'
    };
    const STRINGS = {
        id: {
            ready: "Siap digunakan 🎯",
            profilesTitle: "Profil Prompt",
            toggleDark: "Ganti Mode Gelap",
            manageGlobalVars: "Kelola Variabel Global",
            manageWildcards: "Kelola Wildcard",
            settingsBlacklist: "Pengaturan & Daftar Hitam",
            positivePlaceholder: "Prompt positif...",
            negativePlaceholder: "Prompt negatif (Konten yang Tidak Diinginkan)...",
            override: "🔄 Timpa",
            append: "➕ Tambahkan",
            newProfile: "🆕 Baru",
            saveProfile: "💾 Simpan",
            renameProfile: "✏️ Ganti Nama",
            deleteProfile: "🗑️ Hapus",
            clearAll: "💥 Hapus Semua",
            reorder: "🔁 Tukar Posisi",
            danbooru: "🔍 Danbooru",
            fullBackup: "📦 Cadangan Lengkap",
            fullRestore: "🔁 Pulihkan Semua",
            noProfiles: "Belum ada profil",
            enterProfileName: "Beri nama profil baru:",
            profileExists: name => `❌ "${name}" sudah ada.`,
            createdProfile: name => `✅ Profil "${name}" dibuat.`,
            pickProfileFirst: "❌ Pilih profil dulu.",
            savedProfile: name => `✔️ "${name}" disimpan.`,
            renamePrompt: "Nama baru:",
            renameTaken: name => `❌ "${name}" sudah dipakai.`,
            renamed: (old, neu) => `🔄 Diganti dari "${old}" → "${neu}"`,
            confirmDelete: name => `Hapus "${name}"?`,
            deletedSwitched: (del, newp) => `🗑️ "${del}" dihapus. Beralih ke "${newp}".`,
            deletedNone: name => `🗑️ "${name}" dihapus. Tidak ada profil tersisa.`,
            confirmClearAll: "⚠️ Hapus SEMUA profil? Tindakan ini tidak bisa dibatalkan.",
            clearedAll: "🧹 Semua data dihapus.",
            swapPrompt: (name, pos) => `Tukar "${name}" dengan nomor berapa?
Masukkan 1-${profiles.length}
(Saat ini di posisi ${pos})`,
            invalidPos: "❌ Posisi tidak valid.",
            alreadyThere: "ℹ️ Sudah di posisi itu.",
            swapped: (name, pos) => `✅ "${name}" ditukar dengan profil #${pos}.`,
            danbooruPrompt: (last) => `📌 Ambil prompt dari Danbooru
Masukkan ID posting (contoh: 789532)
Terakhir dipakai: ${last || 'Tidak ada'}`,
            danbooruInvalidId: "❌ ID harus angka saja.",
            danbooruFetching: id => `📥 Mengambil data Danbooru #${id}...`,
            danbooruApplying: id => `🔧 Menerapkan prompt dari Danbooru #${id}...`,
            danbooruApplyFail: "❌ Gagal mengirim ke editor.",
            danbooruError: err => `❌ Danbooru: ${err}`,
            backupSaved: "✅ Cadangan lengkap disimpan!",
            restoreSelectFile: "Pilih file cadangan (.json)",
            restoreSuccess: "✅ Cadangan lengkap dipulihkan!",
            restoreLegacy: "🔄 Profil lama dimuat. Simpan cadangan lengkap untuk menyertakan pengaturan lain.",
            restoreInvalid: "❌ File cadangan tidak valid.",
            globalVarsTitle: "🔤 Variabel Global",
            globalVarsDesc: "Format: <code>nama=nilai</code><br>Contoh: <code>miku=rambut biru, mata aqua, ekor kembar</code>",
            wildcardsTitle: "🎲 Wildcard",
            wildcardsDesc: "Format: <code>nama=nilai1, nilai2, ...</code><br>Contoh: <code>karakter=miku, teto, luka</code>",
            blacklistTitle: "⚙️ Daftar Hitam Tag",
            blacklistDesc: "Tag di bawah akan dihapus saat mengambil dari Danbooru. Pisahkan dengan koma.",
            blacklistPlaceholder: "latar putih, luar ruangan, tubuh atas, teks, watermark",
            blacklistSaved: count => `✅ Daftar hitam diperbarui (${count} tag).`,
            nothingToPaste: "⚠️ Tidak ada yang bisa ditempel di sini.",
            cantFindEditor: "❌ Editor tidak ditemukan.",
            doneProseMirror: "✅ Selesai (ProseMirror)",
            fallbackMethod: "⚠️ Gagal, mencoba cara lain...",
            pasted: "✅ Ditempel!",
            clipboardCopy: "📋 Disalin! Tempel manual dengan Ctrl+V.",
            clipboardFail: "❌ Gagal menyalin ke clipboard.",
            nothingToPasteNeg: "⚠️ Tidak ada yang bisa ditempel (negatif).",
            cantFindNegEditor: "❌ Editor negatif tidak ditemukan.",
            doneNegProseMirror: "✅ Negatif selesai (ProseMirror)",
            negFallback: "⚠️ Fallback negatif...",
            negPasted: "✅ Negatif ditempel!",
            negClipboard: "📋 Negatif disalin! Tempel manual.",
            negClipboardFail: "❌ Gagal menyalin negatif.",
            nothingToAppend: "⚠️ Tidak ada yang bisa ditambahkan.",
            appendedProseMirror: "✅ Ditambahkan (ProseMirror)",
            appendFallback: "⚠️ Fallback tambah...",
            appended: "✅ Ditambahkan!",
            appendClipboard: "📋 Disalin! Tempel manual.",
            nothingToAppendNeg: "⚠️ Tidak ada yang bisa ditambahkan (negatif).",
            negAppendedProseMirror: "✅ Negatif ditambahkan (ProseMirror)",
            negAppendFallback: "⚠️ Fallback tambah negatif...",
            negAppended: "✅ Negatif ditambahkan!",
            fillVarsTitle: "Isi Variabel & Wildcard",
            fillVarsLabel: "Isi nilai untuk variabel:",
            wildcardChoose: "-- Pilih --",
            dbLabel: "DB (ID Danbooru)",
            dbPlaceholder: "789532",
            dbDesc: "Masukkan ID posting dari Danbooru",
            cancel: "Batal",
            apply: "Terapkan",
            updateAvailable: "🎉 Pembaruan Tersedia!",
            updateCurrent: "Anda menggunakan <strong>v1.8.8</strong>.",
            updateNew: vers => `Versi <strong>v${vers}</strong> telah rilis.`,
            updateNow: "Perbarui Sekarang"
        },
        en: {
            ready: "Ready to go 🎯",
            profilesTitle: "Prompt Profiles",
            toggleDark: "Toggle Dark Mode",
            manageGlobalVars: "Manage Global Variables",
            manageWildcards: "Manage Wildcards",
            settingsBlacklist: "Settings & Blacklist",
            positivePlaceholder: "Positive prompt...",
            negativePlaceholder: "Negative prompt (Undesired Content)...",
            override: "🔄 Override",
            append: "➕ Append",
            newProfile: "🆕 New",
            saveProfile: "💾 Save",
            renameProfile: "✏️ Rename",
            deleteProfile: "🗑️ Delete",
            clearAll: "💥 Clear All",
            reorder: "🔁 Swap Pos",
            danbooru: "🔍 Danbooru",
            fullBackup: "📦 Full Backup",
            fullRestore: "🔁 Full Restore",
            noProfiles: "No profiles yet",
            enterProfileName: "Name your new profile:",
            profileExists: name => `❌ "${name}" already exists.`,
            createdProfile: name => `✅ Created "${name}".`,
            pickProfileFirst: "❌ Pick a profile first.",
            savedProfile: name => `✔️ "${name}" saved.`,
            renamePrompt: "New name:",
            renameTaken: name => `❌ "${name}" already taken.`,
            renamed: (old, neu) => `🔄 Renamed "${old}" → "${neu}"`,
            confirmDelete: name => `Delete "${name}"?`,
            deletedSwitched: (del, newp) => `🗑️ Deleted "${del}". Switched to "${newp}".`,
            deletedNone: name => `🗑️ Deleted "${name}". No profiles left.`,
            confirmClearAll: "⚠️ Delete ALL profiles? This can't be undone.",
            clearedAll: "🧹 Cleared everything.",
            swapPrompt: (name, pos) => `Swap "${name}" with which number?
Enter 1-${profiles.length}
(Currently at ${pos})`,
            invalidPos: "❌ Invalid position.",
            alreadyThere: "ℹ️ Already there.",
            swapped: (name, pos) => `✅ Swapped "${name}" with profile #${pos}.`,
            danbooruPrompt: (last) => `📌 Pull prompt from Danbooru
Enter post ID (like: 789532)
Last used: ${last || 'None'}`,
            danbooruInvalidId: "❌ ID must be numbers only.",
            danbooruFetching: id => `📥 Fetching Danbooru #${id}...`,
            danbooruApplying: id => `🔧 Applying prompt from Danbooru #${id}...`,
            danbooruApplyFail: "❌ Failed to send to editor.",
            danbooruError: err => `❌ Danbooru: ${err}`,
            backupSaved: "✅ Full backup saved!",
            restoreSelectFile: "Select backup file (.json)",
            restoreSuccess: "✅ Full backup restored!",
            restoreLegacy: "🔄 Loaded legacy profiles. Save full backup to include other settings.",
            restoreInvalid: "❌ Not a valid backup file.",
            globalVarsTitle: "🔤 Global Variables",
            globalVarsDesc: "Format: <code>name=value</code><br>Example: <code>miku=twintail, blue hair, aqua eyes</code>",
            wildcardsTitle: "🎲 Wildcards",
            wildcardsDesc: "Format: <code>name=value1, value2, ...</code><br>Example: <code>character=miku, teto, luka</code>",
            blacklistTitle: "⚙️ Tag Blacklist",
            blacklistDesc: "Tags below will be removed when fetching from Danbooru. Separate with commas.",
            blacklistPlaceholder: "white background, outdoors, upper body, text, watermark",
            blacklistSaved: count => `✅ Blacklist updated (${count} tags).`,
            nothingToPaste: "⚠️ Nothing to paste here.",
            cantFindEditor: "❌ Can't find the editor.",
            doneProseMirror: "✅ Done (ProseMirror)",
            fallbackMethod: "⚠️ That didn’t work, trying another way...",
            pasted: "✅ Pasted!",
            clipboardCopy: "📋 Copied! Just hit Ctrl+V to paste it yourself.",
            clipboardFail: "❌ Couldn’t copy to clipboard.",
            nothingToPasteNeg: "⚠️ Nothing to paste here (negative).",
            cantFindNegEditor: "❌ Can't find negative editor.",
            doneNegProseMirror: "✅ Negative done (ProseMirror)",
            negFallback: "⚠️ Negative fallback...",
            negPasted: "✅ Negative pasted!",
            negClipboard: "📋 Negative copied! Paste manually.",
            negClipboardFail: "❌ Negative copy failed.",
            nothingToAppend: "⚠️ Nothing to append.",
            appendedProseMirror: "✅ Appended (ProseMirror)",
            appendFallback: "⚠️ Append fallback...",
            appended: "✅ Appended!",
            appendClipboard: "📋 Copied! Paste manually.",
            nothingToAppendNeg: "⚠️ Nothing to append (negative).",
            negAppendedProseMirror: "✅ Negative appended (ProseMirror)",
            negAppendFallback: "⚠️ Negative append clipboard fallback...",
            negAppended: "✅ Negative appended!",
            fillVarsTitle: "Fill Variables & Wildcards",
            fillVarsLabel: "Fill values for variables:",
            wildcardChoose: "-- Choose --",
            dbLabel: "DB (Danbooru ID)",
            dbPlaceholder: "789532",
            dbDesc: "Enter a post ID from Danbooru",
            cancel: "Cancel",
            apply: "Apply",
            updateAvailable: "🎉 Update Available!",
            updateCurrent: "You're on <strong>v1.8.8</strong>.",
            updateNew: vers => `Version <strong>v${vers}</strong> is out.`,
            updateNow: "Update Now"
        },
        ja: {
            ready: "準備完了 🎯",
            profilesTitle: "プロンプトプロファイル",
            toggleDark: "ダークモード切り替え",
            manageGlobalVars: "グローバル変数を管理",
            manageWildcards: "ワイルドカードを管理",
            settingsBlacklist: "設定とブラックリスト",
            positivePlaceholder: "ポジティブプロンプト...",
            negativePlaceholder: "ネガティブプロンプト（不要な内容）...",
            override: "🔄 上書き",
            append: "➕ 追加",
            newProfile: "🆕 新規",
            saveProfile: "💾 保存",
            renameProfile: "✏️ 名前変更",
            deleteProfile: "🗑️ 削除",
            clearAll: "💥 全削除",
            reorder: "🔁 位置交換",
            danbooru: "🔍 Danbooru",
            fullBackup: "📦 完全バックアップ",
            fullRestore: "🔁 完全復元",
            noProfiles: "プロファイルがありません",
            enterProfileName: "新しいプロファイル名を入力：",
            profileExists: name => `❌ "${name}" は既に存在します。`,
            createdProfile: name => `✅ "${name}" を作成しました。`,
            pickProfileFirst: "❌ まずプロファイルを選んでください。",
            savedProfile: name => `✔️ "${name}" を保存しました。`,
            renamePrompt: "新しい名前：",
            renameTaken: name => `❌ "${name}" は既に使われています。`,
            renamed: (old, neu) => `🔄 "${old}" → "${neu}" に変更しました。`,
            confirmDelete: name => `"${name}" を削除しますか？`,
            deletedSwitched: (del, newp) => `🗑️ "${del}" を削除しました。"${newp}" に切り替えました。`,
            deletedNone: name => `🗑️ "${name}" を削除しました。プロファイルが残っていません。`,
            confirmClearAll: "⚠️ 全てのプロファイルを削除しますか？元に戻せません。",
            clearedAll: "🧹 全てクリアしました。",
            swapPrompt: (name, pos) => `"${name}" をどの番号と交換しますか？
1～${profiles.length} を入力
（現在位置: ${pos}）`,
            invalidPos: "❌ 無効な位置です。",
            alreadyThere: "ℹ️ すでにその位置にいます。",
            swapped: (name, pos) => `✅ "${name}" をプロファイル #${pos} と交換しました。`,
            danbooruPrompt: (last) => `📌 Danbooruからプロンプトを取得
投稿IDを入力（例: 789532）
前回使用: ${last || 'なし'}`,
            danbooruInvalidId: "❌ IDは数字のみです。",
            danbooruFetching: id => `📥 Danbooru #${id} を取得中...`,
            danbooruApplying: id => `🔧 Danbooru #${id} のプロンプトを適用中...`,
            danbooruApplyFail: "❌ エディタへの送信に失敗しました。",
            danbooruError: err => `❌ Danbooru: ${err}`,
            backupSaved: "✅ 完全バックアップを保存しました！",
            restoreSelectFile: "バックアップファイルを選択 (.json)",
            restoreSuccess: "✅ 完全バックアップを復元しました！",
            restoreLegacy: "🔄 旧形式のプロファイルを読み込みました。他の設定も含めるには完全バックアップを保存してください。",
            restoreInvalid: "❌ 無効なバックアップファイルです。",
            globalVarsTitle: "🔤 グローバル変数",
            globalVarsDesc: "形式: <code>名前=値</code><br>例: <code>miku=ツインテール, 青髪, 水色の目</code>",
            wildcardsTitle: "🎲 ワイルドカード",
            wildcardsDesc: "形式: <code>名前=値1, 値2, ...</code><br>例: <code>キャラクター=ミク, テト, ルカ</code>",
            blacklistTitle: "⚙️ タグブラックリスト",
            blacklistDesc: "以下に記載されたタグはDanbooru取得時に除外されます。カンマで区切ってください。",
            blacklistPlaceholder: "白背景, 屋外, 上半身, テキスト, ウォーターマーク",
            blacklistSaved: count => `✅ ブラックリストを更新しました（${count}件）`,
            nothingToPaste: "⚠️ 貼り付ける内容がありません。",
            cantFindEditor: "❌ エディタが見つかりません。",
            doneProseMirror: "✅ 完了 (ProseMirror)",
            fallbackMethod: "⚠️ うまくいきませんでした。別の方法を試します...",
            pasted: "✅ 貼り付けました！",
            clipboardCopy: "📋 コピーしました！Ctrl+Vで手動貼り付けしてください。",
            clipboardFail: "❌ クリップボードへのコピーに失敗しました。",
            nothingToPasteNeg: "⚠️ ネガティブに貼り付ける内容がありません。",
            cantFindNegEditor: "❌ ネガティブエディタが見つかりません。",
            doneNegProseMirror: "✅ ネガティブ完了 (ProseMirror)",
            negFallback: "⚠️ ネガティブフォールバック中...",
            negPasted: "✅ ネガティブを貼り付けました！",
            negClipboard: "📋 ネガティブをコピーしました！手動で貼り付けてください。",
            negClipboardFail: "❌ ネガティブのコピーに失敗しました。",
            nothingToAppend: "⚠️ 追加する内容がありません。",
            appendedProseMirror: "✅ 追加しました (ProseMirror)",
            appendFallback: "⚠️ 追加フォールバック中...",
            appended: "✅ 追加しました！",
            appendClipboard: "📋 コピーしました！手動で貼り付けてください。",
            nothingToAppendNeg: "⚠️ ネガティブに追加する内容がありません。",
            negAppendedProseMirror: "✅ ネガティブを追加しました (ProseMirror)",
            negAppendFallback: "⚠️ ネガティブ追加フォールバック中...",
            negAppended: "✅ ネガティブを追加しました！",
            fillVarsTitle: "変数とワイルドカードを入力",
            fillVarsLabel: "変数の値を入力：",
            wildcardChoose: "-- 選択 --",
            dbLabel: "DB (Danbooru ID)",
            dbPlaceholder: "789532",
            dbDesc: "Danbooruの投稿IDを入力",
            cancel: "キャンセル",
            apply: "適用",
            updateAvailable: "🎉 アップデートがあります！",
            updateCurrent: "現在のバージョン: <strong>v1.8.8</strong>",
            updateNew: vers => `最新バージョン: <strong>v${vers}</strong>`,
            updateNow: "今すぐ更新"
        }
    };
    // Detect language
    const LANG_KEY = "nai_ui_language";
    let currentLang = localStorage.getItem(LANG_KEY);
    if (!currentLang || !STRINGS[currentLang]) {
        const browserLang = (navigator.language || navigator.userLanguage || 'en').split('-')[0].toLowerCase();
        currentLang = ['id', 'ja'].includes(browserLang) ? browserLang : 'en';
        localStorage.setItem(LANG_KEY, currentLang);
    }
    const t = key => {
        const str = STRINGS[currentLang][key];
        return typeof str === 'function' ? str : (str || STRINGS.en[key] || key);
    };
    // === ORIGINAL CONSTANTS (unchanged) ===
    const STORAGE_KEY = "nai_prompt_profiles_v2";
    const LAST_PROFILE_KEY = "nai_last_profile";
    const ICON_POS_KEY = "nai_icon_position";
    const DARK_MODE_KEY = "nai_dark_mode";
    const BLACKLIST_KEY = "nai_danbooru_blacklist";
    const LAST_ID_KEY = "nai_last_danbooru_id";
    const GLOBAL_VARIABLES_KEY = "nai_global_variables";
    const WILDCARDS_KEY = "nai_wildcards";
    const WILDCARD_REMAINING_KEY = "nai_wildcard_remaining";
    let wildcardRemaining = {};
    let profiles = [];
    let lastProfileName = localStorage.getItem(LAST_PROFILE_KEY);
    let lastId = localStorage.getItem(LAST_ID_KEY) || "";
    let blacklistTags = [];
    let globalVariables = {};
    let wildcards = {};
    // Load all data
    try {
    wildcardRemaining = JSON.parse(localStorage.getItem(WILDCARD_REMAINING_KEY) || "{}");
} catch (e) {}
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            profiles = JSON.parse(saved).filter(p => p && p.name);
            profiles.forEach(p => {
                if (p.negative === undefined) p.negative = "";
            });
        }
    } catch (e) {
        console.error("Failed to load profiles:", e);
    }
    try { blacklistTags = (localStorage.getItem(BLACKLIST_KEY) || "").split(',').map(t => t.trim().toLowerCase()).filter(t => t); } catch (e) {}
    try { globalVariables = JSON.parse(localStorage.getItem(GLOBAL_VARIABLES_KEY) || "{}"); } catch (e) {}
    try { wildcards = JSON.parse(localStorage.getItem(WILDCARDS_KEY) || "{}"); } catch (e) {}
    function saveToStorage() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
        localStorage.setItem(BLACKLIST_KEY, blacklistTags.join(', '));
        localStorage.setItem(GLOBAL_VARIABLES_KEY, JSON.stringify(globalVariables));
        localStorage.setItem(WILDCARDS_KEY, JSON.stringify(wildcards));
        localStorage.setItem(WILDCARD_REMAINING_KEY, JSON.stringify(wildcardRemaining));
    }
    function setLastProfile(name) {
        lastProfileName = name;
        localStorage.setItem(LAST_PROFILE_KEY, name);
    }
    // --- FIND EDITORS ---
    function findPositiveEditor() {
        return document.querySelector('.image-gen-prompt-main .ProseMirror') ||
               document.querySelector('.prompt-input-box-prompt .ProseMirror');
    }
    function findNegativeEditor() {
        return document.querySelector('.prompt-input-box-undesired-content .ProseMirror');
    }
    function findPMView(node, maxDepth = 6) {
        let el = node;
        let depth = 0;
        while (el && depth < maxDepth) {
            try {
                const maybeKeys = Object.keys(el);
                for (const k of maybeKeys) {
                    try {
                        const v = el[k];
                        if (v && typeof v === 'object' && v.state && typeof v.dispatch === 'function') {
                            return v;
                        }
                    } catch (e) {}
                }
                if (el.pmView) return el.pmView;
                if (el.__pmView) return el.__pmView;
                if (el._pmView) return el._pmView;
                if (el.__view) return el.__view;
                if (el._view) return el._view;
            } catch (e) {}
            el = el.parentNode;
            depth++;
        }
        return null;
    }
    // --- REPLACE GLOBAL VARIABLES ---
    function replaceGlobalVariables(text) {
        if (!text) return text;
        let result = text;
        const regex = /{([^{}]+)}/g;
        let match;
        while ((match = regex.exec(text)) !== null) {
            const key = match[1];
            if (key === "DB") continue;
            if (globalVariables[key] !== undefined) {
                const value = globalVariables[key];
                const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const pattern = new RegExp(`{${escapedKey}}`, 'g');
                result = result.replace(pattern, value);
            }
        }
        return result;
    }
    // --- APPLY TO POSITIVE ---
    async function applyTextToEditor(text, statusEl) {
        if (!text) {
            statusEl.textContent = t('nothingToPaste');
            return false;
        }
        text = replaceGlobalVariables(text);
        statusEl.textContent = "🔍 Looking for editor...";
        const editor = findPositiveEditor();
        if (!editor) {
            statusEl.textContent = t('cantFindEditor');
            return false;
        }
        const view = findPMView(editor);
        if (view) {
            try {
                const tr = view.state.tr;
                tr.delete(0, view.state.doc.content.size);
                tr.insertText(text);
                view.dispatch(tr);
                statusEl.textContent = t('doneProseMirror');
                return true;
            } catch (e) {
                console.error("PM view dispatch error:", e);
                statusEl.textContent = t('fallbackMethod');
            }
        }
        try {
            editor.focus();
            const range = document.createRange();
            range.selectNodeContents(editor);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            const okIns = document.execCommand('insertText', false, text);
            editor.dispatchEvent(new InputEvent('input', { bubbles: true }));
            editor.dispatchEvent(new Event('change', { bubbles: true }));
            if (okIns) {
                statusEl.textContent = t('pasted');
                return true;
            }
        } catch (e) {
            console.error("execCommand error:", e);
            statusEl.textContent = t('clipboardCopy');
        }
        try {
            await navigator.clipboard.writeText(text);
            statusEl.textContent = t('clipboardCopy');
            return false;
        } catch (e) {
            console.error("Clipboard error:", e);
            statusEl.textContent = t('clipboardFail');
            return false;
        }
    }
    // --- APPLY TO NEGATIVE ---
    async function applyTextToNegativeEditor(text, statusEl) {
        if (!text) {
            statusEl.textContent = t('nothingToPasteNeg');
            return false;
        }
        text = replaceGlobalVariables(text);
        statusEl.textContent = "🔍 Looking for negative editor...";
        const editor = findNegativeEditor();
        if (!editor) {
            statusEl.textContent = t('cantFindNegEditor');
            return false;
        }
        const view = findPMView(editor);
        if (view) {
            try {
                const tr = view.state.tr;
                tr.delete(0, view.state.doc.content.size);
                tr.insertText(text);
                view.dispatch(tr);
                statusEl.textContent = t('doneNegProseMirror');
                return true;
            } catch (e) {
                console.error("PM negative dispatch error:", e);
                statusEl.textContent = t('negFallback');
            }
        }
        try {
            editor.focus();
            const range = document.createRange();
            range.selectNodeContents(editor);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            const okIns = document.execCommand('insertText', false, text);
            editor.dispatchEvent(new InputEvent('input', { bubbles: true }));
            editor.dispatchEvent(new Event('change', { bubbles: true }));
            if (okIns) {
                statusEl.textContent = t('negPasted');
                return true;
            }
        } catch (e) {
            console.error("Negative execCommand error:", e);
            statusEl.textContent = t('negClipboard');
        }
        try {
            await navigator.clipboard.writeText(text);
            statusEl.textContent = t('negClipboard');
            return false;
        } catch (e) {
            console.error("Negative clipboard error:", e);
            statusEl.textContent = t('negClipboardFail');
            return false;
        }
    }
    // --- APPEND TO POSITIVE ---
    async function applyTextToEditorAppend(text, statusEl) {
        if (!text?.trim()) {
            statusEl.textContent = t('nothingToAppend');
            return false;
        }
        text = replaceGlobalVariables(text);
        statusEl.textContent = "🔍 Looking for editor...";
        const editor = findPositiveEditor();
        if (!editor) {
            statusEl.textContent = t('cantFindEditor');
            return false;
        }
        let currentText = "";
        const view = findPMView(editor);
        if (view) {
            currentText = view.state.doc.textContent;
        } else {
            currentText = editor.textContent || "";
        }
        currentText = currentText.trim();
        let finalText = text.trim();
        if (currentText) {
            if (!currentText.endsWith(',')) {
                currentText += ',';
            }
            if (!finalText.startsWith(' ')) {
                finalText = ' ' + finalText;
            }
            finalText = currentText + finalText;
        } else {
            finalText = text.trim();
        }
        if (view) {
            try {
                const tr = view.state.tr;
                tr.delete(0, view.state.doc.content.size);
                tr.insertText(finalText);
                view.dispatch(tr);
                statusEl.textContent = t('appendedProseMirror');
                return true;
            } catch (e) {
                console.error("PM append error:", e);
                statusEl.textContent = t('appendFallback');
            }
        }
        try {
            editor.focus();
            const range = document.createRange();
            range.selectNodeContents(editor);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            const okIns = document.execCommand('insertText', false, finalText);
            editor.dispatchEvent(new InputEvent('input', { bubbles: true }));
            editor.dispatchEvent(new Event('change', { bubbles: true }));
            if (okIns) {
                statusEl.textContent = t('appended');
                return true;
            }
        } catch (e) {
            console.error("execCommand append error:", e);
            statusEl.textContent = t('appendClipboard');
        }
        try {
            await navigator.clipboard.writeText(finalText);
            statusEl.textContent = t('appendClipboard');
            return false;
        } catch (e) {
            console.error("Clipboard error:", e);
            statusEl.textContent = t('clipboardFail');
            return false;
        }
    }
    // --- APPEND TO NEGATIVE ---
    async function applyTextToNegativeEditorAppend(text, statusEl) {
        if (!text?.trim()) {
            statusEl.textContent = t('nothingToAppendNeg');
            return false;
        }
        text = replaceGlobalVariables(text);
        statusEl.textContent = "🔍 Looking for negative editor...";
        const editor = findNegativeEditor();
        if (!editor) {
            statusEl.textContent = t('cantFindNegEditor');
            return false;
        }
        let currentText = "";
        const view = findPMView(editor);
        if (view) {
            currentText = view.state.doc.textContent;
        } else {
            currentText = editor.textContent || "";
        }
        currentText = currentText.trim();
        let finalText = text.trim();
        if (currentText) {
            if (!currentText.endsWith(',')) {
                currentText += ',';
            }
            if (!finalText.startsWith(' ')) {
                finalText = ' ' + finalText;
            }
            finalText = currentText + finalText;
        } else {
            finalText = text.trim();
        }
        if (view) {
            try {
                const tr = view.state.tr;
                tr.delete(0, view.state.doc.content.size);
                tr.insertText(finalText);
                view.dispatch(tr);
                statusEl.textContent = t('negAppendedProseMirror');
                return true;
            } catch (e) {
                console.error("PM negative append error:", e);
                statusEl.textContent = t('negAppendFallback');
            }
        }
        try {
            editor.focus();
            const range = document.createRange();
            range.selectNodeContents(editor);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            const okIns = document.execCommand('insertText', false, finalText);
            editor.dispatchEvent(new InputEvent('input', { bubbles: true }));
            editor.dispatchEvent(new Event('change', { bubbles: true }));
            if (okIns) {
                statusEl.textContent = t('negAppended');
                return true;
            }
        } catch (e) {
            console.error("Negative execCommand append error:", e);
            statusEl.textContent = t('negClipboard');
        }
        try {
            await navigator.clipboard.writeText(finalText);
            statusEl.textContent = t('negClipboard');
            return false;
        } catch (e) {
            console.error("Negative clipboard error:", e);
            statusEl.textContent = t('negClipboardFail');
            return false;
        }
    }
    // --- FILL VARIABLES DIALOG ---
    function fillVariablesTemporarily(content, negativeContent, callback) {
        const allContent = content + " " + negativeContent;
        const regex = /{([^{}]+)}/g;
        const hasDB = allContent.includes('{DB}');
        const matches = [];
        let match;
        const seen = new Set();
        regex.lastIndex = 0;
        while ((match = regex.exec(allContent)) !== null) {
            const key = match[1];
            if (!seen.has(key) && key !== "DB" && globalVariables[key] === undefined) {
                seen.add(key);
                matches.push(key);
            }
        }
        const wildcardRegex = /\[([^\[\]]+)\]/g;
        const wildcardMatches = [];
        let wMatch;
        const wSeen = new Set();
        while ((wMatch = wildcardRegex.exec(allContent)) !== null) {
            const key = wMatch[1];
            if (!wSeen.has(key)) {
                wSeen.add(key);
                wildcardMatches.push(key);
            }
        }
        if (matches.length === 0 && wildcardMatches.length === 0 && !hasDB) {
            callback(content, negativeContent);
            return;
        }
        const dialog = document.createElement('div');
        Object.assign(dialog.style, {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '360px',
            background: getComputedStyle(panel).backgroundColor,
            color: getComputedStyle(panel).color,
            border: getComputedStyle(panel).border,
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            zIndex: '20000',
            padding: '16px',
            fontFamily: 'sans-serif',
            boxSizing: 'border-box'
        });
        let inputsHTML = `<div style="font-size:14px; margin-bottom:12px; font-weight:500;">${t('fillVarsLabel')}</div>`;
        wildcardMatches.forEach(key => {
            const options = wildcards[key] || [];
            let optionsHTML = `<option value="">${t('wildcardChoose')}</option>`;
            options.forEach(opt => {
                optionsHTML += `<option value="${opt}">${opt}</option>`;
            });
            inputsHTML += `
                <div style="margin-bottom:12px;">
                    <label style="display:block; font-size:13px; margin-bottom:4px; opacity:0.9;">[${key}]</label>
                    <select data-key="${key}" data-type="wildcard" style="width:100%; padding:8px; border-radius:6px; border:1px solid ${getComputedStyle(panel).borderColor};
                           background:${panel.style.background === 'rgb(30, 41, 59)' ? '#334155' : '#f8fafc'};
                           color:${panel.style.color};
                           font-size:13px;">
                        ${optionsHTML}
                    </select>
                </div>`;
        });
        matches.forEach(key => {
            inputsHTML += `
                <div style="margin-bottom:10px;">
                    <label style="display:block; font-size:13px; margin-bottom:4px; opacity:0.9;">{${key}}</label>
                    <textarea data-key="${key}" data-type="manual"
                              style="width:100%; min-height:40px; padding:8px; border-radius:6px; border:1px solid ${getComputedStyle(panel).borderColor};
                                     background:${panel.style.background === 'rgb(30, 41, 59)' ? '#334155' : '#f8fafc'};
                                     color:${panel.style.color};
                                     font-size:13px;
                                     resize:vertical;"></textarea>
                </div>`;
        });
        if (hasDB) {
            inputsHTML += `
                <div style="margin-bottom:10px;">
                    <label style="display:block; font-size:13px; margin-bottom:4px; opacity:0.9;">${t('dbLabel')}</label>
                    <input type="text" placeholder="${t('dbPlaceholder')}"
                           data-key="DB_ID"
                           style="width:100%; padding:8px; border-radius:6px; border:1px solid ${getComputedStyle(panel).borderColor};
                                  background:${panel.style.background === 'rgb(30, 41, 59)' ? '#334155' : '#f8fafc'};
                                  color:${panel.style.color};
                                  font-size:13px;" />
                    <div style="font-size:11px; color:#94a3b8; margin-top:4px;">
                        ${t('dbDesc')}
                    </div>
                </div>`;
        }
        dialog.innerHTML = `
            <div style="font-weight:bold; font-size:15px; margin-bottom:16px;">${t('fillVarsTitle')}</div>
            <div id="inputs">${inputsHTML}</div>
            <div style="display:flex; gap:8px; justify-content:flex-end; margin-top:16px;">
                <button id="cancel" style="padding:6px 12px; background:#ef4444; color:white; border:none; border-radius:6px; cursor:pointer;">${t('cancel')}</button>
                <button id="apply" style="padding:6px 12px; background:#0ea5e9; color:white; border:none; border-radius:6px; cursor:pointer;">${t('apply')}</button>
            </div>
        `;
        document.body.appendChild(dialog);
        const applyBtn = dialog.querySelector('#apply');
        const cancelBtn = dialog.querySelector('#cancel');
        applyBtn.onclick = async () => {
            let filledPositive = content;
            let filledNegative = negativeContent;
const selects = dialog.querySelectorAll('select[data-type="wildcard"]');
selects.forEach(sel => {
    const key = sel.dataset.key;
    const value = sel.value;
    const options = wildcards[key] || [];

    if (value) {
        // Manual selection: replace all with same value
        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const pattern = new RegExp(`\\[${escapedKey}\\]`, 'g');
        filledPositive = filledPositive.replace(pattern, value);
        filledNegative = filledNegative.replace(pattern, value);
        // Reset remaining for this key since user chose manually
        wildcardRemaining[key] = [...options];
        delete wildcardRemaining[key]; // or just reset
        localStorage.setItem(WILDCARD_REMAINING_KEY, JSON.stringify(wildcardRemaining));
    } else {
        if (options.length === 0) {
            const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const pattern = new RegExp(`\\[${escapedKey}\\]\\s*,?\\s*`, 'g');
            filledPositive = filledPositive.replace(pattern, '');
            filledNegative = filledNegative.replace(pattern, '');
            return;
        }

        // Get remaining options for this key
        let remaining = wildcardRemaining[key] || [...options];

        // If no remaining, refill and shuffle
        if (remaining.length === 0) {
            remaining = [...options];
        }

        // Shuffle if it's a fresh list (only once per cycle)
        if (remaining.length === options.length) {
            for (let i = remaining.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
            }
        }

        // Pick first
        const chosen = remaining.shift();
        wildcardRemaining[key] = remaining;
        localStorage.setItem(WILDCARD_REMAINING_KEY, JSON.stringify(wildcardRemaining));

        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const pattern = new RegExp(`\\[${escapedKey}\\]`, 'g');
        filledPositive = filledPositive.replace(pattern, chosen);
        filledNegative = filledNegative.replace(pattern, chosen);
    }
});
            const textareas = dialog.querySelectorAll('textarea[data-type="manual"]');
            textareas.forEach(ta => {
                const key = ta.dataset.key;
                const value = ta.value.trim();
                if (value) {
                    filledPositive = filledPositive.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
                    filledNegative = filledNegative.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
                } else {
                    filledPositive = filledPositive.replace(new RegExp(`\\{${key}\\}\\s*,?\\s*`, 'g'), '');
                    filledNegative = filledNegative.replace(new RegExp(`\\{${key}\\}\\s*,?\\s*`, 'g'), '');
                }
            });
            const dbInput = document.querySelector('input[data-key="DB_ID"]');
            if (dbInput && allContent.includes('{DB}')) {
                const id = dbInput.value.trim();
                if (id && /^\d+$/.test(id)) {
                    try {
                        const res = await fetch(`https://danbooru.donmai.us/posts/${id}.json`, {
                            headers: { "User-Agent": "NovelAI-Prompt-Profiles/3.55" }
                        });
                        if (!res.ok) throw new Error("HTTP " + res.status);
                        const data = await res.json();
                        const tags = [
                            data.tag_string_character || "",
                            data.tag_string_copyright || "",
                            data.tag_string_general || ""
                        ].join(" ").split(" ")
                          .filter(t => t && !t.includes("_:") && !t.startsWith("artist:") && t.length > 1);
                        const filteredTags = tags.filter(tag => {
                            const normalized = tag.replace(/_/g, ' ').trim().toLowerCase();
                            return !blacklistTags.some(blacklisted => normalized.includes(blacklisted));
                        });
                        const tagString = [...new Set(filteredTags)]
                            .map(t => t.replace(/_/g, ' ').trim())
                            .filter(t => t)
                            .slice(0, 30)
                            .join(", ");
                        if (!tagString) {
                            filledPositive = filledPositive.replace(/\{DB\}\s*,?\s*/g, '');
                            filledNegative = filledNegative.replace(/\{DB\}\s*,?\s*/g, '');
                        } else {
                            filledPositive = filledPositive.replace(/\{DB\}/g, tagString);
                            filledNegative = filledNegative.replace(/\{DB\}/g, tagString);
                        }
                    } catch (err) {
                        filledPositive = filledPositive.replace(/\{DB\}\s*,?\s*/g, '');
                        filledNegative = filledNegative.replace(/\{DB\}\s*,?\s*/g, '');
                    }
                } else {
                    filledPositive = filledPositive.replace(/\{DB\}\s*,?\s*/g, '');
                    filledNegative = filledNegative.replace(/\{DB\}\s*,?\s*/g, '');
                }
            }
            document.body.removeChild(dialog);
            callback(filledPositive, filledNegative);
        };
        cancelBtn.onclick = () => {
            document.body.removeChild(dialog);
            callback(null, null);
        };
    }
    function updateSelectOptions(select, selectedName = null) {
        select.innerHTML = "";
        if (profiles.length === 0) {
            const opt = document.createElement("option");
            opt.value = "";
            opt.textContent = t('noProfiles');
            opt.disabled = true;
            select.appendChild(opt);
            return;
        }
        profiles.forEach((p, i) => {
            const opt = document.createElement("option");
            opt.value = p.name;
            opt.textContent = `${i + 1}. ${p.name}`;
            select.appendChild(opt);
        });
        if (selectedName && profiles.some(p => p.name === selectedName)) {
            select.value = selectedName;
        } else if (profiles.length > 0) {
            select.selectedIndex = 0;
        }
    }
    let panel = null;
    let select = null;
    let taPositive = null;
    let taNegative = null;
    let status = null;
    function createPanelOnce() {
        if (document.getElementById('nai-profiles-panel')) return;
        const container = document.querySelector('.image-gen-prompt-main') ||
                         document.querySelector('.prompt-input-box-prompt');
        if (!container) {
            setTimeout(createPanelOnce, 500);
            return;
        }
        let savedPos = { x: 10, y: 10 };
        try {
            const posStr = localStorage.getItem(ICON_POS_KEY);
            if (posStr) savedPos = JSON.parse(posStr);
        } catch (e) {}
        const toggle = document.createElement('div');
        toggle.id = "nai-profiles-toggle";
        Object.assign(toggle.style, {
            position: "fixed",
            top: "0", left: "0",
            zIndex: "10000",
            cursor: "move",
            fontSize: "20px",
            padding: "8px",
            backgroundColor: "#f8fafc",
            color: "#1e40af",
            border: "1px solid #bfdbfe",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            userSelect: "none",
            transform: `translate(${savedPos.x}px, ${savedPos.y}px)`,
            transition: "opacity 0.2s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px"
        });
        toggle.title = "Drag to move | Click to open";
        toggle.innerHTML = "📝";
        let isDragging = false;
        let offsetX = 0, offsetY = 0;
        toggle.addEventListener("mousedown", (e) => {
            if (e.target.tagName === 'BUTTON') return;
            isDragging = true;
            offsetX = e.clientX - savedPos.x;
            offsetY = e.clientY - savedPos.y;
            toggle.style.opacity = "0.85";
            toggle.style.cursor = "grabbing";
            e.preventDefault();
        });
        document.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            savedPos = { x, y };
            toggle.style.transform = `translate(${x}px, ${y}px)`;
        });
        document.addEventListener("mouseup", () => {
            if (!isDragging) return;
            isDragging = false;
            toggle.style.opacity = "1";
            toggle.style.cursor = "move";
            try {
                localStorage.setItem(ICON_POS_KEY, JSON.stringify(savedPos));
            } catch (e) {}
        });
        document.body.appendChild(toggle);
        panel = document.createElement('div');
        panel.id = "nai-profiles-panel";
        Object.assign(panel.style, {
            position: "fixed",
            zIndex: "9999",
            width: "420px",
            background: "#ffffff",
            color: "#111827",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            display: "none",
            overflow: "hidden",
            boxSizing: "border-box"
        });
        status = document.createElement('div');
        Object.assign(status.style, {
            padding: "10px",
            fontSize: "12.5px",
            color: "#64748b",
            textAlign: "center",
            background: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
            fontWeight: "500"
        });
        status.textContent = t('ready');
        const hdr = document.createElement('div');
        Object.assign(hdr.style, {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 16px",
            fontWeight: "600",
            color: "#1e40af",
            fontSize: "16px"
        });
        hdr.textContent = t('profilesTitle');
        const btnDarkMode = document.createElement('button');
        btnDarkMode.textContent = "🌙";
        btnDarkMode.title = t('toggleDark');
        Object.assign(btnDarkMode.style, {
            background: "transparent",
            border: "none",
            color: "#64748b",
            cursor: "pointer",
            fontSize: "18px",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "8px"
        });
        const btnGlobalVars = document.createElement('button');
        btnGlobalVars.innerHTML = "🔤";
        btnGlobalVars.title = t('manageGlobalVars');
        Object.assign(btnGlobalVars.style, {
            background: "transparent",
            border: "none",
            color: "#64748b",
            cursor: "pointer",
            fontSize: "18px",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "8px"
        });
        btnGlobalVars.onclick = (e) => {
            e.stopPropagation();
            if (document.getElementById('nai-global-vars-dialog')) return;
            const dialog = document.createElement('div');
            dialog.id = 'nai-global-vars-dialog';
            Object.assign(dialog.style, {
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '400px',
                maxWidth: '90vw',
                background: getComputedStyle(panel).backgroundColor,
                color: getComputedStyle(panel).color,
                border: getComputedStyle(panel).border,
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                zIndex: '20000',
                padding: '20px',
                fontFamily: 'sans-serif',
                boxSizing: 'border-box'
            });
            const lines = Object.entries(globalVariables).map(([k, v]) => `${k}=${v}`).join('\n');
            dialog.innerHTML = `
                <div style="font-weight:bold; font-size:16px; margin-bottom:12px;">${t('globalVarsTitle')}</div>
                <div style="font-size:13px; color:#94a3b8; margin-bottom:10px;">
                    ${t('globalVarsDesc')}
                </div>
                <textarea id="global-vars-input"
                          rows="8"
                          style="width:100%; padding:10px; border-radius:8px;
                                 border:1px solid ${getComputedStyle(panel).borderColor};
                                 background:${panel.style.background === 'rgb(30, 41, 59)' ? '#334155' : '#f8fafc'};
                                 color:${panel.style.color};
                                 font-size:13px;
                                 resize:vertical;
                                 margin-bottom:16px;"
                          placeholder="miku=twintail, blue hair, aqua eyes">${lines}</textarea>
                <div style="display:flex; gap:8px; justify-content:flex-end;">
                    <button id="cancel" style="padding:6px 12px; background:#ef4444; color:white; border:none; border-radius:6px; cursor:pointer;">${t('cancel')}</button>
                    <button id="save" style="padding:6px 12px; background:#0ea5e9; color:white; border:none; border-radius:6px; cursor:pointer;">${t('apply')}</button>
                </div>
            `;
            document.body.appendChild(dialog);
            const input = dialog.querySelector('#global-vars-input');
            dialog.querySelector('#save').onclick = () => {
                const text = input.value.trim();
                const newVars = {};
                if (text) {
                    const lines = text.split('\n');
                    for (const line of lines) {
                        const trimmed = line.trim();
                        if (!trimmed || trimmed.startsWith('#')) continue;
                        const eq = trimmed.indexOf('=');
                        if (eq === -1) continue;
                        const key = trimmed.substring(0, eq).trim();
                        const value = trimmed.substring(eq + 1).trim();
                        if (key && value) {
                            newVars[key] = value;
                        }
                    }
                }
                globalVariables = newVars;
                saveToStorage();
                status.textContent = `✅ ${Object.keys(newVars).length} ${currentLang === 'ja' ? '件のグローバル変数を保存しました。' : currentLang === 'id' ? 'variabel global disimpan.' : 'global variables saved.'}`;
                document.body.removeChild(dialog);
            };
            dialog.querySelector('#cancel').onclick = () => {
                document.body.removeChild(dialog);
            };
            dialog.addEventListener('click', (e) => {
                if (e.target === dialog) {
                    document.body.removeChild(dialog);
                }
            });
        };
        const btnWildcards = document.createElement('button');
        btnWildcards.innerHTML = "🎲";
        btnWildcards.title = t('manageWildcards');
        Object.assign(btnWildcards.style, {
            background: "transparent",
            border: "none",
            color: "#64748b",
            cursor: "pointer",
            fontSize: "18px",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "8px"
        });
        btnWildcards.onclick = (e) => {
            e.stopPropagation();
            if (document.getElementById('nai-wildcards-dialog')) return;
            const dialog = document.createElement('div');
            dialog.id = 'nai-wildcards-dialog';
            Object.assign(dialog.style, {
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '400px',
                maxWidth: '90vw',
                background: getComputedStyle(panel).backgroundColor,
                color: getComputedStyle(panel).color,
                border: getComputedStyle(panel).border,
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                zIndex: '20000',
                padding: '20px',
                fontFamily: 'sans-serif',
                boxSizing: 'border-box'
            });
            const lines = Object.entries(wildcards).map(([k, v]) => `${k}=${v.join(', ')}`).join('\n');
            dialog.innerHTML = `
                <div style="font-weight:bold; font-size:16px; margin-bottom:12px;">${t('wildcardsTitle')}</div>
                <div style="font-size:13px; color:#94a3b8; margin-bottom:10px;">
                    ${t('wildcardsDesc')}
                </div>
                <textarea id="wildcards-input"
                          rows="8"
                          style="width:100%; padding:10px; border-radius:8px;
                                 border:1px solid ${getComputedStyle(panel).borderColor};
                                 background:${panel.style.background === 'rgb(30, 41, 59)' ? '#334155' : '#f8fafc'};
                                 color:${panel.style.color};
                                 font-size:13px;
                                 resize:vertical;
                                 margin-bottom:16px;"
                          placeholder="character=miku, teto, luka">${lines}</textarea>
                <div style="display:flex; gap:8px; justify-content:flex-end;">
                    <button id="cancel" style="padding:6px 12px; background:#ef4444; color:white; border:none; border-radius:6px; cursor:pointer;">${t('cancel')}</button>
                    <button id="save" style="padding:6px 12px; background:#0ea5e9; color:white; border:none; border-radius:6px; cursor:pointer;">${t('apply')}</button>
                </div>
            `;
            document.body.appendChild(dialog);
            const input = dialog.querySelector('#wildcards-input');
            dialog.querySelector('#save').onclick = () => {
                const text = input.value.trim();
                const newWildcards = {};
                if (text) {
                    const lines = text.split('\n');
                    for (const line of lines) {
                        const trimmed = line.trim();
                        if (!trimmed || trimmed.startsWith('#')) continue;
                        const eq = trimmed.indexOf('=');
                        if (eq === -1) continue;
                        const key = trimmed.substring(0, eq).trim();
                        const values = trimmed.substring(eq + 1).split(',').map(v => v.trim()).filter(v => v);
                        if (key && values.length > 0) {
                            newWildcards[key] = values;
                        }
                    }
                }
                wildcards = newWildcards;
                saveToStorage();
                status.textContent = `✅ ${Object.keys(newWildcards).length} ${currentLang === 'ja' ? '件のワイルドカードを保存しました。' : currentLang === 'id' ? 'wildcard disimpan.' : 'wildcards saved.'}`;
                document.body.removeChild(dialog);
            };
            dialog.querySelector('#cancel').onclick = () => {
                document.body.removeChild(dialog);
            };
            dialog.addEventListener('click', (e) => {
                if (e.target === dialog) {
                    document.body.removeChild(dialog);
                }
            });
        };
        const btnSettings = document.createElement('button');
        btnSettings.innerHTML = "⚙️";
        btnSettings.title = t('settingsBlacklist');
        Object.assign(btnSettings.style, {
            background: "transparent",
            border: "none",
            color: "#64748b",
            cursor: "pointer",
            fontSize: "18px",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "8px"
        });
        btnSettings.onclick = (e) => {
            e.stopPropagation();
            if (document.getElementById('nai-blacklist-dialog')) return;
            const dialog = document.createElement('div');
            dialog.id = 'nai-blacklist-dialog';
            Object.assign(dialog.style, {
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '400px',
                maxWidth: '90vw',
                background: getComputedStyle(panel).backgroundColor,
                color: getComputedStyle(panel).color,
                border: getComputedStyle(panel).border,
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                zIndex: '20000',
                padding: '20px',
                fontFamily: 'sans-serif',
                boxSizing: 'border-box'
            });
            dialog.innerHTML = `
                <div style="font-weight:bold; font-size:16px; margin-bottom:16px;">${t('blacklistTitle')}</div>
                <div style="font-size:13px; color:#94a3b8; margin-bottom:12px;">
                    ${t('blacklistDesc')}
                </div>
                <textarea id="blacklist-input"
                          rows="4"
                          style="width:100%; padding:10px; border-radius:8px;
                                 border:1px solid ${getComputedStyle(panel).borderColor};
                                 background:${panel.style.background === 'rgb(30, 41, 59)' ? '#334155' : '#f8fafc'};
                                 color:${panel.style.color};
                                 font-size:13px;
                                 resize:vertical;
                                 margin-bottom:16px;"
                          placeholder="${t('blacklistPlaceholder')}">${blacklistTags.join(', ')}</textarea>
                <div style="display:flex; gap:8px; justify-content:flex-end;">
                    <button id="cancel" style="padding:6px 12px; background:#ef4444; color:white; border:none; border-radius:6px; cursor:pointer;">${t('cancel')}</button>
                    <button id="apply" style="padding:6px 12px; background:#0ea5e9; color:white; border:none; border-radius:6px; cursor:pointer;">${t('apply')}</button>
                </div>
            `;
            document.body.appendChild(dialog);
            const inputField = dialog.querySelector('#blacklist-input');
            dialog.querySelector('#apply').onclick = () => {
                const value = inputField.value.trim();
                if (value) {
                    blacklistTags = value.split(',')
                        .map(t => t.trim().toLowerCase())
                        .filter(t => t && t.length > 1);
                } else {
                    blacklistTags = [];
                }
                saveToStorage();
                status.textContent = t('blacklistSaved')(blacklistTags.length);
                document.body.removeChild(dialog);
            };
            dialog.querySelector('#cancel').onclick = () => {
                document.body.removeChild(dialog);
            };
            dialog.addEventListener('click', (e) => {
                if (e.target === dialog) {
                    document.body.removeChild(dialog);
                }
            });
        };
        // === LANGUAGE BUTTON ===
        const btnLang = document.createElement('button');
        btnLang.innerHTML = "🌐";
        btnLang.title = "Pilih Bahasa / Choose Language / 言語を選択";
        Object.assign(btnLang.style, {
            background: "transparent",
            border: "none",
            color: "#64748b",
            cursor: "pointer",
            fontSize: "18px",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "8px"
        });
        btnLang.onclick = (e) => {
            e.stopPropagation();
            const langMenu = document.createElement('div');
            Object.assign(langMenu.style, {
                position: 'absolute',
                top: '36px',
                right: '0',
                background: getComputedStyle(panel).backgroundColor,
                border: getComputedStyle(panel).border,
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                zIndex: '20001',
                padding: '6px 0',
                minWidth: '140px'
            });
            Object.entries(LANGUAGES).forEach(([code, name]) => {
                const item = document.createElement('div');
                item.textContent = name;
                Object.assign(item.style, {
                    padding: '8px 12px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    color: currentLang === code ? '#0ea5e9' : getComputedStyle(panel).color
                });
                item.onmouseenter = () => item.style.backgroundColor = getComputedStyle(panel).borderColor;
                item.onmouseleave = () => item.style.backgroundColor = '';
                item.onclick = () => {
                    currentLang = code;
                    localStorage.setItem(LANG_KEY, code);
                    location.reload(); // Simplest way to refresh all text
                };
                langMenu.appendChild(item);
            });
            btnLang.appendChild(langMenu);
            const handleClickOutside = (ev) => {
                if (!langMenu.contains(ev.target) && ev.target !== btnLang) {
                    langMenu.remove();
                    document.removeEventListener('click', handleClickOutside);
                }
            };
            document.addEventListener('click', handleClickOutside);
        };
        hdr.appendChild(btnDarkMode);
        hdr.appendChild(btnGlobalVars);
        hdr.appendChild(btnWildcards);
        hdr.appendChild(btnSettings);
        hdr.appendChild(btnLang); // 🌐 placed right after ⚙️
        const btnClose = document.createElement('button');
        btnClose.innerHTML = "&times;";
        Object.assign(btnClose.style, {
            background: "transparent",
            border: "none",
            color: "#94a3b8",
            cursor: "pointer",
            fontSize: "20px",
            lineHeight: "1",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        });
        btnClose.onmouseover = () => btnClose.style.color = "#f43f5e";
        btnClose.onmouseout = () => btnClose.style.color = "#94a3b8";
        btnClose.onclick = () => panel.style.display = "none";
        hdr.appendChild(btnClose);
        const inner = document.createElement('div');
        inner.style.padding = "16px";
        inner.style.boxSizing = "border-box";
        select = document.createElement('select');
        Object.assign(select.style, {
            width: "100%",
            height: "50px",
            marginBottom: "12px",
            padding: "0 12px",
            background: "#f8fafc",
            color: "#1e293b",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            fontSize: "14px",
            outline: "none"
        });
        select.onfocus = () => select.style.borderColor = "#3b82f6";
        select.onblur = () => select.style.borderColor = "#cbd5e1";
        updateSelectOptions(select, lastProfileName);
        inner.appendChild(select);
        taPositive = document.createElement('textarea');
        Object.assign(taPositive.style, {
            width: "100%",
            height: "100px",
            marginBottom: "12px",
            padding: "12px",
            background: "#f8fafc",
            color: "#1e293b",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            resize: "vertical",
            fontSize: "13.5px",
            outline: "none",
            fontFamily: "inherit",
            overflowY: "auto"
        });
        taPositive.placeholder = t('positivePlaceholder');
        inner.appendChild(taPositive);
        taNegative = document.createElement('textarea');
        Object.assign(taNegative.style, {
            width: "100%",
            height: "100px",
            marginBottom: "16px",
            padding: "12px",
            background: "#f8fafc",
            color: "#1e293b",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            resize: "vertical",
            fontSize: "13.5px",
            outline: "none",
            fontFamily: "inherit",
            overflowY: "auto"
        });
        taNegative.placeholder = t('negativePlaceholder');
        inner.appendChild(taNegative);
        const topBtns = document.createElement('div');
        topBtns.style.display = "grid";
        topBtns.style.gridTemplateColumns = "1fr 1fr";
        topBtns.style.gap = "10px";
        topBtns.style.marginBottom = "16px";
        function mkBtn(label, cb, bg = "#3b82f6", color = "#fff") {
            const b = document.createElement('button');
            b.textContent = label;
            Object.assign(b.style, {
                padding: "8px 4px",
                border: "none",
                borderRadius: "6px",
                background: bg,
                color: color,
                fontSize: "12px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: "1.2",
                textAlign: "center"
            });
            b.onmouseover = () => b.style.transform = "scale(1.05)";
            b.onmouseout = () => b.style.transform = "scale(1)";
            b.onclick = cb;
            return b;
        }
        const btnOverride = mkBtn(t('override'), async () => {
            const name = select.value;
            if (!name) return;
            const idx = profiles.findIndex(p => p.name === name);
            if (idx === -1) return;
            const content = profiles[idx].content;
            const negative = profiles[idx].negative || "";
            fillVariablesTemporarily(content, negative, (finalPrompt, finalNegative) => {
                if (finalPrompt === null) return;
                taPositive.value = content;
                taNegative.value = negative;
                syncTextareas();
                setLastProfile(name);
                status.textContent = "🔧 Overriding...";
                applyTextToEditor(finalPrompt, status).catch(console.error);
                applyTextToNegativeEditor(finalNegative, status).catch(console.error);
            });
        }, "#0ea5e9");
        const btnAppend = mkBtn(t('append'), async () => {
            const name = select.value;
            if (!name) return;
            const idx = profiles.findIndex(p => p.name === name);
            if (idx === -1) return;
            const content = profiles[idx].content;
            const negative = profiles[idx].negative || "";
            fillVariablesTemporarily(content, negative, (finalPrompt, finalNegative) => {
                if (finalPrompt === null) return;
                setLastProfile(name);
                status.textContent = "🔗 Appending...";
                applyTextToEditorAppend(finalPrompt, status).catch(console.error);
                applyTextToNegativeEditorAppend(finalNegative, status).catch(console.error);
            });
        }, "#84cc16");
        topBtns.appendChild(btnOverride);
        topBtns.appendChild(btnAppend);
        inner.appendChild(topBtns);
        const grid = document.createElement('div');
        grid.style.display = "grid";
        grid.style.gridTemplateColumns = "repeat(4, 1fr)";
        grid.style.gap = "8px";
        grid.style.marginBottom = "16px";
        const btnNew = mkBtn(t('newProfile'), () => {
            const input = prompt(t('enterProfileName'));
            if (!input || !input.trim()) return;
            const name = input.trim();
            if (profiles.some(p => p.name === name)) {
                status.textContent = t('profileExists')(name);
                return;
            }
            profiles.push({ name, content: "", negative: "" });
            saveToStorage();
            updateSelectOptions(select, name);
            select.value = name;
            select.dispatchEvent(new Event('change'));
            setLastProfile(name);
            status.textContent = t('createdProfile')(name);
        }, "#10b981");
        const btnSave = mkBtn(t('saveProfile'), () => {
            const name = select.value;
            if (!name || !profiles.some(p => p.name === name)) {
                status.textContent = t('pickProfileFirst');
                return;
            }
            const idx = profiles.findIndex(p => p.name === name);
            profiles[idx].content = taPositive.value;
            profiles[idx].negative = taNegative.value;
            saveToStorage();
            syncTextareas();
            status.textContent = t('savedProfile')(name);
        });
        const btnRename = mkBtn(t('renameProfile'), () => {
            const oldName = select.value;
            if (!oldName) return;
            const newName = prompt(t('renamePrompt'), oldName);
            if (!newName || !newName.trim()) return;
            const trimmed = newName.trim();
            if (profiles.some(p => p.name === trimmed)) {
                status.textContent = t('renameTaken')(trimmed);
                return;
            }
            const idx = profiles.findIndex(p => p.name === oldName);
            profiles[idx].name = trimmed;
            if (lastProfileName === oldName) setLastProfile(trimmed);
            saveToStorage();
            updateSelectOptions(select, trimmed);
            select.value = trimmed;
            syncTextareas();
            status.textContent = t('renamed')(oldName, trimmed);
        });
        const btnDelete = mkBtn(t('deleteProfile'), () => {
            const name = select.value;
            if (!name) return;
            if (confirm(t('confirmDelete')(name))) {
                profiles = profiles.filter(p => p.name !== name);
                saveToStorage();
                updateSelectOptions(select);
                taPositive.value = "";
                taNegative.value = "";
                if (profiles.length > 0) {
                    const newSelectedName = profiles[0].name;
                    select.value = newSelectedName;
                    select.dispatchEvent(new Event('change'));
                    setLastProfile(newSelectedName);
                    status.textContent = t('deletedSwitched')(name, newSelectedName);
                } else {
                    syncTextareas();
                    if (lastProfileName === name) {
                        localStorage.removeItem(LAST_PROFILE_KEY);
                        lastProfileName = null;
                    }
                    status.textContent = t('deletedNone')(name);
                }
            }
        }, "#ef4444");
        const btnClearAll = mkBtn(t('clearAll'), () => {
            if (confirm(t('confirmClearAll'))) {
                profiles = [];
                blacklistTags = [];
                globalVariables = {};
                wildcards = {};
                saveToStorage();
                localStorage.removeItem(LAST_PROFILE_KEY);
                localStorage.removeItem(LAST_ID_KEY);
                lastProfileName = null;
                lastId = "";
                updateSelectOptions(select);
                taPositive.value = "";
                taNegative.value = "";
                syncTextareas();
                status.textContent = t('clearedAll');
            }
        }, "#dc2626");
        const btnReorder = mkBtn(t('reorder'), () => {
            const currentName = select.value;
            if (!currentName) {
                status.textContent = t('pickProfileFirst');
                return;
            }
            const currentIndex = profiles.findIndex(p => p.name === currentName);
            if (currentIndex === -1) return;
            const targetPosInput = prompt(t('swapPrompt')(currentName, currentIndex + 1));
            const targetIndex = parseInt(targetPosInput) - 1;
            if (isNaN(targetIndex) || targetIndex < 0 || targetIndex >= profiles.length) {
                status.textContent = t('invalidPos');
                return;
            }
            if (targetIndex === currentIndex) {
                status.textContent = t('alreadyThere');
                return;
            }
            [profiles[currentIndex], profiles[targetIndex]] = [profiles[targetIndex], profiles[currentIndex]];
            saveToStorage();
            updateSelectOptions(select, currentName);
            select.value = currentName;
            select.dispatchEvent(new Event('change'));
            status.textContent = t('swapped')(currentName, targetIndex + 1);
        }, "#a855f7");
        const btnBooruById = mkBtn(t('danbooru'), () => {
            const idInput = prompt(t('danbooruPrompt')(lastId));
            if (!idInput) return;
            const id = idInput.trim();
            if (!/^\d+$/.test(id)) {
                status.textContent = t('danbooruInvalidId');
                return;
            }
            status.textContent = t('danbooruFetching')(id);
            fetch(`https://danbooru.donmai.us/posts/${id}.json`, {
                headers: { "User-Agent": "NovelAI-Prompt-Profiles/3.55" }
            })
            .then(res => {
                if (res.status === 404) throw new Error("Post not found");
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(data => {
                if (!data.tag_string_general) {
                    throw new Error("Tag data missing");
                }
                const tags = [
                    data.tag_string_character || "",
                    data.tag_string_copyright || "",
                    data.tag_string_general || ""
                ]
                .join(" ")
                .split(" ")
                .filter(tag => tag && tag.length > 1 && !tag.includes("_:") && !tag.startsWith("artist:"));
                const filteredTags = tags.filter(tag => {
                    const normalized = tag.replace(/_/g, ' ').trim().toLowerCase();
                    return !blacklistTags.some(blacklisted => normalized.includes(blacklisted));
                });
                const cleanTags = [...new Set(filteredTags)]
                    .map(t => t.replace(/_/g, ' ').trim())
                    .filter(t => t)
                    .join(", ");
                if (!cleanTags) {
                    throw new Error("No usable tags after filtering");
                }
                localStorage.setItem(LAST_ID_KEY, id);
                lastId = id;
                status.textContent = t('danbooruApplying')(id);
                applyTextToEditor(cleanTags, status).catch(err => {
                    console.error("Apply error:", err);
                    status.textContent = t('danbooruApplyFail');
                });
            })
            .catch(err => {
                console.error("Danbooru fetch error:", err);
                const message = err.message.includes("network")
                    ? "Check connection or site down"
                    : err.message;
                status.textContent = t('danbooruError')(message);
            });
        }, "#8b5cf6");
        [btnNew, btnSave, btnRename, btnDelete, btnClearAll, btnReorder, btnBooruById].forEach(b => grid.appendChild(b));
        inner.appendChild(grid);
        const fullBackupRow = document.createElement('div');
        fullBackupRow.style.display = "grid";
        fullBackupRow.style.gridTemplateColumns = "1fr 1fr";
        fullBackupRow.style.gap = "8px";
        fullBackupRow.style.marginTop = "10px";
        const btnFullBackup = mkBtn(t('fullBackup'), () => {
            const backup = {
                version: "2.0.1-full",
                profiles: profiles,
                blacklist: blacklistTags,
                globalVariables: globalVariables,
                wildcards: wildcards,
                lastProfile: lastProfileName,
                darkMode: localStorage.getItem(DARK_MODE_KEY) === '1',
                iconPosition: localStorage.getItem(ICON_POS_KEY) || '{"x":10,"y":10}',
                lastDanbooruId: lastId
            };
            const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `nai_full_backup_${new Date().toISOString().slice(0,10)}.json`;
            a.click();
            URL.revokeObjectURL(url);
            status.textContent = t('backupSaved');
        }, "#8b5cf6", "#fff");
        const btnFullRestore = mkBtn(t('fullRestore'), () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (ev) => {
                    try {
                        const data = JSON.parse(ev.target.result);
                        if (data.version && data.version.includes('full')) {
                            if (data.profiles) profiles = data.profiles;
                            if (Array.isArray(data.blacklist)) blacklistTags = data.blacklist;
                            if (data.globalVariables && typeof data.globalVariables === 'object') globalVariables = data.globalVariables;
                            if (data.wildcards && typeof data.wildcards === 'object') wildcards = data.wildcards;
                            if (data.lastProfile) lastProfileName = data.lastProfile;
                            if (data.lastDanbooruId) lastId = data.lastDanbooruId;
                            if (data.iconPosition) localStorage.setItem(ICON_POS_KEY, data.iconPosition);
                            const isDark = data.darkMode !== undefined ? data.darkMode : (localStorage.getItem(DARK_MODE_KEY) === '1');
                            if (data.darkMode !== undefined) localStorage.setItem(DARK_MODE_KEY, data.darkMode ? '1' : '0');
                            saveToStorage();
                            localStorage.setItem(LAST_PROFILE_KEY, lastProfileName || "");
                            localStorage.setItem(LAST_ID_KEY, lastId || "");
                            updateSelectOptions(select, lastProfileName);
                            if (isDark) {
                                panel.classList.add('dark-mode');
                                btnDarkMode.textContent = "☀️";
                                Object.assign(panel.style, {
                                    background: "#1e293b",
                                    color: "#e2e8f0",
                                    borderColor: "#334155"
                                });
                                const inputs = panel.querySelectorAll('select, textarea, button');
                                inputs.forEach(el => {
                                    if (el.tagName === 'SELECT' || el.tagName === 'TEXTAREA') {
                                        Object.assign(el.style, {
                                            background: "#334155",
                                            color: "#e2e8f0",
                                            borderColor: "#475569"
                                        });
                                    }
                                });
                                status.style.background = "#0f172a";
                                status.style.borderBottomColor = "#334155";
                                hdr.style.color = "#93c5fd";
                            } else {
                                panel.classList.remove('dark-mode');
                                btnDarkMode.textContent = "🌙";
                                Object.assign(panel.style, {
                                    background: "#ffffff",
                                    color: "#111827",
                                    border: "1px solid #e2e8f0"
                                });
                                const inputs = panel.querySelectorAll('select, textarea, button');
                                inputs.forEach(el => {
                                    if (el.tagName === 'SELECT' || el.tagName === 'TEXTAREA') {
                                        Object.assign(el.style, {
                                            background: "#f8fafc",
                                            color: "#1e293b",
                                            borderColor: "#cbd5e1"
                                        });
                                    }
                                });
                                status.style.background = "#f8fafc";
                                status.style.borderBottomColor = "#e2e8f0";
                                hdr.style.color = "#1e40af";
                            }
                            if (lastProfileName) {
                                const profile = profiles.find(p => p.name === lastProfileName);
                                if (profile) {
                                    taPositive.value = profile.content || "";
                                    taNegative.value = profile.negative || "";
                                    taPositive.dispatchEvent(new Event('input', { bubbles: true }));
                                    taNegative.dispatchEvent(new Event('input', { bubbles: true }));
                                }
                            }
                            status.textContent = t('restoreSuccess');
                        } else {
                            if (Array.isArray(data)) {
                                profiles = data.map(p => ({ ...p, negative: p.negative || "" }));
                                saveToStorage();
                                updateSelectOptions(select, null);
                                taPositive.value = "";
                                taNegative.value = "";
                                if (profiles.length > 0) {
                                    select.value = profiles[0].name;
                                    const p = profiles[0];
                                    taPositive.value = p.content || "";
                                    taNegative.value = p.negative || "";
                                    setLastProfile(profiles[0].name);
                                    syncTextareas();
                                }
                                status.textContent = t('restoreLegacy');
                            } else {
                                status.textContent = t('restoreInvalid');
                            }
                        }
                    } catch (err) {
                        status.textContent = t('restoreInvalid');
                        console.error(err);
                    }
                };
                reader.readAsText(file);
            };
            input.click();
        }, "#06b6d4", "#fff");
        fullBackupRow.appendChild(btnFullBackup);
        fullBackupRow.appendChild(btnFullRestore);
        inner.appendChild(fullBackupRow);
        panel.appendChild(status);
        panel.appendChild(hdr);
        panel.appendChild(inner);
        document.body.appendChild(panel);
        // Dark mode init
        let isDarkMode = false;
        try {
            isDarkMode = localStorage.getItem(DARK_MODE_KEY) === '1';
        } catch (e) {}
        if (isDarkMode) {
            panel.classList.add('dark-mode');
            btnDarkMode.textContent = "☀️";
            Object.assign(panel.style, {
                background: "#1e293b",
                color: "#e2e8f0",
                borderColor: "#334155"
            });
            const inputs = panel.querySelectorAll('select, textarea, button');
            inputs.forEach(el => {
                if (el.tagName === 'SELECT' || el.tagName === 'TEXTAREA') {
                    Object.assign(el.style, {
                        background: "#334155",
                        color: "#e2e8f0",
                        borderColor: "#475569"
                    });
                }
            });
            status.style.background = "#0f172a";
            status.style.borderBottomColor = "#334155";
            hdr.style.color = "#93c5fd";
        }
        btnDarkMode.onclick = (e) => {
            e.stopPropagation();
            const isNowDark = !panel.classList.contains('dark-mode');
            panel.classList.toggle('dark-mode', isNowDark);
            btnDarkMode.textContent = isNowDark ? "☀️" : "🌙";
            try {
                localStorage.setItem(DARK_MODE_KEY, isNowDark ? '1' : '0');
            } catch (e) {}
            if (isNowDark) {
                Object.assign(panel.style, {
                    background: "#1e293b",
                    color: "#e2e8f0",
                    borderColor: "#334155"
                });
                const inputs = panel.querySelectorAll('select, textarea, button');
                inputs.forEach(el => {
                    if (el.tagName === 'SELECT' || el.tagName === 'TEXTAREA') {
                        Object.assign(el.style, {
                            background: "#334155",
                            color: "#e2e8f0",
                            borderColor: "#475569"
                        });
                    }
                });
                status.style.background = "#0f172a";
                status.style.borderBottomColor = "#334155";
                hdr.style.color = "#93c5fd";
            } else {
                Object.assign(panel.style, {
                    background: "#ffffff",
                    color: "#111827",
                    border: "1px solid #e2e8f0"
                });
                const inputs = panel.querySelectorAll('select, textarea, button');
                inputs.forEach(el => {
                    if (el.tagName === 'SELECT' || el.tagName === 'TEXTAREA') {
                        Object.assign(el.style, {
                            background: "#f8fafc",
                            color: "#1e293b",
                            borderColor: "#cbd5e1"
                        });
                    }
                });
                status.style.background = "#f8fafc";
                status.style.borderBottomColor = "#e2e8f0";
                hdr.style.color = "#1e40af";
            }
        };
        function syncTextareas() {
            taPositive.dispatchEvent(new Event('input', { bubbles: true }));
            taPositive.dispatchEvent(new Event('change', { bubbles: true }));
            taNegative.dispatchEvent(new Event('input', { bubbles: true }));
            taNegative.dispatchEvent(new Event('change', { bubbles: true }));
        }
        select.addEventListener('change', () => {
            const name = select.value;
            const profile = profiles.find(p => p.name === name);
            taPositive.value = profile ? profile.content : "";
            taNegative.value = profile ? profile.negative : "";
            syncTextareas();
            if (name) setLastProfile(name);
            status.textContent = name ? `📄 Loaded: ${name}` : "No profile selected.";
        });
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const rect = toggle.getBoundingClientRect();
            panel.style.top = `${rect.bottom + window.scrollY + 6}px`;
            panel.style.left = `${rect.left + window.scrollX}px`;
            if (panel.style.display === "none" && lastProfileName) {
                const profile = profiles.find(p => p.name === lastProfileName);
                if (profile) {
                    select.value = lastProfileName;
                    taPositive.value = profile.content;
                    taNegative.value = profile.negative;
                    syncTextareas();
                }
            }
            panel.style.display = panel.style.display === "none" ? "block" : "none";
        });
        // Auto update
        function compareVersions(v1, v2) {
            const a = v1.split('.').map(Number);
            const b = v2.split('.').map(Number);
            for (let i = 0; i < Math.max(a.length, b.length); i++) {
                const num1 = a[i] || 0;
                const num2 = b[i] || 0;
                if (num1 > num2) return 1;
                if (num1 < num2) return -1;
            }
            return 0;
        }
        setTimeout(async () => {
            try {
                const res = await fetch('https://raw.githubusercontent.com/mikojiy/NAI-Profile-Manager/main/NAIPM.user.js?t=' + Date.now(), { cache: 'no-cache' });
                const text = await res.text();
                const match = text.match(/@version\s+([0-9.]+)/);
                if (!match) return;
                const latestVersion = match[1];
                const currentVersion = "2.0.1"; // Updated version
                const comparison = compareVersions(latestVersion, currentVersion);
                if (comparison > 0 && !document.getElementById('nai-update-notice')) {
                    const notice = document.createElement('div');
                    notice.id = 'nai-update-notice';
                    Object.assign(notice.style, {
                        position: 'fixed',
                        top: '30px',
                        right: '30px',
                        zIndex: '99999',
                        background: '#1e40af',
                        color: 'white',
                        padding: '16px 20px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                        maxWidth: '380px',
                        fontFamily: 'sans-serif',
                        fontSize: '14px',
                        lineHeight: '1.5'
                    });
                    notice.innerHTML = `
                        <b>${t('updateAvailable')}</b><br>
                        ${t('updateNew')(latestVersion)}<br>
                        ${t('updateCurrent')}<br>
                        <button id="update-now" style="
                            margin-top: 10px;
                            padding: 8px 14px;
                            background: white;
                            color: #1e40af;
                            border: none;
                            borderRadius: 8px;
                            fontWeight: bold;
                            cursor: pointer;
                        ">${t('updateNow')}</button>
                    `;
                    document.body.appendChild(notice);
                    document.getElementById('update-now').onclick = () => {
                        window.open('https://raw.githubusercontent.com/mikojiy/NAI-Profile-Manager/main/NAIPM.user.js', '_blank');
                        notice.remove();
                    };
                }
            } catch (e) {
                console.warn('Auto update check failed:', e);
            }
        }, 3000);
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createPanelOnce);
    } else {
        createPanelOnce();
    }
// === KEYBOARD SHORTCUTS (MULTILINGUAL, MINIMAL CHANGE) ===
function applyProfileByIndex(index) {
    if (index < 0 || index >= profiles.length) {
        status.textContent = t('pickProfileFirst');
        return;
    }
    const profile = profiles[index];
    if (!profile) return;
    select.value = profile.name;
    select.dispatchEvent(new Event('change'));
    setLastProfile(profile.name);
    fillVariablesTemporarily(profile.content, profile.negative || "", (finalPrompt, finalNegative) => {
        if (finalPrompt === null) return;
        applyTextToEditor(finalPrompt, status).catch(console.error);
        applyTextToNegativeEditor(finalNegative, status).catch(console.error);
        // Gunakan pesan sukses sesuai bahasa
        const appliedMsg = {
            id: `✅ Diterapkan: ${profile.name}`,
            en: `✅ Applied: ${profile.name}`,
            ja: `✅ 適用済み: ${profile.name}`
        }[currentLang] || `✅ Applied: ${profile.name}`;
        status.textContent = appliedMsg;
    });
}
function quickSearchProfiles(query) {
    query = query.trim().toLowerCase();
    let targetIndex = -1;
    const num = parseInt(query, 10);
    if (!isNaN(num) && num >= 1 && num <= profiles.length) {
        targetIndex = num - 1;
    } else {
        for (let i = 0; i < profiles.length; i++) {
            if (profiles[i].name.toLowerCase().includes(query)) {
                targetIndex = i;
                break;
            }
        }
    }
    if (targetIndex !== -1) {
        applyProfileByIndex(targetIndex);
    } else {
        const noMatchMsg = {
            id: "🔍 Tidak ada profil yang cocok.",
            en: "🔍 No matching profile.",
            ja: "🔍 一致するプロファイルがありません。"
        }[currentLang] || "🔍 No matching profile.";
        status.textContent = noMatchMsg;
    }
}
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && !e.altKey && !e.shiftKey) {
        // Cegah saat fokus di input/editor (opsional, tapi disarankan)
        if (e.key >= '1' && e.key <= '9') {
            e.preventDefault();
            const index = parseInt(e.key, 10) - 1;
            applyProfileByIndex(index);
        } else if (e.key === '0') {
            e.preventDefault();
            applyProfileByIndex(9);
        } else if (e.key === 'q' || e.key === 'Q') {
            e.preventDefault();
            const promptTitle = {
                id: "🔍 Pencarian Cepat Profil\nKetik nomor atau nama profil:",
                en: "🔍 Quick Profile Search\nEnter number or name:",
                ja: "🔍 プロファイルを検索\n番号または名前を入力:"
            }[currentLang] || "🔍 Quick Profile Search\nEnter number or name:";
            const query = prompt(promptTitle);
            if (query) {
                quickSearchProfiles(query);
            }
        }
    }
});
})();
