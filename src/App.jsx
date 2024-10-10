import React, { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [wordCount, setWordCount] = useState(100);
  const [summaryStyle, setSummaryStyle] = useState("concise");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://my-first-worker.ranack21.workers.dev/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url,
            preferences: {
              wordCount,
              style: summaryStyle,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching summary");
      }
      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative flex flex-wrap h-screen items-center justify-center">
        {/* Left Side - Form */}
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24 bg-white">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-3xl font-bold sm:text-4xl">
              Summarize Content in Seconds
            </h1>

            <p className="mt-4 text-gray-500">
              Paste a URL, select preferences, and get a concise or detailed
              summary of the content.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 max-w-md space-y-4"
          >
            {/* URL Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL to Summarize
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Enter the URL"
              />
            </div>

            {/* Word Count Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Word Count
              </label>
              <input
                type="number"
                value={wordCount}
                onChange={(e) => setWordCount(e.target.value)}
                required
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
              />
            </div>

            {/* Summary Style Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Summary Style
              </label>
              <select
                value={summaryStyle}
                onChange={(e) => setSummaryStyle(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
              >
                <option value="concise">Concise</option>
                <option value="detailed">Detailed</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Get Summary
            </button>
          </form>

          {/* Loading Indicator */}
          {loading && (
            <p className="text-center mt-4 text-blue-500">
              Fetching summary...
            </p>
          )}

          {/* Error Display */}
          {error && (
            <p className="text-center mt-4 text-red-500">Error: {error}</p>
          )}
        </div>

        {/* Right Side - Summary Output */}
        <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2 bg-gray-100 p-8">
          <div className="max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Summary Output:</h2>
            {summary ? (
              <p className="text-gray-700 p-4 bg-white rounded-lg shadow-md">
                {summary}
              </p>
            ) : (
              <p className="text-gray-500">Your summary will appear here.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
