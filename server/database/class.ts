import { prisma } from "../server";
import { Grade } from "@prisma/client";


export async function createClass(body: { grade: Grade  }) {
    return await prisma.class.create({
        data: {
            grade: body.grade,
        },
    });
}

export async function getClass(body: { grade: Grade  }) {
    const classInfo =  await prisma.class.findFirst({
        where: {
            grade: body.grade,
        },
        include: {
            students: {
                include: {
                    personal: true,
                }
            },
            teachers: {
                include: {
                    personal: true,
                }
            },
        }
    });

    if(!classInfo) return null

    return classInfo;
}

