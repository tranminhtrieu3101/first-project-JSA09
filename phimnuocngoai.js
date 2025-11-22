// API phim quốc tế nổi tiếng 
const API_QUOC_TE ="https://api.themoviedb.org/3/trending/movie/week?api_key=d728411e9adacca95e15c89b77250508&language=vi-VN";

// Mảng lưu phim quốc tế
let danhSachPhimQuocTe = [];

// Khi trang tải → tải phim quốc tế
window.onload = function () {
  console.log("Trang đã tải xong ✅");
  taiPhimQuocTe();
};


//  HÀM TẢI PHIM QUỐC TẾ

async function taiPhimQuocTe() {
  const khung = document.getElementById("movieList");
  khung.innerHTML = "<p>Đang tải phim quốc tế...</p>";

  try {
    const res = await fetch(API_QUOC_TE);
    if (!res.ok) throw new Error("Lỗi tải phim quốc tế!");

    const data = await res.json();

    console.log("Tải được", data.results.length, "phim quốc tế");

    // Chuyển dữ liệu sang dạng dễ dùng
    danhSachPhimQuocTe = data.results.map(phim => ({
      title: phim.title,
      image: `https://image.tmdb.org/t/p/w300${phim.poster_path}`,
      release_date: phim.release_date,
      director: "Đang cập nhật",
    }));

    renderFilms(danhSachPhimQuocTe);

  } catch (err) {
    console.error(err);
    khung.innerHTML = "<p>Lỗi khi tải phim quốc tế.</p>";
  }
}

// ===========================
//  HÀM HIỂN THỊ PHIM
// ===========================
function renderFilms(list) {
  const khung = document.getElementById("movieList");
  khung.innerHTML = "";

  list.forEach(phim => {
    const div = document.createElement("div");
    div.className = "movie-card";

    div.innerHTML = `
      <img src="${phim.image}" alt="${phim.title}">
      <h3>${phim.title}</h3>
      <p><b>Năm:</b> ${phim.release_date ? phim.release_date.slice(0,4) : "?"}</p>
      <p><b>Đạo diễn:</b> ${phim.director}</p>
    `;

    khung.appendChild(div);
  });
}

// ===========================
//  HÀM TÌM KIẾM PHIM QUỐC TẾ
// ===========================
function timKiemPhim() {
  const tuKhoa = document.getElementById("searching").value.toLowerCase().trim();

  if (tuKhoa === "") {
    renderFilms(danhSachPhimQuocTe);
    return;
  }

  const ketQua = danhSachPhimQuocTe.filter(phim =>
    phim.title.toLowerCase().includes(tuKhoa)
  );

  if (ketQua.length === 0) {
    document.getElementById("movieList").innerHTML =
      "<h5>Không tìm thấy phim quốc tế nào!</h5>";
  } else {
    renderFilms(ketQua);
  }
}




// - taiPhim(): tải phim từ API về
// - renderFilms(): vẽ các phim ra trang
// - timKiemPhim(): tìm phim theo tên người dùng nhập