import { Card, List } from "@prisma/client";

export type ListWithCards = List & { cards: Card[] };
export type CardWithLists = Card & { lists: List[] };
