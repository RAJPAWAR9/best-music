/* Built-in plugin list. "enabled" is only the default on first load — users switch plugins on/off in the app (Sidebar → Plugins).
   Add a line here to ship a new built-in plugin (file goes in /plugins).
   type: "extension" (.js that calls BOS.register) or "theme" (.css) */
window.BOS_PLUGIN_REGISTRY = [
  { id: "sleep-timer", name: "Sleep Timer", type: "extension", entry: "plugins/sleep-timer.js",
    description: "Top-bar button: tap to cycle 15 / 30 / 60 min / off. Pauses music when time is up.", enabled: false },
  { id: "tab-title", name: "Now Playing in Tab Title", type: "extension", entry: "plugins/tab-title.js",
    description: "Shows the current song and artist in the browser tab title.", enabled: false },
  { id: "play-stats", name: "Play Stats (custom page)", type: "extension", entry: "plugins/play-stats.js",
    description: "Adds a sidebar page that counts songs played this session. Example of a custom page.", enabled: false },
  { id: "neon-theme", name: "Neon Theme", type: "theme", entry: "plugins/neon-theme.css",
    description: "Pink/cyan neon accent and a deeper background.", enabled: false }
];
