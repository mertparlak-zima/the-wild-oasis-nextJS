import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { singOutAction } from "../_lib/actions";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

function SignOutButton() {
  const { setUser } = useAuth();
  const router = useRouter();
  async function handleFormSubmit() {
    setUser(null);
    await singOutAction();
  }

  return (
    <form action={handleFormSubmit}>
      <button className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full">
        <ArrowRightOnRectangleIcon className="h-5 w-5 text-primary-600" />
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
