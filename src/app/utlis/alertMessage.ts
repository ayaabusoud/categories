const ALERT_SUCESS = ".alert-success";

export function showSuccessMessage() {
  const successAlert = document.querySelector(ALERT_SUCESS);
  if (successAlert) {
    successAlert.classList.remove('d-none');
    setTimeout(() => {
      successAlert.classList.add('d-none');
    }, 3000);
  }
}
