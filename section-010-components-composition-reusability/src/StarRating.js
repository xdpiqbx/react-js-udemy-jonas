const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStar = {
  display: "flex",
  gap: "4px",
};

const textStyle = {
  lineHeight: "1",
  margin: "0",
};

export default function StarRating({ maxRating = 5 }) {
  return (
    <div style={containerStyle}>
      <div style={starContainerStar}>
        {Array.from({ length: maxRating }, (_, i) => (
          <span>@</span>
        ))}
      </div>
      <p style={textStyle}>10</p>
    </div>
  );
}
