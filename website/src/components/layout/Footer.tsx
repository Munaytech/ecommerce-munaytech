import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react"; // Si deseas íconos

interface FooterProps {
  dataFooter?: {
    title: string;
    links: {
      link: string;
      title: string;
    }[];
  }[];
}

const Footer: React.FC<FooterProps> = ({ dataFooter }) => {
  const footerData = dataFooter == null ? data : dataFooter;

  return (
    <>
      <footer className="bg-secundary text-white">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 px-6">
          {footerData.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4 text-white">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.link}
                      className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center text-sm py-4 bg-secundary text-gray-400">
          © 2025 <span className="font-semibold text-white">Munay Tech</span>.
          Todos los derechos reservados.
        </div>
      </footer>
    </>
  );
};

const data = [
  {
    title: "Te ayudamos",
    links: [
      { title: "Preguntas frecuentes", link: "#" },
      { title: "Contacto", link: "#" },
      { title: "Términos y condiciones", link: "#" },
      { title: "Políticas de privacidad", link: "#" },
    ],
  },
  {
    title: "Síguenos",
    links: [
      { title: "Facebook", link: "#" },
      { title: "Instagram", link: "#" },
      { title: "Twitter", link: "#" },
    ],
  },
  {
    title: "Métodos de pago",
    links: [
      { title: "Visa", link: "#" },
      { title: "Mastercard", link: "#" },
      { title: "Paypal", link: "#" },
    ],
  },
  {
    title: "Newsletter",
    links: [{ title: "Suscríbete a nuestro newsletter", link: "#" }],
  },
];

export default Footer;
