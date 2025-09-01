export interface ProgressBarProps {
  progress: number;
  label?: string;
  variant?: "success" | "info" | "warning" | "danger";
  striped?: boolean;
}
