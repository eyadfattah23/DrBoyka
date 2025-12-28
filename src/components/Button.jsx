export default function Button({
  text,
  leftComponent,
  onClick,
  className = "",
  style = {},
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-2xl cursor-pointer ${className}`}
      style={{ backgroundColor: "var(--color-primary)", ...style }}
    >
      <span>{text}</span>
      {leftComponent}
    </button>
  );
}
