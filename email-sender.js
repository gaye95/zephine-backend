// email-sender.js
const nodemailer = require('nodemailer');

const sendConfirmationEmail = async (formData) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"Catho Speed Dating" <${process.env.EMAIL_USER}>`,
    to: 'oog.gaye@gmail.com',
    subject: 'Nouvelle inscription confirmée',
    html: `
      <h1>Nouvelle inscription</h1>
      <p>Détails du participant :</p>
      <ul>
        <li><strong>Nom :</strong> ${formData.nom}</li>
        <li><strong>Email :</strong> ${formData.email}</li>
        <li><strong>Téléphone :</strong> ${formData.telephone}</li>
        <li><strong>Genre :</strong> ${formData.genre === 'male' ? 'Homme' : 'Femme'}</li>
        <li><strong>Paroisse :</strong> ${formData.paroisse}</li>
        <li><strong>Âge :</strong> ${formData.age}</li>
      </ul>
      <p><strong>Date d'inscription :</strong> ${formData.date_inscription}</p>
      <p><strong>Montant payé :</strong> 2000 FCFA</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email envoyé avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email :', error);
    throw error;
  }
};

module.exports = { sendConfirmationEmail };