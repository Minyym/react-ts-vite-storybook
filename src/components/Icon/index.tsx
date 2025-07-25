import * as AI from "react-icons/ai";
import * as BI from "react-icons/bi";
import * as BS from "react-icons/bs";
import * as CI from "react-icons/ci";
import * as DI from "react-icons/di";
import * as FA from "react-icons/fa";
import * as FI from "react-icons/fi";
import * as GI from "react-icons/gi";
import * as HI from "react-icons/hi";

const IconTypeMap = {
  ai: AI,
  bi: BI,
  bs: BS,
  ci: CI,
  di: DI,
  fi: FI,
  gi: GI,
  hi: HI,
  fa: FA,
} as const;

export type IconType = keyof typeof IconTypeMap;

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
  try {
    if (!type || !icon) {
      throw new Error("Icon type and name are required");
    }

    if (!Object.keys(IconTypeMap).includes(type)) {
      throw new Error(`Invalid icon type: ${type}`);
    }

    const IconComponent = IconTypeMap[type][icon];

    if (!IconComponent) {
      throw new Error(`Icon "${icon}" not found in library "${type}"`);
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
  } catch (error) {
    console.error("[Icon Component Error]:", error);
    return null;
  }
};

export default Icon;
