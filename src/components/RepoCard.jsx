import { memo } from 'react';
import { Link } from 'react-router-dom';

import LanguageBadge from './LanguageBadge.jsx';
import { formatCount, timeAgo } from '../utils/format.js';
import { useLanguage } from '../context/LanguageContext.jsx';

function RepoCard({ repo }) {
  const [owner, name] = repo.full_name.split('/');
  const { t } = useLanguage();

  return (
    <Link
      to={`/repo/${owner}/${name}`}
      className="card repo-card mb-2 text-decoration-none text-reset"
    >
      <div className="card-body py-3">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <div className="overflow-hidden">
            <p className="fw-semibold mb-1 text-primary">{repo.name}</p>
            {repo.description && (
              <p className="text-muted small mb-0 text-truncate-2">{repo.description}</p>
            )}
          </div>
          {repo.fork && (
            <span className="badge bg-light text-secondary border flex-shrink-0">{t('repo.fork')}</span>
          )}
        </div>

        <div className="d-flex flex-wrap gap-3 mt-2 small text-muted align-items-center">
          <LanguageBadge language={repo.language} />
          <span>
            <i className="bi bi-star me-1" />
            {formatCount(repo.stargazers_count)}
          </span>
          <span>
            <i className="bi bi-diagram-2 me-1" />
            {formatCount(repo.forks_count)}
          </span>
          <span className="ms-auto d-none d-sm-inline">
            <i className="bi bi-clock me-1" />
            {timeAgo(repo.updated_at)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default memo(RepoCard);
