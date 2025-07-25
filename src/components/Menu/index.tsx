import "./menu.scss";

import classNames from "classnames";
import React, { useState } from "react";

type MenuMode = "vertical" | "horizontal";

export interface MenuItemType {
  label: React.ReactNode;
  key: string;
  icon?: React.ReactNode;
  children?: MenuItemType[];
  type?: "group";
  disabled?: boolean;
  className?: string;
}

export interface MenuProps {
  items?: MenuItemType[];
  mode?: MenuMode;
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  onClick?: (info: {
    key: string;
    keyPath: string[];
    item: MenuItemType;
  }) => void;
  style?: React.CSSProperties;
  className?: string;
}

const SubMenu: React.FC<{
  item: MenuItemType;
  mode: MenuMode;
  onClick?: (info: {
    key: string;
    keyPath: string[];
    item: MenuItemType;
  }) => void;
  isSelected?: boolean;
}> = ({ item, mode, onClick, isSelected }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    if (mode === "horizontal") {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (mode === "horizontal") {
      setIsOpen(false);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (mode === "vertical") {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  const classes = classNames("menu-submenu-title", {
    "is-disabled": item.disabled,
    "is-selected": isSelected,
  });

  return (
    <li
      className={classNames("menu-submenu", {
        "menu-submenu-open": isOpen,
      })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={classes}
        role="menuitem"
        aria-haspopup="true"
        aria-expanded={isOpen}
        tabIndex={item.disabled ? -1 : 0}
        onClick={handleClick}
        onKeyPress={e => {
          if (e.key === "Enter" || e.key === " ") {
            handleClick(e as any);
          }
        }}
      >
        {item.icon && <span className="menu-item-icon">{item.icon}</span>}
        <span>{item.label}</span>
        <i className="menu-submenu-arrow" />
      </div>
      <ul
        className={classNames("menu-submenu-items", {
          "menu-submenu-hidden": !isOpen,
        })}
      >
        {item.children?.map(child => {
          if (child.type === "group") {
            return (
              <li
                key={child.key}
                className="menu-item-group"
                role="group"
                aria-label={child.label?.toString()}
              >
                <div className="menu-item-group-title">{child.label}</div>
                <ul>
                  {child.children?.map(groupChild =>
                    renderMenuItem(groupChild, onClick)
                  )}
                </ul>
              </li>
            );
          }
          return renderMenuItem(child, onClick, item.key);
        })}
      </ul>
    </li>
  );
};

const renderMenuItem = (
  item: MenuItemType,
  onClick?: (info: {
    key: string;
    keyPath: string[];
    item: MenuItemType;
  }) => void,
  parentKey?: string
) => {
  if (item.children) {
    return null; // 子菜单项会由 SubMenu 组件处理
  }

  const handleClick = () => {
    if (!item.disabled && onClick) {
      const keyPath = parentKey ? [item.key, parentKey] : [item.key];
      onClick({ key: item.key, keyPath, item });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick();
    }
  };

  return (
    <li
      key={item.key}
      className={classNames("menu-item", item.className, {
        "is-disabled": item.disabled,
      })}
      role="menuitem"
      tabIndex={item.disabled ? -1 : 0}
      aria-disabled={item.disabled}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
    >
      {item.icon && <span className="menu-item-icon">{item.icon}</span>}
      <span className="menu-item-label">{item.label}</span>
    </li>
  );
};

export const Menu: React.FC<MenuProps> = ({
  items = [],
  mode = "horizontal",
  selectedKeys,
  defaultSelectedKeys = [],
  onClick,
  style,
  className,
}) => {
  const [currentSelectedKeys, setCurrentSelectedKeys] = useState<string[]>(
    selectedKeys || defaultSelectedKeys
  );

  // 更新选中项
  React.useEffect(() => {
    if (selectedKeys) {
      setCurrentSelectedKeys(selectedKeys);
    }
  }, [selectedKeys]);

  const handleClick = (info: {
    key: string;
    keyPath: string[];
    item: MenuItemType;
  }) => {
    if (!selectedKeys) {
      // 如果不是受控组件，则更新内部状态
      setCurrentSelectedKeys([info.key]);
    }
    onClick?.(info);
  };

  const classes = classNames(
    "menu",
    {
      "menu-horizontal": mode === "horizontal",
      "menu-vertical": mode === "vertical",
    },
    className
  );

  return (
    <ul className={classes} style={style} role="menu">
      {items.map(item => {
        const isSelected = currentSelectedKeys.includes(item.key);

        if (item.children) {
          return (
            <SubMenu
              key={item.key}
              item={item}
              mode={mode}
              isSelected={isSelected}
              onClick={handleClick}
            />
          );
        }

        return renderMenuItem(
          {
            ...item,
            className: classNames(item.className, {
              "is-selected": isSelected,
            }),
          },
          handleClick
        );
      })}
    </ul>
  );
};

export default Menu;
