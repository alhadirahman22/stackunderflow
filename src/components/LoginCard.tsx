"use client";

import useFormLoginCard from "@/hooks/useFormLoginCard";

export default function LoginCard() {
  const {
    username,
    password,
    isLoggedIn,
    setUsername,
    setPassword,
    handleSubmit,
    handleSignOut,
  } = useFormLoginCard();

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold">Stack Underflow</h1>
      <p className="mt-2 text-sm text-slate-600">
        Simple login. State stays active until the page is refreshed.
      </p>

      {isLoggedIn ? (
        <div className="mt-8 space-y-4">
          <p className="text-slate-800">
            You are signed in as{" "}
            <span className="font-semibold">{username || "user"}</span>.
          </p>
          <p className="text-sm text-slate-500">
            No backend authentication. Refresh the page to reset.
          </p>
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Sign out
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Username
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter username"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Password
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Sign in
          </button>
          <p className="text-xs text-slate-500">
            Any username and password is accepted.
          </p>
        </form>
      )}
    </div>
  );
}
