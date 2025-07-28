import Landing from "./landing/page";
import GSAPWrapper from "./GSAPwrapper"; // Adjust path as needed

export default function Home() {
  return (
    <GSAPWrapper>
      <Landing />
    </GSAPWrapper>
  );
}