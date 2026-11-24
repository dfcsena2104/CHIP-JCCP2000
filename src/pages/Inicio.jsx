import { mejoras } from "../data/mejoras.js";
import TarjetaMejora from "../components/TarjetaMejora.jsx";

const etapas = [
  "Diseñar el MVP con las funciones prioritarias.",
  "Probar el prototipo en entornos reales.",
  "Recoger la retroalimentación de usuarios finales.",
  "Iterar las mejoras y preparar la versión comercial.",
];

export default function Inicio() {
  return (
    <>
      <header>
        <img src="/img/logo.png" alt="Logo CHIP JCCP2000" className="logo" />
        <h1>CHIP JCCP2000</h1>
        <p>Control de acceso inteligente para hogares y empresas</p>
      </header>

      <main>
        <section>
          <h2>Resumen del proyecto</h2>
          <p>
            El CHIP JCCP2000 se integra a cerraduras inteligentes para ofrecer un acceso
            más seguro, ágil y controlado. Sus mejoras se organizan en las siguientes áreas:
          </p>
        </section>

        <section>
          <h2>Áreas de mejora</h2>
          <div className="tarjetas">
            {mejoras.map((mejora) => (
              <TarjetaMejora key={mejora.slug} mejora={mejora} />
            ))}
          </div>
        </section>

        <section>
          <h2>Etapas de desarrollo</h2>
          <ol className="lista-etapas">
            {etapas.map((etapa) => (
              <li key={etapa}>{etapa}</li>
            ))}
          </ol>
        </section>
      </main>
    </>
  );
}