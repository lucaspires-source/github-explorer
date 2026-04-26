import { SORT_OPTIONS } from '../hooks/useSortedRepos.js';

export default function SortControls({ sortBy, direction, onSortByChange, onToggleDirection }) {
  const isDesc = direction === 'desc';

  return (
    <div className="d-flex gap-2 align-items-center">
      <label htmlFor="sort-by" className="text-muted small mb-0 me-1 d-none d-sm-inline">
        Sort by
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
            {option.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm"
        title={isDesc ? 'Descending' : 'Ascending'}
        aria-label={`Sort ${isDesc ? 'descending' : 'ascending'}`}
        onClick={onToggleDirection}
      >
        <i className={`bi bi-sort-${isDesc ? 'down' : 'up'}`} />
      </button>
    </div>
  );
}
