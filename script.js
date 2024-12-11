document.getElementById("btn").addEventListener("click", () => {
  let nama = document.getElementById("nama").value;

  // Validasi panjang nama
  if (nama.length < 2 || nama === "") {
    alert("Masukan Nama Yang Benar");
    return;
  }

  // Mengubah nama menjadi huruf kecil
  nama = nama.toLowerCase();

  fetch(`https://api.nationalize.io?name=${nama}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let dataData = ``;

      // Memastikan data.country ada dan memiliki panjang
      if (data.country && data.country.length > 0) {
        for (let i = 0; i < data.country.length; i++) {
          dataData += `
          <p>Negara: <span>${data.country[i].country_id}</span>, Persentase: <strong>${data.country[i].probability}%</strong></p>
          `;
        }
        dataData += `
        <h2>Semoga Saja Akurat HeHe.</h2>`
      } else {
        dataData = `<p>Tidak ada data negara yang ditemukan untuk nama ini.</p>`;
      }

      document.getElementById('hasil').innerHTML = dataData;
      nama = '';
    })
    .catch((error) => {
      console.error('Error:', error);
      alert("Terjadi kesalahan saat mengambil data.");
    });
});