import { Computers } from "@prisma/client";
import { prisma } from "../server";

type PersonalComputer = Omit<Omit<Computers, "id">, "personalId">


export async function getUnUsedComputers(body: {}) {
    return await prisma.computers.findMany({
        where: {
            personalId: null
        }
    });
}

export async function getComputers(body: {}) {
    return await prisma.computers.findMany({});
}

export async function createComputer(body: PersonalComputer) {
    return await prisma.computers.create({
        data: body
    });
}