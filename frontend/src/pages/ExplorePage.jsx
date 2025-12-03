// src/pages/ExplorePage.jsx
import { Link } from "react-router-dom";
import { useState } from "react";

const CATEGORIES = [
  "All", "Internet Culture", "Games", "Q&As & Stories",
  "Technology", "Movies & TV", "Pop Culture", "Places & Travel",
  "Sports", "Business & Finance", "Education & Career"
];

const RECOMMENDED = [
  {
    name: "ContagiousLaughter",
    visitors: "1.1M weekly visitors",
    desc: "Laugh out loud with the most contagious giggles and chortles on the internet.",
    icon: "https://www.redditstatic.com/avatars/avatar_default_02_FF4500.png",
  },
  {
    name: "CrappyDesign",
    visitors: "575K weekly visitors",
    desc: "Be amazed and horrified by the worst product and graphic designs.",
    icon: "https://www.redditstatic.com/avatars/avatar_default_07_24A0ED.png",
  },
  {
    name: "LivestreamFail",
    visitors: "1.4M weekly visitors",
    desc: "Stay entertained with the best and worst of livestreaming fails.",
    icon: "https://www.redditstatic.com/avatars/avatar_default_03_46A508.png",
  },
  {
    name: "CAIRO",
    visitors: "76K weekly visitors",
    desc: "All things Cairo — from ancient alleyways to koshary joints.",
    icon: "https://www.redditstatic.com/avatars/avatar_default_06_EA0027.png",
  }
];

const INTERNET_CULTURE = [
  {
    name: "Damnthatsinteresting",
    visitors: "6.6M weekly visitors",
    desc: "Prepare to be amazed by the most fascinating things in the world.",
    icon: "https://styles.redditmedia.com/t5_2xbv3/styles/communityIcon.png"
  },
  {
    name: "nextfuckinglevel",
    visitors: "5.8M weekly visitors",
    desc: "Witness the most impressive feats, skills, and moments around.",
    icon: "https://www.redditstatic.com/avatars/avatar_default_07_24A0ED.png"
  },
  {
    name: "WatchPeopleDieInside",
    visitors: "1.2M weekly visitors",
    desc: "Watch the hilarious and cringe-worthy moments of internal demise.",
    icon: "https://www.redditstatic.com/avatars/avatar_default_04_FF8717.png"
  }
];

export default function ExplorePage() {
  const [active, setActive] = useState("All");

  const Card = ({ c }) => (
    <article className="flex items-center justify-between bg-reddit-card dark:bg-reddit-dark_card border border-reddit-border dark:border-reddit-dark_divider rounded-xl p-4 hover:bg-reddit-hover dark:hover:bg-reddit-dark_hover transition">
      <div className="flex items-start gap-3">
        <img
          src={c.icon}
          className="h-10 w-10 rounded-full"
          alt=""
        />
        <div>
          <div className="font-semibold text-reddit-text dark:text-reddit-dark_text">
            r/{c.name}
          </div>
          <div className="text-xs text-reddit-text_secondary dark:text-reddit-dark_text_secondary">
            {c.visitors}
          </div>
          <p className="text-sm text-reddit-text_secondary dark:text-reddit-dark_text_secondary mt-1 line-clamp-2">
            {c.desc}
          </p>
        </div>
      </div>

      <button className="px-4 py-1 rounded-full bg-reddit-blue text-white hover:bg-reddit-blue_hover transition">
        Join
      </button>
    </article>
  );

  return (
    <div className="w-full max-w-[1100px] mx-auto pt-6 px-4 pb-20">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold text-reddit-text dark:text-reddit-dark_text">
        Explore Communities
      </h1>

      {/* CATEGORY PILLS */}
      <div className="flex gap-2 mt-6 overflow-x-auto pb-2 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`
              px-4 py-1.5 rounded-full text-sm border
              whitespace-nowrap transition
              ${active === cat
                ? "bg-reddit-blue text-white border-reddit-blue"
                : "bg-reddit-card dark:bg-reddit-dark_card text-reddit-text dark:text-reddit-dark_text border-reddit-border dark:border-reddit-dark_divider hover:bg-reddit-hover dark:hover:bg-reddit-dark_hover"}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SECTION – Recommended */}
      <div className="mt-10">
        <h2 className="font-semibold text-lg mb-3 text-reddit-text dark:text-reddit-dark_text">
          Recommended for you
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {RECOMMENDED.map((c) => <Card key={c.name} c={c} />)}
        </div>
        <div className="flex justify-center mt-4">
          <button className="px-5 py-2 rounded-full border text-sm text-reddit-text dark:text-reddit-dark_text border-reddit-border dark:border-reddit-dark_divider hover:bg-reddit-hover dark:hover:bg-reddit-dark_hover">
            Show more
          </button>
        </div>
      </div>

      {/* SECTION – Internet Culture */}
      <div className="mt-10">
        <h2 className="font-semibold text-lg mb-3 text-reddit-text dark:text-reddit-dark_text">
          Internet Culture
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {INTERNET_CULTURE.map((c) => <Card key={c.name} c={c} />)}
        </div>
      </div>

    </div>
  );
}
