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
import { addWishAction, getAllWishes } from "~/server/actions";

const wishSchema = z.object({
  name: z.string(),
  wish: z
    .string()
    .min(1, { message: "Wish cannot be empty." })
    .max(450, { message: "Wish must be 450 characters or less." }),
});

interface IWishProps {
  readonly guestName: string | undefined;
  readonly guestId: number | undefined;
}

export default function Wish({ guestName, guestId }: IWishProps) {
  const { data: wishes, refetch } = useServerActionQuery(getAllWishes, {
    input: {
      clientId: 4,
      eventCategory: "holy_matrimony",
    },
    queryKey: ["wishes"],
  });

  const { mutateAsync: sendWish } = useServerActionMutation(addWishAction, {
    onSuccess: () => {
      void refetch();
    },
  });

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
      name: guestName,
    });
  }, [guestName, reset]);

  const onSubmit = async (data: z.infer<typeof wishSchema>) => {
    if (!guestId) {
      toast.error("An error occured while adding wish. Guest not found.");
    }

    if (guestId) {
      await sendWish({
        guestId,
        wish: data.wish,
        clientId: 4,
        eventCategory: "holy_matrimony",
      });
    }
  };

  // Element refs for viewport-based triggers
  const titleRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const nameFieldRef = useRef<HTMLDivElement>(null);
  const wishFieldRef = useRef<HTMLDivElement>(null);
  const submitButtonRef = useRef<HTMLDivElement>(null);

  // Viewport-based animation hook - triggers when element is 5% from bottom
  const useViewportAnimation = (
    ref: React.RefObject<HTMLElement>,
    yValue = 10,
  ) => {
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end 95%"], // Animation starts when element enters viewport, completes when it's 10% from bottom
    });

    const opacityRaw = useTransform(scrollYProgress, [0, 1], [0, 1]);
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
    <div className="bg-[#F6F4F1] pb-20 text-center font-freight text-[#43423D]">
      <div className="relative pt-16">
        <motion.div>
          <motion.h1
            ref={titleRef}
            className="pb-8 font-cormorant text-[31px] text-[#333333] md:pb-12 md:text-[39px] lg:pb-16"
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
              <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-8 bg-gradient-to-r from-[#F8F8F7] to-transparent lg:w-80" />

              {/* Right Gradient Overlay */}
              <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-8 bg-gradient-to-l from-[#F8F8F7] to-transparent lg:w-80" />

              {/* Embla Carousel */}
              <div className="embla overflow-hidden px-4 pb-12" ref={emblaRef}>
                <div className="embla__container flex gap-x-[18px] px-[18px]">
                  {wishes && wishes.length > 0
                    ? [...wishes].reverse().map((wish, index) => (
                        <div
                          className="embla__slide flex h-[200px] w-[85vw] flex-col items-center justify-center rounded-sm border border-solid border-[#555555] bg-[#F6F4F1] p-6 text-center shadow md:w-[95vw] md:p-8 lg:w-[40vw] lg:p-10"
                          key={index.toString()}
                        >
                          <p className="w-full text-[12px] text-[#43423D] md:text-[14px] lg:text-[16px]">
                            {wish.wish}
                          </p>
                          <p className="mt-2 text-[12px] italic text-[#43423D] md:text-[14px] lg:text-[16px]">
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
          className="mx-auto w-[75vw] lg:w-[60vw] xl:w-[50vw]"
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
            <p className="pl-1 text-[16px] text-[#333333] md:text-[16px] lg:text-[18px]">
              from:
            </p>
            <input
              {...register("name")}
              className="mb-4 block w-full rounded-sm border bg-[#FCFCFC] p-2 text-[14px] text-muted-foreground md:text-[16px] lg:text-[18px]"
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
              <p className="pl-1 text-[16px] text-[#333333] md:text-[16px] lg:text-[18px]">
                wish:
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
            className="flex justify-center gap-6 pt-7 md:pt-8"
            style={{
              opacity: submitButton.opacity,
              y: submitButton.y,
            }}
          >
            <Button
              className="group rounded-none border-[1px] border-[#555555] bg-[#F6F4F1] px-5 py-2 hover:bg-[#FFFFFF] active:bg-[#1D1A1B]"
              type="submit"
            >
              <p className="font-cormorant text-[12px] text-[#111111] group-active:text-[#FFFFFF]">
                SEND WISH
              </p>
            </Button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
}
