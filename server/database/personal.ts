import { prisma } from "../server";
import { PersonalInfo } from "@prisma/client";

type Personal = {
    firstname?: string;
    lastname?: string;
    phone?: string
    address?: string
    ExtraInfo?: string
}

export async function updatePersonal(body: { id: number, personal: Personal }) {    
    return prisma.personalInfo.update({
        where: {
            id: body.id
        },

        data: body.personal
    })
}