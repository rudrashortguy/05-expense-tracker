"use client";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-lg mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Expense Tracker</h1>
            <p className="text-sm text-gray-500">Manage your money smartly</p>
          </div>
          <div className="text-2xl">💸</div>
        </div>
      </div>
    </header>
  );
}
