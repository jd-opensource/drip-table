export const parseReactCSS = (style: string | Record<string, string>): React.CSSProperties => {
  if (typeof style === 'string') {
    style = Object.fromEntries(
      style
        .split(';')
        .map(
          line => line
            .split(':')
            .map(s => s.trim()),
        )
        .filter(([k, v]) => k && v),
    );
  }
  return typeof style === 'object' && style
    ? Object.fromEntries(
      Object.entries(style)
        .map(([k, v]) => [k.replace(/-[a-z]/ug, s => `${s.slice(1).toUpperCase()}`), v]),
    )
    : {};
};
