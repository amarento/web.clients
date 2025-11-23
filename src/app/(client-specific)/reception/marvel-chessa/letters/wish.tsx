"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import AutoHeight from "embla-carousel-auto-height";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  useServerActionMutation,
  useServerActionQuery,
} from "~/lib/hooks/server-action-hooks";
import {
  addAnonymousWishAction,
  getAllAnonymousWishes,
} from "~/server/actions";

const wishSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  wish: z
    .string()
    .min(1, { message: "Wish cannot be empty." })
    .max(450, { message: "Wish must be 450 characters or less." }),
});

interface IWishProps {
  readonly guestName?: string;
}

export default function Wish({ guestName }: IWishProps) {
  const { data: wishes, refetch } = useServerActionQuery(
    getAllAnonymousWishes,
    {
      input: {
        clientId: 13,
        eventCategory: "reception",
      },
      queryKey: ["anonymous-wishes"],
    },
  );

  const { mutateAsync: sendWish } = useServerActionMutation(
    addAnonymousWishAction,
    {
      onSuccess: () => {
        void refetch();
      },
    },
  );

  // Embla Carousel setup with autoplay and auto height
  const autoplayPlugin = Autoplay({ delay: 10_000, stopOnInteraction: false });
  const autoHeightPlugin = AutoHeight();
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
      containScroll: "trimSnaps",
    },
    [autoplayPlugin, autoHeightPlugin],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(wishSchema),
    defaultValues: {
      name: guestName ?? "",
      wish: "",
    },
  });

  const wishValue = watch("wish");
  const characterCount = wishValue ? wishValue.length : 0;

  React.useEffect(() => {
    reset({
      name: guestName ?? "",
      wish: "",
    });
  }, [guestName, reset]);

  const onSubmit = async (data: z.infer<typeof wishSchema>) => {
    try {
      await sendWish({
        name: data.name,
        wish: data.wish,
        clientId: 13,
        eventCategory: "reception",
      });

      // Clear the wish field after successful submission
      reset({
        name: "",
        wish: "",
      });

      toast.success("Thank you for your kind wish!");
    } catch (error) {
      toast.error("Failed to send wish. Please try again.");
    }
  };

  // Element refs for viewport-based triggers
  const titleRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const nameFieldRef = useRef<HTMLDivElement>(null);
  const wishFieldRef = useRef<HTMLDivElement>(null);
  const submitButtonRef = useRef<HTMLDivElement>(null);

  // Viewport-based animation hook
  const useViewportAnimation = (
    ref: React.RefObject<HTMLElement>,
    yValue = 10,
  ) => {
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end end"],
    });

    const opacityRaw = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
    const yRaw = useTransform(scrollYProgress, [0, 1], [yValue, 0]);

    return {
      opacity: useSpring(opacityRaw, { stiffness: 120, damping: 25, mass: 1 }),
      y: useSpring(yRaw, { stiffness: 100, damping: 20, mass: 1 }),
    };
  };

  // All animations with viewport-based triggers
  const title = useViewportAnimation(titleRef);
  const carousel = useViewportAnimation(carouselRef);
  const form = useViewportAnimation(formRef);
  const nameField = useViewportAnimation(nameFieldRef);
  const wishField = useViewportAnimation(wishFieldRef);
  const submitButton = useViewportAnimation(submitButtonRef);

  return (
    <div className="bg-[#F6F4F1] pb-16 text-center font-freight text-[#43423D]">
      <div className="relative pt-16">
        <motion.div>
          <motion.h1
            ref={titleRef}
            className="pb-8 font-cormorant text-[31px] text-[#333333] md:pb-12 md:text-[39px] lg:pb-16 2xl:text-[49px]"
            style={{
              opacity: title.opacity,
              y: title.y,
            }}
          >
            LOVE LETTERS
          </motion.h1>

          {/* Carousel Container with Gradients */}
          <motion.div
            ref={carouselRef}
            style={{
              opacity: carousel.opacity,
              y: carousel.y,
            }}
          >
            <div className="relative">
              {/* Left Gradient Overlay */}
              <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-8 lg:w-80" />

              {/* Right Gradient Overlay */}
              <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-8 lg:w-80" />

              {/* Embla Carousel */}
              <div className="embla overflow-hidden px-4 pb-12" ref={emblaRef}>
                <div className="embla__container flex gap-x-[18px] px-[18px]">
                  {wishes && wishes.length > 0
                    ? [...wishes].reverse().map((wish, index) => (
                        <div
                          className="embla__slide flex h-[210px] w-[85vw] flex-col items-center justify-center rounded-sm border border-solid border-[#555555] bg-[#F6F4F1] p-6 text-center shadow md:h-[300px] md:w-[80vw] md:p-12 lg:h-[350px] lg:w-[65vw] lg:p-14 xl:h-[400px] xl:p-16"
                          key={index.toString()}
                        >
                          <p className="overflow-wrap-anywhere w-full break-words text-[12px] leading-relaxed text-[#43423D] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[25px]">
                            {wish.wish}
                          </p>
                          <p className="mt-2 text-[12px] italic text-[#43423D] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
                            – {wish.name}
                          </p>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <motion.div className="relative">
        <motion.form
          ref={formRef}
          className="mx-auto w-[75%] lg:w-[60%] xl:w-[45%] 2xl:w-[35%]"
          onSubmit={handleSubmit(onSubmit)}
          style={{
            opacity: form.opacity,
            y: form.y,
          }}
        >
          <motion.div
            ref={nameFieldRef}
            className="text-left"
            style={{
              opacity: nameField.opacity,
              y: nameField.y,
            }}
          >
            <p className="pl-1 font-cormorant text-[11px] text-[#333333] md:text-[12px] lg:text-[14px] 2xl:text-[16px]">
              FROM:
            </p>
            <input
              {...register("name")}
              className="mb-4 block w-full rounded-sm border bg-[#FCFCFC] p-2 text-[14px] text-muted-foreground md:mb-6 md:text-[16px] lg:text-[18px] 2xl:text-[20px]"
              placeholder="Your name"
              disabled={!!guestName}
            />
          </motion.div>

          <motion.div
            ref={wishFieldRef}
            className="text-left"
            style={{
              opacity: wishField.opacity,
              y: wishField.y,
            }}
          >
            <div className="flex items-center justify-between">
              <p className="pl-1 font-cormorant text-[11px] text-[#333333] md:text-[12px] lg:text-[14px] 2xl:text-[16px]">
                WISH:
              </p>
              <p
                className={`text-[12px] md:text-[14px] lg:text-[16px] ${
                  characterCount > 450 ? "text-red-500" : "text-gray-500"
                }`}
              >
                {characterCount}/450 characters
              </p>
            </div>
            <textarea
              {...register("wish")}
              className="block h-32 w-full resize-none rounded-sm border bg-[#FCFCFC] p-3 text-[12px] placeholder:text-left placeholder:align-top md:text-[14px] lg:text-[16px]"
              placeholder="Type Your Wishes"
            />
            {errors.wish && (
              <p className="text-red-500">{errors.wish.message}</p>
            )}
          </motion.div>

          <motion.div
            ref={submitButtonRef}
            className="flex justify-center gap-6 pt-8 md:pt-10"
            style={{
              opacity: submitButton.opacity,
              y: submitButton.y,
            }}
          >
            <Button
              className="active:scale-98 group rounded-none border-[1px] border-[#555555] bg-[#F6F4F1] px-5 py-2 transition-all duration-200 ease-out hover:bg-[#FFFFFF] active:bg-[#1D1A1B] lg:px-6 lg:py-3"
              type="submit"
            >
              <p className="font-cormorant text-[12px] text-[#111111] transition-colors duration-200 group-active:text-[#FFFFFF] lg:text-[14px]">
                SEND WISH
              </p>
            </Button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
}
