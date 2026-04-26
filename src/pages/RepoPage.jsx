import { useParams } from 'react-router-dom';

import BackButton from '../components/BackButton.jsx';
import ErrorState from '../components/ErrorState.jsx';
import RepoDetails from '../components/RepoDetails.jsx';
import { RepoPageSkeleton } from '../components/Skeleton.jsx';

import { getErrorMessage } from '../api/github.js';
import { useRepo } from '../hooks/useGithub.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function RepoPage() {
  const { owner, name } = useParams();
  const { data: repo, isLoading, isError, error } = useRepo(owner, name);
  const { t } = useLanguage();

  if (isLoading) return <RepoPageSkeleton />;

  if (isError) {
    return (
      <ErrorState
        message={getErrorMessage(error, t('repo.errorLoad'))}
        actionLabel={t('repo.goBack')}
        onAction={() => window.history.back()}
      />
    );
  }

  return (
    <>
      <BackButton to={`/user/${repo.owner.login}`}>
        {t('repo.backTo', { owner: repo.owner.login })}
      </BackButton>
      <RepoDetails repo={repo} />
    </>
  );
}
