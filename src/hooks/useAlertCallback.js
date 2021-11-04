import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  },
})

export default function useAlertCallback() {
  return (title, desc, type) => {
    Toast.fire({
      icon: type,
      title: title,
      text: desc,
    }).then()
  }
}
