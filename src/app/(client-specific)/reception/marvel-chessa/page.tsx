"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Homepage from "./homepage/page";
import Intro from "./intro/page";
import Lovestory from "./lovestory/page";
import Thewedding from "./thewedding/page";
import Dresscode from "./dresscode/page";
import Travel from "./travel/page";
import PhotoAlbum from "./photoalbum/page";
import Baliguide from "./baliguide/page";
import PhotoAlbum2 from "./photoalbum2/page";
import Gifts from "./gift/page";
import Wish from "./letters/wish";
import FAQ from "./faq/page";
import Outro from "./outro/page";
import Footer from "./footer/page";

import { useServerActionQuery } from "~/lib/hooks/server-action-hooks";
import { getGuestNameByIdAction } from "~/server/actions";

export default function Page() {
  return (
    <Suspense>
      <PageContent />
    </Suspense>
  );
}

function PageContent() {
  const searchParams = useSearchParams();
  const guestId = Number.parseInt(searchParams.get("guestId") as string, 10);

  const { data: guestName } = useServerActionQuery(getGuestNameByIdAction, {
    input: {
      clientId: 13,
      guestId,
    },
    queryKey: ["guest-name"],
  });

  return (
    <div>
      <Homepage />
      <Intro />
      <section id="our-story">
        <Lovestory />
      </section>
      <section id="the-wedding">
        <Thewedding />
      </section>
      <section id="dresscode">
        <Dresscode />
      </section>
      <Travel />
      <PhotoAlbum />
      <section id="bali-guide">
        <Baliguide />
      </section>
      <PhotoAlbum2 />
      <section id="love-gifts">
        <Gifts />
      </section>
      <Wish guestName={guestName} />
      <section id="faq">
        <FAQ />
      </section>
      <Outro />
      <Footer />
    </div>
  );
}
