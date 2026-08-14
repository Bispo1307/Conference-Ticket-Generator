import { FaGithubSquare } from "react-icons/fa";
import bgDesktopImage from "/public/background-desktop.png";
import bgMobileImage from "/public/background-mobile.png";
import bgTabletImage from "/public/background-tablet.png";
import imageAvatar from "/public/image-avatar.jpg";
import patternLines from "/public/pattern-lines.svg";
import patternTicket from "/public/pattern-ticket.svg";
import logoFull from "/public/logo-full.svg";
import logoMark from "/public/logo-mark.svg";
import { useLocation } from "react-router";
import type { FormData } from "../pages/Home"

export const Ticket = () => {
  const location = useLocation();

  const data = location.state as FormData

  const isDesktop = window.innerWidth >= 1024;
  const isTablet = window.innerWidth >= 768;

  const ticketId = Array.from({ length: 5 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");

  console.log(ticketId);

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
        <div>
          <h1 className="mx-0 md:mx-4 lg:mx-0 font-extrabold text-3xl md:text-5xl lg:text-6xl text-center text-neutral-0">
            Parabéns,{" "}
            <span className="bg-linear-to-r from-orange-500 to-neutral-0 bg-clip-text text-transparent">
              {data.fullName ? data.fullName : "Lucas Silva"}
            </span>
            ! Seu ingresso está pronto.
          </h1>
          <h4 className="max-w-137 md:max-w-150 mx-auto mt-6 mb-8 font-medium text-xl md:text-2xl text-center text-neutral-300">
            Enviamos seu ingresso por e-mail para{" "}
            <span className="text-orange-500">{data.email ? data.email : "teste@teste.com"}</span> e enviaremos atualizações no período que antecede o evento.
          </h4>
        </div>
        <div className="w-full relative max-w-150 px-3">
          <div className="w-full">
            <img src={patternTicket} alt="Ticket" />
          </div>
          <div className="absolute top-4 md:top-8 left-8">
            <div>
              <div className="flex items-center gap-3 md:gap-4">
                <img className="w-8 h-8" src={logoMark} alt="Logo" />
                <h2 className="font-bold text-2xl md:text-4xl text-neutral-0">
                  Coding Conf
                </h2>
              </div>
            </div>
            <div className="ml-11 md:ml-14 md:mt-2 md:text-lg text-neutral-300">
              Jan 31, 2025 / Austin, TX
            </div>
          </div>
          <div className="absolute bottom-4 md:bottom-8 left-8 flex items-center gap-3 md:gap-5">
            <div>
              <img
                className="w-12 md:w-20 h-12 md:h-20 object-cover rounded-lg md:rounded-xl"
                src={data.imagePreview ? data.imagePreview : imageAvatar}
                alt={`${data.fullName ? data.fullName : "Lucas Silva"}s avatar`}
              />
            </div>
            <div>
              <h3 className="font-medium text-xl md:text-2xl text-neutral-0">
                {data.fullName ? data.fullName : "Lucas Silva"}
              </h3>
              <div className="flex items-center gap-2">
                <FaGithubSquare className="text-neutral-0" />
                <p className="text-neutral-300">@{data.githubUsername ? data.githubUsername : "LucasDev"}</p>
              </div>
            </div>
          </div>
          <div className="absolute top-1/2 right-1 md:right-3 lg:right-2.5 rotate-90 -translate-y-1/2">
            <span className="text-2xl md:text-3xl text-neutral-500">
              #{ticketId}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
