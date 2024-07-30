import { createSignal, JSX, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

interface CollapsibleProps {
  children?:
    | JSX.Element
    | ((props: { isOpen: boolean; toggle: () => void }) => JSX.Element);
  isOpen?: boolean;
  uncontrolledIsOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  style?: JSX.CSSProperties;
  animationVars?: JSX.CSSProperties;
  as?: keyof JSX.IntrinsicElements | ((props: any) => JSX.Element);
  [key: string]: any;
}

const Collapsible = (props: CollapsibleProps) => {
  const [local, others] = splitProps(props, [
    "children",
    "isOpen",
    "uncontrolledIsOpen",
    "as",
    "onToggle",
    "style",
    "animationVars",
  ]);
  const [isUncontrolledIsOpen, setIsUncontrolledIsOpen] = createSignal<boolean>(
    local.uncontrolledIsOpen ?? false,
  );
  const isControlled = local.isOpen !== undefined;
  const isOpen = () => (isControlled ? local.isOpen! : isUncontrolledIsOpen());

  const toggle = () => {
    const isComponentOpened = !isOpen();

    if (!isControlled) {
      setIsUncontrolledIsOpen(isComponentOpened);
    }

    local.onToggle?.(isComponentOpened);
  };

  const style = {
    ...others.style,
    ...local.animationVars,
  };

  return (
    <Dynamic component={local.as || "div"} {...others} style={style}>
      {typeof local.children === "function"
        ? local.children({ isOpen: isOpen(), toggle })
        : local.children}
    </Dynamic>
  );
};

export default Collapsible;
