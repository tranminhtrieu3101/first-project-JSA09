// API phim KINH DỊ 
const API_HORROR = "https://api.themoviedb.org/3/discover/movie?api_key=d728411e9adacca95e15c89b77250508&with_genres=27&language=vi-VN";

// Mảng phim kinh dị
let danhSachHorror = [];

// Khi trang tải xong → tải phim kinh dị
window.onload = function () {
  console.log("Trang đã tải xong ✅");
  taiPhimKinhDi();
};

//  HÀM TẢI PHIM KINH DỊ

async function taiPhimKinhDi() {
  const khung = document.getElementById("movieList");
  khung.innerHTML = "<p>Đang tải phim kinh dị...</p>";

  try {
    const res = await fetch(API_HORROR);
    if (!res.ok) throw new Error("Lỗi tải phim kinh dị!");

    const data = await res.json();

    danhSachHorror = data.results.map(phim => ({
      title: phim.title,
      image: `https://image.tmdb.org/t/p/w300${phim.poster_path}`,
      release_date: phim.release_date,
      director: "Đang cập nhật",
    }));

    renderFilms(danhSachHorror);

  } catch (err) {
    console.error(err);
    khung.innerHTML = "<p>Lỗi khi tải phim kinh dị.</p>";
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

//  HÀM TÌM KIẾM PHIM

function timKiemPhim() {
  const tuKhoa = document.getElementById("searching").value.toLowerCase().trim();

  if (tuKhoa === "") {
    renderFilms(danhSachHorror);
    return;
  }

  const ketQua = danhSachHorror.filter(phim =>
    phim.title.toLowerCase().includes(tuKhoa)
  );

  if (ketQua.length === 0) {
    document.getElementById("movieList").innerHTML =
      "<h5>Không tìm thấy phim nào!</h5>";
  } else {
    renderFilms(ketQua);
  }
}
