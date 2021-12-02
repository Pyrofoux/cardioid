/*
  usage: let csv = arrayToCsv([
  [1, '2', '"3"'],
  [true, null, undefined],
]);

*/

function arrayToCsv(data){
  return data.map(row =>
    row
    .map(String)  // convert every value to String
    .map(v => v.replaceAll('"', '""'))  // escape double colons
    .map(v => `"${v}"`)  // quote it
    .join(',')  // comma-separated
  ).join('\r\n');  // rows starting on new lines
}


// usage : downloadBlob(csv, 'export.csv', 'text/csv;charset=utf-8;')
function downloadBlob(content, filename, contentType) {
  // Create a blob
  var blob = new Blob([content], { type: contentType });
  var url = URL.createObjectURL(blob);

  // Create a link to download it
  var pom = document.createElement('a');
  pom.href = url;
  pom.setAttribute('download', filename);
  pom.click();
}



function exportCSV()
{
  var csv = arrayToCsv(export_lines);
  downloadBlob(csv, `cardioid-${coefficient}-${resolution}.csv`, 'text/csv;charset=utf-8;')
}

function exportPNG()
{
  saveImage(cvs, `cardioid-${coefficient}-${resolution}.png`);
}



function saveImage(canvas, nomFichier) {
    // nom du fichier pour l'enregistrement
    const nomFile = nomFichier || "image.png";
    let dataImage;
    // pour IE et Edge c'est simple !!!
    // https://technet.microsoft.com/en-us/windows/hh771732(v=vs.60)
    if (canvas.msToBlob) {
      // crée un objet blob contenant le dessin du canvas
      dataImage = canvas.msToBlob();
      // affiche l'invite d'enregistrement
      window.navigator.msSaveBlob(dataImage, nomFile);
    }
    else {
      // création d'un lien HTML5 download
      const lien = document.createElement("A");
      // récup. des data de l'image
      dataImage = canvas.toDataURL("image/png");
      // affectation d'un nom à l'image
      lien.download = nomFile;
      // modifie le type de données
      dataImage = dataImage.replace("image/png", "image/octet-stream");
      // affectation de l'adresse
      lien.href = dataImage;
      // ajout de l'élément
      document.body.appendChild(lien);
      // simulation du click
      lien.click();
      // suppression de l'élément devenu inutile
      document.body.removeChild(lien);
    }
}
