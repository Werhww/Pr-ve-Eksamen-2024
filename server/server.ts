import { PrismaClient } from "@prisma/client"

import * as students_ from "./database/students"
import * as personal_ from "./database/personal"
import * as class_ from "./database/class"
import * as staff_ from "./database/staff"
import * as computers_ from "./database/computers"

export const prisma = new PrismaClient()

export const functions = { ...students_, ...personal_, ...class_, ...staff_, ...computers_  }

export type Functions = typeof functions
export type FunctionNames = keyof Functions 