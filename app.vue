<script setup lang="ts">
const route = useRoute()

const breadcrumps = computed(() => {
  const pathList = route.fullPath.split("/").filter(Boolean)

  return pathList.map((path) => {
    if (path == "t") return { path: "Lærere", name: path }
    if (path == "k") return { path: "Klasser", name: path }
    if (path == "e") return { path: "Elever", name: path }


    return { path, name: path }
  })
})
</script>

<template>
  <QLayout view="lHh lpR lFf">
    <QHeader show-if-above elevated>
      <div style="height: 82px;" class="row items-end q-pb-sm q-pl-sm">
        <QBreadcrumbs active-color="white" separator=">">
          <QBreadcrumbsEl label="Home" icon="home" to="/" />
          <QBreadcrumbsEl
            v-for="item in breadcrumps"
            :label="item.path[0].toUpperCase() + item.path.slice(1)"
            :to="{ name: item.name }"
          />
        </QBreadcrumbs>
      </div>
    </QHeader>

    <QDrawer show-if-above side="left" behavior="desktop" elevated>
      <div class="q-pa-md text-h3">Nydalenvgs</div>
      <QList separator>
        <QItem  active-class="text-positive" to="/t" clickable v-ripple>
          <QItemSection>
            <QItemLabel>Lærere</QItemLabel>
            <QItemLabel caption>
              <QIcon name="person_add"/>
              <QIcon name="edit"/>
              <QIcon name="delete"/>
            </QItemLabel>
          </QItemSection>
        </QItem>
        <QItem active-class="text-positive" to="/k" clickable v-ripple>
          <QItemSection>
            <QItemLabel>Klasser</QItemLabel>
            <QItemLabel caption>
              <QIcon name="group_add"/>
              <QIcon name="edit"/>
              <QIcon name="delete"/>
            </QItemLabel>
          </QItemSection>
        </QItem>
        <QItem active-class="text-positive" to="/e" clickable v-ripple>
          <QItemSection>
            <QItemLabel overline>Alle uorganisert</QItemLabel>
            <QItemLabel>Elever</QItemLabel>
            <QItemLabel caption>
              <QIcon name="person_add"/>
              <QIcon name="edit"/>
              <QIcon name="delete"/>
            </QItemLabel>
          </QItemSection>
        </QItem>
        <QItem active-class="text-positive" to="/c" clickable v-ripple>
          <QItemSection>
            <QItemLabel>Datamaskiner</QItemLabel>
            <QItemLabel caption>
              <QIcon name="person_add"/>
              <QIcon name="edit"/>
              <QIcon name="delete"/>
            </QItemLabel>
          </QItemSection>
        </QItem>
      </QList>
    </QDrawer>

    <QPageContainer >
      <NuxtPage />
    </QPageContainer>
  </QLayout>
</template>
