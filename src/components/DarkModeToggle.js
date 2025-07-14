import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(d => !d)}
      className="fixed bottom-6 right-6 z-50 bg-white dark:bg-slate-800 text-slate-500 dark:text-yellow-300 border border-slate-200 dark:border-slate-700 rounded-full p-3 shadow-lg hover:bg-sky-100 dark:hover:bg-slate-700 transition"
      aria-label="Toggle dark mode"
    >
      {dark ? <Sun size={22} /> : <Moon size={22} />}
    </button>
  );
}

export default DarkModeToggle;
