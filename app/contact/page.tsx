import ContactForm from "../../components/ContactForm";

export default function Contact() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-6 text-[#38b6ff]">
          Contactez-nous
        </h1>
        <p className="text-lg text-gray-700 mb-8 max-w-3xl">
          Vous souhaitez en savoir plus sur nos bornes ou demander un devis ?
          Remplissez le formulaire ci-dessous, et notre équipe vous contactera
          dans les plus brefs délais.
        </p>
        <ContactForm />
      </div>
    </section>
  );
}
