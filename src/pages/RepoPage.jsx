import { useParams } from 'react-router-dom';

import BackButton from '../components/BackButton.jsx';
import ErrorState from '../components/ErrorState.jsx';
import RepoDetails from '../components/RepoDetails.jsx';
import { RepoPageSkeleton } from '../components/Skeleton.jsx';

import { getErrorMessage } from '../api/github.js';
import { useRepo } from '../hooks/useGithub.js';

export default function RepoPage() {
  const { owner, name } = useParams();
  const { data: repo, isLoading, isError, error } = useRepo(owner, name);

  if (isLoading) return <RepoPageSkeleton />;

  if (isError) {
    return (
      <ErrorState
        message={getErrorMessage(error, 'Could not load repository details.')}
        actionLabel="Go back"
        onAction={() => window.history.back()}
      />
    );
  }

  return (
    <>
      <BackButton to={`/user/${repo.owner.login}`}>Back to {repo.owner.login}</BackButton>
      <RepoDetails repo={repo} />
    </>
  );
}
