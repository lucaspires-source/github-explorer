import { SORT_OPTIONS } from '../hooks/useSortedRepos.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function SortControls({ sortBy, direction, onSortByChange, onToggleDirection }) {
  const isDesc = direction === 'desc';
  const { t } = useLanguage();

  return (
    <div className="d-flex gap-2 align-items-center">
      <label htmlFor="sort-by" className="text-muted small mb-0 me-1 d-none d-sm-inline">
        {t('common.sortBy')}
      </label>
      <select
        id="sort-by"
        className="form-select form-select-sm"
        style={{ width: 'auto' }}
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {t(`sort.${option.value}`)}
          </option>
        ))}
      </select>
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm"
        title={isDesc ? t('common.descending') : t('common.ascending')}
        aria-label={`Sort ${isDesc ? t('common.descending') : t('common.ascending')}`}
        onClick={onToggleDirection}
      >
        <i className={`bi bi-sort-${isDesc ? 'down' : 'up'}`} />
      </button>
    </div>
  );
}
