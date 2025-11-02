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
import Gifts from "./gift/page";
import Wish from "./letters/wish";
import Contact from "./contact/page";
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
  // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
  const guestId = Number.parseInt(searchParams.get("guestId") as string, 10);

  const { data: guestName } = useServerActionQuery(getGuestNameByIdAction, {
    input: {
      clientId: 4,
      guestId,
    },
    queryKey: ["guest-name"],
  });

  return (
    <div>
      <Homepage />
      <Intro />
      <Lovestory />
      <Thewedding />
      <Dresscode />
      <Travel />
      <PhotoAlbum />
      <Baliguide />
      <Gifts />
      <Wish guestId={guestId} guestName={guestName} />
      <Contact />
      <Outro />
      <Footer />
    </div>
  );
}
