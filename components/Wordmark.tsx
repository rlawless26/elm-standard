type WordmarkProps = {
  size?: number;
};

export default function Wordmark({ size = 22 }: WordmarkProps) {
  return (
    <span
      className="wordmark"
      style={{
        fontSize: size,
        lineHeight: 1,
        color: "var(--ink)",
      }}
    >
      Elm Standard
    </span>
  );
}
