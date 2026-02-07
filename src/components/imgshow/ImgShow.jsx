import './imgshow.css';

const ImgShow = () => {
  // Sample images - replace with your actual images
  const images = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop',
  ];

  return (
    <div className="imgshow-container">
      {/* Top Navigation */}
      <div className="imgshow-nav">
        <span className="nav-badge">📍 Shots By Me</span>
        <span className="nav-text">ICD** = 0(0)</span>
        <span className="nav-date">©2025</span>
      </div>

      <div className="imgshow-content">
        <div className="imgshow-header">
          <span className="imgshow-badge">📸 Photography</span>
          
          <h1 className="imgshow-title">
            Every Pixel Clicked.
          </h1>
          
          <p className="imgshow-subtitle">
            Capturing moments, creating memories. Through my lens, I capture stunning visuals that bring your
            <br className="br-desktop" />
            brand to life with clarity, emotion, and impact.
          </p>
          
          <button className="imgshow-button">
            <span className="button-icon">●</span>
            Book an appointment
          </button>
        </div>

        <div className="imgshow-gallery">
          {images.map((src, index) => (
            <div
              key={index}
              className={`imgshow-card card-${index + 1}`}
            >
              <img src={src} alt={`Gallery ${index + 1}`} draggable="false" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="imgshow-footer">
        <span className="footer-badge">📍 Frontend Developer</span>
        <span className="footer-text">ICD** = 0(0)</span>
        <span className="footer-date">©2025</span>
        <div className="footer-actions">
          <button className="action-btn">↗ Look full site</button>
          <button className="action-btn">📧 Used in Framer</button>
        </div>
      </div>
    </div>
  );
};

export default ImgShow;
