<script setup lang="ts">
import type { PersonalInfo, Staff } from '@prisma/client';

type StuffRow = Staff & { personal: PersonalInfo | null }

defineEmits<{
    newStaff: []
}>()

const prop = defineProps<{
  rows: StuffRow[]
  title: string
}>()

const columns = [
  { name: 'first', align: 'center', label: 'Fornavn', field: 'first' },
  { name: 'last', align: 'center', label: 'Etternavn', field: 'last' },
  { name: 'phone', align: 'center', label: 'Telefon nummer', field: 'phone' },
  { name: 'address', align: 'center', label: 'Adresse', field: 'address' },
  { name: 'extraInfo', align: 'center', label: 'Notat', field: 'ExtraInfo' },
  { name: 'jobTitle', align: 'center', label: 'Job', field: 'jobTitle' },
  { name: 'username', align: 'right', label: 'Bruker navn', field: 'username' },
  { name: 'password', align: 'right', label: 'Passord', field: 'password' },
]

const realRows = computed(() => prop.rows)
</script>

<template>
<QTable
    :rows="realRows"
    :columns="columns"
    :title="title"
    :rows-per-page-options="[ 7, 10, 15, 20, 25, 50, 0 ]"
    row-key="name"
>
    <template v-slot:body="props">
        <QTr :props="props">
            <QTd key="first" :props="props" >
                {{ props.row.personal.firstname }}
                <QPopupEdit v-model="props.row.personal.firstname" buttons title="Endre navn" label-set="Lagre" label-cancel="Avbryt" color="white" v-slot="scope" @save="(val: string) => {
                    serverFunction('updatePersonal', { id: props.row.personal.id, personal: { firstname: val } })
                }">
                    <QInput v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                </QPopupEdit>
            </QTd>
            <QTd key="last" :props="props" >
                {{ props.row.personal.lastname }}
                <QPopupEdit v-model="props.row.personal.lastname" buttons title="Endre navn" label-set="Lagre" label-cancel="Avbryt" color="white" v-slot="scope" @save="(val: string) => {
                    serverFunction('updatePersonal', { id: props.row.personal.id, personal: { lastname: val } })
                }">
                    <QInput v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                </QPopupEdit>
            </QTd>
            <QTd key="phone" :props="props">
                {{ props.row.personal.phone }}
                <QPopupEdit v-model="props.row.personal.phone" buttons title="Endre Telefon nummer" label-set="Lagre" label-cancel="Avbryt" color="white" v-slot="scope" @save="(val: string) => {
                    serverFunction('updatePersonal', { id: props.row.personal.id, personal: { phone: val } })
                }">
                    <QInput v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                </QPopupEdit>
            </QTd>
            <QTd key="address" :props="props">
                {{ props.row.personal.address }}
                <QPopupEdit v-model="props.row.personal.address" buttons title="Endre Adresse" label-set="Lagre" label-cancel="Avbryt" color="white" v-slot="scope" @save="(val: string) => {
                    serverFunction('updatePersonal', { id: props.row.personal.id, personal: { address: val } })
                }">
                    <QInput v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                </QPopupEdit>
            </QTd>
            <QTd key="extraInfo" :props="props">
                {{ props.row.personal.ExtraInfo }}
                <QPopupEdit v-model="props.row.personal.ExtraInfo" buttons title="Endre Notat" label-set="Lagre" label-cancel="Avbryt" color="white" v-slot="scope" @save="(val: string) => {
                    serverFunction('updatePersonal', { id: props.row.personal.id, personal: { ExtraInfo: val } })
                }">
                    <QInput v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                </QPopupEdit>
            </QTd>
            <QTd key="jobTitle" :props="props">
                {{ props.row.role }}
            </QTd>
            <QTd key="username" :props="props">
                {{ props.row.username }}
            </QTd>
            <QTd key="password" :props="props">
                {{ props.row.password }}
            </QTd>
        </QTr>
    </template>

    <template #top-right>
        <QBtn label="Ny ansatt" @click="$emit('newStaff')"/>
    </template>
</QTable>
</template>