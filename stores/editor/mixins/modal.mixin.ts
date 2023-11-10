import {useModal} from "vue-final-modal"
import ModalMedia from "~/components/ModalMedia.vue"

export const modalMixin = () => {
  const showModal = (modalName: string,
                     param: unknown) => {

    if (modalName === 'ModalMedia') {
      const {open, close} = useModal({
        component: ModalMedia,
        attrs: {
          mediaType: param,
          onConfirm() {
            close()
          },
          onCancel() {
            close()
          }
        }
      })

      open()
    }
  }
  return {
    showModal
  }
}