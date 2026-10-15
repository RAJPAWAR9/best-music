# Booster OS — Plugin System

## Files
```
index.html          your app (+ small plugin bridge near the end of the main <script>, + 2 script tags before </body>)
lyrics.js           unchanged
plugins.js          the plugin runtime (loader, API, Plugins page)
plugins/
  registry.js       list of built-in plugins (add a line to ship a new one)
  sleep-timer.js    example extension (top-bar button + timer)
  tab-title.js      example extension (events)
  play-stats.js     example extension (custom sidebar page)
  neon-theme.css    example theme (just CSS variables)
```
Deploy: push this folder to GitHub, Settings → Pages → branch `main`. Nothing else needed.

## Using plugins (inside the app)
Open the **puzzle icon** in the top-right (works on phone and desktop; desktop also has *Plugins* in the sidebar).
Sidebar → **Plugins**
- **On/off:** use the switch next to each plugin (remembered in this browser).
- **Add a plugin:** paste a link to a `.js` (extension) or `.css` (theme) file and tap *Add link*, or tap *Choose file* and pick one from your phone/computer. The app reads the plugin's id/name by itself.
- **Remove:** *Remove* button on plugins you added.
- Plugins have full access to the app — only add ones you trust.

Built-in plugins are listed in `plugins/registry.js` (`enabled: true/false` is just the first-load default).

## Writing an extension
```js
BOS.register({
  id: "hello", name: "Hello", version: "1.0.0",
  init(api) {
    api.on("trackchange", t => api.ui.toast("Now playing: " + t.name));
  }
});
```
Add `{ id:"hello", name:"Hello", type:"extension", entry:"plugins/hello.js", description:"...", enabled:true }` to `plugins/registry.js`.
Everything created through `api` (buttons, pages, CSS, timers, listeners) is removed automatically when the plugin is turned off.

## API (`api` passed to init)
| | |
|---|---|
| `api.on(evt, fn)` | events: `trackchange`, `play`, `pause`, `ended`, `progress` ({position,duration}) |
| `api.player` | `play(track,list,index)`, `pause()`, `resume()`, `toggle()`, `next()`, `prev()`, `seek(s)`, `setVolume(0-1)`; read: `track`, `isPlaying`, `queue`, `volume`, `position`, `duration`, `audio` |
| `api.ui.toast(msg, type)` | toast (`type` = "error" optional) |
| `api.ui.css(text)` | inject CSS |
| `api.ui.addTopbarButton({label,icon,title,onClick})` | returns the button; `btn.setLabel(text)` |
| `api.ui.addPage({id,title,icon,render(container,api)})` | sidebar item + full page |
| `api.theme.setVars({"--accent-r":255})` | override CSS variables (reverted on disable) |
| `api.storage.get(k,def)` / `.set(k,v)` | per-plugin persistent storage |
| `api.setInterval` / `api.setTimeout` | auto-cleared timers |
| `api.navigate(view)` | e.g. "home", "search", "library", "settings" |
| `api.unsafe` | raw internals: `State, Queue, Store, History, Api, Player…` (not a stable API) |

## Themes
A theme is a `.css` file registered with `type:"theme"`. Useful variables: `--accent-r/g/b`, `--bg-0/1/2`, `--text-1/2/3`, `--r-sm…--r-xl`.

## Not included yet (next steps)
- Source plugins (extra search/audio providers) — needs the search/stream code routed through a provider list.
- Lyrics-provider plugins.
