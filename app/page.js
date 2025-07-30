import Landing from "./landing/page";
import GSAPWrapper from "./GSAPwrapper"; // Adjust path as needed
import OgLandingpage from "./landing/OgLandingpage";

export default function Home() {
  return (
    <GSAPWrapper>
      <OgLandingpage />
    </GSAPWrapper>
  );
}