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

type FormData = {
  imageUpload: FileCallback | null;
  fullName: string;
  email: string;
  githubUsername: string;
};

export const Home = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data: FormData) =>
    console.log(data);

  const [image, setImage] = useState(null);

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
          <h1 className="font-extrabold text-3xl md:text-6xl text-center text-neutral-0">
            Your Journey to Coding Conf 2025 Starts Here!
          </h1>
          <h4 className="mt-6 mb-8 px-2 font-medium text-xl md:text-2xl text-center text-neutral-300">
            Secure your spot at next year's biggest coding conference.
          </h4>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-115 md:max-w-140 lg:max-w-115 px-3 md:px-0 flex flex-col gap-6 md:gap-7"
        >
          <div className="flex flex-col items-start gap-2">
            <label
              className="font-medium text-xl text-neutral-0"
              htmlFor="avatar"
            >
              Upload Avatar
            </label>
            <div className="flex w-full items-center justify-center">
              <Label
                htmlFor="dropzone-file"
                className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-500 bg-neutral-800 hover:bg-neutral-700 focus-within:border-3 focus-within:border-neutral-0"
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
                          Remove image
                        </button>
                        <Label
                          htmlFor="dropzone-file"
                          className="px-2.5 rounded-sm bg-neutral-600 hover:underline hover:cursor-pointer"
                        >
                          Change image
                        </Label>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <button className="w-11 h-11 flex items-center justify-center rounded-xl border border-neutral-500 bg-neutral-600">
                        <FaCloudUploadAlt
                          size={26}
                          className="text-orange-500"
                        />
                      </button>
                      <p className="text-lg text-neutral-300">
                        <span className="font-bold">
                          Drag and drop or click to upload
                        </span>
                      </p>
                    </div>
                  )}
                </div>
                <FileInput
                  id="dropzone-file"
                  accept="image/*"
                  className="hidden"
                  {...register("imageUpload")}
                  onChange={handleImageUpload}
                />
              </Label>
            </div>
            <small className="flex gap-1 text-neutral-300">
              <IoMdInformationCircleOutline size={18} /> Upload your photo (JPG
              or PNG, max size: 500KB).
            </small>
          </div>
          <div className="flex flex-col items-start gap-2">
            <label
              className="font-medium text-xl text-neutral-0"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              {...register("fullName", {
                required: "Full name is required",
                minLength: {
                  value: 3,
                  message: "Must be at leasted 3 characters",
                },
              })}
              className={`w-full h-13 px-4 rounded-xl border-2 text-lg transition text-neutral-0  bg-neutral-800 hover:bg-neutral-700 focus:border-3 
                ${errors.fullName ? "border-orange-500 focus:border-orange-700" : "border-neutral-500 focus:border-neutral-0"}`}
              id="fullName"
              type="text"
              placeholder="Jonatan Kristof"
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
              Email Address
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter a valid email format. (ex: test@test.com).",
                },
              })}
              className={`w-full h-13 px-4 rounded-xl border-2 text-lg transition text-neutral-0 border-neutral-500 bg-neutral-800 hover:bg-neutral-700 focus:border-3 focus:border-neutral-0 ${errors.fullName ? "border-orange-500 focus:border-orange-700" : "border-neutral-500 focus:border-neutral-0"}`}
              id="email"
              type="email"
              placeholder="example@gmail.com"
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
              Github Username
            </label>
            <input
              className="w-full h-13 px-4 rounded-xl border-2 text-lg transition text-neutral-0 border-neutral-500 bg-neutral-800 hover:bg-neutral-700 focus:border-3 focus:border-neutral-0"
              id="github"
              type="text"
              placeholder="@yourusername"
            />
          </div>
          <button
            className="w-full h-13 font-extrabold rounded-xl text-lg transition hover:cursor-pointer text-neutral-900 bg-orange-500 hover:bg-orange-700"
            type="submit"
          >
            Generate My Ticket
          </button>
        </form>
      </div>
    </section>
  );
};
