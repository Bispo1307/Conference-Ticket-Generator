import bgDesktopImage from "/public/background-desktop.png";
import bgMobileImage from "/public/background-mobile.png";
import bgTabletImage from "/public/background-tablet.png";
import patternLines from "/public/pattern-lines.svg";
import logoFull from "/public/logo-full.svg";
import { Link } from "react-router";

export const NotFound = () => {
  const isDesktop = window.innerWidth >= 1024;
  const isTablet = window.innerWidth >= 768;
  return (
    <section
      style={{
        backgroundImage: ` url(${patternLines}), url(${isDesktop ? bgDesktopImage : isTablet ? bgTabletImage : bgMobileImage})`,
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundSize: "cover, cover",
      }}
      className="w-full min-h-screen"
    >
      <div className="max-w-220 mx-auto py-12 flex flex-col items-center">
        <div className="max-w-220 mx-auto">
          <img className="w-54 pb-12 mx-auto" src={logoFull} alt="Logo" />
        </div>
        <h1 className="mt-6 font-extrabold text-9xl text-center text-neutral-0">
          <span className="bg-linear-to-r from-orange-500 to-neutral-0 bg-clip-text text-transparent">
            404
          </span>
        </h1>
        <h2 className="max-w-137 mx-auto mt-3 mb-8 font-medium text-4xl text-center text-neutral-300">
          Página não encontrada
        </h2>
        <Link
          className="mt-10 py-1 px-5 font-extrabold rounded-lg text-xl transition text-neutral-900 bg-orange-500 hover:bg-orange-700"
          to={"/"}
        >
          Ir para a página inicial
        </Link>
      </div>
    </section>
  );
};
