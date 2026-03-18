import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="not-found__code">404</p>
      <h1 className="not-found__title">Página não encontrada</h1>
      <p className="not-found__description">
        O conteúdo que você tentou acessar não está disponível no momento.
      </p>
      <Link href="/" className="not-found__link">
        Voltar para a home
      </Link>
    </main>
  );
}
