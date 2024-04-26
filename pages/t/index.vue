<script setup lang="ts">
const staffDialog = ref(false)


const staff = ref<NoServerFunctionErrors<ServerFunctionResult<"getStaff">>>([])

onMounted(async () => {
    const staffRes = await serverFunction("getStaff", {})
    if (isServerError(staffRes)) return console.error(staffRes)
    staff.value = staffRes
    console.log(staffRes)
})
</script>

<template>
<div class="q-pa-md">
    <StaffTable title="Ansatte" :rows="staff" @newStaff="staffDialog = true"/>
    <CreateStaff v-model="staffDialog" />
</div>
</template>

<style scoped lang="scss">

</style>