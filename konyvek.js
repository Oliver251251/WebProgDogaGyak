let test = document.getElementById("main");
let osszesAdat = [];

AdatokLekerese();
function AdatokLekerese() {
  test.innerHTML = "";
  fetch("http://localhost:5000/Konyv")
    .then((res) => res.json())
    .then((datas) => {
      osszesAdat = datas;
      GenerateDivs(datas);
      datas.forEach((element) => {
        console.log(element);
      });
    });
}

function Ujkonyv(datas) {
  if (datas == "") {
    test.innerHTML = `
    <form>
    <div class="form-group">
            <label for="id">ID</label>
            <input type="number" class="form-control" id="id" aria-describedby="emailHelp" placeholder="ID">
        </div>
        <div class="form-group">
            <label for="ertekeles">Értékelés</label>
            <input type="number" class="form-control" id="ertekeles" aria-describedby="emailHelp" placeholder="Értékelés">
        </div>
        <div class="form-group">
            <label for="kepneve">Kép neve</label>
            <input type="text" class="form-control" id="kepneve" placeholder="Kép neve">
        </div>
       <div class="form-group">
            <label for="kiadaseve">Kiadás éve</label>
            <input type="number" class="form-control" id="kiadaseve" placeholder="Kiadás éve">
        </div>
        <div class="form-group">
            <label for="nev">Név</label>
            <input type="text" class="form-control" id="nev" aria-describedby="emailHelp" placeholder="Név">
        </div>
        <button type="submit" class="btn btn-primary" onclick="Kuld()">Küld</button>
    </form>
    `;
    return;
  }
  console.log(osszesAdat[datas]);
  test.innerHTML = `
    <form>
    <div class="form-group">
            <label for="id">ID</label>
            <input type="number" class="form-control" id="id" aria-describedby="emailHelp" placeholder="ID" value="${osszesAdat[datas].id}">
        </div>
        <div class="form-group">
            <label for="ertekeles">Értékelés</label>
            <input type="number" class="form-control" id="ertekeles" aria-describedby="emailHelp" placeholder="Értékelés" value="${osszesAdat[datas].ertekeles}">
        </div>
        <div class="form-group">
            <label for="kepneve">Kép neve</label>
            <input type="text" class="form-control" id="kepneve" placeholder="Kép neve" value="${osszesAdat[datas].kepneve}">
        </div>
       <div class="form-group">
            <label for="kiadaseve">Kiadás éve</label>
            <input type="number" class="form-control" id="kiadaseve" placeholder="Kiadás éve" value="${osszesAdat[datas].kiadasEve}">
        </div>
        <div class="form-group">
            <label for="nev">Név</label>
            <input type="text" class="form-control" id="nev" aria-describedby="emailHelp" placeholder="Név" value="${osszesAdat[datas].nev}">
        </div>
        <button type="submit" class="btn btn-primary" onclick="Modosit(${osszesAdat[datas].id})">Módosít</button>
    </form>
    `;
}

function Kuld() {
  let adatok = {
    id: parseInt(document.getElementById("id").value),
    nev: document.getElementById("nev").value,
    kiadaseve: parseInt(document.getElementById("kiadaseve").value),
    ertekeles: parseInt(document.getElementById("ertekeles").value),
    kepneve: document.getElementById("kepneve").value,
  };

  fetch("http://localhost:5000/Konyv", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(adatok),
  })
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error(text);
        });
      } else {
        return alert("Adatok tárolása sikeres!");
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Hiba!", err);
    });
}

function GenerateDivs(datas) {
  let element = 0;
  test.innerHTML += `<div class="row"><h1>Könyvek</h1></div>`;
  for (let i = 0; i < datas.length / 3; i++) {
    test.innerHTML += `
      <div class="row">
        
      </div>
      `;
    for (let j = 0; j < 3; j++) {
      console.log(test.children[i]);
      test.children[i].innerHTML += `
        <div class="col">
          <div class="konyv">
            <h6>Könyv neve: ${datas[element].nev}</h6>
            <h4>Kiadás éve: ${datas[element].kiadasEve}</h4>
            <p>Könyv értékelése: ${datas[element].ertekeles}</p>
            <img src="${datas[element].kepneve}" onclick="EgyKonyv(${
        datas[element].id
      })" alt="konyv" title="konyv" />
            <p><a class="bi bi-pencil" onclick="Ujkonyv(${
              (datas, element)
            })"></a> <a class="bi bi-trash" onclick="Torol(${
        datas[element].id
      })"></a></p>
          </div>
        </div>
        `;
      element++;
    }
  }
}

function EgyKonyv(id) {
  test.innerHTML = `
    
        <div id="egyKonyv" class="konyv">
            <h6>Könyv neve: ${osszesAdat[id - 1].nev}</h6>
            <h4>Kiadás éve: ${osszesAdat[id - 1].kiadasEve}</h4>
            <p>Könyv értékelése: ${osszesAdat[id - 1].ertekeles}</p>
            <img src="${osszesAdat[id - 1].kepneve}" onclick="EgyKonyv(${
    osszesAdat[id - 1].id
  })" alt="konyv" title="konyv" />
             <p><a class="bi bi-pencil" onclick="Modosit()"></a> <a class="bi bi-arrow-return-left" onclick="AdatokLekerese()"></a> <a class="bi bi-trash" onclick="Torol()"></a></p>
        </div>
    `;
}

function Torol(id) {
 if (confirm("Biztosan tötölni szeretnéd?")) {
    fetch("http://localhost:5000/Konyv/" + id, {
      method: "DELETE",
    }).then(location.reload());
 }
}

function Modosit(id) {
  let adatok = {
    id: parseInt(document.getElementById("id").value),
    nev: document.getElementById("nev").value,
    kiadaseve: parseInt(document.getElementById("kiadaseve").value),
    ertekeles: parseInt(document.getElementById("ertekeles").value),
    kepneve: document.getElementById("kepneve").value,
  };

  fetch("http://localhost:5000/Konyv/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(adatok),
  }).then(location.reload());
}
