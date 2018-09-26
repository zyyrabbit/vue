import { createVue, destroyVM } from '../utils.js'

describe('Input', () => {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })
    it('disabled', () => {
        vm = createVue({
            template: `
        <dx-input disabled>
        </dx-input>
      `
        }, true)
        expect(vm.$el.querySelector('input').getAttribute('disabled')).to.ok
    })
})
