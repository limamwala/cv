import React, { useState } from "react";
import "./CandidatCV.css";

function CandidatCV() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
    linkedin: "",
    photo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:5000/api/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("CV enregistré avec succès !");
        setFormData({
          name: "",
          title: "",
          email: "",
          phone: "",
          address: "",
          summary: "",
          experience: "",
          education: "",
          skills: "",
          linkedin: "",
          photo: "",
        });
      } else {
        alert("Erreur lors de l'enregistrement du CV");
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <div className="main-container">
      {/* FORMULAIRE */}
      <div className="form-section">
        <h1 className="form-title">Créer votre CV</h1>
        <form className="form-fields" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Nom Complet" value={formData.name} onChange={handleChange} />
          <input type="text" name="title" placeholder="Titre Professionnel" value={formData.title} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="text" name="phone" placeholder="Téléphone" value={formData.phone} onChange={handleChange} />
          <input type="text" name="address" placeholder="Adresse" value={formData.address} onChange={handleChange} />
          <input type="text" name="linkedin" placeholder="Lien LinkedIn" value={formData.linkedin} onChange={handleChange} />
          <input type="file" accept="image/*" onChange={handlePhotoUpload} />
          <textarea name="summary" placeholder="Résumé Professionnel" value={formData.summary} onChange={handleChange} />
          <textarea name="experience" placeholder="Expérience" value={formData.experience} onChange={handleChange} />
          <textarea name="education" placeholder="Éducation" value={formData.education} onChange={handleChange} />
          <textarea name="skills" placeholder="Compétences" value={formData.skills} onChange={handleChange} />

          <button type="submit">📌 Enregistrer CV</button>
        </form>
      </div>

      {/* TEMPLATE CV */}
      <div className="cv-container">
        <div className="left">
          {formData.photo && (
            <img
              src={formData.photo}
              alt="Votre photo"
              className="profile-photo"
            />
          )}

          <h1>{formData.name || "Nom Complet"}</h1>
          <h2>{formData.title || "Titre Professionnel"}</h2>

          <p>📞 {formData.phone || "+216 00 000 000"}</p>
          <p>📧 {formData.email || "exemple@mail.com"}</p>
          <p>🌐 {formData.linkedin ? (
            <a href={formData.linkedin} target="_blank" rel="noopener noreferrer">
              {formData.linkedin}
            </a>
          ) : "linkedin.com/in/votreprofil"}</p>
          <p>📍 {formData.address || "Votre adresse"}</p>

          <div className="section-title">Compétences</div>
          <p>{formData.skills || "- Vos compétences principales"}</p>
        </div>

        <div className="right">
          <h3>Résumé Professionnel</h3>
          <p>{formData.summary || "Résumé de votre profil ici."}</p>

          <h3>Expérience</h3>
          <p>{formData.experience || "Vos expériences professionnelles."}</p>

          <h3>Éducation</h3>
          <p>{formData.education || "Votre parcours académique."}</p>
        </div>
      </div>
    </div>
  );
}

export default CandidatCV;
