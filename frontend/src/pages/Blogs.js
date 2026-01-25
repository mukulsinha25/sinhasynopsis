

// import { useState, useEffect } from "react";
// import "../App.css";
// import bgVideo from "../assets/background.mp4";
// import { Link, useNavigate } from "react-router-dom";

// const BLOGGER_JSONP_URL =
//   "https://sinhasynopsis.blogspot.com/feeds/posts/default?alt=json-in-script&callback=bloggerCallback";

// function Blogs() {
//   const [books, setBooks] = useState([]);
//   const [activeBook, setActiveBook] = useState(null);
//   const navigate = useNavigate();

//   /* =========================
//      LOAD BLOGS (JSONP)
//   ========================= */
//   useEffect(() => {
//     window.bloggerCallback = (data) => {
//       const entries = data.feed.entry || [];

//       const formatted = entries.map((entry, index) => {
//         const text = entry.content.$t.replace(/<[^>]+>/g, "");

//         return {
//           id: index,
//           postId: entry.id.$t,               // 👈 used for routing
//           title:
//             entry.title.$t.length > 42
//               ? entry.title.$t.slice(0, 39) + "…"
//               : entry.title.$t,
//           excerpt: text.split(".")[0],
//           tilt: (Math.random() * 10 - 5).toFixed(1),
//           color: `hsl(${index * 32 % 360}, 55%, 60%)`
//         };
//       });

//       setBooks(formatted);
//     };

//     const script = document.createElement("script");
//     script.src = BLOGGER_JSONP_URL;
//     document.body.appendChild(script);

//     return () => {
//       delete window.bloggerCallback;
//       document.body.removeChild(script);
//     };
//   }, []);

//   return (
//     <div className="page blogs-page">
//       {/* BACKGROUND */}
//       <video className="bg-video" autoPlay muted loop playsInline>
//         <source src={bgVideo} type="video/mp4" />
//       </video>
//       <div className="video-overlay" />

//       {/* HEADER */}
//       <header className="header">
//         <div className="logo">
//           Sinha Synopsis<span>.</span>
//         </div>
//         <nav className="nav">
//           <Link to="/">Home</Link>
//           <Link to="/about">About</Link>
//           <Link to="/blogs">Blogs</Link>
//           <Link to="/contact">Contact</Link>
//         </nav>
//       </header>

//       {/* BOOK LIBRARY */}
//       <section className="library">
//         {books.map((book) => {
//           const isActive = activeBook === book.id;

//           return (
//             <div
//               key={book.id}
//               className={`book ${isActive ? "active" : ""}`}
//               style={{
//                 "--tilt": `${book.tilt}deg`,
//                 "--color": book.color
//               }}
//               onClick={() =>
//                 setActiveBook(isActive ? null : book.id)
//               }
//             >
//               {/* BOOK SPINE */}
//               <div className="book-spine">
//                 <span className="book-title">{book.title}</span>
//               </div>

//               {/* BOOK DETAIL (CLICK → OPEN BLOG PAGE) */}
//               <div
//                 className="book-detail clickable"
//                 onClick={(e) => {
//                   e.stopPropagation();                 // 👈 prevents closing
//                   navigate(`/blog/${book.postId}`);   // 👈 internal reader
//                 }}
//               >
//                 <h3>{book.title}</h3>
//                 <p>{book.excerpt}…</p>
//                 <span className="read-more">
//                   Read full story →
//                 </span>
//               </div>
//             </div>
//           );
//         })}
//       </section>

//       {/* CLICK OUTSIDE TO CLOSE */}
//       {activeBook !== null && (
//         <div
//           className="backdrop"
//           onClick={() => setActiveBook(null)}
//         />
//       )}
//     </div>
//   );
// }

// export default Blogs;

import { useState, useEffect } from "react";
import "../App.css";
import bgVideo from "../assets/background.mp4";
import { Link, useNavigate } from "react-router-dom";

/* Blogger feed (JSONP – reliable for list) */
const BLOGGER_JSONP_URL =
  "https://sinhasynopsis.blogspot.com/feeds/posts/default?alt=json-in-script&callback=bloggerCallback";

function Blogs() {
  const [books, setBooks] = useState([]);
  const [activeBook, setActiveBook] = useState(null);
  const navigate = useNavigate();

  /* =========================
     LOAD BLOG LIST (SAFE)
  ========================= */
  useEffect(() => {
    window.bloggerCallback = (data) => {
      const entries = data.feed.entry || [];

      const formatted = entries.map((entry, index) => {
        const text = entry.content.$t.replace(/<[^>]+>/g, "");
        const postUrl = entry.link.find(
          (l) => l.rel === "alternate"
        ).href;

        return {
          id: index,
          title:
            entry.title.$t.length > 42
              ? entry.title.$t.slice(0, 39) + "…"
              : entry.title.$t,
          excerpt: text.split(".")[0],
          postUrl: encodeURIComponent(postUrl), // 🔑 CRITICAL
          tilt: (Math.random() * 10 - 5).toFixed(1),
          color: `hsl(${index * 32 % 360}, 55%, 60%)`
        };
      });

      setBooks(formatted);
    };

    const script = document.createElement("script");
    script.src = BLOGGER_JSONP_URL;
    document.body.appendChild(script);

    return () => {
      delete window.bloggerCallback;
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="page blogs-page">
      {/* BACKGROUND */}
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="video-overlay" />

      {/* HEADER */}
      <header className="header">
        <div className="logo">
          Sinha Synopsis<span>.</span>
        </div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      {/* BOOKSHELF */}
      <section className="library">
        {books.map((book) => {
          const isActive = activeBook === book.id;

          return (
            <div
              key={book.id}
              className={`book ${isActive ? "active" : ""}`}
              style={{
                "--tilt": `${book.tilt}deg`,
                "--color": book.color
              }}
              onClick={() =>
                setActiveBook(isActive ? null : book.id)
              }
            >
              {/* BOOK SPINE */}
              <div className="book-spine">
                <span className="book-title">{book.title}</span>
              </div>

              {/* BOOK PREVIEW */}
              <div
                className="book-detail clickable"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/blog/${book.postUrl}`);
                }}
              >
                <h3>{book.title}</h3>
                <p>{book.excerpt}…</p>
                <span className="read-more">
                  Read full story →
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* BACKDROP */}
      {activeBook !== null && (
        <div
          className="backdrop"
          onClick={() => setActiveBook(null)}
        />
      )}
    </div>
  );
}

export default Blogs;
