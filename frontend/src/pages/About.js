import "../App.css";
import profilePic from "../assets/mukul.jpeg";
import bgVideo from "../assets/background.mp4";

function About() {
  return (
    <div className="page">

      {/* SAME VIDEO BACKGROUND */}
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="video-overlay" />

      {/* HEADER */}
      <header className="header">
        <div className="logo">Sinha Synopsis<span>.</span></div>

        <nav className="nav">
          <a href="/">Home</a>
          <a href="/about">About</a>
        </nav>
      </header>

      {/* ABOUT CONTENT */}
      <section className="about">
        <div className="about-left">
          <img src={profilePic} alt="Sinha" />
        </div>

        <div className="about-right">
      <h1>Curious Thinker, Data Professional & Creative Storyteller.</h1>

<p>
  I work at the intersection of data, logic, and creativity, breaking down
  complex ideas and turning them into simple, meaningful insights that
  connect with people.
</p>

<p>
  Through this blog, I explore technology, business, and everyday
  observations, blending analytical thinking with imagination to share
  perspectives that are practical, thoughtful, and a little unconventional.
</p>

        </div>
      </section>
    </div>
  );
}

export default About;
