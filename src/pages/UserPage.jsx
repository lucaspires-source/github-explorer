import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import BackButton from '../components/BackButton.jsx';
import ErrorState from '../components/ErrorState.jsx';
import RepoList from '../components/RepoList.jsx';
import SortControls from '../components/SortControls.jsx';
import UserCard from '../components/UserCard.jsx';
import { UserPageSkeleton } from '../components/Skeleton.jsx';

import { getErrorMessage } from '../api/github.js';
import { useUser, useUserRepos } from '../hooks/useGithub.js';
import { useRecentSearches } from '../hooks/useRecentSearches.js';
import { useSortedRepos } from '../hooks/useSortedRepos.js';

export default function UserPage() {
  const { username } = useParams();
  const decodedUsername = decodeURIComponent(username);

  const userQuery = useUser(decodedUsername);
  const reposQuery = useUserRepos(decodedUsername);

  const { sorted, sortBy, direction, setSortBy, toggleDirection } = useSortedRepos(
    reposQuery.data,
  );
  const { add } = useRecentSearches();

  useEffect(() => {
    if (userQuery.isSuccess && userQuery.data) {
      add(userQuery.data.login);
    }
  }, [userQuery.isSuccess, userQuery.data, add]);

  if (userQuery.isLoading || reposQuery.isLoading) {
    return <UserPageSkeleton />;
  }

  if (userQuery.isError) {
    const fallback = `No GitHub user found for "${decodedUsername}".`;
    return (
      <ErrorState
        message={getErrorMessage(userQuery.error, fallback)}
        actionLabel="Go back"
        onAction={() => window.history.back()}
      />
    );
  }

  const user = userQuery.data;
  const repos = reposQuery.data ?? [];

  return (
    <>
      <BackButton to="/" />
      <div className="row g-4">
        <div className="col-lg-3 col-md-4">
          <UserCard user={user} />
        </div>
        <div className="col-lg-9 col-md-8">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h5 className="mb-0 fw-semibold">
              Repositories
              <span className="badge bg-secondary fw-normal ms-1">{user.public_repos}</span>
            </h5>
            {repos.length > 0 && (
              <SortControls
                sortBy={sortBy}
                direction={direction}
                onSortByChange={setSortBy}
                onToggleDirection={toggleDirection}
              />
            )}
          </div>
          <RepoList repos={sorted} />
        </div>
      </div>
    </>
  );
}
