import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <SignIn />
    </div>
  );
}
