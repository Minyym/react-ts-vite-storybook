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

        // 动态导入图标库
        const iconLibrary = await import(`react-icons/${type}`);
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
