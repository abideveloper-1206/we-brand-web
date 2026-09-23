"use client";

import React, { useEffect, useState } from "react";
import api from "@/utils/api";

export default function PortfolioVideoTicker() {
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [portfolioVideos, setPortfolioVideos] = useState<any[]>([]);
  const [activeVideo, setActiveVideo] = useState<any | null>(null);

  useEffect(() => {
    // Fetch Portfolio Global Data
    api.get('/api/globals/portfolio')
      .then(res => res.data)
      .then(data => {
        if (data) setPortfolioData(data);
      })
      .catch(console.error);

    // Fetch Portfolio Videos Collection Data
    api.get('/api/portfolio-videos?limit=100&sort=order')
      .then(res => res.data)
      .then(data => {
        if (data && data.docs) setPortfolioVideos(data.docs);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      {/* PORTFOLIO VIDEOS TICKER SECTION */}
      <section className="portfolio-video-section">
        <div className="video-section-header">
          <h2>{portfolioData?.videoSection?.title || "More than 50,000+ Official Selections"}</h2>
          <p>{portfolioData?.videoSection?.subtitle || "Enabling brands to achieve their dream growth and lead successful digital transformations."}</p>
        </div>

        <div className="video-ticker-container">
          <div className="video-ticker-track">
            {(() => {
              const fallbackVideos = [
                {
                  id: "fallback-1",
                  title: "Aura Editorial Launch",
                  thumbnail: { url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80" },
                  videoType: "url",
                  videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-light-in-a-cyberpunk-setting-42284-large.mp4"
                },
                {
                  id: "fallback-2",
                  title: "Creative Workspace UX",
                  thumbnail: { url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=80" },
                  videoType: "url",
                  videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-working-on-a-laptop-in-a-cafe-42321-large.mp4"
                },
                {
                  id: "fallback-3",
                  title: "Mobile App Biometrics",
                  thumbnail: { url: "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?w=600&q=80" },
                  videoType: "url",
                  videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-holding-a-smartphone-with-a-green-screen-42326-large.mp4"
                },
                {
                  id: "fallback-4",
                  title: "WebGL 3D Interaction",
                  thumbnail: { url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&q=80" },
                  videoType: "url",
                  videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-typing-on-a-keyboard-42337-large.mp4"
                },
                {
                  id: "fallback-5",
                  title: "Digital Agency Strategy",
                  thumbnail: { url: "https://images.unsplash.com/photo-1557683316-973673baf926?w=600&q=80" },
                  videoType: "url",
                  videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-creative-workplace-with-a-laptop-and-a-notebook-42358-large.mp4"
                }
              ];

              const videosToRender = portfolioVideos.length > 0 ? portfolioVideos : fallbackVideos;
              
              // Group videos into alternating columns
              const columns: any[] = [];
              let videoIndex = 0;
              let colIndex = 0;
              
              // Build at least 14 columns to ensure infinite marquee scroll spans wider than the screen
              const totalColsNeeded = 14;
              while (columns.length < totalColsNeeded) {
                const currentVideo1 = videosToRender[videoIndex % videosToRender.length];
                
                if (colIndex % 2 === 0) {
                  // Stacked Column: Needs 2 videos
                  const currentVideo2 = videosToRender[(videoIndex + 1) % videosToRender.length];
                  columns.push({
                    type: "stacked",
                    videos: [
                      { ...currentVideo1, uniqueKey: `col-${columns.length}-vid-1` },
                      { ...currentVideo2, uniqueKey: `col-${columns.length}-vid-2` }
                    ]
                  });
                  videoIndex += 2;
                } else {
                  // Single Column: Needs 1 video + 1 decorative pill
                  const pillColor = colIndex % 4 === 1 ? "green" : "red";
                  columns.push({
                    type: "single",
                    videos: [
                      { ...currentVideo1, uniqueKey: `col-${columns.length}-vid-1` }
                    ],
                    pillColor
                  });
                  videoIndex += 1;
                }
                colIndex++;
              }

              // Duplicate the list of columns for seamless marquee loop
              const repeatedColumns = [...columns, ...columns];

              return repeatedColumns.map((col, cIdx) => {
                if (col.type === "stacked") {
                  return (
                    <div key={`col-${cIdx}`} className="video-ticker-column stacked">
                      {col.videos.map((video: any) => {
                        const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000';
                        const thumbUrl = video.thumbnail?.url?.startsWith('http')
                          ? video.thumbnail.url
                          : video.thumbnail?.url
                            ? `${cmsUrl}${video.thumbnail.url}`
                            : "https://images.unsplash.com/photo-1557683316-973673baf926?w=600&q=80";

                        return (
                          <div 
                            key={video.uniqueKey} 
                            className="video-card-wrapper stacked"
                            onClick={() => setActiveVideo(video)}
                          >
                            <video 
                              src={
                                video.videoType === 'file' && video.videoFile?.url
                                  ? video.videoFile.url.startsWith('http')
                                    ? video.videoFile.url
                                    : `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000'}${video.videoFile.url}`
                                  : video.videoUrl
                              }
                              poster={thumbUrl}
                              loop
                              muted
                              autoPlay
                              playsInline
                              className="video-card-thumbnail"
                            />
                            <div className="video-card-overlay">
                              <div className="video-card-play-btn">
                                <svg viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                } else {
                  const video = col.videos[0];
                  const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000';
                        const thumbUrl = video.thumbnail?.url?.startsWith('http')
                          ? video.thumbnail.url
                          : video.thumbnail?.url
                            ? `${cmsUrl}${video.thumbnail.url}`
                            : "https://images.unsplash.com/photo-1557683316-973673baf926?w=600&q=80";

                  return (
                    <div key={`col-${cIdx}`} className="video-ticker-column single">
                      <div 
                        className="video-card-wrapper single"
                        onClick={() => setActiveVideo(video)}
                      >
                        <video 
                          src={
                            video.videoType === 'file' && video.videoFile?.url
                              ? video.videoFile.url.startsWith('http')
                                ? video.videoFile.url
                                : `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000'}${video.videoFile.url}`
                              : video.videoUrl
                          }
                          poster={thumbUrl}
                          loop
                          muted
                          autoPlay
                          playsInline
                          className="video-card-thumbnail"
                        />
                        <div className="video-card-overlay">
                          <div className="video-card-play-btn">
                            <svg viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className={`video-ticker-pill ${col.pillColor}`} />
                    </div>
                  );
                }
              });
            })()}
          </div>
        </div>
      </section>

      {/* FULLSCREEN VIDEO MODAL PLAYER */}
      {activeVideo && (
        <div className="video-fullscreen-modal" onClick={() => setActiveVideo(null)}>
          <button className="modal-close-btn" onClick={() => setActiveVideo(null)} aria-label="Close video player">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div className="modal-video-wrapper" onClick={(e) => e.stopPropagation()}>
            <video 
              src={
                activeVideo.videoType === 'file' && activeVideo.videoFile?.url
                  ? activeVideo.videoFile.url.startsWith('http')
                    ? activeVideo.videoFile.url
                    : `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000'}${activeVideo.videoFile.url}`
                  : activeVideo.videoUrl
              }
              controls 
              autoPlay 
              playsInline
            />
          </div>
        </div>
      )}
    </>
  );
}
