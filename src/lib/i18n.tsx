import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "es" | "ca";

const translations = {
  en: {
    nav: { catalog: "Catalog", admin: "Admin", contact: "Contact Us" },
    hero: {
      title: "Recycled PP Plastic from Superyacht Refits",
      subtitle: "MB92 Barcelona repurposes polypropylene waste from world-class shipyard operations. Browse our available stock and inquire directly.",
      cta: "View Catalog",
    },
    catalog: {
      title: "Available PP Stock",
      condition: "Condition",
      quantity: "Quantity",
      kg: "kg",
      inquire: "Inquire",
      available: "Available",
      limited: "Limited",
      noStock: "No stock items available at the moment.",
      searchPh: "Search stock...",
      all: "All",
    },
    inquiry: {
      title: "Inquire About This Stock",
      name: "Company Name",
      email: "Email",
      phone: "Phone",
      message: "Message",
      send: "Send Inquiry",
      success: "Inquiry sent successfully! We'll get back to you soon.",
      namePh: "Your company name",
      emailPh: "email@company.com",
      phonePh: "+34 ...",
      messagePh: "Tell us about your needs...",
    },
    admin: {
      title: "Admin Dashboard",
      stock: "Manage Stock",
      inquiries: "Customer Inquiries",
      addStock: "Add Stock Item",
      editStock: "Edit Stock",
      deleteConfirm: "Are you sure you want to delete this item?",
      name: "Item Name",
      description: "Description",
      condition: "Condition",
      quantity: "Quantity (kg)",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      noInquiries: "No inquiries yet.",
      date: "Date",
      company: "Company",
      email: "Email",
      phone: "Phone",
      message: "Message",
      stockItem: "Stock Item",
      good: "Good",
      fair: "Fair",
      excellent: "Excellent",
      back: "← Back to Catalog",
      login: "Admin Login",
      password: "Password",
      enter: "Enter",
      wrongPassword: "Incorrect password",
      wrongCredentials: "Incorrect email or password",
      emailPh: "admin@mb92.com",
      changeImage: "Change image",
      uploadImage: "Upload image",
    },
    footer: {
      rights: "© 2026 MB92 Barcelona. Sustainability through innovation.",
    },
  },
  es: {
    nav: { catalog: "Catálogo", admin: "Admin", contact: "Contáctenos" },
    hero: {
      title: "Plástico PP Reciclado de Reformas de Superyates",
      subtitle: "MB92 Barcelona reutiliza residuos de polipropileno de operaciones de astillero de clase mundial. Consulte nuestro stock disponible y realice su consulta directamente.",
      cta: "Ver Catálogo",
    },
    catalog: {
      title: "Stock PP Disponible",
      condition: "Condición",
      quantity: "Cantidad",
      kg: "kg",
      inquire: "Consultar",
      available: "Disponible",
      limited: "Limitado",
      noStock: "No hay artículos en stock en este momento.",
    },
    inquiry: {
      title: "Consultar Sobre Este Stock",
      name: "Nombre de Empresa",
      email: "Correo Electrónico",
      phone: "Teléfono",
      message: "Mensaje",
      send: "Enviar Consulta",
      success: "¡Consulta enviada con éxito! Nos pondremos en contacto pronto.",
      namePh: "Nombre de su empresa",
      emailPh: "email@empresa.com",
      phonePh: "+34 ...",
      messagePh: "Cuéntenos sus necesidades...",
    },
    admin: {
      title: "Panel de Administración",
      stock: "Gestionar Stock",
      inquiries: "Consultas de Clientes",
      addStock: "Añadir Artículo",
      editStock: "Editar Stock",
      deleteConfirm: "¿Está seguro de que desea eliminar este artículo?",
      name: "Nombre del Artículo",
      description: "Descripción",
      condition: "Condición",
      quantity: "Cantidad (kg)",
      save: "Guardar",
      cancel: "Cancelar",
      delete: "Eliminar",
      noInquiries: "No hay consultas aún.",
      date: "Fecha",
      company: "Empresa",
      email: "Correo",
      phone: "Teléfono",
      message: "Mensaje",
      stockItem: "Artículo",
      good: "Bueno",
      fair: "Regular",
      excellent: "Excelente",
      back: "← Volver al Catálogo",
      login: "Acceso Admin",
      password: "Contraseña",
      enter: "Entrar",
      wrongPassword: "Contraseña incorrecta",
    },
    footer: {
      rights: "© 2026 MB92 Barcelona. Sostenibilidad a través de la innovación.",
    },
  },
  ca: {
    nav: { catalog: "Catàleg", admin: "Admin", contact: "Contacta'ns" },
    hero: {
      title: "Plàstic PP Reciclat de Reformes de Superxots",
      subtitle: "MB92 Barcelona reutilitza residus de polipropilè d'operacions de drassana de classe mundial. Consulteu el nostre estoc disponible i feu la vostra consulta directament.",
      cta: "Veure Catàleg",
    },
    catalog: {
      title: "Estoc PP Disponible",
      condition: "Condició",
      quantity: "Quantitat",
      kg: "kg",
      inquire: "Consultar",
      available: "Disponible",
      limited: "Limitat",
      noStock: "No hi ha articles en estoc en aquest moment.",
    },
    inquiry: {
      title: "Consultar Sobre Aquest Estoc",
      name: "Nom de l'Empresa",
      email: "Correu Electrònic",
      phone: "Telèfon",
      message: "Missatge",
      send: "Enviar Consulta",
      success: "Consulta enviada amb èxit! Ens posarem en contacte aviat.",
      namePh: "Nom de la vostra empresa",
      emailPh: "email@empresa.com",
      phonePh: "+34 ...",
      messagePh: "Expliqueu-nos les vostres necessitats...",
    },
    admin: {
      title: "Panell d'Administració",
      stock: "Gestionar Estoc",
      inquiries: "Consultes de Clients",
      addStock: "Afegir Article",
      editStock: "Editar Estoc",
      deleteConfirm: "Esteu segur que voleu eliminar aquest article?",
      name: "Nom de l'Article",
      description: "Descripció",
      condition: "Condició",
      quantity: "Quantitat (kg)",
      save: "Desar",
      cancel: "Cancel·lar",
      delete: "Eliminar",
      noInquiries: "No hi ha consultes encara.",
      date: "Data",
      company: "Empresa",
      email: "Correu",
      phone: "Telèfon",
      message: "Missatge",
      stockItem: "Article",
      good: "Bo",
      fair: "Regular",
      excellent: "Excel·lent",
      back: "← Tornar al Catàleg",
      login: "Accés Admin",
      password: "Contrasenya",
      enter: "Entrar",
      wrongPassword: "Contrasenya incorrecta",
    },
    footer: {
      rights: "© 2026 MB92 Barcelona. Sostenibilitat a través de la innovació.",
    },
  },
};

type Translations = typeof translations.en;

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("en");
  const t = translations[lang];
  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};
