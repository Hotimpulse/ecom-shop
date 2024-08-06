import React from "react";
import defaultButton from "./defaultButton.module.css";

interface IButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: React.HTMLAttributes<HTMLButtonElement>;
}

const DefaultButton: React.FC<IButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={defaultButton.btn_default}
    >
      {children}
    </button>
  );
};

export default DefaultButton;
