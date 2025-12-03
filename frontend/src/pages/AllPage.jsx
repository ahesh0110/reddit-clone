// src/pages/AllPage.jsx
import { useEffect, useMemo, useState } from "react";
import SortMenu from "../components/SortMenu";
import PostCard from "../components/PostCard";

/*
 AllPage - similar to Popular, but for the 'All' feed
*/

const MOCK_POSTS = [
  {
    id: 2001,
    subreddit: "announcements",
    author: "admin",
    time: "1d",
    location: "All",
    title: "Site updates & improvements",
    body: "We've made some improvements to the UI and performance.",
    upvotes: 102,
    comments: 24,
    icon: "https://www.redditstatic.com/avatars/avatar_default_04_0099FF.png",
  },
  {
    id: 2002,
    subreddit: "funny",
    author: "comedian",
    time: "8h",
    location: "All",
    title: "This made my day",
    body: "A short, fun post to brighten your day.",
    upvotes: 512,
    comments: 120,
    icon: "https://www.redditstatic.com/avatars/avatar_default_05_000000.png",
  },
];

export default function AllPage() {
  const [sort, setSort] = useState("best");
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setPosts(MOCK_POSTS);
      setLoading(false);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  const sortedPosts = useMemo(() => {
    const s = [...posts];
    if (sort === "top") return s.sort((a, b) => b.upvotes - a.upvotes);
    if (sort === "new") return s.sort((a, b) => b.id - a.id);
    return s;
  }, [posts, sort]);

  return (
    <main className="w-full max-w-[740px] px-4" aria-labelledby="all-heading">
      <header className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h1 id="all-heading" className="text-2xl font-semibold text-reddit-text dark:text-reddit-dark_text">
            All
          </h1>
          <p className="mt-1 text-sm text-reddit-text_secondary dark:text-reddit-dark_text_secondary">
            A mix of posts from across the site.
          </p>
        </div>

        <div className="ml-auto">
          <SortMenu value={sort} onChange={(v) => setSort(v)} />
        </div>
      </header>

      <section aria-live="polite" aria-busy={loading} className="space-y-4">
        {loading ? (
          [1, 2, 3].map((i) => (
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
                onClick={() => {
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