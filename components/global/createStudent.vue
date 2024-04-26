<script setup lang="ts">
const props = defineProps<{ classId?: number }>()
const dialog = defineModel({ default: false })
const loading = ref(false)

const emit = defineEmits<{
	newStudent: [
		student: NoServerFunctionErrors<
			globalThis.ServerFunctionResult<"createStudent">
		>
	]
}>()

async function createStudent() {
	if(!computerId.value) return
	let data = {}

	if (props.classId) {
		data = {
			classId: props.classId,
		}
	}

	
	const res = await serverFunction("createStudent", {
		personal: studentInfo.value,
		...data,
		computerId: computerId.value.value,
	})

	if (isServerError(res)) return console.error(res)
	emit("newStudent", res)
	dialog.value = false
}

const studentInfo = ref({
	firstname: null,
  	lastname: null,
	phone: null,
	address: null,
	ExtraInfo: null
})

watchEffect(() => {
	if (!dialog.value) {
		studentInfo.value = {
			firstname: null,
			lastname: null,
			phone: null,
			address: null,
			ExtraInfo: null
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
			<QCardSection>
				<QInput
					v-model="studentInfo.firstname"
					autofocus
					label="Navn"
					dense
				/>
				<QInput
					v-model="studentInfo.lastname"
					autofocus
					label="Navn"
					dense
				/>
				<QInput
					v-model="studentInfo.phone"
					label="Telefon nummer"
					dense
				/>
				<QInput v-model="studentInfo.address" label="Adresse" dense />
				<QInput v-model="studentInfo.ExtraInfo" label="Notat" dense />
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
					@click="createStudent"
					:loading="loading"
				/>
			</QCardActions>
		</QCard>
	</QDialog>
</template>

<style scoped lang="scss"></style>
