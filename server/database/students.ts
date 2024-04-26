import { prisma } from "../server";
import { PersonalInfo } from "@prisma/client";

type StudentPersonal = Omit<Omit<Omit<PersonalInfo, "id">, "staffId">, "studentId">

export async function createStudent(body: { classId?: number, computerId: number, personal: StudentPersonal }) {
    const firstname = body.personal.firstname;
    const lastname = body.personal.lastname;
    if(!firstname || !lastname) return { error: "First name and last name are required" }
    
    const code = Math.floor(1000 + Math.random() * 9000);
    const username = `${firstname.slice(0,3)}${lastname.slice(0,3)}_${code}`;
    const password = Math.floor(100000 + Math.random() * 900000);


    if(body.classId) {
        return await prisma.student.create({
            data: {
                class: {
                    connect: {
                        id: body.classId
                    }
                },

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
    } else {
        return await prisma.student.create({
            data: {  
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

}

export async function getStudents(body: {}) {
    return await prisma.student.findMany({
        include: {
            personal: true
        }
    });
}