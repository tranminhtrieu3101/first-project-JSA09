// Khi người dùng bấm nút "Đăng nhập"
function dangNhap() {
  // Lấy giá trị từ ô nhập
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  // Nếu bỏ trống
  if (username === "" || password === "") {
    message.textContent = "⚠️ Vui lòng nhập đủ thông tin!";
    return;
  }

  // Lấy danh sách người dùng đã đăng ký trong localStorage
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // Tìm người dùng có tên và mật khẩu trùng
  const timThay = users.find(
    (u) => u.username === username && u.password === password
  );

  if (timThay) {
    // Nếu tìm thấy → lưu người đang đăng nhập
    localStorage.setItem("currentUser", JSON.stringify(timThay));

    message.textContent = "Đăng nhập thành công!";
    message.style.color = "lightgreen";

    // Sau 1 giây thì chuyển sang trang chủ
    setTimeout(() => {
      window.location.href = "trangchu.html";
    }, 1000);
  } else {
    // Nếu sai tên hoặc mật khẩu
    message.textContent = "Sai tên đăng nhập hoặc mật khẩu!";
    message.style.color = "yellow";
  }
}
