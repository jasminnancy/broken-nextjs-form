import React, { MouseEventHandler } from "react";

// types
interface ButtonProps {
  as?: "a";
  href?: string;
  target?: string;
  rel?: string;
  colorScheme?: "pink" | "blue";
  rounded?: boolean;
  withArrow?: "reversed" | true;
  fancy?: boolean;
  tabIndex?: number;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<any> | undefined;
  children?: React.ReactNode;
  submit?: string;
  type?: string;
}

const Button: React.FC<ButtonProps> = ({
  as,
  href,
  target,
  rel,
  colorScheme,
  rounded,
  withArrow,
  fancy,
  tabIndex,
  className: passedStyles,
  disabled,
  onClick,
  children,
  type,
}) => {
  // colorScheme styles
  let colorSchemeStyles = "text-white bg-black";
  if (colorScheme === "pink") {
    colorSchemeStyles = "text-white bg-[#FF73E3]";
  }
  if (colorScheme === "blue") {
    if (fancy) {
      colorSchemeStyles =
        "text-white bg-[#209BF1] shadow-[6px_6px_0px_rgba(32,_155,_241,_0.25)] transition-all delay-150 ease-slick active:shadow-[3px_3px_0px_rgba(32,_155,_241,_0.25)] active:scale-[97] enabled:active:shadow-[3px_3px_0px_rgba(32,_155,_241,_0.25)] enabled:active:scale-[97]";
    } else {
      colorSchemeStyles = "text-white bg-[#209BF1]";
    }
  }

  // disabled styles
  const disabledStyles = disabled
    ? "opacity-25 cursor-not-allowed animate-disabled transition-none"
    : "";

  // rounded styles
  const roundedStyles = rounded ? "rounded-full" : "rounded-[7px]";

  // withArrow styles
  let arrowStyles = "";
  if (withArrow) {
    const arrowIcon = fancy
      ? 'after:content-[url("/fancy_arrow.svg")] after:pl-1 after:max-h-6 after:h-full after:m-auto after:flex '
      : 'after:content-["\\2192"] ';

    arrowStyles =
      arrowIcon +
      // ::after
      (!disabled &&
        "after:delay-150 after:transition-all after:ease-slick after:-translate-x-[2px] ") +
      // :enabled:hover::after
      (!disabled &&
        "enabled:hover:after:delay-150 enabled:hover:after:transition-all enabled:hover:after:ease-slick enabled:hover:after:translate-x-[2px] ") +
      // :enabled::after
      (!disabled &&
        "hover:after:delay-150 hover:aftertransition-all hover:afterease-slick hover:after:translate-x-[2px]");
  }

  if (withArrow === "reversed") {
    const arrowIconReversed = fancy
      ? 'before:content-[url("/fancy_arrow.svg")] before:pr-1 before:max-h-6 before:h-full before:m-auto before:flex before:rotate-180 hover:before:rotate-180 enabled:hover:before:rotate-180 '
      : 'before:content-["\\2192"] before:rotate-180 hover:before:rotate-180 enabled:hover:before:rotate-180 ';

    arrowStyles =
      arrowIconReversed +
      // ::before
      (!disabled &&
        "before:delay-150 before:transition-all before:ease-slick before:translate-x-[2px] ") +
      // :enabled:hover::before
      (!disabled &&
        "enabled:hover:before:delay-150 enabled:hover:before:transition-all enabled:hover:before:ease-slick enabled:hover:before:-translate-x-[2px] ") +
      // :hover::before
      (!disabled &&
        "hover:before:delay-150 hover:before:transition-all hover:before:ease-slick hover:before:-translate-x-[2px]");
  }

  // fancy styles
  let fancyStyles = "";
  if (fancy) {
    if (colorScheme !== "blue") {
      fancyStyles =
        "font-semibold delay-150 transition-all ease-slick font-heading shadow-[6px_6px_0px_rgba(0,_0,_0,_0.25)] active:scale-[97] active:shadow-[3px_3px_0px_rgba(0,_0,_0,_0.15)]";
    }
  }

  const buttonStyles = `${colorSchemeStyles} ${disabledStyles} ${roundedStyles} ${arrowStyles} ${fancyStyles}`;
  const button = (
    <button
      onClick={onClick}
      className={`flex justify-center gap-[10px] ${buttonStyles} ${passedStyles}`}
    >
      {children}
    </button>
  );

  if (as === "a") {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        tabIndex={tabIndex}
        onClick={onClick}
        className="w-fit"
        type={type}
      >
        {button}
      </a>
    );
  }

  return button;
};

export default Button;
