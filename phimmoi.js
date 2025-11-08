//địa chỉ chứa dữ liệu các phim hoạt hình Nhật Bản của hãng Studio Ghibli
const API = "https://ghibliapi.vercel.app/films";

// Biến lưu danh sách phim đã tải về
let danhSachPhim = [];


// Khi trang web tải xong
// window.onload: khi toàn bộ HTML hiển thị xong thì mới chạy hàm này
window.onload = function() {
  console.log("Trang đã tải xong ✅");
  taiPhim(); // Gọi hàm tải phim
};


//Hàm tải phim từ API
async function taiPhim() {
  // Lấy thẻ HTML có id là movieList để hiển thị danh sách phim
  const khung = document.getElementById("movieList");

  // Trong khi chờ tải dữ liệu, hiện thông báo “Đang tải phim...”
  khung.innerHTML = "<p>Đang tải phim...</p>";

  try {
    // fetch: gọi đến địa chỉ API để lấy dữ liệu phim
    const res = await fetch(API);

    // Nếu gọi thất bại (mạng lỗi hoặc API hỏng) thì báo lỗi
    if (!res.ok) throw new Error("Lỗi tải phim!");

    // Chuyển dữ liệu nhận được thành dạng JSON (một mảng các phim)
    const data = await res.json();

    // In số lượng phim ra bảng Console để kiểm tra
    console.log("Tải được:", data.length, "phim");

    // Lưu dữ liệu vào biến toàn cục
    danhSachPhim = data;

    // Gọi hàm hiển thị phim ra màn hình
    renderFilms(danhSachPhim);

  } catch (err) {
    // Nếu có lỗi (ví dụ mất mạng), thì báo ra màn hình và console
    console.error(err);
    khung.innerHTML = "<p>Lỗi khi tải phim.</p>";
  }
}

// Hàm hiển thị phim ra trang
function renderFilms(list) {
  // Lấy lại phần khung HTML để thêm phim vào
  const khung = document.getElementById("movieList");

  // Xóa nội dung cũ (nếu có)
  khung.innerHTML = "";

  // Duyệt qua từng phần tử (phim) trong danh sách
  list.forEach(phim => {
    // Tạo một thẻ <div> cho mỗi phim
    const div = document.createElement("div");
    div.className = "movie-card"; // đặt class để dễ CSS

    // Nội dung HTML của từng phim
    div.innerHTML = `
      <img src="${phim.image}" alt="${phim.title}">       <!-- Ảnh phim -->
      <h3>${phim.title}</h3>                              <!-- Tên phim -->
      <p><b>Năm:</b> ${phim.release_date}</p>             <!-- Năm phát hành -->
      <p><b>Đạo diễn:</b> ${phim.director}</p>            <!-- Tên đạo diễn -->
    `;

    // Thêm thẻ phim này vào trong khung hiển thị
    khung.appendChild(div);
  });
}


// Hàm tìm kiếm phim
function timKiemPhim() {
  // Lấy nội dung người dùng nhập vào ô tìm kiếm
  const oNhap = document.getElementById("searching");
  const tuKhoa = oNhap.value.toLowerCase().trim(); // chuyển sang chữ thường và bỏ khoảng trắng thừa
  console.log("Tìm:", tuKhoa); // kiểm tra trong console

  // Nếu ô tìm kiếm rỗng thì hiển thị lại toàn bộ phim
  if (tuKhoa === "") {
    renderFilms(danhSachPhim);
    return;
  }

  // Lọc danh sách phim theo từ khóa
  // includes() => kiểm tra xem chuỗi có chứa từ khóa không
  const ketQua = danhSachPhim.filter(phim =>
    phim.title.toLowerCase().includes(tuKhoa)
  );

  // Nếu không có phim nào phù hợp => báo không tìm thấy
  if (ketQua.length === 0) {
    document.getElementById("movieList").innerHTML =
      "<h5>Không tìm thấy phim nào!</h5>";
  } else {
    // Ngược lại, hiển thị các phim tìm được
    renderFilms(ketQua);
  }
}



// - taiPhim(): tải phim từ API về
// - renderFilms(): vẽ các phim ra trang
// - timKiemPhim(): tìm phim theo tên người dùng nhập

// API phim Việt từ The Movie Database (TMDB)
const API_VIET = "https://api.themoviedb.org/3/discover/movie?api_key=d728411e9adacca95e15c89b77250508&with_origin_country=VN&language=vi-VN";


// Hàm tải phim Việt Nam và hiển thị thêm vào danh sách
async function taiPhimViet() {
  try {
    const res = await fetch(API_VIET);
    if (!res.ok) throw new Error("Lỗi tải phim Việt!");
    const data = await res.json();

    console.log("Tải được phim Việt:", data.results.length);

    // Lấy phần hiển thị hiện có để thêm phim Việt vào
    const khung = document.getElementById("movieList");

    // Thêm từng phim Việt vào danh sách đang có
    data.results.forEach(phim => {
      const div = document.createElement("div");
      div.className = "movie-card";
      div.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w300${phim.poster_path}" alt="${phim.title}">
        <h3>${phim.title}</h3>
        <p><b>Năm:</b> ${phim.release_date ? phim.release_date.slice(0,4) : "?"}</p>
        <p><b>Đạo diễn:</b> Đang cập nhật</p>
      `;
      khung.appendChild(div);
    });

  } catch (err) {
    console.error("Lỗi phim Việt:", err);
  }
}

// Gọi hàm này sau khi phim Ghibli đã tải xong
window.addEventListener("load", () => {
  setTimeout(() => {
    taiPhimViet();
  }, 2000); // đợi 2 giây để phim Ghibli hiển thị trước
});
function timKiemPhim() {
  const oNhap = document.getElementById("searching");
  const tuKhoa = oNhap.value.toLowerCase().trim();
  console.log("Tìm:", tuKhoa);

  // Nếu ô tìm kiếm rỗng thì hiển thị lại toàn bộ phim
  if (tuKhoa === "") {
    renderFilms(danhSachPhim);
    return;
  }

  // Tìm phim Ghibli trước
  let ketQua = danhSachPhim.filter(phim =>
    phim.title.toLowerCase().includes(tuKhoa)
  );

  // Nếu không thấy phim Ghibli → thử tìm phim Việt (TMDB)
  if (ketQua.length === 0) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=d728411e9adacca95e15c89b77250508&query=${encodeURIComponent(tuKhoa)}&with_origin_country=VN&language=vi-VN`)
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const phimViet = data.results.map(p => ({
            title: p.title,
            image: `https://image.tmdb.org/t/p/w300${p.poster_path}`,
            release_date: p.release_date,
            director: "Đang cập nhật",
          }));
          renderFilms(phimViet);
        } else {
          document.getElementById("movieList").innerHTML =
            "<h5>Không tìm thấy phim nào!</h5>";
        }
      })
      .catch(err => {
        console.error("Lỗi tìm phim Việt:", err);
        document.getElementById("movieList").innerHTML =
          "<h5>Lỗi khi tìm phim Việt!</h5>";
      });
  } else {
    // Có kết quả từ Ghibli thì hiển thị luôn
    renderFilms(ketQua);
  }
}
