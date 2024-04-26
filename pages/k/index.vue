<script setup lang="ts">
import type { $Enums } from '@prisma/client';

const newStudent = ref<{
    dialog: boolean
    classId: number
    grade: $Enums.Grade
}>({
    dialog: false,
    classId: 0,
    grade: "VG1"
})

const classTab = ref("VG1")
const classVG1 = ref<NoServerFunctionErrors<globalThis.ServerFunctionResult<"getClass">>>()
const classVG2 = ref<NoServerFunctionErrors<globalThis.ServerFunctionResult<"getClass">>>()
const classVG3 = ref<NoServerFunctionErrors<globalThis.ServerFunctionResult<"getClass">>>()


async function createClass(grade: $Enums.Grade) {
    const newClass = await serverFunction("createClass", { grade })
    if(isServerError(newClass)) return console.error(newClass)

    if(grade === 'VG1') {
        classVG1.value = {
            id: newClass.id,
            grade: newClass.grade,
            students: [],
            teachers: []
        }
    } else if(grade === 'VG2') {
        classVG2.value = {
            id: newClass.id,
            grade: newClass.grade,
            students: [],
            teachers: []
        }
    } else if(grade === 'VG3') {
        classVG3.value = {
            id: newClass.id,
            grade: newClass.grade,
            students: [],
            teachers: []
        }
    }


}

onMounted(async () => {
    const vg1Info = await serverFunction("getClass", { grade: "VG1" })
    if(isServerError(vg1Info) || !vg1Info) return
    classVG1.value = vg1Info
})

onMounted(async () => {
    const vg2Info = await serverFunction("getClass", { grade: "VG2" })
    if(isServerError(vg2Info) || !vg2Info) return 
    classVG2.value = vg2Info
})

onMounted(async () => {
    const vg3Info = await serverFunction("getClass", { grade: "VG3" })
    if(isServerError(vg3Info) || !vg3Info) return
    classVG3.value = vg3Info
})
</script>

<template>
<div style="height: 42vh;">
    <div class="fit">
        <QTabPanels v-model="classTab" animated>
            <QTabPanel style="background-color: var(--q-dark-page);" name="VG1">
                <StudentTable v-if="classVG1 !== undefined " :rows="classVG1.students" title="VG1 Elever" @newStudent="() => {
                    newStudent.dialog = true
                    newStudent.classId = classVG1?.id!
                    newStudent.grade = 'VG1'
                }" />
                <QCard flat v-else>
                    <QCardSection class="text-center text-h4">
                        Ingen klasse ble funnet, opprett en ny
                    </QCardSection>
                    <QCardSection class="justify-center row">
                        <QBtn label="Opprett klasse" color="positive" @click="createClass('VG1')" text-color="primary" />
                    </QCardSection>
                </QCard>
            </QTabPanel>
    
            <QTabPanel style="background-color: var(--q-dark-page);" name="VG2">
                <StudentTable v-if="classVG2 !== undefined " :rows="classVG2.students" title="VG2 Elever" @newStudent="() => {
                    newStudent.dialog = true
                    newStudent.classId = classVG2?.id!
                    newStudent.grade = 'VG2'
                }" />
                <QCard flat v-else>
                    <QCardSection class="text-center text-h4">
                        Ingen klasse ble funnet, opprett en ny
                    </QCardSection>
                    <QCardSection class="justify-center row">
                        <QBtn label="Opprett klasse" color="positive" @click="createClass('VG2')" text-color="primary" />
                    </QCardSection>
                </QCard>
            </QTabPanel>
    
            <QTabPanel style="background-color: var(--q-dark-page);" name="VG3">
                <StudentTable v-if="classVG3 !== undefined " :rows="classVG3.students" title="VG3 Elever" @newStudent="() => {
                    newStudent.dialog = true
                    newStudent.classId = classVG3?.id!
                    newStudent.grade = 'VG3'
                }" />
                <QCard flat v-else>
                    <QCardSection class="text-center text-h4">
                        Ingen klasse ble funnet, opprett en ny
                    </QCardSection>
                    <QCardSection class="justify-center row">
                        <QBtn label="Opprett klasse" color="positive" @click="createClass('VG3')" text-color="primary" />
                    </QCardSection>
                </QCard>
            </QTabPanel>
        </QTabPanels>
    </div>
    <div class="full-height"></div>
    <QTabs
        v-model="classTab"
        dense
        class="text-grey"
        active-color="positive"
        indicator-color="positive"
        align="justify"
        narrow-indicator
    >
        <q-tab name="VG1" label="VG1" />
        <q-tab name="VG2" label="VG2" />
        <q-tab name="VG3" label="VG3" />
    </QTabs>
    <CreateStudent v-model="newStudent.dialog" :classId="newStudent.classId" @newStudent="(student) => {
        if(newStudent.grade === 'VG1') {
            if(classVG1 !== undefined) {
                classVG1.students.push(student)
            }
        }
        if(newStudent.grade === 'VG2') {
            if(classVG2 !== undefined) {
                classVG2.students.push(student)
            }
        }
        if(newStudent.grade === 'VG3') {
            if(classVG3 !== undefined) {
                classVG3.students.push(student)
            }
        }
        
    }" />
</div>
</template>

<style scoped lang="scss">

</style>