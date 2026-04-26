import LanguageBadge from './LanguageBadge.jsx';
import { formatCount, formatDate, timeAgo } from '../utils/format.js';
import { useLanguage } from '../context/LanguageContext.jsx';

function StatBox({ icon, value, label }) {
  return (
    <div className="col-6 col-sm-3">
      <div className="text-center p-3 rounded-3 stat-box-bg">
        <i className={`bi ${icon} fs-4 mb-1 d-block`} />
        <div className="fw-bold fs-5">{value}</div>
        <div className="text-muted small">{label}</div>
      </div>
    </div>
  );
}

function VisibilityBadge({ isPrivate }) {
  const { t } = useLanguage();
  const cls = isPrivate
    ? 'bg-danger text-danger border-danger'
    : 'bg-success text-success border-success';

  return (
    <span className={`badge bg-opacity-15 border border-opacity-25 px-2 py-1 ${cls}`}>
      <i className={`bi bi-${isPrivate ? 'lock' : 'unlock'} me-1`} />
      {isPrivate ? t('repo.private') : t('repo.public')}
    </span>
  );
}

export default function RepoDetails({ repo }) {
  const { t } = useLanguage();

  return (
    <div className="row justify-content-center">
      <div className="col-xl-8 col-lg-9">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <div className="d-flex align-items-center gap-2 text-muted small mb-1">
              <img
                src={`${repo.owner.avatar_url}&s=32`}
                width="18"
                height="18"
                className="rounded-circle"
                alt=""
              />
              <span>{repo.owner.login}</span>
              <span>/</span>
            </div>

            <h3 className="fw-bold mb-2">{repo.name}</h3>

            <div className="d-flex flex-wrap gap-2 mb-3">
              <VisibilityBadge isPrivate={repo.private} />
              {repo.fork && (
                <span className="badge bg-secondary bg-opacity-15 text-secondary border border-secondary border-opacity-25 px-2 py-1">
                  {t('repo.fork')}
                </span>
              )}
              {repo.archived && (
                <span className="badge bg-warning bg-opacity-15 text-warning border border-warning border-opacity-25 px-2 py-1">
                  {t('repo.archived')}
                </span>
              )}
            </div>

            {repo.description && <p className="text-secondary">{repo.description}</p>}

            <div className="row g-3 my-2">
              <StatBox
                icon="bi-star-fill text-warning"
                value={formatCount(repo.stargazers_count)}
                label={t('repo.stars')}
              />
              <StatBox
                icon="bi-diagram-2-fill text-primary"
                value={formatCount(repo.forks_count)}
                label={t('repo.forks')}
              />
              <StatBox
                icon="bi-eye-fill text-info"
                value={formatCount(repo.watchers_count)}
                label={t('repo.watchers')}
              />
              <StatBox
                icon="bi-exclamation-circle text-danger"
                value={formatCount(repo.open_issues_count)}
                label={t('repo.issues')}
              />
            </div>

            <hr className="my-3" />

            <div className="d-flex flex-wrap gap-3 small text-muted">
              <LanguageBadge language={repo.language} bold />
              {repo.license?.name && (
                <span>
                  <i className="bi bi-file-text me-1" />
                  {repo.license.name}
                </span>
              )}
              <span>
                <i className="bi bi-calendar3 me-1" />
                {t('repo.created', { date: formatDate(repo.created_at) })}
              </span>
              <span>
                <i className="bi bi-arrow-clockwise me-1" />
                {t('repo.updated', { time: timeAgo(repo.updated_at) })}
              </span>
            </div>

            {repo.topics?.length > 0 && (
              <div className="d-flex flex-wrap gap-2 mt-3">
                {repo.topics.map((topic) => (
                  <span key={topic} className="badge rounded-pill px-3 py-1 topic-badge">
                    {topic}
                  </span>
                ))}
              </div>
            )}

            <div className="d-flex flex-wrap gap-2 mt-4">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark"
              >
                <i className="bi bi-github me-2" />
                {t('repo.viewOnGitHub')}
              </a>
              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-secondary"
                >
                  <i className="bi bi-globe me-1" />
                  {t('repo.website')}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
