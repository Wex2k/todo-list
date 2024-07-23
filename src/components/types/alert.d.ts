interface AlertProps {
  message: string;
  handleClear: () => void;
  triggerMessage?: string;
  icon?: React.ReactNode;
}
