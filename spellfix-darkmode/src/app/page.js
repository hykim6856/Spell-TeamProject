import SpellMain from "./comps/SpellMain";

import DarkThemeHandler from "./comps/DarkMode";

export default function Home() {
  return (
    <main>
      <header>
        <h1>Spelling Project</h1>
        <DarkThemeHandler />
      </header>
      <SpellMain />
    </main>
  );
}
