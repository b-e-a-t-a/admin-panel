<template>
  <div class="Table" :class="[className, theme]">
    <table id="exportTable">
      <thead class="Table__head">
        <tr class="Table__row Table__row--head">
          <th
            v-for="(label, key) in headings"
            :key="key"
            class="Table__heading"
            :class="[`_${label.key}`, { isRowSortable: label.isRowSortable }]"
            @click="label.isRowSortable && sort(label.key)"
          >
            <span class="Table__heading-name">
              <slot name="heading" :heading="{ key, label }">
                {{ label.name }}
              </slot>
            </span>
            <span
              v-if="
                label.key !== 'actions' &&
                  label.isRowSortable &&
                  sortBy &&
                  sortBy.key == label.key &&
                  sortBy.direction == 'desc'
              "
            >
              <i class="fas fa-sort-down"></i>
            </span>
            <span
              v-else-if="
                label.key !== 'actions' &&
                  label.isRowSortable &&
                  sortBy &&
                  sortBy.key == label.key &&
                  sortBy.direction == 'asc'
              "
            >
              <i class="fas fa-sort-up"></i>
            </span>
            <span v-else-if="label.key !== 'actions' && label.isRowSortable">
              <i class="fas fa-sort"></i>
            </span>
          </th>
        </tr>
      </thead>
      <tbody class="">
        <tr v-if="isRowSearchable" class="Table__row isRowSearchable">
          <td
            v-for="(q, key) in queries"
            :key="'query-' + key"
            class="Table__cell"
            :class="[`_${key}`]"
          >
            <search
              v-if="q.searchable"
              v-model:searchText="q.searchText"
              :placeholder="q.placeholder"
              :maxlen="q.maxlen"
            />
          </td>
        </tr>
        <tr
          v-for="(d, i) in data"
          :key="'row-' + i"
          class="Table__row"
          :class="{
            selectable: isSelected,
            selected: isSelected && isSelected(d),
            active: isActive(d)
          }"
          @click="$emit('row-click', d)"
          @dblclick="$emit('double-row-click', d)"
        >
          <td
            v-for="(label, key) in headings"
            :key="'cell-' + key"
            class="Table__cell"
            :class="[`_${label.key}`, { selectable: isSelected }]"
          >
            <div
              v-if="isSelected && key == firstColumn"
              class="Table__checkbox"
            >
              <input
                type="checkbox"
                :checked="isSelected && isSelected(d)"
                @change="$emit('select-row', d)"
                @click.stop
              />
            </div>

            <div class="responsive">{{ label.name }}</div>

            <slot name="cell" :data="d" :i="i" :heading="key">
              {{ d[key] || d[label] }}
            </slot>
            <div
              v-if="actionsInRow(d).length && key == lastColumn"
              class="Table__rowActions"
            >
              <button
                v-for="(button, j) in buttonsInRow(d)"
                :key="'button' + j"
                class="btn-icon"
                :class="button.class"
                @click.stop="button.fn && button.fn(d)"
              >
                {{ button.name }}
              </button>
              <button
                v-for="(action, j) in actionsInRow(d)"
                :key="'action' + j"
                class="Table__rowAction btn-standard btn-default-medium btn-primary-dark"
                :class="[
                  action.class,
                  {
                    disabled:
                      (action.name == 'delete' || action.name == 'edit') &&
                      d.deletedAt
                  },
                  { hidden: d.isActive == 'no' && action.name == 'unlock' }
                ]"
                @click.stop="action.fn && action.fn(d)"
              >
                <i :class="action.icon"></i>
                <span v-if="action.tooltip" class="Table__rowAction-tooltip">
                  {{ action.tooltip }}
                </span>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Search from "theme/Search";

export default {
  name: "Table",
  components: {
    Search
  },
  props: {
    className: Object,
    theme: String,
    headings: Array,
    isRowSortable: Boolean,
    sortable: {
      type: Boolean,
      default() {
        return false;
      }
    },
    sortBy: {
      type: Object,
      default() {
        return {};
      }
    },
    data: Array,
    isSelected: Function,
    isActive: {
      type: Function,
      default() {
        return false;
      }
    },
    actions: {
      type: Array,
      default() {
        return [];
      }
    },
    buttons: {
      type: Array,
      default() {
        return [];
      }
    },
    hover: Boolean,
    isRowSearchable: Boolean,
    searchable: {
      type: Boolean,
      default() {
        return false;
      }
    },
    queries: {
      type: Array,
      default() {
        return [];
      }
    },
    placeholder: String,
    maxlen: Number
  },
  computed: {
    firstColumn() {
      return Object.keys(this.headings)[0];
    },
    lastColumn() {
      const keys = Object.keys(this.headings);
      return keys[keys.length - 1];
    }
  },
  methods: {
    sort(heading) {
      const direction =
        this.sortBy.key == heading
          ? this.sortBy.direction == "asc"
            ? "desc"
            : "asc"
          : "asc";
      const key = heading;
      this.$emit("update:sortBy", { direction, key });
    },
    buttonsInRow(d) {
      return this.buttons.filter(b => !b.hidden || !b.hidden(d));
    },
    actionsInRow(d) {
      return this.actions.filter(a => !a.hidden || !a.hidden(d));
    }
  }
};
</script>

<style lang="sass" scoped>
@import './Table'
</style>
