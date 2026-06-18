export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <form className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full border p-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}