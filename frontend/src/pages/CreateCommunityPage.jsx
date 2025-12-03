// src/pages/CreateCommunityPage.jsx
import { useMemo, useState } from "react";

/*
 CreateCommunityPage
 - Accessible form to create a community (mock)
 - Client-side validation and live preview
*/

function validateName(name) {
  if (!name || name.trim().length === 0) return "Name is required.";
  if (!/^[A-Za-z0-9_]+$/.test(name)) return "Name may only include letters, numbers, and underscores.";
  if (name.length < 3) return "Name must be at least 3 characters.";
  if (name.length > 21) return "Name must be 21 characters or fewer.";
  return "";
}

export default function CreateCommunityPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [rules, setRules] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});

  const vanity = useMemo(() => `/r/${name || "your_community"}`, [name]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const nameErr = validateName(name);
    const descErr = description.length > 500 ? "Description is too long (max 500 characters)." : "";
    const rulesArr = rules.split("\n").map((r) => r.trim()).filter(Boolean);
    const newErrors = {};
    if (nameErr) newErrors.name = nameErr;
    if (descErr) newErrors.description = descErr;
    if (rulesArr.length === 0) newErrors.rules = "At least one rule is recommended.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Mock submit
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage(`Community ${vanity} created (mock)!`);
      // reset
      setName("");
      setDescription("");
      setIsPrivate(false);
      setRules("");
      setErrors({});
      // hide message after a bit
      setTimeout(() => setSuccessMessage(""), 4000);
    }, 900);
  };

  return (
    <main className="w-full max-w-[740px] px-4" aria-labelledby="create-community-heading">
      <header className="mb-4">
        <h1 id="create-community-heading" className="text-2xl font-semibold text-reddit-text dark:text-reddit-dark_text">
          Create a Community
        </h1>
        <p className="mt-1 text-sm text-reddit-text_secondary dark:text-reddit-dark_text_secondary">
          Create a place where people can share and discuss a topic.
        </p>
      </header>

      {/* Live preview header */}
      <section className="mb-6">
        <div className="bg-reddit-card dark:bg-reddit-dark_card rounded-lg p-4 border border-reddit-border dark:border-reddit-dark_divider">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-md bg-reddit-hover dark:bg-reddit-dark_hover flex items-center justify-center text-reddit-text dark:text-reddit-dark_text font-semibold">
              {name ? name[0].toUpperCase() : "R"}
            </div>
            <div>
              <div className="text-lg font-semibold text-reddit-text dark:text-reddit-dark_text">{name ? `r/${name}` : "r/your_community"}</div>
              <div className="text-sm text-reddit-text_secondary dark:text-reddit-dark_text_secondary">{description || "Community description preview"}</div>
            </div>
            <div className="ml-auto text-sm text-reddit-text_secondary dark:text-reddit-dark_text_secondary">{isPrivate ? "Private" : "Public"}</div>
          </div>
        </div>
      </section>

      <form onSubmit={onSubmit} noValidate>
        <div className="space-y-4">
          <div>
            <label htmlFor="community-name" className="block text-sm font-medium text-reddit-text dark:text-reddit-dark_text">
              Community Name
            </label>
            <div className="mt-1 flex items-center gap-3">
              <input
                id="community-name"
                name="communityName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-describedby={errors.name ? "community-name-error" : undefined}
                className={`w-full px-3 py-2 rounded-md bg-reddit-card dark:bg-reddit-dark_card border border-reddit-border dark:border-reddit-dark_divider text-reddit-text dark:text-reddit-dark_text focus:outline-none focus:ring-2 focus:ring-reddit-blue/30`}
              />
              <div className="text-sm text-reddit-text_secondary dark:text-reddit-dark_text_secondary select-none">{`Preview: ${vanity}`}</div>
            </div>
            {errors.name && <p id="community-name-error" className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="community-desc" className="block text-sm font-medium text-reddit-text dark:text-reddit-dark_text">Description</label>
            <textarea
              id="community-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full mt-1 px-3 py-2 rounded-md bg-reddit-card dark:bg-reddit-dark_card border border-reddit-border dark:border-reddit-dark_divider text-reddit-text dark:text-reddit-dark_text focus:outline-none focus:ring-2 focus:ring-reddit-blue/30"
              aria-describedby={errors.description ? "community-desc-error" : undefined}
            />
            {errors.description && <p id="community-desc-error" className="mt-1 text-sm text-red-500">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-reddit-text dark:text-reddit-dark_text">Type</label>
            <div className="mt-1 flex gap-2">
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="radio" name="type" checked={!isPrivate} onChange={() => setIsPrivate(false)} />
                <span className="ml-1 text-reddit-text dark:text-reddit-dark_text">Public</span>
              </label>
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="radio" name="type" checked={isPrivate} onChange={() => setIsPrivate(true)} />
                <span className="ml-1 text-reddit-text dark:text-reddit-dark_text">Private</span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="community-rules" className="block text-sm font-medium text-reddit-text dark:text-reddit-dark_text">Rules (one per line)</label>
            <textarea
              id="community-rules"
              value={rules}
              onChange={(e) => setRules(e.target.value)}
              rows={4}
              className="w-full mt-1 px-3 py-2 rounded-md bg-reddit-card dark:bg-reddit-dark_card border border-reddit-border dark:border-reddit-dark_divider text-reddit-text dark:text-reddit-dark_text focus:outline-none focus:ring-2 focus:ring-reddit-blue/30"
              aria-describedby={errors.rules ? "community-rules-error" : undefined}
            />
            {errors.rules && <p id="community-rules-error" className="mt-1 text-sm text-red-500">{errors.rules}</p>}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-reddit-blue text-reddit-card font-semibold hover:bg-reddit-blue_hover transition disabled:opacity-60"
            >
              {loading ? "Creating…" : "Create Community"}
            </button>

            <button
              type="button"
              onClick={() => {
                setName("");
                setDescription("");
                setIsPrivate(false);
                setRules("");
                setErrors({});
              }}
              className="px-4 py-2 rounded-md bg-reddit-card dark:bg-reddit-dark_card border border-reddit-border dark:border-reddit-dark_divider text-sm hover:bg-reddit-hover dark:hover:bg-reddit-dark_hover transition"
            >
              Reset
            </button>

            {successMessage && (
              <div role="status" aria-live="polite" className="ml-4 text-sm text-green-600">
                {successMessage}
              </div>
            )}
          </div>
        </div>
      </form>
    </main>
  );
}