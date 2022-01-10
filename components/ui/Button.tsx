import classNames from "classnames";
import Link from "next/link";

export type ButtonStyle = "primary" | "secondary" | "white";

const Button = (props: { text: string; style?: ButtonStyle; path?: string; isOutlined?: boolean }) => {
  const { path, text, isOutlined, style = 'primary' } = props;

  const buttonInner = (
    <div className={classNames("uppercase text-lg hover:text-slate-800 py-2 px-6 rounded-lg", {
                "border-[1px] border-white text-white hover:bg-white": isOutlined,
                "bg-white": !isOutlined,
                "text-slate-700 border-slate-700": style === 'primary',
                "border-white text-white": style === 'white'
    })}>
      {text}
    </div>
  );

  if (path) {
    return (
      <Link href={path}>
        <a>{buttonInner}</a>
      </Link>
    );
  }

  return buttonInner;
};

export default Button;
