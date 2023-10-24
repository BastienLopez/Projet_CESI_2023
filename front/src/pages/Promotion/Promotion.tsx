import { format } from "date-fns";
import { useState } from "react";
import Modal from "react-modal";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Promotion } from "../../types/Promotion";
import "./Promotion.css";

function PromotionTable() {
  const currentDate = new Date();
  const formattedDate = format(currentDate, "dd/MM/yyyy HH:mm");
  // Données random tableau CDA
  const [promotionsCDA, setPromotionsCDA] = useState<Promotion[]>([
    {
      code: "8BFAZEYB",
      Name: "Developpement DEVOPS",
      room: "A101",
      datetime_m: currentDate,
      datetime_a: currentDate,
      intervenant: "Arturito Vigolini",
      etatIntervenant: "Disponible",
      etatAgreg: "Valide",
      convention: "en attente",
      qualification: "Invalide",
      commentaire: " ",
    },
  ]);

  // Données random tableau CPD
  const [promotionsCPD, setPromotionsCPD] = useState<Promotion[]>([
    {
      code: "8BFAZEYB",
      Name: "Management",
      room: "005",
      datetime_m: currentDate,
      datetime_a: currentDate,
      intervenant: "Manuel Gonzalez",
      etatIntervenant: "En attente",
      etatAgreg: "Invalide",
      convention: "en attente",
      qualification: "Valide",
      commentaire: " ",
    },
  ]);

  // Données random tableau ASR
  const [promotionsASR, setPromotionsASR] = useState<Promotion[]>([
    {
      code: "8BFFASB",
      Name: "Management et droit social",
      room: "A101",
      datetime_m: currentDate,
      datetime_a: currentDate,
      intervenant: "Valerie Bogota",
      etatIntervenant: "Disponible",
      etatAgreg: "Valide",
      convention: "en attente",
      qualification: "Invalide",
      commentaire: " ",
    },
  ]);

  // Données random tableau GMSI
  const [promotionsGMSI, setPromotionsGMSI] = useState<Promotion[]>([
    {
      code: "8BXAXAB",
      Name: "Performance et budget",
      room: "117",
      datetime_m: currentDate,
      datetime_a: currentDate,
      intervenant: "Karim Vigoli",
      etatIntervenant: "Disponible",
      etatAgreg: "Valide",
      convention: "en attente",
      qualification: "Invalide",
      commentaire: " ",
    },
  ]);

  // Données random tableau DEVREN
  const [promotionsDEVREN, setPromotionsDEVREN] = useState<Promotion[]>([
    {
      code: "8BFVACXXYB",
      Name: "Retour d'expérience et projection",
      room: "115",
      datetime_m: currentDate,
      datetime_a: currentDate,
      intervenant: "Antonio Aristo",
      etatIntervenant: "Disponible",
      etatAgreg: "Valide",
      convention: "en attente",
      qualification: "Invalide",
      commentaire: " ",
    },
  ]);

  // Données random tableau RAN
  const [promotionsRAN, setPromotionsRAN] = useState<Promotion[]>([
    {
      code: "8BFAFZB",
      Name: "Team building",
      room: "119",
      datetime_m: currentDate,
      datetime_a: currentDate,
      intervenant: "Dorian Danube",
      etatIntervenant: "Disponible",
      etatAgreg: "Valide",
      convention: "en attente",
      qualification: "Invalide",
      commentaire: " ",
    },
  ]);

  // Choix du formulaire dans le menu déroulant
  const [IntervenantOptions, updateIntervenantsOptions] = useState([
    "Arthur Vigolini",
    "Manuel Gonzalez",
    "Valerie Bogota",
    "Karim Vigoli",
    "Antonio Aristo",
    "Dorian Danube",
  ]);
  const [etatIntervenantOptions] = useState([
    "Disponible",
    "En attente",
    "Occupé",
  ]);
  const [etatAgregOptions] = useState([
    "Valide",
    "En cours de validation",
    "Invalide",
  ]);
  const [conventionOptions] = useState(["Envoyé", "en attente", "Refusé"]);
  const [qualificationOptions] = useState([
    "Valide",
    "En cours de validation",
    "Invalide",
  ]);

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  //Modal = formulaire
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  //Afficher l'onglet "CDA" par défaut
  const [activeTab, setActiveTab] = useState("CDA");

  //Supp intervenant du tableau si select
  const handleRemoveItem = (intervenant: string) => {
    updateIntervenantsOptions(
      IntervenantOptions.filter((item) => item !== intervenant)
    );
  };

  const [formData, setFormData] = useState<Promotion>({
    code: "",
    Name: "",
    room: "",
    datetime_m: new Date(),
    datetime_a: new Date(),
    intervenant: IntervenantOptions[0],
    etatIntervenant: etatIntervenantOptions[0],
    etatAgreg: etatAgregOptions[0],
    convention: conventionOptions[0],
    qualification: qualificationOptions[0],
    commentaire: "",
  });

  const resetForm = () => {
    setFormData({
      code: "",
      Name: "",
      room: "",
      datetime_m: new Date(),
      datetime_a: new Date(),
      intervenant: IntervenantOptions[0],
      etatIntervenant: etatIntervenantOptions[0],
      etatAgreg: etatAgregOptions[0],
      convention: conventionOptions[0],
      qualification: qualificationOptions[0],
      commentaire: "",
    });
    setSelectedIndex(-1);
  };

  //formu ajout vide
  const handleAdd = () => {
    setSelectedIndex(-1);
    setFormData({
      code: "",
      Name: "",
      room: "",
      datetime_m: new Date(),
      datetime_a: new Date(),
      intervenant: "",
      etatIntervenant: "",
      etatAgreg: "",
      convention: "",
      qualification: "",
      commentaire: "",
    });

    if (activeTab === "CDA") {
      setIsModalOpen(true);
    } else if (activeTab === "CPD") {
      setIsModalOpen(true);
    } else if (activeTab === "ASR") {
      setIsModalOpen(true);
    } else if (activeTab === "GMSI") {
      setIsModalOpen(true);
    } else if (activeTab === "DEVREN") {
      setIsModalOpen(true);
    } else if (activeTab === "RAN") {
      setIsModalOpen(true);
    }
  };

  //formu envoi données
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedIndex === -1) {
      if (activeTab === "CDA") {
        setPromotionsCDA([...promotionsCDA, formData]);
      } else if (activeTab === "CPD") {
        setPromotionsCPD([...promotionsCPD, formData]);
      } else if (activeTab === "ASR") {
        setPromotionsASR([...promotionsASR, formData]);
      } else if (activeTab === "GMSI") {
        setPromotionsGMSI([...promotionsGMSI, formData]);
      } else if (activeTab === "DEVREN") {
        setPromotionsDEVREN([...promotionsDEVREN, formData]);
      } else if (activeTab === "RAN") {
        setPromotionsRAN([...promotionsRAN, formData]);
      }
    } else {
      if (activeTab === "CDA") {
        setPromotionsCDA([
          ...promotionsCDA.slice(0, selectedIndex),
          formData,
          ...promotionsCDA.slice(selectedIndex + 1),
        ]);
      } else if (activeTab === "CPD") {
        setPromotionsCPD([
          ...promotionsCPD.slice(0, selectedIndex),
          formData,
          ...promotionsCPD.slice(selectedIndex + 1),
        ]);
      } else if (activeTab === "ASR") {
        setPromotionsASR([
          ...promotionsASR.slice(0, selectedIndex),
          formData,
          ...promotionsASR.slice(selectedIndex + 1),
        ]);
      } else if (activeTab === "GMSI") {
        setPromotionsGMSI([
          ...promotionsGMSI.slice(0, selectedIndex),
          formData,
          ...promotionsGMSI.slice(selectedIndex + 1),
        ]);
      } else if (activeTab === "DEVREN") {
        setPromotionsDEVREN([
          ...promotionsDEVREN.slice(0, selectedIndex),
          formData,
          ...promotionsDEVREN.slice(selectedIndex + 1),
        ]);
      } else if (activeTab === "RAN") {
        setPromotionsRAN([
          ...promotionsRAN.slice(0, selectedIndex),
          formData,
          ...promotionsRAN.slice(selectedIndex + 1),
        ]);
      }
    }

    resetForm();
  };

  //formu modif données
  const handleEdit = (index: number) => {
    setSelectedIndex(index);
    if (activeTab === "CDA") {
      setFormData(promotionsCDA[index]);
    } else if (activeTab === "CPD") {
      setFormData(promotionsCPD[index]);
    } else if (activeTab === "ASR") {
      setFormData(promotionsASR[index]);
    } else if (activeTab === "GMSI") {
      setFormData(promotionsGMSI[index]);
    } else if (activeTab === "DEVREN") {
      setFormData(promotionsDEVREN[index]);
    } else if (activeTab === "RAN") {
      setFormData(promotionsRAN[index]);
    }

    setIsModalOpen(true);
  };

  //formu delete données
  const handleDelete = () => {
    if (activeTab === "CDA") {
      const updatedPromotionsCDA = promotionsCDA.filter(
        (promotion, index) => !selectedIndexes.includes(index)
      );
      setPromotionsCDA(updatedPromotionsCDA);
    } else if (activeTab === "CPD") {
      const updatedPromotionsCPD = promotionsCPD.filter(
        (promotion, index) => !selectedIndexes.includes(index)
      );
      setPromotionsCPD(updatedPromotionsCPD);
    } else if (activeTab === "ASR") {
      const updatedPromotionsASR = promotionsASR.filter(
        (promotion, index) => !selectedIndexes.includes(index)
      );
      setPromotionsASR(updatedPromotionsASR);
    } else if (activeTab === "GMSI") {
      const updatedPromotionsGMSI = promotionsGMSI.filter(
        (promotion, index) => !selectedIndexes.includes(index)
      );
      setPromotionsGMSI(updatedPromotionsGMSI);
    } else if (activeTab === "DEVREN") {
      const updatedPromotionsDEVREN = promotionsDEVREN.filter(
        (promotion, index) => !selectedIndexes.includes(index)
      );
      setPromotionsDEVREN(updatedPromotionsDEVREN);
    } else if (activeTab === "RAN") {
      const updatedPromotionsRAN = promotionsRAN.filter(
        (promotion, index) => !selectedIndexes.includes(index)
      );
      setPromotionsRAN(updatedPromotionsRAN);
    }

    setSelectedIndexes([]);
    setIsModalOpen(false);
  };

  //Checkbox
  const toggleSelect = (index: number) => {
    const newSelectedIndexes = selectedIndexes.includes(index)
      ? selectedIndexes.filter((selectedIndex) => selectedIndex !== index)
      : [...selectedIndexes, index];

    setSelectedIndexes(newSelectedIndexes);
  };

  //select onglet utilisé
  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
    setActiveTab(
      index === 0
        ? "CDA"
        : index === 1
        ? "CPD"
        : index === 2
        ? "ASR"
        : index === 3
        ? "GMSI"
        : index === 4
        ? "DEVREN"
        : "RAN"
    );
  };

  return (
    <div>
      <h2>Liste des promotions</h2>
      <Tabs selectedIndex={activeTabIndex} onSelect={handleTabChange}>
        <TabList>
          <Tab>CDA</Tab>
          <Tab>CPD</Tab>
          <Tab>ASR</Tab>
          <Tab>GMSI</Tab>
          <Tab>DEVREN</Tab>
          <Tab>RAN 2022</Tab>
        </TabList>

        <br></br>
        <button
          style={{ borderRadius: "5px", marginBottom: "10px" }}
          onClick={handleAdd}
        >
          Ajouter
        </button>
        {selectedIndexes.length > 0 && (
          <button
            style={{ borderRadius: "5px", marginLeft: "10px" }}
            onClick={handleDelete}
          >
            Supprimer
          </button>
        )}

        {/* Onglet CDA */}
        <TabPanel>
          <table>
            <thead>
              <tr>
                <th style={{ padding: "0 5px", textAlign: "center" }}>
                  Checkbox
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Code
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Room
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Date Time M
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Date Time A
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Intervenant
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Etat Intervenant
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Etat Agreg
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Convention
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Qualification
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Commentaire
                </th>
              </tr>
            </thead>
            <tbody>
              {promotionsCDA.map((promotion, index) => (
                <tr key={index}>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedIndexes.includes(index)}
                      onChange={() => toggleSelect(index)}
                    />
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.code}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.Name}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.room}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {format(new Date(promotion.datetime_m), "dd/MM/yyyy HH:mm")}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {format(new Date(promotion.datetime_a), "dd/MM/yyyy HH:mm")}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.intervenant}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.etatIntervenant}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.etatAgreg}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.convention}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.qualification}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.commentaire}
                  </td>
                  <td>
                    <button
                      style={{ borderRadius: "5px", marginRight: "30px" }}
                      onClick={() => handleEdit(index)}
                    >
                      Modifier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabPanel>

        {/* Onglet CPD */}
        <TabPanel>
          <table>
            <thead>
              <tr>
                <th style={{ padding: "0 5px", textAlign: "center" }}>
                  Checkbox
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Code
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Room
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Date Time M
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Date Time A
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Intervenant
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Etat Intervenant
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Etat Agreg
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Convention
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Qualification
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Commentaire
                </th>
              </tr>
            </thead>
            <tbody>
              {promotionsCPD.map((promotion, index) => (
                <tr key={index}>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedIndexes.includes(index)}
                      onChange={() => toggleSelect(index)}
                    />
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.code}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.Name}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.room}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {format(new Date(promotion.datetime_m), "dd/MM/yyyy HH:mm")}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {format(new Date(promotion.datetime_a), "dd/MM/yyyy HH:mm")}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.intervenant}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.etatIntervenant}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.etatAgreg}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.convention}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.qualification}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.commentaire}
                  </td>
                  <td>
                    <button
                      style={{ borderRadius: "5px", marginRight: "30px" }}
                      onClick={() => handleEdit(index)}
                    >
                      Modifier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabPanel>

        {/* Onglet ASR */}
        <TabPanel>
          <table>
            <thead>
              <tr>
                <th style={{ padding: "0 5px", textAlign: "center" }}>
                  Checkbox
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Code
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Room
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Date Time M
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Date Time A
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Intervenant
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Etat Intervenant
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Etat Agreg
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Convention
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Qualification
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Commentaire
                </th>
              </tr>
            </thead>
            <tbody>
              {promotionsASR.map((promotion, index) => (
                <tr key={index}>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedIndexes.includes(index)}
                      onChange={() => toggleSelect(index)}
                    />
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.code}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.Name}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.room}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {format(new Date(promotion.datetime_m), "dd/MM/yyyy HH:mm")}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {format(new Date(promotion.datetime_a), "dd/MM/yyyy HH:mm")}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.intervenant}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.etatIntervenant}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.etatAgreg}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.convention}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.qualification}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.commentaire}
                  </td>
                  <td>
                    <button
                      style={{ borderRadius: "5px", marginRight: "30px" }}
                      onClick={() => handleEdit(index)}
                    >
                      Modifier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabPanel>

        {/* Onglet GMSI */}
        <TabPanel>
          <table>
            <thead>
              <tr>
                <th style={{ padding: "0 5px", textAlign: "center" }}>
                  Checkbox
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Code
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Room
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Date Time M
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Date Time A
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Intervenant
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Etat Intervenant
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Etat Agreg
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Convention
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Qualification
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Commentaire
                </th>
              </tr>
            </thead>
            <tbody>
              {promotionsGMSI.map((promotion, index) => (
                <tr key={index}>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedIndexes.includes(index)}
                      onChange={() => toggleSelect(index)}
                    />
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.code}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.Name}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.room}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {format(new Date(promotion.datetime_m), "dd/MM/yyyy HH:mm")}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {format(new Date(promotion.datetime_a), "dd/MM/yyyy HH:mm")}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.intervenant}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.etatIntervenant}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.etatAgreg}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.convention}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.qualification}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.commentaire}
                  </td>
                  <td>
                    <button
                      style={{ borderRadius: "5px", marginRight: "30px" }}
                      onClick={() => handleEdit(index)}
                    >
                      Modifier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabPanel>

        {/* Onglet DEVREN */}
        <TabPanel>
          <table>
            <thead>
              <tr>
                <th style={{ padding: "0 5px", textAlign: "center" }}>
                  Checkbox
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Code
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Room
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Date Time M
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Date Time A
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Intervenant
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Etat Intervenant
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Etat Agreg
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Convention
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Qualification
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Commentaire
                </th>
              </tr>
            </thead>
            <tbody>
              {promotionsDEVREN.map((promotion, index) => (
                <tr key={index}>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedIndexes.includes(index)}
                      onChange={() => toggleSelect(index)}
                    />
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.code}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.Name}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.room}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {format(new Date(promotion.datetime_m), "dd/MM/yyyy HH:mm")}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {format(new Date(promotion.datetime_a), "dd/MM/yyyy HH:mm")}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.intervenant}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.etatIntervenant}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.etatAgreg}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.convention}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.qualification}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.commentaire}
                  </td>
                  <td>
                    <button
                      style={{ borderRadius: "5px", marginRight: "30px" }}
                      onClick={() => handleEdit(index)}
                    >
                      Modifier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabPanel>

        {/* Onglet RAN */}
        <TabPanel>
          <table>
            <thead>
              <tr>
                <th style={{ padding: "0 5px", textAlign: "center" }}>
                  Checkbox
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Code
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Room
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Date Time M
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Date Time A
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Intervenant
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Etat Intervenant
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Etat Agreg
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Convention
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Qualification
                </th>
                <th
                  style={{
                    padding: "0 5px",
                    backgroundColor: "gray",
                    textAlign: "center",
                  }}
                >
                  Commentaire
                </th>
              </tr>
            </thead>
            <tbody>
              {promotionsRAN.map((promotion, index) => (
                <tr key={index}>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedIndexes.includes(index)}
                      onChange={() => toggleSelect(index)}
                    />
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.code}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.Name}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.room}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {format(new Date(promotion.datetime_m), "dd/MM/yyyy HH:mm")}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {format(new Date(promotion.datetime_a), "dd/MM/yyyy HH:mm")}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.intervenant}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.etatIntervenant}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.etatAgreg}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.convention}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.qualification}
                  </td>
                  <td
                    style={{
                      padding: "0 15px",
                      backgroundColor: "#DFE0E7",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {promotion.commentaire}
                  </td>
                  <td>
                    <button
                      style={{ borderRadius: "5px", marginRight: "30px" }}
                      onClick={() => handleEdit(index)}
                    >
                      Modifier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabPanel>

        {/* Affichage pour savoir si bon onglet select */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          {activeTab === "CDA" && <p>Onglet actif : CDA</p>}
          {activeTab === "CPD" && <p>Onglet actif : CPD</p>}
          {activeTab === "ASR" && <p>Onglet actif : ASR</p>}
          {activeTab === "GMSI" && <p>Onglet actif : GMSI</p>}
          {activeTab === "DEVREN" && <p>Onglet actif : DEVREN</p>}
          {activeTab === "RAN" && <p>Onglet actif : RAN</p>}
        </div>
      </Tabs>

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <h2>
          {selectedIndexes.length === 0 ? "Ajouter" : "Modifier"} une promotion
        </h2>
        <span className="close-button" onClick={() => setIsModalOpen(false)}>
          &#x2715; {/*croix pour fermer formu */}
        </span>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="datetime_m">Date et heure (matin) :</label>
            <br></br>
            <input
              type="datetime-local"
              id="datetime_m"
              value={new Date(formData.datetime_m).toISOString().slice(0, -8)}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  datetime_m: new Date(),
                })
              }
            />
          </div>
          <div>
            <label htmlFor="datetime_a">Date et heure (après-midi) :</label>
            <br></br>
            <input
              type="datetime-local"
              id="datetime_a"
              value={new Date(formData.datetime_a).toISOString().slice(0, -8)}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  datetime_a: new Date(),
                })
              }
            />
          </div>
          <div>
            <label htmlFor="code">Code :</label>
            <br></br>
            <input
              type="text"
              id="code"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="name">Nom :</label>
            <br></br>
            <input
              type="text"
              id="name"
              value={formData.Name}
              onChange={(e) =>
                setFormData({ ...formData, Name: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="ROOM">Salle :</label>
            <br></br>
            <input
              type="text"
              id="room"
              value={formData.room}
              onChange={(e) =>
                setFormData({ ...formData, room: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="intervenant">Intervenant :</label>
            <br></br>
            <select
              id="Intervenant"
              value={formData.intervenant}
              onChange={(e) =>
                setFormData({ ...formData, intervenant: e.target.value })
              }
            >
              {IntervenantOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="etatIntervenant">Etat Intervenant :</label>
            <br></br>
            <select
              id="etatIntervenant"
              value={formData.etatIntervenant}
              onChange={(e) =>
                setFormData({ ...formData, etatIntervenant: e.target.value })
              }
            >
              {etatIntervenantOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="etatAgreg">Etat Agregregation :</label>
            <br></br>
            <select
              id="etatAgreg"
              value={formData.etatAgreg}
              onChange={(e) =>
                setFormData({ ...formData, etatAgreg: e.target.value })
              }
            >
              {etatAgregOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="convention">Convention :</label>
            <br></br>
            <select
              id="convention"
              value={formData.convention}
              onChange={(e) =>
                setFormData({ ...formData, convention: e.target.value })
              }
            >
              {conventionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="qualification">Qualification :</label>
            <br></br>
            <select
              id="qualification"
              value={formData.qualification}
              onChange={(e) =>
                setFormData({ ...formData, qualification: e.target.value })
              }
            >
              {qualificationOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="commentaire">Commentaire :</label>
            <br></br>
            <input
              type="text"
              id="commentaire"
              value={formData.commentaire}
              onChange={(e) =>
                setFormData({ ...formData, commentaire: e.target.value })
              }
            />
          </div>
          <button
            style={{ borderRadius: "5px" }}
            onClick={() => handleRemoveItem(formData.intervenant)}
            type="submit"
          >
            {" "}
            {selectedIndex === -1 ? "Ajouter" : "Enregistrer"}
          </button>
          <button
            style={{ borderRadius: "5px" }}
            onClick={() => setIsModalOpen(false)}
          >
            Annuler
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default PromotionTable;
