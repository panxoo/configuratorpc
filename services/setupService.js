const parametreService = require('./parametreService');
const partenaireService = require('./partenairesService');

const addMarqueInitialData = async () => {
  try {
    let existsMarque = await parametreService.existsMarque();
    if (existsMarque) {
      console.log('Marques already exist, no need to add initial data.');
      return;
    }
    let initialMarques = [
      { name: 'ASUS' },
      { name: 'MSI' },
      { name: 'Corsair' },
      { name: 'Acer' },
      { name: 'Lenovo' },
      { name: 'HP' },
      { name: 'Dell' },
      { name: 'Altyk' },
      { name: 'Ordissimo' },
      { name: 'Western Digital' },
    ];
    await parametreService.createManyMarque(initialMarques);

    console.log('Initial Marques added successfully!');
  } catch (err) {
    console.error('Error adding initial Marques:', err);
  }
};

const addCategoryInitialData = async () => {
  try {
    let existsCat = await parametreService.existsCategory();
    if (existsCat) {
      console.log('Categories already exist, no need to add initial data.');
      return;
    }
    let initialCategories = [
      { name: 'Processeur (CPU)' },
      { name: 'Carte graphique (GPU)' },
      { name: 'Mémoire vive (RAM)' },
      { name: 'Carte mère' },
      { name: 'Stockage (SSD/HDD)' },
      { name: 'Alimentation' },
      { name: 'Refroidissement' },
      { name: 'Boîtier PC' },
      { name: 'Lecteur optique' },
      { name: 'Carte son' },
    ];

    await parametreService.createManyCategory(initialCategories);

    console.log('Initial categories added successfully!');
  } catch (err) {
    console.error('Error adding initial categories:', err);
  }
};

const addPartenaireInitialData = async () => {
  try {
    let existsPat = await partenaireService.existsPartenaires();
    if (existsPat) {
      console.log('Partenaires already exist, no need to add initial data.');
      return;
    }

    const initialPartenaires = [
      { name: 'PcComponentes', url: 'https://www.pccomponentes.com', commission: 5, isActive: true },
      { name: 'Amazon ES', url: 'https://www.amazon.es', commission: 7, isActive: true },
      { name: 'Coolmod', url: 'https://www.coolmod.com', commission: 6, isActive: true },
      { name: 'Alternate', url: 'https://www.alternate.es', commission: 5, isActive: true },
      { name: 'LDLC', url: 'https://www.ldlc.com', commission: 4, isActive: true },
      { name: 'Materiel.net', url: 'https://www.materiel.net', commission: 6, isActive: true },
      { name: 'Caseking', url: 'https://www.caseking.de', commission: 5, isActive: true },
      { name: 'Overclockers UK', url: 'https://www.overclockers.co.uk', commission: 4, isActive: true },
      { name: 'Newegg', url: 'https://www.newegg.com', commission: 7, isActive: true },
      { name: 'Aliexpress', url: 'https://www.aliexpress.com', commission: 8, isActive: true },
      { name: 'eBay', url: 'https://www.ebay.com', commission: 9, isActive: true },
      { name: 'Mindfactory', url: 'https://www.mindfactory.de', commission: 5, isActive: true },
      { name: 'Scan UK', url: 'https://www.scan.co.uk', commission: 6, isActive: true },
      { name: 'Computer Universe', url: 'https://www.computeruniverse.net', commission: 4, isActive: true },
      { name: 'Redcoon', url: 'https://www.redcoon.com', commission: 5, isActive: true },
    ];

    await partenaireService.createManyPartenaires(initialPartenaires);

    console.log('Initial partenaire added successfully!');
  } catch (err) {
    console.error('Error adding initial partenaire:', err);
  }
};

module.exports.setupInitialData = async () => {
  await addCategoryInitialData();
  await addMarqueInitialData();
  await addPartenaireInitialData();
};
