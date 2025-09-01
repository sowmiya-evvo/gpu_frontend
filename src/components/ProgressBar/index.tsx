import React from "react";
import { ProgressBarProps } from "./types";

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  variant,
  striped,
}) => {
  const progressClass = `progress-bar${variant ? ` bg-${variant}` : ""}${striped ? " progress-bar-striped" : ""}`;

  return (
    <div className="progress">
      <div
        className={progressClass}
        role="progressbar"
        style={{ width: `${progress}%` }}
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {label}
      </div>
    </div>
  );
};

export default ProgressBar;
