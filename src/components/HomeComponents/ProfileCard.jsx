import { useState } from 'react';

const ProfileCard = ({
  name,
  title,
  handle,
  status = 'Online',
  contactText = 'Contact Me',
  avatarUrl,
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  onContactClick,
  showIcon = false,
  showBehindGlow = false,
  behindGlowColor = 'rgba(125, 190, 255, 0.67)',
  customInnerGradient = 'linear-gradient(145deg, #60496e8c 0%, #71C4FF44 100%)',
  children
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!enableTilt) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-fit">
      {/* Card */}
      <div
        className="relative rounded-3xl p-8 transition-transform duration-300 ease-out"
        style={{
          transform: enableTilt ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` : 'none',
          background: customInnerGradient,
          backdropFilter: 'blur(20px)',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Behind Glow - positioned relative to card */}
        {showBehindGlow && (
          <div
            className="absolute -inset-4 blur-3xl opacity-50 rounded-3xl -z-10"
            style={{ background: behindGlowColor }}
          />
        )}
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Avatar */}
          {avatarUrl && (
            <div className="relative">
              <img
                src={avatarUrl}
                alt={name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white/20 shadow-2xl"
              />
              {status && (
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
          )}

          {/* User Info */}
          {showUserInfo && (
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white">{name}</h2>
              {title && <p className="text-lg text-cyan-300">{title}</p>}
              {handle && <p className="text-sm text-gray-400">@{handle}</p>}
              {status && <p className="text-xs text-green-400">{status}</p>}
            </div>
          )}

          {/* Custom Children */}
          {children}

          {/* Contact Button */}
          {onContactClick && (
            <button
              onClick={onContactClick}
              className="mt-4 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-105"
            >
              {contactText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
