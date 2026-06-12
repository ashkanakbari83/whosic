import { useState } from "react";
import { iranianArtists, foreignArtists, suggestedAlbums } from "./data.js";
import "./App.css";

function ArtistCard({ artist, onClick }) {
  return (
    <div
      className="artist-card glass-card group"
    >
      <div className="flex items-start gap-4">
        <img
              src={artist.image}
              alt={artist.name}
              className="
              w-20 h-20
              rounded-2xl
              object-cover
              flex-shrink-0
              transition-all duration-300
              group-hover:scale-105
              group-hover:ring-teal-300/60
              "
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-white font-semibold text-base truncate">{artist.name}</h3>
            <span className="verified-badge">+</span>
          </div>
          <p className="genre text-xs mt-0.5">{artist.genre}</p>
          <p className="text-white/50 text-xs mt-2 line-clamp-2">{artist.bio}</p>
        </div>
      </div><div className="flex items-center justify-between mt-4">
        <div className="flex gap-2">
          <div className="followers-pill">{artist.followers} دنبال کننده</div>
          
        </div>
        <button className="info_btn" onClick={() => onClick(artist)}>اطلاعات بیشتر</button>
      </div>
    </div>
  );
}

function Modal({ artist, onClose }) {
  if (!artist) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,20,30,0.75)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="modal-box w-full max-w-md max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 mb-6">
          <img src={artist.image} alt={artist.name} className="w-20 h-20 rounded-2xl object-cover ring-2 ring-teal-400/40" />
          <div>
            <h2 className=" text-xl font-bold">{artist.name}</h2>
            <p className=" text-sm">{artist.genre}</p><p className="text-white/50 text-xs mt-1">{artist.followers} followers</p>
          </div>
          <button onClick={onClose} className="ml-auto text-white/40 hover:text-white text-2xl leading-none">×</button>
        </div>

        <p className="text-white/70 text-sm mb-6 leading-relaxed">{artist.bio}</p>

        <h3 className="section-label">Albums</h3>
        <div className="flex gap-3 mb-6 overflow-x-auto pb-1">
          {artist.albums.map((alb) => (
            <div key={alb.title} className="album-chip flex-shrink-0">
              <img src={alb.cover} alt={alb.title} className="w-12 h-12 rounded-xl object-cover mb-2" />
              <p className="text-white text-xs font-medium text-center leading-tight">{alb.title}</p>
              <p className="text-white/40 text-xs text-center">{alb.year}</p>
            </div>
          ))}
        </div>

        <h3 className="section-label">Top Streams</h3>
        <div className="space-y-2">
          {artist.topSongs.map((song, i) => (
            <div key={song.title} className="song-row">
              <span className="text-teal-400 text-xs w-5">{i + 1}</span>
              <span className="text-white text-sm flex-1">{song.title}</span>
              <span className="text-white/40 text-xs">{song.streams}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="lines h-px flex-1 " />
      <h2 className="text-sm font-semibold tracking-widest uppercase">{children}</h2>
      <div className="lines h-px flex-1" />
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState(null);
  const [showAllIranian, setShowAllIranian] = useState(false);
  const [showAllInternational, setshowAllInternational] = useState(false);

  const displayedIranianArtists = showAllIranian
  ? iranianArtists
  : iranianArtists.slice(0, 3);

  const displayedInternationalArtists = showAllInternational
  ? foreignArtists
  : foreignArtists.slice(0, 3);

  return (
    <div className="app-bg min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5">
        <div className="flex gap-6 text-white/70 text-sm font-medium">
          <span className="text-white">Whosic</span>
          <span>Playlist</span>
          <span>Singer</span>
        </div>
        <span className="text-white/50 tracking-widest">• • •</span>
      </nav><main className="px-32 py-8 ">
        {/* Hero */}
        <div className="text-center mb-14">
          <p className=" text-xs tracking-widest uppercase mb-2">Discover Artists</p>
          <h1 className="text-3xl font-bold">Music Universe</h1>
          <p className="text-white/40 text-sm mt-2">Iranian & International Artists</p>
        </div>

        {/* Iranian Artists */}
        <section className="mb-10">
          <SectionTitle>خوانندگان ایرانی</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedIranianArtists.map((a) => (
            <ArtistCard key={a.id} artist={a} onClick={setSelected} />
            ))}
          </div>
          {!showAllIranian && (
  <div className="flex justify-center mt-6">
    <button className="action-btn" onClick={() => setShowAllIranian(true)}>
      بیشتر
    </button>
  </div>
)}
{showAllIranian && (
  <div className="flex justify-center mt-6">
    <button className="action-btn" onClick={() => setShowAllIranian(false)}>
      کمتر
    </button>
  </div>
)}
        </section>

        {/* Foreign Artists */}
        <section className="mb-14">
          <SectionTitle>International Artists</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedInternationalArtists.map((a) => (
              <ArtistCard key={a.id} artist={a} onClick={setSelected} />
            ))}
          </div>

          {!showAllInternational && (
  <div className="flex justify-center mt-6">
    <button className="action-btn" onClick={() => setshowAllInternational(true)}>
      بیشتر
    </button>
  </div>
)}
{showAllInternational && (
  <div className="flex justify-center mt-6">
    <button className="action-btn" onClick={() => setshowAllInternational(false)}>
      کمتر
    </button>
  </div>
)}
        </section>

        {/* Suggested Albums */}
        <section>
          <SectionTitle>Suggested Albums</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {suggestedAlbums.map((alb) => (
              <div key={alb.title} className="album-card glass-card">
                <img src={alb.cover} alt={alb.title} className="w-full aspect-square rounded-xl object-cover mb-3" />
                <p className=" text-sm font-semibold truncate">{alb.title}</p>
                <p className="p-artist text-xs mt-0.5 truncate">{alb.artist}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-white/40 text-xs">{alb.year}</span>
                  <span className="genre-tag">{alb.genre}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-white/20 text-xs">
        Whosic_2026
      </footer><Modal artist={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
