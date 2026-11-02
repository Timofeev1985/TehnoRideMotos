document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("feedbackForm");
  const modalOverlay = document.getElementById("modalOverlay");
  const modalCloseBtn = document.getElementById("modalCloseBtn");

  // Элементы формы
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const commentInput = document.getElementById("comment");
  const agreeCheckbox = document.getElementById("agree");
  const submitBtn = form.querySelector(".feedback-btn");

  // Валидация полей
  function validateField(input, errorSelector) {
    const errorEl = input.parentElement.querySelector(errorSelector);

    if (input.hasAttribute("required") && !input.value.trim()) {
      input.classList.add("error");
      if (errorEl) errorEl.classList.add("show");
      return false;
    }

    // Валидация email
    if (input.type === "email" && input.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value.trim())) {
        input.classList.add("error");
        if (errorEl) errorEl.classList.add("show");
        return false;
      }
    }

    input.classList.remove("error");
    if (errorEl) errorEl.classList.remove("show");
    return true;
  }

  // Валидация чекбокса
  function validateCheckbox() {
    const errorEl = document.querySelector(".checkbox-error");
    if (!agreeCheckbox.checked) {
      agreeCheckbox.classList.add("error");
      if (errorEl) errorEl.classList.add("show");
      return false;
    }
    agreeCheckbox.classList.remove("error");
    if (errorEl) errorEl.classList.remove("show");
    return true;
  }

  // Очистка ошибок при вводе
  nameInput.addEventListener("input", function () {
    validateField(this, ".error-message");
  });

  emailInput.addEventListener("input", function () {
    validateField(this, ".error-message");
  });

  phoneInput.addEventListener("input", function () {
    this.classList.remove("error");
    const errorEl = this.parentElement.querySelector(".error-message");
    if (errorEl) errorEl.classList.remove("show");
  });

  commentInput.addEventListener("input", function () {
    this.classList.remove("error");
    const errorEl = this.parentElement.querySelector(".error-message");
    if (errorEl) errorEl.classList.remove("show");
  });

  agreeCheckbox.addEventListener("change", function () {
    validateCheckbox();
  });

  // Обработка отправки формы
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Валидация всех полей
    let isValid = true;

    if (!validateField(nameInput, ".error-message")) isValid = false;
    if (!validateField(emailInput, ".error-message")) isValid = false;
    if (!validateCheckbox()) isValid = false;

    if (!isValid) {
      // Прокрутка к первому полю с ошибкой
      const firstError = form.querySelector(".error");
      if (firstError) {
        firstError.focus();
      }
      return;
    }

    // Отключаем кнопку на время отправки
    submitBtn.disabled = true;
    submitBtn.textContent = "ОТПРАВКА...";

    // Имитация отправки на сервер
    setTimeout(function () {
      // Собираем данные формы
      const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        comment: commentInput.value.trim(),
        agree: agreeCheckbox.checked,
      };

      console.log("Данные формы:", formData);

      // Показываем модальное окно
      modalOverlay.classList.add("active");
      document.body.style.overflow = "hidden";

      // Сбрасываем форму
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = "ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ";

      // Убираем классы ошибок
      form.querySelectorAll(".error").forEach((el) => {
        el.classList.remove("error");
      });
      form.querySelectorAll(".error-message.show").forEach((el) => {
        el.classList.remove("show");
      });
    }, 1000);
  });

  // Закрытие модального окна
  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  modalCloseBtn.addEventListener("click", closeModal);

  modalOverlay.addEventListener("click", function (e) {
    if (e.target === this) {
      closeModal();
    }
  });

  // Закрытие по Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });
});
