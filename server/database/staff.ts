import { PersonalInfo, Roles, Computers } from "@prisma/client";
import { prisma } from "../server";

type StudentPersonal = Omit<Omit<Omit<PersonalInfo, "id">, "staffId">, "studentId">

export async function createStaff(body: { role: Roles, personal: StudentPersonal, computerId: number}) {
    const firstname = body.personal.firstname;
    const lastname = body.personal.lastname;
    if(!firstname || !lastname) return { error: "First name and last name are required" }
    
    const code = Math.floor(1000 + Math.random() * 9000);
    const username = `${firstname.slice(0,3)}${lastname.slice(0,3)}_${code}`;
    const password = Math.floor(100000 + Math.random() * 900000);

    return await prisma.staff.create({
        data: {
            role: "ADMIN",
            username,
            password: password.toString(),
            personal: {
                create: {
                    ...body.personal,
                    computer: {
                        connect: {
                            id: body.computerId
                        }
                    }
                }
            }
        },

        include: {
            personal: true
        }
    });
}

export async function getStaff(body: {}) {
    return await prisma.staff.findMany({
        include: {
            personal: true
        }
    });
}