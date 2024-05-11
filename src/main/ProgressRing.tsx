const ProgressRing = ({ value }: { value: number }) => {
  // Calculate the progress percentage
  const progress = (value / 10) * 100;
  const circumference = 2 * Math.PI * 8; // Circumference of the circle with radius 8

  // Calculate the stroke-dasharray value based on progress
  const dashArray = `${(progress / 100) * circumference} ${circumference}`;

  return (
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-gray-400">{value}</span>
      </div>
      <svg className="w-full h-full" viewBox="0 0 24 24">
        <circle
          className="stroke-current"
          strokeWidth="2" // Decreased thickness by 1/3
          fill="transparent"
          r="11"
          cx="12"
          cy="12"
        />
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="black" />
            <stop offset="100%" stopColor="red" />
          </linearGradient>
        </defs>
        <circle
          className="stroke-current"
          strokeWidth="2" // Decreased thickness by 1/3
          strokeDasharray={dashArray}
          strokeLinecap="round"
          fill="transparent"
          r="11"
          cx="12"
          cy="12"
          transform="rotate(-90) translate(-24)"
          style={{
            stroke: "url(#gradient)", // Applying linear gradient as stroke
          }}
        />
      </svg>
    </div>
  );
};

export default ProgressRing;
