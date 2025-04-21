import { ComponentProps, forwardRef, ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";
import clsx from "clsx";

type BorderRadius = "small" | "medium" | "large" | "circle" | undefined;

export type ButtonProps<T> = {
  as?: T;
  children: ReactNode;
  onClick?: (e: MouseEvent) => void;
  variant?:
    | "primary"
    | "border-inverted"
    | "secondary"
    | "secondary-2"
    | "primary-inverted"
    | "tertiary";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  size?: "default" | "large";
  borderRadius?: BorderRadius;
  hideLabelOnMobile?: boolean;
  isModify?: boolean;
  form?: string; // для связи кнопки с form(по id) если кнопка не находится внутри form
  mlAuto?: boolean; // margin-left: auto
  mrAuto?: boolean; // margin-right: auto
  isOnlyIcon?: boolean;
  minSize?: boolean;
  textSize?: "Small";

  hideIconOnMobile?: boolean;
} & Partial<ComponentProps<typeof Link>>;

export const Button = forwardRef<Element, ButtonProps<unknown>>(
  (props, ref) => {
    const {
      as = "button",
      children,
      onClick,
      className,
      disabled,
      icon,
      iconPosition = "left",
      variant = "primary",
      size = "default",
      borderRadius,
      type = "button",
      isLoading,
      hideLabelOnMobile,
      isModify,
      form,
      mlAuto,
      mrAuto,
      minSize,
      hideIconOnMobile,
      isOnlyIcon,
      textSize,
      ...otherProps
    } = props;

    const Component = as;

    return (
      <Component
        className={clsx(
          styles.root,
          styles[variant],
          isModify ? styles[`${size}SizeModify`] : styles[`${size}Size`],
          styles[`${size}Size`],
          borderRadius && styles[`${borderRadius}Radius`],
          {
            [styles.hideLabelOnMobile]: hideLabelOnMobile,
            [styles.isOnlyIcon]: isOnlyIcon,
          },

          {
            [styles.mlAuto]: mlAuto,
            [styles.mrAuto]: mrAuto,
            [styles.minSize]: minSize,
            [styles.hideLabelOnMobile]: hideLabelOnMobile,
            [styles.hideIconOnMobile]: hideIconOnMobile,
          },
          textSize && styles[`text-${textSize}`],

          className
        )}
        onClick={onClick}
        disabled={disabled}
        type={type}
        ref={ref}
        {...(as === "button" && form ? { form } : {})} // условно добавляем атрибут form только если это кнопка и form передан
        {...otherProps}
      >
        {icon && iconPosition === "left" && (
          <span className={styles.iconLeft}>{icon}</span>
        )}
        {isLoading ? (
          <>Loader</>
        ) : (
          <span className={styles.label}>{children}</span>
        )}
        {icon && iconPosition === "right" && (
          <span className={styles.iconRight}>{icon}</span>
        )}
      </Component>
    );
  }
);
