import React from "react";

export type IconType =
  | "ai"
  | "bi"
  | "bs"
  | "ci"
  | "di"
  | "fa"
  | "fi"
  | "gi"
  | "hi";

export interface IconProps {
  /** Icon library type (e.g., 'bi', 'ai', 'fa') */
  type: IconType;
  /** Icon name from the selected library (e.g., 'BiHome', 'AiFillHeart') */
  icon: string;
  /** Icon color */
  color?: string;
  /** Icon size in pixels */
  size?: number;
  /** Additional class name */
  className?: string;
  /** Custom style object */
  style?: React.CSSProperties;
  /** Icon title for accessibility */
  title?: string;
}

const Icon: React.FC<IconProps> = ({
  type,
  icon,
  color = "currentColor",
  size = 16,
  className,
  style,
  title,
}) => {
  const [IconComponent, setIconComponent] =
    React.useState<React.ComponentType<any> | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadIcon = async () => {
      try {
        if (!type || !icon) {
          throw new Error("Icon type and name are required");
        }

        // 使用更安全的方式动态导入图标
        let iconLibrary;
        switch (type) {
          case "ai":
            iconLibrary = await import("react-icons/ai");
            break;
          case "bi":
            iconLibrary = await import("react-icons/bi");
            break;
          case "bs":
            iconLibrary = await import("react-icons/bs");
            break;
          case "ci":
            iconLibrary = await import("react-icons/ci");
            break;
          case "di":
            iconLibrary = await import("react-icons/di");
            break;
          case "fa":
            iconLibrary = await import("react-icons/fa");
            break;
          case "fi":
            iconLibrary = await import("react-icons/fi");
            break;
          case "gi":
            iconLibrary = await import("react-icons/gi");
            break;
          case "hi":
            iconLibrary = await import("react-icons/hi");
            break;
          default:
            throw new Error(`Invalid icon type: ${type}`);
        }

        const IconComponent = iconLibrary[icon];

        if (!IconComponent) {
          throw new Error(`Icon "${icon}" not found in library "${type}"`);
        }

        setIconComponent(() => IconComponent);
        setError(null);
      } catch (err) {
        console.error("[Icon Component Error]:", err);
        setError(err instanceof Error ? err.message : "Failed to load icon");
        setIconComponent(null);
      }
    };

    loadIcon();
  }, [type, icon]);

  if (error) {
    console.warn(`[Icon Component]: ${error}`);
    return null;
  }

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent
      color={color}
      size={size}
      className={className}
      style={style}
      title={title}
    />
  );
};

export default Icon;
