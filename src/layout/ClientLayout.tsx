import { SidebarProvider } from "../context/SidebarContext";
import ClientHeader from "../components/header/ClientHeader";
import ClientFooter from "../components/header/ClientFooter";
import ImageHero from "../assets/image/img-hero.png";

const LayoutContent: React.FC = () => {
  return (
    <>
      <ClientHeader />
      <section
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${ImageHero})` }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold">
            Desa Wisata Banjarpanepen
          </h1>
        </div>
      </section>

      <main className="flex-grow p-25 text-center text-lg">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac nisl
          lorem. Morbi pretium purus a dolor vestibulum, vel pharetra ligula
          rhoncus. Cras sem nulla, accumsan ac molestie in, auctor sed erat.
          Quisque congue elit elit, a bibendum odio vestibulum mollis. Mauris at
          ultrices sem. Fusce vitae odio a arcu dictum blandit. In sapien neque,
          faucibus sit amet nulla blandit, mollis ultricies dolor. Phasellus
          molestie gravida ullamcorper. Nam venenatis quis ipsum at efficitur.
          Sed ut iaculis sapien. Nulla facilisi. Donec fringilla massa quis
          felis rutrum ornare. Ut cursus a eros non sollicitudin. Pellentesque
          eleifend mauris eu quam convallis, vel ultricies sem ornare. Sed
          tristique arcu massa, nec finibus purus tempor non. Pellentesque
          lacinia, quam sit amet vulputate consectetur, urna quam tincidunt
          diam, eu porttitor sem sem eu ligula. Phasellus sed feugiat libero,
          eget consequat erat. In venenatis egestas sapien, non feugiat augue
          dictum quis. Vivamus elementum dui libero, non commodo magna eleifend
          et. Integer sit amet molestie lectus, eu bibendum risus. Integer sit
          amet tellus quis tellus placerat faucibus. Etiam non urna ut nulla
          vestibulum sollicitudin. Curabitur ac ipsum ultricies, ultricies risus
          id, bibendum nisi. Maecenas placerat quam nisl, ut pellentesque eros
          vulputate quis. Aliquam rutrum leo vel purus aliquet, sed tempus orci
          suscipit. Phasellus erat dolor, blandit sit amet rhoncus vitae,
          facilisis at justo. Vestibulum finibus, ipsum convallis consequat
          tempus, nisl ex maximus nulla, vestibulum efficitur felis est vel est.
          Etiam pellentesque non nisi sit amet condimentum. Vivamus arcu ligula,
          lobortis quis cursus semper, semper elementum dolor. Duis metus nibh,
          pretium vel massa ut, aliquet elementum enim. Curabitur dolor dolor,
          placerat at eros non, rutrum vulputate ligula. Integer et ornare
          justo, sed eleifend augue. Praesent luctus efficitur aliquam. Morbi a
          scelerisque sapien, in dapibus ligula. Nunc sit amet ornare ante, sit
          amet faucibus erat. In erat dui, aliquet ut massa a, gravida semper
          sem. Aliquam erat volutpat. Integer eu congue erat. Nullam quis lectus
          eget risus rhoncus placerat quis vel augue. Donec non auctor purus, at
          volutpat purus. In mattis purus nec vulputate viverra. Cras tincidunt
          ipsum augue, fringilla congue tortor laoreet vel. Vestibulum pretium
          metus a nisl aliquet auctor. Aliquam erat volutpat. Nullam et finibus
          lectus. Sed luctus quam tortor, eu mollis dolor condimentum nec.
          Phasellus quis commodo ex. Nunc ligula erat, tincidunt id tortor ut,
          lacinia malesuada mauris. Sed sit amet velit non lacus lobortis
          molestie a at lorem. Etiam aliquam nunc vel diam hendrerit, quis
          placerat erat ultricies. Donec dui sem, venenatis quis risus eget,
          mattis porta ipsum. Vivamus at auctor risus. Vivamus dui nisl, sodales
          quis diam ut, dictum tempor erat. Aliquam rhoncus molestie quam, nec
          viverra orci gravida pellentesque. Integer vestibulum varius justo nec
          pellentesque. Sed tellus neque, faucibus a iaculis et, mollis vitae
          tellus. Nam finibus laoreet magna, non pellentesque ligula lacinia in.
          Vivamus vel est nec erat rhoncus pharetra vitae et elit. Duis quis
          posuere quam, at euismod ligula.
        </p>
      </main>
      <ClientFooter />
    </>
  );
};

const ClientLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default ClientLayout;
