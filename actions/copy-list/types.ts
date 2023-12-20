import { z } from "zod";

import { Board } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CopyList } from "./schema";

export type InputType = z.infer<typeof CopyList>;

export type ReturnType = ActionState<InputType, Board>;
