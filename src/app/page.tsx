import Link from "next/link";
import Image from "next/image";
import { auth } from "~/server/auth";
import { ThemeToggle } from "~/components/ThemeToggle";

export default async function Home() {
  const session = await auth();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Job Tracker
        </h1>
        <ThemeToggle />
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="mb-6 text-5xl font-bold text-gray-900 dark:text-white">
            Job Tracker
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Track your job applications with AI-powered screenshot analysis.
            Upload job postings and let AI extract the details automatically.
          </p>

          {session?.user ? (
            <div className="space-y-6">
              <div className="mb-8 flex items-center justify-center gap-4">
                <div className="text-center">
                  {session.user.image && (
                    <Image
                      src={session.user.image}
                      alt={session.user.name ?? "User"}
                      width={64}
                      height={64}
                      className="mx-auto mb-2 h-16 w-16 rounded-full"
                    />
                  )}
                  <p className="text-gray-700 dark:text-gray-300">
                    Welcome back, {session.user.name}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                >
                  📊 View Dashboard
                </Link>
                <Link
                  href="/upload"
                  className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
                >
                  📸 Upload Screenshot
                </Link>
                <Link
                  href="/jobs"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                >
                  + Add Job Manually
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Sign in to start tracking your job applications
              </p>
              <Link
                href="/api/auth/signin"
                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              >
                🔐 Sign In with Google
              </Link>
            </div>
          )}

          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 text-center shadow-sm dark:bg-gray-800">
              <div className="mb-4 text-3xl">📸</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Upload Screenshots
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Drag and drop job posting screenshots for instant analysis
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 text-center shadow-sm dark:bg-gray-800">
              <div className="mb-4 text-3xl">🤖</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                AI Extraction
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Let AI automatically extract company, position, and details
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 text-center shadow-sm dark:bg-gray-800">
              <div className="mb-4 text-3xl">📊</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Track Progress
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor applications, interviews, and offers in one dashboard
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
