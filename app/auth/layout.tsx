export default function authLayout({children,}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-full bg-cover bg-center">
      <div className={"relative flex min-h-screen items-center justify-center w-full"}>
            {children}
      </div>
    </div>
  );
}
