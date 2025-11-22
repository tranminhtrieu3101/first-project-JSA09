// API phim hành động 
const API_HANH_DONG =
  "https://api.themoviedb.org/3/discover/movie?api_key=d728411e9adacca95e15c89b77250508&with_genres=28&language=vi-VN&sort_by=popularity.desc";

// Mảng lưu phim hành động
let danhSachPhimHanhDong = [];

// Khi trang tải → gọi API
window.onload = function () {
  console.log("Trang hành động đã tải xong ✅");
  taiPhimHanhDong();
};

// ===========================
//  HÀM TẢI PHIM HÀNH ĐỘNG
// ===========================
async function taiPhimHanhDong() {
  const khung = document.getElementById("movieList");
  khung.innerHTML = "<p>Đang tải phim hành động...</p>";

  try {
    const res = await fetch(API_HANH_DONG);
    if (!res.ok) throw new Error("Lỗi tải phim hành động!");

    const data = await res.json();

    console.log("Tải được", data.results.length, "phim hành động");

    danhSachPhimHanhDong = data.results.map(phim => ({
      title: phim.title,
      image: `https://image.tmdb.org/t/p/w300${phim.poster_path}`,
      release_date: phim.release_date,
      director: "Đang cập nhật",
    }));

    renderFilms(danhSachPhimHanhDong);

  } catch (err) {
    console.error(err);
    khung.innerHTML = "<p>Lỗi khi tải phim hành động.</p>";
  }
}

//  HÀM HIỂN THỊ PHIM

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
//  HÀM TÌM KIẾM PHIM HÀNH ĐỘNG
// ===========================
function timKiemPhim() {
  const tuKhoa = document.getElementById("searching").value.toLowerCase().trim();

  if (tuKhoa === "") {
    renderFilms(danhSachPhimHanhDong);
    return;
  }

  const ketQua = danhSachPhimHanhDong.filter(phim =>
    phim.title.toLowerCase().includes(tuKhoa)
  );

  if (ketQua.length === 0) {
    document.getElementById("movieList").innerHTML =
      "<h5>Không tìm thấy phim hành động nào!</h5>";
  } else {
    renderFilms(ketQua);
  }
}
