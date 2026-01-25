
import "./App.css";
import profilePic from "./assets/mukul.jpeg";
import bgVideo from "./assets/background.mp4";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import BlogReader from "./pages/BlogReader";


function Home() {
  return (
    <div className="page home-page">

      {/* VIDEO BACKGROUND */}
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="video-overlay" />

      {/* HEADER */}
      <header className="header">
        <div className="logo">Sinha Synopsis<span>.</span></div>

        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="menu">
          <span />
          <span />
          <span />
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <span className="eyebrow">personal blog</span>

          <h1 className="hero-title fade-in">
            Sinha Synopsis
          </h1>

          <p className="hero-desc fade-in-delay">
            Stories, learnings, and ideas shaped by experience —
            presented with clarity and creativity.
          </p>

          <Link to="/blogs" className="hero-cta fade-in-delay-2">
            Start Reading
          </Link>
        </div>

        <div className="hero-right">
          <div className="sun-wrapper">
            <svg className="sun" width="240" height="240" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="42" fill="#FDBA5F" />
              {[...Array(12)].map((_, i) => (
                <rect
                  key={i}
                  x="98"
                  y="10"
                  width="4"
                  height="20"
                  rx="2"
                  fill="#FDBA5F"
                  transform={`rotate(${i * 30} 100 100)`}
                />
              ))}
            </svg>
          </div>
        </div>
      </section>

      {/* FLOATING PROFILE */}
      <Link to="/about" className="floating-profile">
        <img src={profilePic} alt="Sinha Synopsis" />
      </Link>

    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog/:id" element={<BlogReader />} />
      </Routes>
    </Router>
  );
}
