import React from "react";
import defaultButton from "./defaultButton.module.scss";

export interface IButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type: "button" | "submit" | "reset";
  disabled: boolean;
  ariaLabel: string;
  className?: React.HTMLAttributes<HTMLButtonElement>;
}

const DefaultButton: React.FC<IButtonProps> = ({
  children,
  onClick,
  ariaLabel,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={defaultButton.btn_default}
    >
      {children}
    </button>
  );
};

export default DefaultButton;
