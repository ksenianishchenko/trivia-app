import React from "react";

import "./styles.scss";

export interface IButton {
    readonly kind: string;
    readonly className?: string;
    handleClick?: () => void;
}

const Button: React.SFC<IButton> = ({kind, className, handleClick, children}) => {
    return <button
        type={kind !== "Submit" ? "button" : "submit"}
        className={className}
        onClick={handleClick}
    >{children}</button>
}

export default Button;