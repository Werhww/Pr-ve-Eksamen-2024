<script setup lang="ts">
const columns = [
	{ name: "id", align: "center", label: "Serial", field: "id" },
	{ name: "model", align: "center", label: "Model", field: "model" },
	{ name: "age", align: "center", label: "Alder", field: "age" },
]

const realRows = ref<NoServerFunctionErrors<ServerFunctionResult<"createComputer">[]>>([])

const dialog = ref(false)
const newComputer = ref({
	pcId: "",
	pcModel: "",
	pcAge: "",
})

async function createComputer() {
    const res = await serverFunction("createComputer", newComputer.value)
    if (isServerError(res)) return console.error(res)
    realRows.value.push(res)
	dialog.value = false
}

onMounted(async () => {
    const computerInfo = await serverFunction("getComputers", {})
    if (isServerError(computerInfo)) return console.error(computerInfo)
    realRows.value = computerInfo
})
</script>

<template>
	<div class="q-pa-md">
		<QTable
			:rows="realRows"
			:columns="columns"
			title="Computers"
			:rows-per-page-options="[10, 15, 20, 25, 50, 0]"
			row-key="name"
		>
			<template v-slot:body="props">
				<QTr :props="props">
					<QTd key="id" :props="props">
						{{ props.row.pcId }}
					</QTd>
					<QTd key="model" :props="props">
						{{ props.row.pcModel }}
					</QTd>
					<QTd key="age" :props="props">
						{{ props.row.pcAge }}
					</QTd>
				</QTr>
			</template>

			<template #top-right>
				<QBtn label="Ny Datamaskin" @click="dialog = true" />
			</template>
		</QTable>
	</div>
	<QDialog v-model="dialog" persistent>
		<QCard class="column">
			<QCardSection class="text-white text-h4"
				>Opprett ny Elev</QCardSection
			>
			<QCardSection>
				<QInput v-model="newComputer.pcId" autofocus label="Id" dense />
				<QInput
					v-model="newComputer.pcModel"
					autofocus
					label="Model"
					dense
				/>
				<QInput v-model="newComputer.pcAge" label="Alder" dense />
			</QCardSection>
			<QCardActions class="justify-between">
				<QBtn label="Avbryt" color="negative" @click="dialog = false" />
				<QBtn
					label="Opprett Elev"
					color="positive"
					@click="createComputer"
				/>
			</QCardActions>
		</QCard>
	</QDialog>
</template>
