'use server';

import { and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { createServerAction } from 'zsa';
import { db } from '~/server/db';
import { clients, events, eventsToGuests, anonymousWishes } from '~/server/db/schema';

export const addWishAction = createServerAction()
  .input(
    z.object({
      clientId: z.number(),
      guestId: z.number(),
      wish: z.string(),
      eventCategory: z.enum([
        "reception",
        "holy_matrimony",
        "engagement",
        "ceremony",
        "party",
        "meeting",
        "conference",
        "other",
      ]),
    })
  )
  .handler(async ({ input }) => {
    // Find the eventId for this client and eventCategory
    const event = await db.query.events.findFirst({
      where: and(
        eq(events.clientId, input.clientId),
        eq(events.eventCategory, input.eventCategory)
      ),
    });
    if (!event) {
      throw new Error('Event not found for this client and category.');
    }
    // Find the eventsToGuests row for this guest in this event
    const e2g = await db.query.eventsToGuests.findFirst({
      where: and(
        eq(eventsToGuests.eventId, event.id),
        eq(eventsToGuests.guestId, input.guestId)
      ),
    });
    if (!e2g) {
      throw new Error('Guest not found in this event.');
    }
    await db
      .update(eventsToGuests)
      .set({ wish: input.wish })
      .where(
        and(
          eq(eventsToGuests.eventId, event.id),
          eq(eventsToGuests.guestId, input.guestId)
        )
      );
  });

export const getGuestNameByIdAction = createServerAction()
  .input(
    z.object({
      clientId: z.number(),
      guestId: z.number(),
    })
  )
  .handler(async ({ input }) => {
    const client = await db.query.clients.findFirst({
      where: eq(clients.id, input.clientId),
      with: {
        events: {
          with: {
            eventsToGuests: {
              with: {
                guest: true,
              },
            },
          },
        },
      },
    });

    const guest = client?.events
      .flatMap((event) => event.eventsToGuests.flatMap((e2g) => e2g.guest))
      .find((g) => g.id === input.guestId);
    return guest?.names;
  });

export const getAllWishes = createServerAction()
  .input(
    z.object({
      clientId: z.number(),
      eventCategory: z.enum([
        "reception",
        "holy_matrimony",
      ]),
    })
  )
  .handler(async ({ input }) => {
    // Find the eventId for this client and eventCategory
    const event = await db.query.events.findFirst({
      where: and(
        eq(events.clientId, input.clientId),
        eq(events.eventCategory, input.eventCategory)
      ),
      with: {
        eventsToGuests: {
          with: {
            guest: true,
          },
        },
      },
    });
    if (!event) {
      return [];
    }
    const allWishes = event.eventsToGuests
      .map((e2g) => ({
        guestId: e2g.guestId,
        wish: e2g.wish,
        name: e2g.guest.names,
      }))
      .filter(
        (
          item
        ): item is {
          guestId: number;
          wish: string;
          name: string;
        } => Boolean(item.wish)
      );
    const uniqueWishes = [
      ...new Map(allWishes.map((item) => [item.guestId, item])).values(),
    ];
    return uniqueWishes.map(({ wish, name }) => ({ wish, name }));
  });

// Anonymous Wishes Actions
export const addAnonymousWishAction = createServerAction()
  .input(
    z.object({
      clientId: z.number(),
      eventCategory: z.enum([
        "holy_matrimony",
        "reception",
        "engagement",
        "ceremony",
        "party",
        "meeting",
        "conference",
        "other",
      ]),
      name: z.string().min(1, "Name is required"),
      wish: z.string().min(1, "Wish is required"),
    })
  )
  .handler(async ({ input }) => {
    await db.insert(anonymousWishes).values({
      clientId: input.clientId,
      eventCategory: input.eventCategory,
      name: input.name,
      wish: input.wish,
    });
  });

export const getAllAnonymousWishes = createServerAction()
  .input(
    z.object({
      clientId: z.number(),
      eventCategory: z.enum([
        "reception",
        "holy_matrimony",
      ]),
    })
  )
  .handler(async ({ input }) => {
    const wishes = await db.query.anonymousWishes.findMany({
      where: and(
        eq(anonymousWishes.clientId, input.clientId),
        eq(anonymousWishes.eventCategory, input.eventCategory)
      ),
      orderBy: (anonymousWishes, { desc }) => [desc(anonymousWishes.createdAt)],
    });
    return wishes.map(({ wish, name }) => ({ wish, name }));
  });
