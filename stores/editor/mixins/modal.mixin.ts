import { useModal } from 'vue-final-modal'
import ModalMedia from '~/components/modal/media/ModalMedia.vue'
import { MediaType } from '~/models/Media'

export const modalMixin = () => {
  const showModal = (modalName: string, param: unknown) => {
    if (modalName === 'ModalMedia') {
      const { open, close } = useModal({
        component: ModalMedia,
        attrs: {
          mediaType: <MediaType>param,
          onConfirm: () => {
            close()
          },
          onCancel: () => {
            close()
          },
        },
      })

      open()
    }
  }
  return {
    showModal,
  }
}
