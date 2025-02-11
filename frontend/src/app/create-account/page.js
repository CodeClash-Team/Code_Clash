import Logo from "@components/Logo";

export default function Create_Account() {
  return (
    <>
      <Logo />
      <div className="p-8 sm:p-10 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl font-bold mb-8 text-center">Register</h1>
        <div className="max-w-md mx-auto">
          <form className="space-y-5">
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              autoComplete="off"
              className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-transparent"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-transparent"
            />
            <input
              type="password"
              name="confirm-password"
              placeholder="Confirm password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-transparent"
            />
            <a
              className="rounded-full border border-solid border-black/[.15] dark:border-white/[.25] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 mt-4"
              href="/"
            >
              Submit
            </a>
          </form>
          <a href="/login" className="text-sm text-right text-blue-500 hover:underline mt-4 block">Already a user? Login here</a>
        </div>
      </div>
    </>
  );
}
