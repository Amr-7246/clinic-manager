import ControlPanal from "./components/ControlPanal";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <section className="flex flex-col lg:flex-row gap-5" >
      <ControlPanal/>
      {children}
    </section>
  );
}
