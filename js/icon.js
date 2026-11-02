function iconHeart() {
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".product-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        console.log(e);
        e.preventDefault();
      });
      // Сердечки
      document.querySelectorAll(".product-wishlist").forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          e.preventDefault();
          this.classList.toggle("active");
        });
      });
    });
  });
}

iconHeart();
