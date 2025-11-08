function hienthiThongBao(noiDung) {
  let thongBao = document.getElementById("thongbao");
  thongBao.innerHTML = noiDung;
}

function dangKy() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmpassword").value;

  if (!username || !password || !confirmPassword) {
    hienthiThongBao("Hãy nhập đầy đủ thông tin");
    return;
  }

  if (password !== confirmPassword) {
    hienthiThongBao("Mật khẩu không đúng như ở trên");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  let daTonTai = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      daTonTai = true;
      break;
    }
  }

  if (daTonTai) {
    hienthiThongBao("Tên đăng nhập đã tồn tại");
    return;
  }

  users.push({username, password});
  localStorage.setItem("users", JSON.stringify(users));
  hienthiThongBao("Đăng ký thành công");
}
