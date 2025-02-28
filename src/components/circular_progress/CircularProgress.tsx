import React from "react";
import { Circle, ProgressCircle, SVGContainer, StyledText } from "./CircularProgress.styles";

interface Props {
    percentage: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
    bgColor?: string;
}

const CircularProgress: React.FC<Props> = ({ percentage, size = 60, strokeWidth = 4, color = "#4CAF50", bgColor = "#e0e0e0" }) => {
  const radius = (size - strokeWidth) / 2; 
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <SVGContainer width={size} height={size}>
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={bgColor}
        strokeWidth={strokeWidth}
        fill="none"
      />
      
      <ProgressCircle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
      
      <StyledText x="50%" y="50%" dy="0.3em">
        {percentage}%
      </StyledText>
    </SVGContainer>
  );
};

export default CircularProgress;
