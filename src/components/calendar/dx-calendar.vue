<template>
	<!-- 两列排列 -->
    <div class="dx-calendar">
    	<div class="dx-calendar__select">
    		<span 
                @click="preYear()"
            >
                <i class="icon iconfont dx-arrow-left-double"></i>
            </span>
            <span 
                class="dx-calendar__select--left"
                @click="preMonth()"
            > <i class="icon iconfont dx-prev"></i> </span>
            <span class="dx-calendar__select--input">
                <input 
                    v-model="year"
                    readonly="readonly" 
                />
                <input 
                    v-model="month"
                    readonly="readonly" 
                />
            </span>
           
            <span 
                class="dx-calendar__select--right"
                 @click="nextMonth()"
            > <i class="icon iconfont dx-next"></i> </span>
           <span 
                class="dx-calendar__select--right"
                 @click="nextYear()"
            > <i class="icon iconfont dx-arrow-right-double"></i> </span>
    	</div>
    	<div>
    		<table class="dx-calendar__content-table" width="100%">
                <thead>
                    <th v-for="weekDay in weekDays">{{weekDay}}</th>
                </thead>
                <tbody>
                    <tr class="dx-calendar__content-table--blanking"></tr>
                    <tr 
                        v-for="row in rows"
                        :key="row"
                    >
                        <td 
                            v-for="column in 7"
                            :key="column"
                            :class="{
                                    'is-today': today(row, column), 
                                     'is-curent-month': isCurrentMonth(row, column)}"
                            class="dx-calendar__content-table--td"
                        >
                            <slot
                                :date="store[(row - 1) * 7 + column - 1]" 
                                :today="dateStore.day"> 
                                {{ store[(row - 1) * 7 + column - 1] }}
                            </slot>
                        </td>
                    </tr>
                </tbody>      
            </table>
    	</div>
    </div>
</template>
<script>
    import DateStore from './dateStore.js'
	export default {
		name: 'DxCalendar',
		componentName: 'DxCalendar',
        props: {
            size: {
                type: Number,
                default: 42,
                validator: function(value) {
                    return value >= 35
                }
            },
            currentMonth: Boolean
        },
        data() {
            const dateStore = new DateStore({
                    size: this.size,
                    currentMonth: this.currentMonth
                })
            return {
                weekDays: ['日', '一', '二', '三', '四', '五', '六'],
                dateStore
            }
        },
        computed: {
            store() {
                return this.dateStore.store
            },
            year() {
                return `${this.dateStore.year}年`
            },
            month() {
                return `${this.dateStore.month + 1}月`
            },
            rows() {
                return Math.floor(this.size / 7)
            }
        },
        methods: {
            // 这里month 范围 0-11
            preMonth() {
                let month = this.dateStore.month
                month = month < 1 ? 11 : month - 1
                this.dateStore.setMonth(month)
                this.$emit('month-change', month)
            },
            nextMonth() {
                let month = this.dateStore.month
                month = month > 10 ? 0 : month + 1
                this.dateStore.setMonth(month)
                this.$emit('month-change', month)
            },
            // 这里month 范围 0-11
            preYear() {
                let year = this.dateStore.year
                this.dateStore.setYear(year-1)
                this.$emit('year-change', year-1)
            },
            nextYear() {
                let year = this.dateStore.year
                this.dateStore.setYear(year+1)
                this.$emit('year-change', year+1)
            },
            today(row, column) {
                let index = (row - 1) * 7 + column - 1
                let dayNum = this.store[index]
                return index >= this.dateStore.startInd &&
                        index <= this.dateStore.endInd &&
                        dayNum === this.dateStore.day
            },
            isCurrentMonth(row, column) {
                let index = (row - 1) * 7 + column - 1
                return index >= this.dateStore.startInd && index <= this.dateStore.endInd
            }
        }
	}
</script>
<style lang="scss">
    @include B(calendar) {
        width: 100%;
        margin-top: 0.3rem;
        font-size: 1.3rem;
        /* 日期输入框 */
        @include E(select) {
            padding: 0 0.4rem;
            margin-bottom: 0.51rem;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: space-around;
            @include M(left) {
                background-size: 100% 100%;
                width: $--dx-calendar-icon-width;
                height: $--dx-calendar-icon-height;
            }
            @include M(right) {
                background-size: 100% 100%;
                width: $--dx-calendar-icon-width;
                height: $--dx-calendar-icon-height;
            }
            @include M(input) {
                &>input {
                    display: inline-block;
                    max-width: 5rem;
                    text-align: center;
                    border: none;
                    font-size: 1.3rem; 
                }
            }
            &>span {
                color: $--dx-calendar-icon-color;
                &:first-child {
                    margin-right: 2rem;
                }
                &:last-child {
                    margin-left: 2rem;
                }
            }
        }
        /* 日历显示表格 */
        @include E(content-table) {
            width: 100%;
            border-collapse: collapse;
            >thead {
                border-radius: 50%;
                border-bottom: 1px solid #ccc;
                margin-bottom: 0.63rem;
                >th {
                    font-weight: normal;
                    font-size: $--dx-calendar-th-font-size;
                    padding: 1rem 0;
                    }
            }
            @include M(blanking) {
                height: 0.63rem;
            }
            @include M(td) {
                height: 0.63rem;
                text-align: center;
                color: $--dx-calendar-td-color;
                font-size: $--dx-calendar-td-font-size;
                margin: 1rem auto;
                padding: 1rem; 
                @include when(curent-month) {
                   color: $--dx-calendar-td-color-month;
                }
                @include when(is-today) {
                    background-color: $--dx-calendar-td-bacckground-color-today;
                    border-radius: 50%;
                }
            }
        }
    }
</style>