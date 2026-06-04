import { useEffect } from 'react';

declare global {
  interface Window {
    __gvcInitialized?: boolean;
  }
}

export function GvcPage() {
  useEffect(() => {
    if (window.__gvcInitialized) return;
    window.__gvcInitialized = true;

    const jqueryScript = document.createElement('script');
    jqueryScript.src = '/lowcode/glitterBundle/jquery.js';
    jqueryScript.onload = () => {
      const initScript = document.createElement('script');
      initScript.type = 'module';
      initScript.src = '/sandbox/GlitterInitial.js';
      document.head.appendChild(initScript);
    };
    document.head.appendChild(jqueryScript);
  }, []);

  return (
    <section>
      <div id="glitterPage" />
      <div id="Navigation" />
    </section>
  );
}
