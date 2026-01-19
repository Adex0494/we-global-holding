import { CSSProperties } from 'react';
import styles from './GlassCard.module.css';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article';
  role?: 'region' | 'group' | 'article' | 'form';
  'aria-label'?: string;
  'aria-labelledby'?: string;

  // Base styling
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  baseColor?: string;

  // Gradient colors
  gradientTopLeftColor?: string;
  gradientTopLeftSize?: string;
  gradientBottomRightColor?: string;
  gradientBottomRightSize?: string;

  // Background
  backgroundSize?: string;
  backgroundPosition?: string;

  // Blur and effects
  blur?: string;
  saturate?: string;

  // Shadows
  insetShadowTop?: string;
  insetGlowSize?: string;
  insetGlowColor?: string;
  shadowY?: string;
  shadowBlur?: string;
  shadowColor?: string;

  // Edge border
  edgeBorderWidth?: string;
  edgeGradientStart?: string;
  edgeGradientMid?: string;
  edgeGradientEnd?: string;

  // Sheen/Refraction layer
  sheenGradientStart?: string;
  sheenGradientMid?: string;
  sheenRadialColor?: string;
  sheenOpacity?: string;

  // Transitions
  transitionDuration?: string;
  bgTransitionDuration?: string;

  // Hover effects
  enableHover?: boolean;
  hoverBorderColor?: string;
  hoverTranslateY?: string;
  hoverScale?: string;
  hoverBlur?: string;
  hoverSaturate?: string;
  hoverInsetShadowTop?: string;
  hoverInsetGlowSize?: string;
  hoverInsetGlowColor?: string;
  hoverShadowY?: string;
  hoverShadowBlur?: string;
  hoverShadowColor?: string;
  hoverBackgroundPosition?: string;
  hoverSheenOpacity?: string;
  hoverSheenTranslateY?: string;
  hoverSheenScale?: string;
  hoverEdgeGradientStart?: string;
  hoverEdgeGradientMid?: string;
  hoverEdgeGradientEnd?: string;

  // Active state
  activeTranslateY?: string;
  activeScale?: string;
  activeBlur?: string;
  activeSaturate?: string;
}

export default function GlassCard({
  children,
  className = '',
  as: Component = 'div',
  role,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,

  // Defaults matching original CSS
  borderRadius = '22px',
  borderWidth = '1px',
  borderColor = 'rgba(255, 255, 255, 0.28)',
  baseColor = 'rgba(255, 255, 255, 0.045)',

  gradientTopLeftColor = 'rgba(255, 182, 193, 0.18)',
  gradientTopLeftSize = '45%',
  gradientBottomRightColor = 'rgba(173, 216, 230, 0.22)',
  gradientBottomRightSize = '60%',

  backgroundSize = '120% 120%',
  backgroundPosition = '0% 0%',

  blur = '1px',
  saturate = '100%',

  insetShadowTop = 'rgba(255, 255, 255, 0.35)',
  insetGlowSize = '24px',
  insetGlowColor = 'rgba(255, 255, 255, 0.18)',
  shadowY = '14px',
  shadowBlur = '36px',
  shadowColor = 'rgba(0, 0, 0, 0.14)',

  edgeBorderWidth = '1.5px',
  edgeGradientStart = 'rgba(255, 255, 255, 0.75)',
  edgeGradientMid = 'rgba(255, 255, 255, 0.15)',
  edgeGradientEnd = 'rgba(255, 255, 255, 0.45)',

  sheenGradientStart = 'rgba(255, 255, 255, 0.18)',
  sheenGradientMid = 'rgba(255, 255, 255, 0.06)',
  sheenRadialColor = 'rgba(255, 255, 255, 0.15)',
  sheenOpacity = '0',

  transitionDuration = '0.35s',
  bgTransitionDuration = '0.6s',

  enableHover = true,
  hoverBorderColor = 'rgba(255, 255, 255, 0.38)',
  hoverTranslateY = '-4px',
  hoverScale = '0.995',
  hoverBlur = '4px',
  hoverSaturate = '150%',
  hoverInsetShadowTop = 'rgba(255, 255, 255, 0.45)',
  hoverInsetGlowSize = '32px',
  hoverInsetGlowColor = 'rgba(255, 255, 255, 0.28)',
  hoverShadowY = '22px',
  hoverShadowBlur = '56px',
  hoverShadowColor = 'rgba(0, 0, 0, 0.22)',
  hoverBackgroundPosition = '6% 4%',
  hoverSheenOpacity = '1',
  hoverSheenTranslateY = '-2px',
  hoverSheenScale = '1.01',
  hoverEdgeGradientStart = 'rgba(255, 255, 255, 0.9)',
  hoverEdgeGradientMid = 'rgba(255, 255, 255, 0.25)',
  hoverEdgeGradientEnd = 'rgba(255, 255, 255, 0.55)',

  activeTranslateY = '-1px',
  activeScale = '0.995',
  activeBlur = '36px',
  activeSaturate = '160%',
}: GlassCardProps) {
  const cssVariables = {
    '--border-radius': borderRadius,
    '--border-width': borderWidth,
    '--border-color': borderColor,
    '--base-color': baseColor,

    '--gradient-top-left-color': gradientTopLeftColor,
    '--gradient-top-left-size': gradientTopLeftSize,
    '--gradient-bottom-right-color': gradientBottomRightColor,
    '--gradient-bottom-right-size': gradientBottomRightSize,

    '--background-size': backgroundSize,
    '--background-position': backgroundPosition,

    '--blur': blur,
    '--saturate': saturate,

    '--inset-shadow-top': insetShadowTop,
    '--inset-glow-size': insetGlowSize,
    '--inset-glow-color': insetGlowColor,
    '--shadow-y': shadowY,
    '--shadow-blur': shadowBlur,
    '--shadow-color': shadowColor,

    '--edge-border-width': edgeBorderWidth,
    '--edge-gradient-start': edgeGradientStart,
    '--edge-gradient-mid': edgeGradientMid,
    '--edge-gradient-end': edgeGradientEnd,

    '--sheen-gradient-start': sheenGradientStart,
    '--sheen-gradient-mid': sheenGradientMid,
    '--sheen-radial-color': sheenRadialColor,
    '--sheen-opacity': sheenOpacity,

    '--transition-duration': transitionDuration,
    '--bg-transition-duration': bgTransitionDuration,

    '--hover-border-color': hoverBorderColor,
    '--hover-translate-y': hoverTranslateY,
    '--hover-scale': hoverScale,
    '--hover-blur': hoverBlur,
    '--hover-saturate': hoverSaturate,
    '--hover-inset-shadow-top': hoverInsetShadowTop,
    '--hover-inset-glow-size': hoverInsetGlowSize,
    '--hover-inset-glow-color': hoverInsetGlowColor,
    '--hover-shadow-y': hoverShadowY,
    '--hover-shadow-blur': hoverShadowBlur,
    '--hover-shadow-color': hoverShadowColor,
    '--hover-background-position': hoverBackgroundPosition,
    '--hover-sheen-opacity': hoverSheenOpacity,
    '--hover-sheen-translate-y': hoverSheenTranslateY,
    '--hover-sheen-scale': hoverSheenScale,
    '--hover-edge-gradient-start': hoverEdgeGradientStart,
    '--hover-edge-gradient-mid': hoverEdgeGradientMid,
    '--hover-edge-gradient-end': hoverEdgeGradientEnd,

    '--active-translate-y': activeTranslateY,
    '--active-scale': activeScale,
    '--active-blur': activeBlur,
    '--active-saturate': activeSaturate,
  } as CSSProperties;

  return (
    <Component
      className={`${styles.glassCard} ${enableHover ? styles.enableHover : ''} p-8 ${className}`}
      style={cssVariables}
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
    >
      {children}
    </Component>
  );
}
