import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Home() {
  return (
    <SpeedInsights>
      <div>
        <h1>Welcome to SpaceX Dragon Info</h1>
        <p>This is your platform to explore SpaceX Dragon rockets.</p>
        {/* Додатковий контент */}
      </div>
    </SpeedInsights>
  );
}
