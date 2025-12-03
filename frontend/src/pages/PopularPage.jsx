// src/pages/PopularPage.jsx
import { useEffect, useMemo, useState } from "react";
import SortMenu from "../components/SortMenu";
import PostCard from "../components/PostCard";
import PostsFeed from "../components/PostsFeed";

/*
 PopularPage
 - Reuses PostCard/PostsFeed where possible.
 - Uses mock data for instant preview; replace with API calls in useEffect.
*/

const MOCK_POSTS = [
  {
    id: 1001,
    subreddit: "javascript",
    author: "alice",
    time: "2h",
    location: "Popular",
    title: "What's new in modern JS?",
    body: "Let's discuss the latest additions to the language and tooling.",
    upvotes: 420,
    comments: 52,
    icon: "https://www.redditstatic.com/avatars/avatar_default_02_24A0ED.png",
  },
  {
    id: 1002,
    subreddit: "webdev",
    author: "bob",
    time: "5h",
    location: "Popular",
    title: "CSS tricks for layout performance",
    body: "Small patterns that help with rendering speed and layout shifts.",
    upvotes: 210,
    comments: 28,
    icon: "https://www.redditstatic.com/avatars/avatar_default_03_46A508.png",
  },
];

export default function PopularPage() {
  const [sort, setSort] = useState("best"); // "best" | "hot" | "new" | "top" | "rising"
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  // Replace this effect with a real API call (fetch posts for "popular")
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setPosts(MOCK_POSTS);
      setLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  // Example: if PostsFeed accepted a sort prop, we'd pass it like:
  // <PostsFeed sort={sort} />
  // Since PostsFeed in this project is local, we render our posts map below to guarantee sort control.

  const sortedPosts = useMemo(() => {
    // simple client-side mock sorting for demo
    const s = [...posts];
    if (sort === "top") return s.sort((a, b) => b.upvotes - a.upvotes);
    if (sort === "new") return s.sort((a, b) => b.id - a.id);
    if (sort === "hot") return s; // placeholder
    if (sort === "rising") return s; // placeholder
    return s; // best default
  }, [posts, sort]);

  return (
    <main className="w-full max-w-[740px] px-4" aria-labelledby="popular-heading">
      <header className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h1 id="popular-heading" className="text-2xl font-semibold text-reddit-text dark:text-reddit-dark_text">
            Popular
          </h1>
          <p className="mt-1 text-sm text-reddit-text_secondary dark:text-reddit-dark_text_secondary">
            The most popular posts across communities.
          </p>
        </div>

        <div className="ml-auto">
          <SortMenu value={sort} onChange={(v) => setSort(v)} />
        </div>
      </header>

      <section aria-live="polite" aria-busy={loading} className="space-y-4">
        {loading ? (
          // skeleton loaders
          [1, 2].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-reddit-card dark:bg-reddit-dark_card rounded-xl p-4 border border-reddit-border dark:border-reddit-dark_divider"
            >
              <div className="h-4 bg-reddit-hover dark:bg-reddit-dark_hover rounded w-1/3 mb-3" />
              <div className="h-3 bg-reddit-hover dark:bg-reddit-dark_hover rounded w-full mb-2" />
              <div className="h-3 bg-reddit-hover dark:bg-reddit-dark_hover rounded w-5/6" />
            </div>
          ))
        ) : (
          <>
            {sortedPosts.map((p) => (
              <PostCard key={p.id} {...p} />
            ))}

            <div className="flex justify-center mt-2">
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-reddit-card dark:bg-reddit-dark_card border border-reddit-border dark:border-reddit-dark_divider text-sm hover:bg-reddit-hover dark:hover:bg-reddit-dark_hover transition"
                aria-live="polite"
                aria-label="Load more posts"
                onClick={() => {
                  // placeholder: in real app trigger load more API and append results
                  setLoading(true);
                  setTimeout(() => {
                    setPosts((s) => [
                      ...s,
                      ...MOCK_POSTS.map((m) => ({ ...m, id: m.id + Math.floor(Math.random() * 1000) })),
                    ]);
                    setLoading(false);
                  }, 700);
                }}
              >
                Load more
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}