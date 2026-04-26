import RepoCard from './RepoCard.jsx';

export default function RepoList({ repos }) {
  if (!repos.length) {
    return (
      <div className="text-center text-muted py-5">
        <i className="bi bi-folder2-open fs-1 mb-2 d-block" />
        No public repositories yet.
      </div>
    );
  }

  return (
    <div>
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
}
