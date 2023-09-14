const ALERT_SUCESS = ".alert-success";

export function showSuccessMessage() {
  const successAlert = document.querySelector(ALERT_SUCESS);
  if (successAlert) {
    successAlert.classList.remove('d-none');
  }
}

export function hideSuccessMessage() {
  const successAlert = document.querySelector(ALERT_SUCESS);
  if (successAlert) {
    successAlert.classList.add('d-none');
  }
}
