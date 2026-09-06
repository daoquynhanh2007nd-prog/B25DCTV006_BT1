const loiChaoElement = document.getElementById('loi-chao');
const gioHienTai = new Date().getHours();

if (gioHienTai >= 0 && gioHienTai < 12) {
    loiChaoElement.innerText = "Chào buổi sáng! Chúc bạn bắt đầu ngày mới năng lượng.";
} else if (gioHienTai >= 12 && gioHienTai < 18) {
    loiChaoElement.innerText = "Chào buổi chiều! Chúc bạn học tập và làm việc hiệu quả.";
} else {
    loiChaoElement.innerText = "Chào buổi tối! Chúc bạn có thời gian nghỉ ngơi vui vẻ.";
}

const btnDoiMau = document.getElementById('btn-doi-mau');
let isDarkMode = false;

btnDoiMau.addEventListener('click', function() {
    if (isDarkMode) {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
    } else {
        document.body.style.backgroundColor = "#2c2c2c";
        document.body.style.color = "white";
    }
    isDarkMode = !isDarkMode; 
});

const danhSachMenu = document.querySelectorAll('#menu a');
const danhSachNoiDung = document.querySelectorAll('.noidung-tab');

danhSachMenu.forEach(menu => {
    menu.addEventListener('click', function(event) {
        event.preventDefault(); 

        const targetId = this.getAttribute('data-target');

        danhSachNoiDung.forEach(noidung => {
            noidung.classList.remove('active');
        });
        
        danhSachMenu.forEach(m => {
            m.classList.remove('active');
        });

        document.getElementById(targetId).classList.add('active');
        this.classList.add('active');
    }); 
}); 