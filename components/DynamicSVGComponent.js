import { useState, useEffect } from 'react';

const iconMap = {
  "talk.svg": () => import('../public/talk.svg'),
  "ai.svg": () => import('../public/ai.svg'),
  "ladder.svg": () => import('../public/ladder.svg'),
  "questions.svg": () => import('../public/questions.svg'),
};

const iconCache = new Map();

const DynamicSvgComponent = ({ iconName, color }) => {
  const [SvgIcon, setSvgIcon] = useState(null);

  useEffect(() => {
    const importSvgIcon = async () => {
      if (iconCache.has(iconName)) {
        setSvgIcon(() => iconCache.get(iconName));
        return;
      }

      if (iconMap[iconName]) {
        try {
          const ImportedIcon = await iconMap[iconName]();
          const IconComponent = ImportedIcon.default;
          iconCache.set(iconName, IconComponent);
          setSvgIcon(() => IconComponent);
        } catch (error) {
          console.error(`Error loading icon: ${iconName}`, error);
        }
      } else {
        console.warn(`Icon "${iconName}" not found in iconMap.`);
      }
    };

    if (iconName) {
      importSvgIcon();
    }
  }, [iconName]);

  return SvgIcon ? (
    <SvgIcon fill={color} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  ) : (
    <div style={{ width: '100%', height: '100%' }}>Loading...</div>
  );
};

export default DynamicSvgComponent;
