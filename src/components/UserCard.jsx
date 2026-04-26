import { formatCount } from '../utils/format.js';

function Stat({ value, label }) {
  return (
    <div className="flex-fill stat-pill">
      <div className="fw-semibold">{formatCount(value)}</div>
      <div className="text-muted small">{label}</div>
    </div>
  );
}

function DetailLine({ icon, children }) {
  return (
    <p className="small mb-1 text-start">
      <i className={`bi ${icon} me-2 text-muted`} />
      {children}
    </p>
  );
}

export default function UserCard({ user }) {
  const blogUrl = user.blog
    ? (user.blog.startsWith('http') ? user.blog : `https://${user.blog}`)
    : null;

  return (
    <div className="card border user-profile-card">
      <div className="card-body text-center p-3">
        <img
          src={`${user.avatar_url}&s=240`}
          className="profile-avatar mb-3"
          alt={user.login}
          loading="lazy"
        />
        <h5 className="mb-0 fw-semibold">{user.name || user.login}</h5>
        <p className="text-muted small mb-2">@{user.login}</p>

        {user.bio && <p className="small text-secondary mb-3">{user.bio}</p>}

        <div className="d-flex gap-2 justify-content-center mb-3">
          <Stat value={user.followers} label="Followers" />
          <Stat value={user.following} label="Following" />
        </div>

        {user.email && <DetailLine icon="bi-envelope">{user.email}</DetailLine>}
        {user.location && (
          <DetailLine icon="bi-geo-alt">
            <span className="text-muted">{user.location}</span>
          </DetailLine>
        )}
        {blogUrl && (
          <DetailLine icon="bi-link-45deg">
            <a href={blogUrl} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
              {user.blog}
            </a>
          </DetailLine>
        )}

        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-dark btn-sm w-100 mt-3"
        >
          <i className="bi bi-box-arrow-up-right me-1" />
          GitHub Profile
        </a>
      </div>
    </div>
  );
}
