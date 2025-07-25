import classNames from "classnames";

export type ButtonType = "primary" | "default" | "danger" | "link";
export type ButtonSize = "small" | "middle" | "large";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
  type?: ButtonType;
  size?: ButtonSize;
  href?: string;
};
type NativeButtonProps = Omit<React.ButtonHTMLAttributes<HTMLElement>, "type"> &
  Props;
type AnchorButtonProps = Omit<React.AnchorHTMLAttributes<HTMLElement>, "type"> &
  Props;
type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  className,
  loading,
  type,
  size = "middle",
  href,
  ...rest
}) => {
  const classes = classNames("btn", className, {
    [`btn-${type}`]: type,
    [`btn-${size}`]: size,
    "btn-loading": loading,
    disabled: type === "link" && disabled,
    loading: loading,
  });
  if (href && type === "link") {
    return (
      <a className={classes} href={href} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button
      className={classes}
      disabled={disabled}
      {...rest}
      onClick={() => {
        if (loading) return;
        onClick && onClick();
      }}
    >
      {loading && <span className="btn-icon">---</span>}
      {children}
    </button>
  );
};

export default Button;
