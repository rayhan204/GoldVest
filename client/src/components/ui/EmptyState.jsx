const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-ink-950/15 px-6 py-14 text-center">
    {Icon && (
      <div className="flex size-12 items-center justify-center rounded-full bg-gold-100 text-gold-600">
        <Icon className="size-6" />
      </div>
    )}
    <div>
      <p className="font-display text-base font-semibold text-ink-950">
        {title}
      </p>
      {description && (
        <p className="mt-1 max-w-xs text-sm text-ink-600">{description}</p>
      )}
    </div>
    {action}
  </div>
);

export default EmptyState;
