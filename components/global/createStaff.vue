<script setup lang="ts">
import { Roles } from '@prisma/client';

const dialog = defineModel({ default: false })
const loading = ref(false)

const emit = defineEmits<{
	newStudent: [
		student: NoServerFunctionErrors<
			globalThis.ServerFunctionResult<"createStaff">
		>
	]
}>()

async function createStaff() {
	if(!computerId.value) return

	const res = await serverFunction("createStaff", {
		role: role.value,
		computerId: computerId.value.value,
		personal: staffInfo.value
	})

	if (isServerError(res)) return console.error(res)
	emit("newStudent", res)
	dialog.value = false
}


const roles = ref(["LERER", "MILJOFAGARBEIDER", "ADMIN", "IT"])
const role = ref<Roles>("LERER")
const staffInfo = ref({
	firstname: null,
  	lastname: null,
	phone: null,
	address: null,
	ExtraInfo: null
})

watchEffect(() => {
	if (!dialog.value) {
		staffInfo.value = {
			firstname: null,
			lastname: null,
			phone: null,
			address: null,
			ExtraInfo: null,
		}
	}
})

const fullComputerList = ref<{label:string, value: number}[]>([])
const computerList = ref<{label:string, value: number}[]>([])
const computerId = ref<{label:string, value: number}>()

onMounted(async () => {
	const computerInfo = await serverFunction("getUnUsedComputers", {})
	if (isServerError(computerInfo)) return console.error(computerInfo)
	const selectList = computerInfo.map((v) => ({
		label: `${v.pcId} - ${v.pcModel}`,
		value: v.id,
	}))
	
	fullComputerList.value = selectList
	computerList.value = selectList
})
</script>

<template>
	<QDialog v-model="dialog" persistent>
		<QCard class="column">
			<QCardSection class="text-white text-h4"
				>Opprett ny Elev</QCardSection
			>
			<QCardSection>
				<QInput
					v-model="staffInfo.firstname"
					autofocus
					label="Navn"
					dense
				/>
				<QInput
					v-model="staffInfo.lastname"
					autofocus
					label="Navn"
					dense
				/>
				<QInput
					v-model="staffInfo.phone"
					label="Telefon nummer"
					dense
				/>
				<QInput v-model="staffInfo.address" label="Adresse" dense />
				<QInput v-model="staffInfo.ExtraInfo" label="Notat" dense />
				<QSelect v-model="role" :options="roles" label="Standard" />
				<QSelect
					v-model="computerId"
					use-input
					input-debounce="0"
					label="Datamaskin"
					:options="computerList"
					@filter="(val:string, update:any) => {
						if(val === '') {
							update(() => {computerList = fullComputerList})
							return
						}
						update(() => {
							const needle = val.toLowerCase()
							computerList = fullComputerList.filter(v => {
								return v.label.toLowerCase().indexOf(needle) > -1
							})
						})
						
					}"
				/>
			</QCardSection>
			<QCardActions class="justify-between">
				<QBtn
					:loading="loading"
					label="Avbryt"
					color="negative"
					@click="dialog = false"
				/>
				<QBtn
					label="Opprett Elev"
					color="positive"
					@click="createStaff"
					:loading="loading"
				/>
			</QCardActions>
		</QCard>
	</QDialog>
</template>

<style scoped lang="scss"></style>
