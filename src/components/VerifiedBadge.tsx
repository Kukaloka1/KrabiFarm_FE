export default function VerifiedBadge(){
  return (
    <span className="badge badge--verified" title="Verified producer">
      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" className="inline-block">
        <path fill="#C49A23" d="M12 2l2.4 3.9 4.6 1-3 3.3.6 4.8L12 13.9 7.4 15l.6-4.8-3-3.3 4.6-1L12 2z"/>
        <path fill="black" d="M10.5 12.3l-1.4-1.4-1.1 1.1 2.5 2.5 4.5-4.5-1.1-1.1-3.4 3.4z"/>
      </svg>
      <span className="ml-1">Verified</span>
    </span>
  )
}
