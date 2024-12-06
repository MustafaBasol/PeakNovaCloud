import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const iconMap = {
  "talk.svg": () => import('.././public/talk.svg'),
  "ai.svg": () => import('.././public/ai.svg'),
  "ladder.svg": () => import('.././public/ladder.svg'),
  "questions.svg": ()=>import('.././public/questions.svg') 
};

const DynamicSvgComponent = ({ iconName, color }) => {
  const [SvgIcon, setSvgIcon] = useState(null);

  useEffect(() => {
    const importSvgIcon = async () => {
      if (iconMap[iconName]) {
        try {
          const ImportedIcon = dynamic(iconMap[iconName]);
          setSvgIcon(() => ImportedIcon);
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

  return SvgIcon ? <SvgIcon fill={color} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : null;
};

export default DynamicSvgComponent;