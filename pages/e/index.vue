<script setup lang="ts">
const students = ref<NoServerFunctionErrors<globalThis.ServerFunctionResult<"createStudent">[]>>([])
const newStudent = ref(false)

onMounted(async () => {
    const studentInfo = await serverFunction("getStudents", {})
    if(isServerError(studentInfo)) return console.error(studentInfo)
    students.value = studentInfo
})
</script>

<template>
<div class="q-pa-md">
    <StudentTable :rows="students" title="Alle elever" @newStudent="() => {
        newStudent = true
    }" />

    <CreateStudent 
        v-model="newStudent"
        @newStudent="student => {
            students.push(student)
        }"
    />
</div>
</template>

<style scoped lang="scss">

</style>