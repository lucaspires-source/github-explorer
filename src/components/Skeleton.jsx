export function SkeletonBox({ width = '100%', height = 16, rounded = 6, className = '' }) {
  const style = {
    width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: rounded === '50%' ? '50%' : `${rounded}px`,
  };
  return <div className={`skeleton-box ${className}`} style={style} />;
}

export function UserPageSkeleton() {
  return (
    <>
      <div className="mb-3">
        <SkeletonBox width="80px" height={32} />
      </div>
      <div className="row g-4">
        <div className="col-lg-3 col-md-4">
          <div className="card p-3 text-center">
            <SkeletonBox width="110px" height={110} rounded="50%" className="mx-auto mb-3" />
            <div className="mx-auto mb-1" style={{ width: '60%' }}>
              <SkeletonBox height={18} />
            </div>
            <div className="mx-auto" style={{ width: '40%' }}>
              <SkeletonBox height={14} />
            </div>
          </div>
        </div>
        <div className="col-lg-9 col-md-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="card mb-2 p-3">
              <div className="mb-2" style={{ width: '45%' }}>
                <SkeletonBox height={16} />
              </div>
              <div style={{ width: '70%' }}>
                <SkeletonBox height={13} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export function RepoPageSkeleton() {
  return (
    <>
      <div className="mb-3">
        <SkeletonBox width="140px" height={32} />
      </div>
      <div className="row justify-content-center">
        <div className="col-xl-8 col-lg-9">
          <div className="card p-4">
            <div className="mb-2" style={{ width: '35%' }}>
              <SkeletonBox height={14} />
            </div>
            <div className="mb-3" style={{ width: '55%' }}>
              <SkeletonBox height={28} />
            </div>
            <div className="mb-2" style={{ width: '85%' }}>
              <SkeletonBox height={16} />
            </div>
            <div style={{ width: '65%' }}>
              <SkeletonBox height={16} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
