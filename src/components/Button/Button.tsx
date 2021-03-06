import React, { ReactNode } from "react";
import { Button as RKButton } from "reakit/Button";
import classNames from "classnames";

import styles from "./Button.module.scss";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
    large?: boolean;
    outline?: boolean;
    rightIcon?: ReactNode;
}

const Button = React.forwardRef((props: Props, ref) => {
    const { className, children, large, rightIcon, outline, ...restProps } = props;
    return (
        <RKButton
            className={classNames(
                styles.button,
                large && styles.large,
                outline && styles.outline,
                className
            )}
            ref={ref as any}
            {...restProps}
        >
            {children}
            {rightIcon && <div className={styles.rightIcon}>{rightIcon}</div>}
        </RKButton>
    );
});

export default Button;
