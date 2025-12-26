export function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="text-center space-y-6 animate-pulse">
        <div className="relative">
          <div className="w-24 h-24 mx-auto border-8 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full animate-bounce"></div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-gray-800">Loading...</h3>
          <p className="text-gray-600">Please wait while we fetch your content</p>
        </div>
        <div className="flex gap-2 justify-center">
          <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  )
}
