import { FileInput, Label } from "flowbite-react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";
import bgDesktopImage from "/public/background-desktop.png";
import bgMobileImage from "/public/background-mobile.png";
import bgTabletImage from "/public/background-tablet.png";
import patternLines from "/public/pattern-lines.svg";
import logoFull from "/public/logo-full.svg";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";

export type FormData = {
  imageUpload: FileList | null;
  imagePreview: string;
  fullName: string;
  email: string;
  githubUsername: string;
};

export const Home = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    navigate("/generate", {
      state: {
        ...data,
        imagePreview: preview
      },
    });
  };

  const imageRegister = register("imageUpload", {
  required: "A foto de perfil é obrigatória.",

  validate: {
    fileType: (files) => {
      const file = files?.[0];

      if (!file) return true;

      const allowedTypes = ["image/jpeg", "image/png"];

      return (
        allowedTypes.includes(file.type) ||
        "Apenas imagens JPG ou PNG são permitidas."
      );
    },
  },
});

  function handleImageRemove() {
    setPreview("");
  }

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));
  }
  const [preview, setPreview] = useState("");
  const isDesktop = window.innerWidth >= 1024;
  const isTablet = window.innerWidth >= 768;
  return (
    <section
      style={{
        backgroundImage: `url(${patternLines}), url(${isDesktop ? bgDesktopImage : isTablet ? bgTabletImage : bgMobileImage})`,
        backgroundRepeat: "no-repeat, no-repeat, no-repeat",
        backgroundSize: "cover, cover, cover",
      }}
      className="w-full min-h-screen"
    >
      <div className="max-w-220 mx-auto py-12 flex flex-col items-center">
        <div className="max-w-220 mx-auto">
          <img className="w-54 pb-12 mx-auto" src={logoFull} alt="Logo" />
        </div>
        <div>
          <h1 className="px-2 md:px-8 lg:px-0 font-extrabold text-2xl md:text-5xl lg:text-6xl text-center text-neutral-0">
            Sua jornada para a Coding Conf 2025 começa aqui!
          </h1>
          <h4 className="px-2 md:px-0 mt-4 mb-8 font-medium text-lg lg:text-2xl text-center text-neutral-300">
            Garanta sua vaga na maior conferência de programação do próximo ano.
          </h4>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-115 md:max-w-140 lg:max-w-115 px-3 md:px-0 flex flex-col gap-6"
        >
          <div className="flex flex-col items-start gap-2">
            <label
              className="font-medium text-xl text-neutral-0"
              htmlFor="avatar"
            >
              Enviar foto de perfil
            </label>
            <div className="flex w-full items-center justify-center">
              <Label
                htmlFor="dropzone-file"
                className={`flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-neutral-800 hover:bg-neutral-700 focus-within:border-3 
                  ${errors.imageUpload ? "border-orange-500 focus-within:border-orange-700y" : "border-neutral-500 focus-within:border-neutral-0"}`}
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  {preview ? (
                    <div className="flex flex-col items-center gap-4">
                      <img
                        src={preview}
                        alt="Preview"
                        className="mt-4 h-14 w-14 rounded-xl object-cover"
                      />
                      <div className="flex items-center gap-3">
                        <button
                          onClick={handleImageRemove}
                          className="px-2.5 py-0.5 rounded-sm bg-neutral-600 hover:underline hover:cursor-pointer"
                        >
                          Remover imagem
                        </button>
                        <Label
                          htmlFor="dropzone-file"
                          className="px-2.5 rounded-sm bg-neutral-600 hover:underline hover:cursor-pointer"
                        >
                          Alterar imagem
                        </Label>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <button className="w-11 h-11 flex items-center justify-center rounded-xl border border-neutral-500 bg-neutral-600">
                        <FaCloudUploadAlt
                          size={26}
                          className="text-orange-500"
                        />
                      </button>
                      <p className="px-4 text-lg text-center text-neutral-300">
                        <span className="font-bold">
                          Arraste e solte ou clique para fazer o upload
                        </span>
                      </p>
                    </div>
                  )}
                </div>
                <FileInput
                  id="dropzone-file"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  {...imageRegister}
                  onChange={(event) => {
                    imageRegister.onChange(event);
                    handleImageUpload(event);
                  }}
                />              

              </Label>
            </div>
            
            <small className="flex gap-1 text-neutral-300">
              <IoMdInformationCircleOutline size={18} /> Envie sua foto (JPG
              ou PNG, tamanho máximo: 500 KB).
            </small>
            {errors.imageUpload?.message && (
                  <small className="font-medium text-sm text-orange-500">
                    {errors.imageUpload.message}
                  </small>
                )}
          </div>
          <div className="flex flex-col items-start gap-2">
            <label
              className="font-medium text-xl text-neutral-0"
              htmlFor="fullName"
            >
              Nome Completo
            </label>
            <input
              {...register("fullName", {
                required: "O nome completo é obrigatório.",
                minLength: {
                  value: 3,
                  message: "Deve ter pelo menos 3 caracteres",
                },
              })}
              className={`w-full h-13 px-4 rounded-xl border-2 text-lg transition text-neutral-0  bg-neutral-800 hover:bg-neutral-700 focus:border-3 
                ${errors.fullName ? "border-orange-500 focus:border-orange-700" : "border-neutral-500 focus:border-neutral-0"}`}
              id="fullName"
              type="text"
              placeholder="Lucas Silva"
            />
            {errors.fullName?.message && (
              <small className="font-medium text-sm text-orange-500">
                {errors.fullName.message}
              </small>
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            <label
              className="font-medium text-xl text-neutral-0"
              htmlFor="email"
            >
              Endereço de Email
            </label>
            <input
              {...register("email", {
                required: "O e-mail é obrigatório.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Insira um formato de e-mail válido (ex: teste@teste.com).",
                },
              })}
              className={`w-full h-13 px-4 rounded-xl border-2 text-lg transition text-neutral-0 border-neutral-500 bg-neutral-800 hover:bg-neutral-700 focus:border-3 focus:border-neutral-0 ${errors.fullName ? "border-orange-500 focus:border-orange-700" : "border-neutral-500 focus:border-neutral-0"}`}
              id="email"
              type="email"
              placeholder="exemplo@gmail.com"
            />
            {errors.email?.message && (
              <small className="font-medium text-sm text-orange-500">
                {errors.email.message}
              </small>
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            <label
              className="font-medium text-xl text-neutral-0"
              htmlFor="github"
            >
              Usuário do Github
            </label>
            <input
              {...register("githubUsername", {
                required: "O nome de usuário do GitHub é obrigatório.",
                pattern: {
                  value: /^[a-zA-Z0-9-]{1,39}$/,
                  message: "Insira um nome de usuário do GitHub válido."
                }
              })}
              className={`w-full h-13 px-4 rounded-xl border-2 text-lg transition text-neutral-0 bg-neutral-800 hover:bg-neutral-700 focus:border-3 
                ${errors.githubUsername ? "border-orange-500 focus:border-orange-700" : "border-neutral-500 focus:border-neutral-0"}`}
              id="github"
              type="text"
              placeholder="@seunomedeusuario"
            />
            {errors.githubUsername?.message && <small className="font-medium text-sm text-orange-500">{errors.githubUsername.message}</small>}
          </div>
          <button
            className="w-full h-13 font-extrabold rounded-xl text-lg transition hover:cursor-pointer text-neutral-900 bg-orange-500 hover:bg-orange-700"
            type="submit"
          >
            Gerar Meu Ingresso
          </button>
        </form>
      </div>
    </section>
  );
};
