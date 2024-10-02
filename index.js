const invoices = [
    {
      "id": 1,
      "chemicalName": "Ammonium Persulphate",
      "vendor": "LG Chem",
      "density": 3525.92,
      "viscosity": 60.63,
      "packaging": "Bag",
      "packSize": "100.00",
      "unit": "kg",
      "quantity": 6495.18
    },
    {
      "id": 2,
      "chemicalName": "Caustic Potash",
      "vendor": "Formosa",
      "density": 3172.15,
      "viscosity": 60.63,
      "packaging": "Bag",
      "packSize": "100.00",
      "unit": "kg",
      "quantity": 8751.90
    },
    {
      "id": 3,
      "chemicalName": "Dimethylaminopropylamino",
      "vendor": "LG Chem",
      "density": 8435.37,
      "viscosity": 12.62,
      "packaging": "Barrel",
      "packSize": "75.00",
      "unit": "L",
      "quantity": 5964.61
    },
    {
      "id": 4,
      "chemicalName": "Mono Ammonium Phosphate",
      "vendor": "Sinopec",
      "density": 1597.65,
      "viscosity": 76.51,
      "packaging": "Bag",
      "packSize": "105.00",
      "unit": "L",
      "quantity": 8183.73
    },
    {
      "id": 5,
      "chemicalName": "Ferric Nitrate",
      "vendor": "DowDuPoint",
      "density": 364.04,
      "viscosity": 14.90,
      "packaging": "Bag",
      "packSize": "105.00",
      "unit": "kg",
      "quantity": 4154.33
    },
    {
      "id": 6,
      "chemicalName": "Chemical F",
      "vendor": "Vendor Z",
      "density": 145.54,
      "viscosity": 18.5,
      "packaging": "Barrel",
      "packSize": "100.00",
      "unit": "L",
      "quantity": 500.25
    },
    {
      "id": 7,
      "chemicalName": "Chemical G",
      "vendor": "Vendor X",
      "density": 150.2,
      "viscosity": 11.21,
      "packaging": "Bottle",
      "packSize": "250.00",
      "unit": "ml",
      "quantity": 1500.4
    },
    {
      "id": 8,
      "chemicalName": "Chemical H",
      "vendor": "Vendor Y",
      "density": 104.3,
      "viscosity": 13.8,
      "packaging": "N/A",
      "packSize": "N/A",
      "unit": "L",
      "quantity": 3002.5
    },
    {
      "id": 9,
      "chemicalName": "Chemical I",
      "vendor": "Vendor Z",
      "density": 184.1,
      "viscosity": 90.1,
      "packaging": "Barrel",
      "packSize": "50.00",
      "unit": "L",
      "quantity": 24.5
    },
    {
      "id": 10,
      "chemicalName": "Chemical J",
      "vendor": "Vendor X",
      "density": 178.5,
      "viscosity": 16.2,
      "packaging": "Bottle",
      "packSize": "750.00",
      "unit": "ml",
      "quantity": 8004.41
    },
    {
      "id": 11,
      "chemicalName": "Chemical K",
      "vendor": "Vendor Y",
      "density": 198.4,
      "viscosity": 14.5,
      "packaging": "N/A",
      "packSize": "150.00",
      "unit": "L",
      "quantity": 60.05
    },
    {
      "id": 12,
      "chemicalName": "Chemical L",
      "vendor": "Vendor Z",
      "density": 178.2,
      "viscosity": 10.1,
      "packaging": "Barrel",
      "packSize": "200.00",
      "unit": "L",
      "quantity": 15.00
    },
    {
      "id": 13,
      "chemicalName": "Chemical M",
      "vendor": "Vendor X",
      "density": 1.3,
      "viscosity": 12,
      "packaging": "Bottle",
      "packSize": "500.00",
      "unit": "ml",
      "quantity": 9005.2
    },
    {
      "id": 14,
      "chemicalName": "Chemical N",
      "vendor": "Vendor Y",
      "density": 198.6,
      "viscosity": 17.1,
      "packaging": "N/A",
      "packSize": "N/A",
      "unit": "L",
      "quantity": 40.02
    },
    {
      "id": 15,
      "chemicalName": "Chemical O",
      "vendor": "Vendor Z",
      "density": 101.1,
      "viscosity": 80.1,
      "packaging": "Barrel",
      "packSize": "100.00",
      "unit": "L",
      "quantity": 25.58
    }
  ];

  // serviceworker registration for PWA
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./service-worker.js')
        .then((registration) => {
          console.log('ServiceWorker is registered:', registration);
        })
        .catch((error) => {
          console.log('ServiceWorker registration has failed:', error);
        });
  
    });
  }


  const newButton = document.getElementById("newButton");
  const deleteButton = document.getElementById("deleteButton");
  const upButton = document.getElementById("upButton");
  const downButton = document.getElementById("downButton");

  const refreshButton = document.getElementById("refreshButton");
  const saveButton = document.getElementById("saveButton");
  const initialInvoices = JSON.parse(JSON.stringify(invoices)); // Store initial data

  const editButton = document.getElementById("editButton");
  const editRowModal = document.getElementById('editRowModal');
  const saveEditRowButton = document.getElementById('saveEditRow');

  refreshButton.addEventListener('click', () => {
      const storedData = localStorage.getItem('invoiceData');

      if (storedData) {
          invoices.length = 0; 
          invoices.push(...JSON.parse(storedData)); 
      } else {
          invoices.length = 0;
          invoices.push(...initialInvoices); // Restore initial data if no localStorage data
      }
      createTableRows();
  });
  saveButton.addEventListener('click', () => {
      const updatedInvoices = []; // Array to store updated data

      const rows = document.querySelectorAll("#invoiceTableBody tr");
      rows.forEach(row => {
          const id = parseFloat(row.children[1].textContent);
          const chemicalName = row.children[2].textContent;
          const vendor = row.children[3].textContent;
          const density = parseFloat(row.children[4].firstChild.value); 
          const viscosity = parseFloat(row.children[5].firstChild.value);
          const packaging = row.children[6].textContent;
          const packSize = row.children[7].textContent;
          const unit = row.children[8].textContent;
          const quantity = parseFloat(row.children[9].firstChild.value);

          updatedInvoices.push({ id, chemicalName, vendor, density, viscosity, packaging, packSize, unit, quantity });
      });

      localStorage.setItem('invoiceData', JSON.stringify(updatedInvoices));
      refreshButton.click();
  });
  function createTableRows() {
    const tbody = document.getElementById("invoiceTableBody");
      tbody.innerHTML = ""; // Clear existing rows before adding new ones
      let currentId = 1;

    invoices.forEach(invoice => {
      const row = document.createElement("tr");
      const selectButtonCell = document.createElement("td");
      const idCell = document.createElement("td");
      const ChemicalNameCell = document.createElement("td");
      const VendorCell = document.createElement("td");
      const DensityCell = document.createElement("td");
      const ViscosityCell = document.createElement("td");
      const PackagingCell = document.createElement("td");
      const PackSizeCell = document.createElement("td");
      const UnitCell = document.createElement("td");
      const QuantityCell = document.createElement("td");

      const Densityinput = document.createElement("input");
      const Viscosityinput = document.createElement("input");
      const Quantityinput = document.createElement("input");

      Densityinput.classList.add('w-75')
      Viscosityinput.classList.add('w-75')
      Quantityinput.classList.add('w-75')


      ChemicalNameCell.classList.add('has-right-border');
      const selectButton = document.createElement("button");
      const img = document.createElement("img");
      img.src = "./assets/check-lg.svg";
      img.alt = "select";
      selectButton.appendChild(img);
      selectButton.classList.add("btn", "btn-sm");
      selectButton.addEventListener("click", () => {

        // Deselect any previously selected row
        const previouslySelectedRow = document.querySelector("#invoiceTableBody tr.selected");
        if (previouslySelectedRow) {
          previouslySelectedRow.classList.remove("selected");
        }

        row.classList.toggle("selected");
        updateButtonStates();
      });

      selectButtonCell.appendChild(selectButton);

      // idCell.textContent = invoice.id;
      idCell.textContent = currentId;
      ChemicalNameCell.textContent = invoice.chemicalName;
      VendorCell.textContent = invoice.vendor;
      PackagingCell.textContent = invoice.packaging;
      PackSizeCell.textContent = invoice.packSize;
      UnitCell.textContent = invoice.unit;
      Densityinput.type = Viscosityinput.type = Quantityinput.type =  "number";
      Densityinput.value = invoice.density;
      Viscosityinput.value = invoice.viscosity;
      Quantityinput.value = invoice.quantity;
      Densityinput.addEventListener("change", () => {
        invoice.density = Densityinput.value;
      });
      Viscosityinput.addEventListener("change", () => {
        invoice.viscosity = Viscosityinput.value;
      });
      Quantityinput.addEventListener("change", () => {
        invoice.quantity = Quantityinput.value;
      });
   
      DensityCell.appendChild(Densityinput);
      ViscosityCell.appendChild(Viscosityinput);
      QuantityCell.appendChild(Quantityinput);

      row.appendChild(selectButtonCell);
      row.appendChild(idCell);
      row.appendChild(ChemicalNameCell);
      row.appendChild(VendorCell);
      row.appendChild(DensityCell);
      row.appendChild(ViscosityCell);
      row.appendChild(PackagingCell);
      row.appendChild(PackSizeCell);
      row.appendChild(UnitCell);
      row.appendChild(QuantityCell);

      tbody.appendChild(row);
      currentId++;
    });

    updateButtonStates();
  }

  function updateButtonStates() {
    const selectedRow = getSelectedRow();
    deleteButton.disabled = !selectedRow;
    upButton.disabled = !selectedRow || selectedRow.previousElementSibling === null;
    downButton.disabled = !selectedRow || selectedRow.nextElementSibling === null;
    editButton.disabled = !selectedRow;
  }

  function getSelectedRow() {
    return document.querySelector("#invoiceTableBody tr.selected");
  }



  function createRow() {

    const newRowModal = new bootstrap.Modal(document.getElementById('newRowModal'));
      newRowModal.show();
  }

  function deleteRow() {
    const selectedRow = getSelectedRow();
    if (selectedRow) {
      const index = Array.from(selectedRow.parentNode.children).indexOf(selectedRow);
      invoices.splice(index, 1); 
      selectedRow.remove(); //Remove row from DOM.
      updateButtonStates();     
    }
  }


  function moveRowUp() {
    const selectedRow = getSelectedRow();
    if (selectedRow && selectedRow.previousElementSibling) {
      const previousRow = selectedRow.previousElementSibling;
      selectedRow.parentNode.insertBefore(selectedRow, previousRow);
       const index = Array.from(selectedRow.parentNode.children).indexOf(selectedRow);
       //Reflect changes in data by moving element in invoices array
       const invoice = invoices.splice(index + 1, 1)[0];
       invoices.splice(index, 0, invoice);
      updateButtonStates();
    }
  }

  function moveRowDown() {
    const selectedRow = getSelectedRow();
    if (selectedRow && selectedRow.nextElementSibling) {
      const nextRow = selectedRow.nextElementSibling;
      selectedRow.parentNode.insertBefore(selectedRow, nextRow.nextSibling);
       const index = Array.from(selectedRow.parentNode.children).indexOf(selectedRow);
       //Reflect changes in data by moving element in invoices array
       const invoice = invoices.splice(index, 1)[0];
       invoices.splice(index + 1, 0, invoice);
      updateButtonStates();
    }
  }

  const newRowModal = document.getElementById('newRowModal');
  const saveNewRowButton = document.getElementById('saveNewRow');

  newButton.addEventListener('click', createRow);
  deleteButton.addEventListener('click', deleteRow);
  upButton.addEventListener('click', moveRowUp);
  downButton.addEventListener('click', moveRowDown);

  saveNewRowButton.addEventListener('click', () => {
    const newChemicalName = document.getElementById('newChemicalName').value;
    const newVendor = document.getElementById('newVendor').value;
    const newDensity = document.getElementById('newDensity').value;
    const newViscosity = document.getElementById('newViscosity').value;
    const newPackaging = document.getElementById('newPackaging').value;
    const newPackSize = document.getElementById('newPackSize').value;
    const newUnit = document.getElementById('newUnit').value;
    const newQuantity = document.getElementById('newQuantity').value;


    if (newChemicalName && newDensity && newViscosity && newPackaging && newPackSize && newUnit && newQuantity) {
      const newInvoice = {
        id: invoices[invoices.length - 1]?.id + 1 || 1,
        chemicalName: newChemicalName,
        vendor: newVendor,
        density: newDensity,
        viscosity: newViscosity,
        packaging: newPackaging,
        packSize: newPackSize,
        unit: newUnit,
        quantity: newQuantity
      };
      invoices.push(newInvoice);
      createTableRows();

      const modal = bootstrap.Modal.getInstance(newRowModal);
      modal.hide();
    }
  });
  
  const editModal = new bootstrap.Modal(editRowModal); 
  editButton.addEventListener('click', () => {
      const selectedRow = getSelectedRow();
      if (selectedRow) {
          const ChemicalName = selectedRow.children[2].textContent;
          const Vendor = selectedRow.children[3].textContent;
          const Density = parseFloat(selectedRow.children[4].firstChild.value);
          const Viscosity = parseFloat(selectedRow.children[5].firstChild.value);
          const Packaging = selectedRow.children[6].textContent;
          const PackSize = parseFloat(selectedRow.children[7].textContent);
          const Unit = selectedRow.children[8].textContent;
          const Quantity = parseFloat(selectedRow.children[9].firstChild.value);
          console.log(Quantity)

          document.getElementById('editChemicalName').value = ChemicalName;
          document.getElementById('editVendor').value = Vendor;
          document.getElementById('editDensity').value = Density;
          document.getElementById('editViscosity').value = Viscosity;
          document.getElementById('editPackaging').value = Packaging;
          document.getElementById('editPackSize').value = PackSize;
          document.getElementById('editUnit').value = Unit;
          document.getElementById('editQuantity').value = Quantity;

          editModal.show();
      }
  });

  
  saveEditRowButton.addEventListener('click', () => {
    const selectedRow = getSelectedRow();
    if (selectedRow) {
        const newChemicalName = document.getElementById('editChemicalName').value;
        const newVendor = document.getElementById('editVendor').value;
        const newDensity = document.getElementById('editDensity').value;
        const newViscosity = document.getElementById('editViscosity').value;
        const newPackaging = document.getElementById('editPackaging').value;
        const newPackSize = document.getElementById('editPackSize').value;
        const newUnit = document.getElementById('editUnit').value;
        const newQuantity = document.getElementById('editQuantity').value;


        selectedRow.children[2].textContent = newChemicalName;
        selectedRow.children[3].textContent = newVendor;
        selectedRow.children[4].firstChild.value = newDensity;
        selectedRow.children[5].firstChild.value = newViscosity;
        selectedRow.children[6].textContent = newPackaging;
        selectedRow.children[7].textContent = newPackSize;
        selectedRow.children[8].textContent = newUnit;
        selectedRow.children[9].firstChild.value = newQuantity;

        const modal = bootstrap.Modal.getInstance(editRowModal);
        modal.hide();
        saveButton.click();
    }
});

  function sortTable(columnIndex) {
      let sortDirection = 1;
      const currentSortColumn = document.querySelector('th.sorted');
      if (currentSortColumn && currentSortColumn.cellIndex === columnIndex) {
          sortDirection = currentSortColumn.classList.contains('asc') ? -1 : 1;
          currentSortColumn.classList.toggle('asc');
          currentSortColumn.classList.toggle('desc');
      } else {
          if (currentSortColumn) {
              currentSortColumn.classList.remove('sorted', 'asc', 'desc');
          }
          const headerCell = document.querySelectorAll('thead th')[columnIndex];
          headerCell.classList.add('sorted', sortDirection === 1 ? 'asc' : 'desc');
      }

      invoices.sort((a, b) => {
          let valueA, valueB;
          switch (columnIndex) {
              case 1: // ID
                  valueA = a.id;
                  valueB = b.id;
                  break;
              case 2: // ChemicalName
                  valueA = a.chemicalName.toLowerCase(); // Case-insensitive sorting
                  valueB = b.chemicalName.toLowerCase();
                  break;
              case 3: // Vendor
                  valueA = a.vendor.toLowerCase();
                  valueB = b.vendor.toLowerCase();
                  break;
              case 4: // density
                  valueA = parseFloat(a.density); // Parse density as integer
                  valueB = parseFloat(b.density);
                  break;
              case 5: // Viscosity
                  valueA = parseFloat(a.viscosity); // Parse density as integer
                  valueB = parseFloat(b.viscosity);
                  break;
              case 6: // Packaging
                  valueA = a.packaging.toLowerCase();
                  valueB = b.packaging.toLowerCase();
                  break;
              case 7: // PackSize
                  valueA = parseFloat(a.packSize);
                  valueB = parseFloat(b.packSize);
                  break;
              case 8: // Unit
                  valueA = a.unit.toLowerCase();
                  valueB = b.unit.toLowerCase();
                  break;
              case 9: // Quantity
                  valueA = parseFloat(a.quantity); // Parse density as integer
                  valueB = parseFloat(b.quantity);
                  break;    
          }
          return (valueA < valueB ? -1 : 1) * sortDirection;
      });

      createTableRows();
  }

  createTableRows();