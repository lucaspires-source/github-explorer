import { getLanguageColor } from '../utils/languages.js';

export default function LanguageBadge({ language, bold = false }) {
  if (!language) return null;

  const color = getLanguageColor(language);

  return (
    <span className="d-flex align-items-center gap-1">
      <span className="lang-dot" style={{ background: color }} />
      {bold ? <strong className="text-body">{language}</strong> : language}
    </span>
  );
}
