import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-muted-foreground">Página no encontrada</p>
        <Link 
          href="/login" 
          className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
